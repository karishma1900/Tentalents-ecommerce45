import { PrismaClient, UserRole } from '../../../generated/user-service';
import { hashPassword, comparePassword, generateJWT } from '@shared/auth';
import { produceKafkaEvent as publishEvent } from '@shared/kafka';
import { KAFKA_TOPICS } from '@shared/kafka';

const prisma = new PrismaClient();

interface RegisterUserParams {
  email: string;
  password: string;
  phone: string;
  name: string;
  role?: UserRole;
}

interface LoginUserParams {
  email: string;
  password: string;
}

export const userService = {
  registerUser: async ({
    email,
    password,
    phone,
    name,
    role = UserRole.buyer,
  }: RegisterUserParams) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        phone,
        name,
        password: hashedPassword,
        role,
      },
    });

    // ✅ Kafka events using correct "messages" format
    await publishEvent({
      topic: KAFKA_TOPICS.USER.CREATED,
      messages: [
        {
          value: JSON.stringify({
            userId: user.id,
            email: user.email,
            role: user.role,
          }),
        },
      ],
    });

    await publishEvent({
      topic: KAFKA_TOPICS.EMAIL.USER_CREATED,
      messages: [
        {
          value: JSON.stringify({ email: user.email }),
        },
      ],
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await publishEvent({
      topic: KAFKA_TOPICS.USER.REGISTRATION_OTP,
      messages: [
        {
          value: JSON.stringify({ phone: user.phone, otp }),
        },
      ],
    });

    // ✅ Send vendor registration event if role is seller
    if (user.role === UserRole.seller) {
      await publishEvent({
        topic: KAFKA_TOPICS.USER.VENDOR_REGISTERED,
        messages: [
          {
            value: JSON.stringify({
              userId: user.id,
              email: user.email,
              phone: user.phone,
              status: 'pending',
            }),
          },
        ],
      });
    }

    return { id: user.id, email: user.email, role: user.role };
  },

  loginUser: async ({ email, password }: LoginUserParams) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    return generateJWT({ userId: user.id, email: user.email, role: user.role });
  },

  getUserProfile: async (userId: string) => {
    return prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true },
    });
  },

  updateUserRole: async (userId: string, newRole: UserRole) => {
    return prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });
  },
};

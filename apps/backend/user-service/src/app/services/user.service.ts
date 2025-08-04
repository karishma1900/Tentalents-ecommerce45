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
    try {
      console.log('[UserService] ⏳ Registering user:', { email, phone, role });

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        console.warn('[UserService] ❌ User already exists:', email);
        throw new Error('User already exists');
      }

      const hashedPassword = await hashPassword(password);
      console.log('[UserService] 🔐 Password hashed');

      const user = await prisma.user.create({
        data: {
          email,
          phone,
          name,
          password: hashedPassword,
          role,
        },
      });
      console.log('[UserService] ✅ User created:', user);

      // === Kafka Events ===
      try {
        const kafkaPayload = {
          userId: user.id,
          email: user.email,
          role: user.role,
        };

        await publishEvent({
          topic: KAFKA_TOPICS.USER.CREATED,
          messages: [{ value: JSON.stringify(kafkaPayload) }],
        });
        console.log('[Kafka] 📨 USER.CREATED published:', kafkaPayload);

        await publishEvent({
          topic: KAFKA_TOPICS.EMAIL.USER_CREATED,
          messages: [{ value: JSON.stringify({ email: user.email }) }],
        });
        console.log('[Kafka] 📨 EMAIL.USER_CREATED published');

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await publishEvent({
          topic: KAFKA_TOPICS.USER.REGISTRATION_OTP,
          messages: [{ value: JSON.stringify({ phone: user.phone, otp }) }],
        });
        console.log('[Kafka] 📨 USER.REGISTRATION_OTP published:', otp);

        if (user.role === UserRole.seller) {
          const sellerPayload = {
            userId: user.id,
            email: user.email,
            phone: user.phone,
            status: 'pending',
          };
          await publishEvent({
            topic: KAFKA_TOPICS.USER.VENDOR_REGISTERED,
            messages: [{ value: JSON.stringify(sellerPayload) }],
          });
          console.log('[Kafka] 📨 USER.VENDOR_REGISTERED published:', sellerPayload);
        }
      } catch (kafkaErr) {
        console.error('[Kafka] ⚠️ Kafka publish failed:', kafkaErr);
      }

      return { id: user.id, email: user.email, role: user.role };
    } catch (err: any) {
      console.error('[UserService] ❌ Error registering user:', err.message || err);
      throw err;
    }
  },

  loginUser: async ({ email, password }: LoginUserParams) => {
    try {
      console.log('[UserService] 🔑 Login attempt for:', email);
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        console.warn('[UserService] ❌ Email not found');
        throw new Error('Invalid credentials');
      }

      const isValid = await comparePassword(password, user.password);
      if (!isValid) {
        console.warn('[UserService] ❌ Password mismatch');
        throw new Error('Invalid credentials');
      }

      console.log('[UserService] ✅ Authenticated:', user.email);
      return generateJWT({ userId: user.id, email: user.email, role: user.role });
    } catch (err: any) {
      console.error('[UserService] ❌ Login error:', err.message || err);
      throw err;
    }
  },

  getUserProfile: async (userId: string) => {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      console.log('[UserService] 📄 Fetching profile for ID:', userId);
      
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, role: true },
      });

      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      return user;
    } catch (err: any) {
      console.error('[UserService] ❌ getUserProfile error:', err.message || err);
      throw err;
    }
  },

  updateUserRole: async (userId: string, newRole: UserRole) => {
    try {
      if (!userId || !newRole) {
        throw new Error('userId and newRole are required');
      }

      console.log(`[UserService] 🔄 Updating role for ${userId} to ${newRole}`);
      const updated = await prisma.user.update({
        where: { id: userId },
        data: { role: newRole },
      });

      return updated;
    } catch (err: any) {
      console.error('[UserService] ❌ updateUserRole error:', err.message || err);
      throw err;
    }
  },
};

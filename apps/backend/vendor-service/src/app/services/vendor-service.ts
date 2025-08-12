import { VendorStatus as PrismaVendorStatus, PrismaClient, Prisma, UserRole } from '../../../../../../generated/prisma';
import { produceKafkaEvent } from '@shared/kafka';
import { SERVICE_NAMES } from '@shared/constants';
import { VendorStatus } from '@shared/types';
import { KAFKA_TOPICS } from '@shared/kafka';
import { hashPassword, comparePassword, generateJWT } from '@shared/auth';
import { VendorCreatedEvent, VendorStatusUpdatedEvent } from '@shared/kafka';
import { logger } from '@shared/logger';
import { sendEmail } from '@shared/middlewares/email/src/index';
const prisma = new PrismaClient();

export const vendorService = {
initiateVendorRegistrationOtp: async (email: string) => {
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error('User already exists');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

    await prisma.pendingUserOtp.upsert({
      where: { email },
      update: { otp, expiresAt },
      create: { email, otp, expiresAt },
    });

    // ✅ Send OTP email
    await sendEmail({
      to: email,
      subject: 'Your Vendor OTP Code',
      html: `<p>Your OTP is: <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
    });

    logger.info(`[VendorService] ✅ OTP sent to ${email}`);
    return { message: 'OTP sent to email' };
  } catch (err) {
    logger.error('[VendorService] ❌ initiateVendorRegistrationOtp error:', err);
    throw err;
  }
},
  // Step 2: Verify OTP
  verifyVendorEmailOtp: async (email: string, otp: string) => {
    const record = await prisma.pendingUserOtp.findUnique({ where: { email } });
    if (!record || record.otp !== otp || record.expiresAt < new Date()) {
      throw new Error('Invalid or expired OTP');
    }
    logger.info(`[VendorService] OTP verified for ${email}`);
    return { verified: true };
  },

  // Step 3: Complete vendor user registration (email + password)
  completeVendorUserRegistration: async (email: string, password: string) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error('User already exists');

    const otpRecord = await prisma.pendingUserOtp.findUnique({ where: { email } });
    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      throw new Error('OTP verification expired or not found');
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: UserRole.buyer, // vendor role
      },
    });

    await prisma.pendingUserOtp.delete({ where: { email } });
    logger.info(`[VendorService] Vendor user registered for ${email}`);
    return user;
  },

  // Step 4: Register vendor details (after user created)
  completeVendorProfileRegistration: async (userId: string, vendorData: Omit<Prisma.VendorCreateInput, 'userId'>) => {
    // Check user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    // Create vendor linked to user
    const vendor = await prisma.vendor.create({
      data: {
        ...vendorData,
        user: { connect: { id: userId } },
        status: PrismaVendorStatus.pending,
      },
    });

    // Emit Kafka events
    const createdEvent: VendorCreatedEvent = {
      vendorId: vendor.id,
      name: vendor.name,
      status: vendor.status as VendorStatus,
      createdAt: vendor.createdAt.toISOString(),
    };
    const statusUpdatedEvent: VendorStatusUpdatedEvent = {
      vendorId: vendor.id,
      status: vendor.status as VendorStatus,
      updatedAt: vendor.createdAt.toISOString(),
    };

    await Promise.all([
      produceKafkaEvent({
        topic: KAFKA_TOPICS.VENDOR.CREATED,
        messages: [{ value: JSON.stringify(createdEvent) }],
      }),
      produceKafkaEvent({
        topic: KAFKA_TOPICS.VENDOR.STATUS_UPDATED,
        messages: [{ value: JSON.stringify(statusUpdatedEvent) }],
      }),
    ]);

    logger.info(`[VendorService] Vendor profile completed for user ${userId}`);
    return vendor;
  },

  async updateStatus(id: string, status: PrismaVendorStatus) {
    const vendor = await prisma.vendor.update({
      where: { id },
      data: {
        status: { set: status },
      },
    });

    const event: VendorStatusUpdatedEvent = {
      vendorId: vendor.id,
      status: vendor.status as VendorStatus,
      updatedAt: vendor.updatedAt.toISOString(),
    };

    await produceKafkaEvent({
      topic: KAFKA_TOPICS.VENDOR.STATUS_UPDATED,
      messages: [{ value: JSON.stringify(event) }],
    });

    logger.info(`[${SERVICE_NAMES.VENDOR}] Vendor status updated: ${vendor.id}`);
    return vendor;
  },

  async getById(id: string) {
    return prisma.vendor.findUnique({ where: { id } });
  },

  handleUserBecameVendor: async (event: { userId: string; email: string; phone: string; altphone?: string }) => {
    const { userId, email, phone, altphone } = event;

    const existingVendor = await prisma.vendor.findFirst({ where: { userId } });
    if (existingVendor) {
      logger.info(`[${SERVICE_NAMES.VENDOR}] Vendor already exists for user: ${userId}`);
      return;
    }

    const vendor = await prisma.vendor.create({
      data: {
        user: { connect: { id: userId } },
        email,
        phone,
        name: '',          // Can be updated later
        businessName: '',  // Optional until vendor completes profile
        status: PrismaVendorStatus.pending,
      },
    });

    // Emit Kafka events
    const createdEvent: VendorCreatedEvent = {
      vendorId: vendor.id,
      name: vendor.name,
      status: vendor.status as VendorStatus,
      createdAt: vendor.createdAt.toISOString(),
    };

    const statusUpdatedEvent: VendorStatusUpdatedEvent = {
      vendorId: vendor.id,
      status: vendor.status as VendorStatus,
      updatedAt: vendor.createdAt.toISOString(),
    };

    await Promise.all([
      produceKafkaEvent({
        topic: KAFKA_TOPICS.VENDOR.CREATED,
        messages: [{ value: JSON.stringify(createdEvent) }],
      }),
      produceKafkaEvent({
        topic: KAFKA_TOPICS.VENDOR.STATUS_UPDATED,
        messages: [{ value: JSON.stringify(statusUpdatedEvent) }],
      }),
    ]);

    logger.info(`[${SERVICE_NAMES.VENDOR}] 🏪 Vendor created for user: ${userId}`);
  },
};

import { VendorStatus as PrismaVendorStatus, PrismaClient, Prisma, UserRole } from '../../../../../../generated/prisma';
import { produceKafkaEvent } from '@shared/kafka';
import  { generateTokenForEmail } from '@shared/middlewares/auth/src/index';

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

  // Step 1: Create User
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: UserRole.seller,
    },
  });

  // Step 2: Create Vendor with same email and password
  const vendor = await prisma.vendor.create({
    data: {
      user: { connect: { id: user.id } },
      email,
      password: hashedPassword, // ✅ Save here
      name: '',
      phone: '',
      businessName: '',
      status: PrismaVendorStatus.pending,
    },
  });

  // Step 3: Delete OTP entry
  await prisma.pendingUserOtp.delete({ where: { email } });

  // Step 4: Emit Kafka events
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

  const token = generateJWT({ userId: user.id, email: user.email, role: user.role });

  logger.info(`[VendorService] Vendor user + profile created for ${email}`);
  return { token, userId: user.id, email: user.email, role: user.role };
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

//   async getById(id: string) {
//     return prisma.vendor.findUnique({ where: { id } });
//   },
// async getByUserId(userId: string) {
  
  
//   return prisma.vendor.findFirst({ where: { userId } });
// },
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
loginVendorUser: async (email: string, password: string) => {
  try {
    logger.info('[VendorService] 🔑 Login attempt for vendor email:', email);

    // 1. Find vendor by email
   const vendor = await prisma.vendor.findUnique({ where: { email } });
if (!vendor) {
  throw new Error('Invalid credentials');
}

if (!vendor.password) {
  throw new Error('This vendor account does not have a password set.');
}

const isValid = await comparePassword(password, vendor.password);
if (!isValid) {
  throw new Error('Invalid credentials');
}

// Check userId is not null before query
if (!vendor.userId) {
  throw new Error('Vendor has no linked userId');
}

const user = await prisma.user.findUnique({ where: { id: vendor.userId } });
if (!user) {
  throw new Error('Linked user not found');
}

    // 5. Generate a JWT token with vendor info and user info
    // Include vendorId so token can be used for vendor-specific auth
    const tokenPayload = {
      userId: user.id,
      vendorId: vendor.id,
      email: user.email,
      role: user.role,   // Could be UserRole.vendor if you want
    };
    const token = generateJWT(tokenPayload);

    logger.info(`[VendorService] Vendor user logged in: ${email}`);

    // 6. Return token and user/vendor info
    return {
      token,
      userId: user.id,
        email: user.email ?? undefined,
      role: user.role,
      vendorId: vendor.id,
      vendorStatus: vendor.status,
    };
  } catch (err) {
    logger.error('[VendorService] loginVendorUser error:', err);
    throw err;
  }
},


 // 1. Initiate forgot password OTP
  initiateForgotPasswordOtp: async (email: string) => {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error('User not found');

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins expiry

      await prisma.pendingUserOtp.upsert({
        where: { email },
        update: { otp, expiresAt },
        create: { email, otp, expiresAt },
      });

      await sendEmail({
        to: email,
        subject: 'Your Password Reset OTP',
        html: `<p>Your password reset OTP is <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
      });

      logger.info(`[VendorService] Password reset OTP sent to ${email}`);
      return { message: 'OTP sent to email' };
    } catch (err) {
      logger.error('[VendorService] initiateForgotPasswordOtp error:', err);
      throw err;
    }
  },

  // 2. Verify forgot password OTP
  verifyForgotPasswordOtp: async (email: string, otp: string) => {
    try {
      const record = await prisma.pendingUserOtp.findUnique({ where: { email } });
      if (!record || record.otp !== otp || record.expiresAt < new Date()) {
        throw new Error('Invalid or expired OTP');
      }
      logger.info(`[VendorService] Password reset OTP verified for ${email}`);
      return { verified: true };
    } catch (err) {
      logger.error('[VendorService] verifyForgotPasswordOtp error:', err);
      throw err;
    }
  },

  // 3. Reset password with OTP
  resetPasswordWithOtp: async (email: string, otp: string, newPassword: string) => {
    try {
      const record = await prisma.pendingUserOtp.findUnique({ where: { email } });
      if (!record || record.otp !== otp || record.expiresAt < new Date()) {
        throw new Error('Invalid or expired OTP');
      }

      const hashedPassword = await hashPassword(newPassword);

      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });

      await prisma.pendingUserOtp.delete({ where: { email } });

      logger.info(`[VendorService] Password reset successful for ${email}`);
      return { message: 'Password reset successful' };
    } catch (err) {
      logger.error('[VendorService] resetPasswordWithOtp error:', err);
      throw err;
    }
  },
getByVendorId: async (vendorId: string) => {
  try {
    if (!vendorId) throw new Error('Vendor ID is required');

    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          }
        },
      },
    });

    if (!vendor) {
      throw new Error('Vendor not found');
    }

    logger.info(`[VendorService] Vendor profile fetched for vendorId: ${vendorId}`);

    // Optional: Return a DTO hiding sensitive info like passwords
    return {
      id: vendor.id,
      email: vendor.email,
      name: vendor.name,
      phone: vendor.phone,
      businessName: vendor.businessName,
      status: vendor.status,
      createdAt: vendor.createdAt,
      updatedAt: vendor.updatedAt,
      user: vendor.user,
    };
  } catch (err) {
    logger.error('[VendorService] getByVendorId error:', err);
    throw err;
  }
},

updateVendorProfile: async (
  vendorId: string,
  updateData: Partial<Omit<Prisma.VendorUpdateInput, 'id' | 'user'>>
) => {
  try {
    // Directly update whatever fields the user passes
    const vendor = await prisma.vendor.update({
      where: { id: vendorId },
      data: updateData,
    });

    logger.info(`[VendorService] Vendor profile updated for vendorId: ${vendorId}`);
    return vendor;
  } catch (err) {
    logger.error('[VendorService] updateVendorProfile error:', err);
    throw err;
  }
},

};

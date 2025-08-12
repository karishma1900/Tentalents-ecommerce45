import { VendorStatus as PrismaVendorStatus, PrismaClient, Prisma, UserRole } from '../../../../../../generated/prisma';
import { produceKafkaEvent } from '@shared/kafka';
import { SERVICE_NAMES } from '@shared/constants';
import { VendorStatus } from '@shared/types';
import { KAFKA_TOPICS } from '@shared/kafka';
import { VendorCreatedEvent, VendorStatusUpdatedEvent } from '@shared/kafka';
import { logger } from '@shared/logger';

const prisma = new PrismaClient();

export const vendorService = {
  async register(data: Omit<Prisma.VendorCreateInput, 'userId'>) {
    // We remove any userId property if present, because Prisma expects 'user' relation, not scalar foreign key.
    const { userId, ...vendorData } = data as any;

    // Find or create user with vendor email
    let user = await prisma.user.findUnique({ where: { email: vendorData.email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: vendorData.email!,
          name: vendorData.name || '',
          phone: vendorData.phone || '',
          role: UserRole.buyer, // or UserRole.vendor if applicable
        },
      });
    } else {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: vendorData.name || user.name,
          phone: vendorData.phone || user.phone,
        },
      });
    }

    // Construct Prisma VendorCreateInput with relation
    const createVendorData: Prisma.VendorCreateInput = {
      ...vendorData,
      user: { connect: { id: user.id } },
    };

    // Create vendor
    const vendor = await prisma.vendor.create({
      data: createVendorData,
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

    logger.info(`[${SERVICE_NAMES.VENDOR}] Vendor registered and status emitted: ${vendor.id}`);
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

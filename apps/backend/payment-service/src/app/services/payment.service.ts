import { PrismaClient, PaymentMethod, PaymentStatus } from '../../../generated/payment-service';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '@shared/logger';

interface InitiatePaymentDTO {
  amount: number;
  method: PaymentMethod;    // use generated enum here
  orderId: string;
}

const prisma = new PrismaClient();

export const paymentService = {
  initiatePayment: async (userId: string, data: InitiatePaymentDTO) => {
    const { amount, method, orderId } = data;

    const payment = await prisma.payment.create({
      data: {
        id: uuidv4(),
        userId,
        amount,
        method,
        status: PaymentStatus.pending,   // use enum value (lowercase)
        orderId,
        transactionId: uuidv4(),         // you should provide a unique transactionId here as it's required and unique
      },
    });

    // Simulate UPI QR code (this can be extended per method)
    const qrCode =
      method === PaymentMethod.upi
        ? `upi://pay?pa=merchant@upi&pn=EcomStore&am=${amount}`
        : undefined;

    return {
      paymentId: payment.id,
      amount,
      method,
      status: payment.status,
      qrCode,
    };
  },

  verifyPayment: async (paymentId: string, status: PaymentStatus) => {
    const validStatuses = [PaymentStatus.pending, PaymentStatus.success, PaymentStatus.failed];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid payment status: ${status}`);
    }

    const updated = await prisma.payment.update({
      where: { id: paymentId },
      data: { status },
    });

    logger.info(`[paymentService] 💸 Payment ${paymentId} updated to ${status}`);
    return updated;
  },
};

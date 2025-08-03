import { PrismaClient, RefundRequest, RefundStatus, RefundReason } from './../../../generated/refund-service';

const prisma = new PrismaClient();

export const refundService = {
  /**
   * Request a refund - creates a RefundRequest record
   * @param data refund request payload from client
   */
  async requestRefund(data: {
    orderItemId: string;
    userId: string;
    sellerId: string;
    reason: RefundReason;
    comment?: string;
    attachmentUrl?: string;
  }): Promise<RefundRequest> {
    const refund = await prisma.refundRequest.create({
      data: {
        orderItemId: data.orderItemId,
        userId: data.userId,
        sellerId: data.sellerId,
        reason: data.reason,
        comment: data.comment,
        attachmentUrl: data.attachmentUrl,
        status: RefundStatus.REQUESTED,
      },
    });
    return refund;
  },

  /**
   * Get refund details by refund request ID
   */
  async getRefundById(id: string): Promise<RefundRequest | null> {
    return prisma.refundRequest.findUnique({
      where: { id },
    });
  },

  /**
   * Update the refund status and set resolvedAt when status changes to terminal state
   */
 async updateRefundStatus(id: string, status: RefundStatus): Promise<RefundRequest | null> {
  // Explicitly type the array as RefundStatus[]
  const resolvedStatuses: RefundStatus[] = [
    RefundStatus.APPROVED,
    RefundStatus.REJECTED,
    RefundStatus.REFUNDED,
    RefundStatus.CANCELLED,
  ];

  const refund = await prisma.refundRequest.update({
    where: { id },
    data: {
      status,
      resolvedAt: resolvedStatuses.includes(status) ? new Date() : null,
    },
  });

  return refund;
},

  /**
   * List all refund requests for a specific user (buyer)
   */
  async listRefundsByUser(userId: string): Promise<RefundRequest[]> {
    return prisma.refundRequest.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },
};

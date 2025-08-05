import { PrismaClient } from '../../../../../../generated/prisma';
const prisma = new PrismaClient();

interface CreateRatingInput {
  productId?: string;
  sellerId?: string;
  score: number;
  comment?: string;
}

export const ratingService = {
  createRating: async (userId: string, data: CreateRatingInput) => {
    return prisma.rating.create({
      data: {
        userId,
        productId: data.productId,
        sellerId: data.sellerId,
        score: data.score,
        comment: data.comment,
      },
    });
  },

  getRatingsByProduct: async (productId: string) => {
    return prisma.rating.findMany({
      where: { productId },
      include: { user: true },
    });
  },

  getRatingsBySeller: async (sellerId: string) => {
    return prisma.rating.findMany({
      where: { sellerId },
      include: { user: true },
    });
  },

  updateRating: async (
    userId: string,
    ratingId: string,
    score: number,
    comment?: string
  ) => {
    const updateData: { score: number; comment?: string } = { score };
    if (comment !== undefined) {
      updateData.comment = comment;
    }

    return prisma.rating.updateMany({
      where: { id: ratingId, userId },
      data: updateData,
    });
  },

  deleteRating: async (userId: string, ratingId: string) => {
    return prisma.rating.deleteMany({
      where: { id: ratingId, userId },
    });
  },
};

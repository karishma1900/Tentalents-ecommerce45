import { PrismaClient } from '../../../generated/rating-service'; 
const prisma = new PrismaClient();

interface CreateRatingInput {
  targetId: string;           // productId → targetId
  targetType: 'PRODUCT' | 'SELLER';  // you must specify type (enum)
  stars: number;              // rating → stars
  comment?: string;
}

export const ratingService = {
  createRating: async (userId: string, data: CreateRatingInput) => {
    return prisma.rating.create({
      data: {
        userId,
        targetId: data.targetId,
        targetType: data.targetType,
        stars: data.stars,
        comment: data.comment,
      },
    });
  },

  getRatingsByProduct: async (targetId: string) => {
    return prisma.rating.findMany({
      where: { 
        targetId,
        targetType: 'PRODUCT',
      },
    });
  },

  updateRating: async (
    userId: string,
    ratingId: string,
    stars: number,
    comment?: string  // Make comment optional and typed
  ) => {
    const updateData: { stars: number; comment?: string } = { stars };

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

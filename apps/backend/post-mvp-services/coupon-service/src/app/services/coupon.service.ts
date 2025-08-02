import { PrismaClient, $Enums, Prisma } from '../../../generated/coupon-service';

const prisma = new PrismaClient();

export const couponService = {
  createCoupon: async (data: {
    code: string;
    type: $Enums.CouponType;
    scope: $Enums.CouponScope;
    value: number;
    startDate: Date;
    endDate: Date;
    maxDiscount?: number;
    minOrderValue?: number;
    usageLimit?: number;
    perUserLimit?: number;
  }) => {
    return prisma.coupon.create({
      data: {
        code: data.code,
        type: data.type,
        scope: data.scope,
        value: new Prisma.Decimal(data.value),
        startDate: data.startDate,
        endDate: data.endDate,
        maxDiscount: data.maxDiscount ? new Prisma.Decimal(data.maxDiscount) : undefined,
        minOrderValue: data.minOrderValue ? new Prisma.Decimal(data.minOrderValue) : undefined,
        usageLimit: data.usageLimit,
        perUserLimit: data.perUserLimit,
      },
    });
  },

  getAllCoupons: async () => prisma.coupon.findMany(),

  getCouponByCode: async (code: string) =>
    prisma.coupon.findUnique({ where: { code } }),

  deactivateCoupon: async (code: string) =>
    prisma.coupon.update({
      where: { code },
      data: { isActive: false },
    }),
};

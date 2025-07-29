export declare const couponService: {
    createCoupon: (data: {
        code: string;
        discount: number;
        expiresAt: Date;
    }) => Promise<any>;
    getAllCoupons: () => Promise<any>;
    getCouponByCode: (code: string) => Promise<any>;
    deactivateCoupon: (code: string) => Promise<any>;
};

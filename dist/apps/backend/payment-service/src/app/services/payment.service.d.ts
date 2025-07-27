type PaymentMethod = 'UPI' | 'COD' | 'CARD' | 'NET_BANKING';
type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED';
interface InitiatePaymentDTO {
    amount: number;
    method: PaymentMethod;
    orderId: string;
}
export declare const paymentService: {
    /**
     * Initiate a payment for a given order and user.
     */
    initiatePayment: (userId: string, data: InitiatePaymentDTO) => Promise<{
        paymentId: any;
        amount: number;
        method: PaymentMethod;
        status: any;
        qrCode: string | undefined;
    }>;
    /**
     * Update payment status (e.g., from gateway callback).
     */
    verifyPayment: (paymentId: string, status: PaymentStatus) => Promise<any>;
};
export {};

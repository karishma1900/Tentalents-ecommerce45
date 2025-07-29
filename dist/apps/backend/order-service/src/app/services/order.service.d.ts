import type { OrderStatus } from '@prisma/client';
interface OrderItemInput {
    productId: string;
    sellerId: string;
    quantity: number;
    price: number;
}
interface PlaceOrderInput {
    items: OrderItemInput[];
    totalAmount: number;
    shippingAddress: string;
}
export declare const orderService: {
    placeOrder: (userId: string, data: PlaceOrderInput) => Promise<any>;
    getOrdersByUser: (userId: string) => Promise<any>;
    getOrderById: (id: string) => Promise<any>;
    updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<any>;
};
export {};

import { PrismaClient } from '../../../generated/order-service'
import type { OrderStatus } from '../../../generated/order-service';

interface OrderItemInput {
  productId: string;
  sellerId: string;
  listingId: string;
  quantity: number;
  price: number;
}

interface PlaceOrderInput {
  items: OrderItemInput[];
  totalAmount: number;
  shippingAddress: string;
  paymentMode: string;   // <--- Add paymentMode here
}

const prisma = new PrismaClient();

const VALID_STATUSES: OrderStatus[] = [
  'pending',
  'confirmed',
  'shipped',
  'delivered',
  'canceled',
  'returned',
  'refunded',
];

export const orderService = {
  placeOrder: async (buyerId: string, data: PlaceOrderInput) => {
    const { items, totalAmount, shippingAddress, paymentMode } = data;

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('Order must contain at least one item.');
    }

    const order = await prisma.order.create({
      data: {
        buyerId,
        totalAmount,
        shippingAddress,
        paymentMode,       // <--- Pass paymentMode here
        status: 'pending',
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            sellerId: item.sellerId,
            listingId: item.listingId,
            quantity: item.quantity,
            unitPrice: item.price,
            totalPrice: item.price * item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    return order;
  },

  getOrdersByUser: async (buyerId: string) => {
    return prisma.order.findMany({
      where: { buyerId },
      include: { items: true },
    });
  },

  getOrderById: async (id: string) => {
    return prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
  },

  updateOrderStatus: async (orderId: string, status: OrderStatus) => {
    if (!VALID_STATUSES.includes(status)) {
      throw new Error(`Invalid order status: ${status}`);
    }

    return prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  },
};

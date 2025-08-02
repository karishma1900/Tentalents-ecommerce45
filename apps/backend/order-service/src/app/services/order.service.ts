import { PrismaClient } from '../../../generated/order-service'
import type { OrderStatus } from '../../../generated/order-service';

interface OrderItemInput {
  productId: string;
  sellerId: string;
  listingId: string; // NEW: must provide listingId from caller
  quantity: number;
  price: number; // price per unit
}

interface PlaceOrderInput {
  items: OrderItemInput[];
  totalAmount: number;
  shippingAddress: string;
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
    const { items, totalAmount, shippingAddress } = data;

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('Order must contain at least one item.');
    }

    const order = await prisma.order.create({
      data: {
        buyerId,                  // use buyerId (not userId)
        totalAmount,
        shippingAddress,
        status: 'pending',        // use valid enum value
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            sellerId: item.sellerId,
            listingId: item.listingId,                // provide listingId
            quantity: item.quantity,
            unitPrice: item.price,                     // unitPrice field
            totalPrice: item.price * item.quantity,   // totalPrice field
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

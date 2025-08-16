import { redisClient, setCache, getCache, deleteCache } from '@shared/redis';
import { connectKafkaProducer, KAFKA_TOPICS } from '@shared/kafka';
import type { Producer } from 'kafkajs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const CART_TTL = 60 * 60 * 2; // 2 hours

let kafkaProducer: Producer | null = null;

async function getKafkaProducer(): Promise<Producer> {
  if (!kafkaProducer) {
    kafkaProducer = await connectKafkaProducer();
  }
  return kafkaProducer;
}

const includeCartRelations = {
  vendor: { select: { id: true, name: true } },
  product: {
    select: {
      id: true,
      title: true,
      description: true,
      imageUrls: true,
      category: true,
      brand: true,
    },
  },
  productListing: {
    select: {
      id: true,
      price: true,
      stock: true,
      sku: true,
      status: true,
      dispatchTimeInDays: true,  // add this
      shippingCost: true,        // add this
    },
  },
};


export const cartService = {
  getCart: async (userId: string) => {
    const cacheKey = `cart:${userId}`;
    try {
      const cachedCart = await getCache<typeof includeCartRelations[]>(cacheKey);
      console.log('Cached cart:', cachedCart);
      if (cachedCart !== null) {
        // Return cached cart if found (including empty array)
        return cachedCart;
      }

      // Cache miss, query DB
      const cart = await prisma.cartItem.findMany({
        where: { userId },
        include: includeCartRelations,
      });

      console.log('Queried cart from DB:', cart);
      await setCache(cacheKey, cart, CART_TTL);
      return cart;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  addToCart: async (
    userId: string,
    item: { listingId: string; productId: string; quantity: number }
  ) => {
    const cacheKey = `cart:${userId}`;
    try {
      // Validate listingId and get vendorId
      const productListing = await prisma.productListing.findUnique({
        where: { id: item.listingId },
        select: { vendorId: true },
      });

      if (!productListing) {
        throw new Error('Invalid listingId');
      }

      // Check if cart item exists - if yes, update quantity, else create new
      const existingCartItem = await prisma.cartItem.findFirst({
        where: {
          userId,
          listingId: item.listingId,
        },
      });

      if (existingCartItem) {
        // Update quantity
        await prisma.cartItem.update({
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + item.quantity },
        });
      } else {
        // Create new cart item
        await prisma.cartItem.create({
          data: {
            userId,
            listingId: item.listingId,
            productId: item.productId,
            vendorId: productListing.vendorId,
            quantity: item.quantity,
          },
        });
      }

      // Fetch updated cart with full details
      const updatedCart = await prisma.cartItem.findMany({
        where: { userId },
        include: includeCartRelations,
      });

      // Update cache
      await setCache(cacheKey, updatedCart, CART_TTL);

      // Send Kafka event
      try {
        const producer = await getKafkaProducer();
        await producer.send({
          topic: KAFKA_TOPICS.CART.UPDATED,
          messages: [{ value: JSON.stringify({ userId, cart: updatedCart }) }],
        });
      } catch (kafkaErr) {
        console.error('Failed to send CART_UPDATED Kafka message:', kafkaErr);
      }

      return updatedCart;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  updateCartItemQuantity: async (
    userId: string,
    listingId: string,
    quantityChange: number
  ) => {
    const cacheKey = `cart:${userId}`;
    try {
      const existingItem = await prisma.cartItem.findFirst({
        where: { userId, listingId },
      });

      if (!existingItem) {
        throw new Error('Cart item not found');
      }

      const newQuantity = existingItem.quantity + quantityChange;

      if (newQuantity <= 0) {
        await prisma.cartItem.delete({ where: { id: existingItem.id } });
      } else {
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: newQuantity },
        });
      }

      // Fetch updated cart with full details (consistent shape)
      const updatedCart = await prisma.cartItem.findMany({
        where: { userId },
        include: includeCartRelations,
      });

      await setCache(cacheKey, updatedCart, CART_TTL);

      try {
        const producer = await getKafkaProducer();
        await producer.send({
          topic: KAFKA_TOPICS.CART.UPDATED,
          messages: [{ value: JSON.stringify({ userId, cart: updatedCart }) }],
        });
      } catch (kafkaErr) {
        console.error('Failed to send CART_UPDATED Kafka message:', kafkaErr);
      }

      return updatedCart;
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      throw error;
    }
  },

  deleteCartItem: async (userId: string, itemId: string) => {
    const cacheKey = `cart:${userId}`;
    try {
      await prisma.cartItem.deleteMany({
        where: { id: itemId, userId },
      });

      // Fetch updated cart with full details
      const updatedCart = await prisma.cartItem.findMany({
        where: { userId },
        include: includeCartRelations,
      });

      await setCache(cacheKey, updatedCart, CART_TTL);

      try {
        const producer = await getKafkaProducer();
        await producer.send({
          topic: KAFKA_TOPICS.CART.UPDATED,
          messages: [{ value: JSON.stringify({ userId, cart: updatedCart }) }],
        });
      } catch (kafkaErr) {
        console.error('Failed to send CART_UPDATED Kafka message:', kafkaErr);
      }

      return updatedCart;
    } catch (error) {
      console.error('Error deleting cart item:', error);
      throw error;
    }
  },

  checkout: async (userId: string) => {
    const cacheKey = `cart:${userId}`;
    try {
      const cart = await prisma.cartItem.findMany({
        where: { userId },
        include: includeCartRelations,
      });

      try {
        const producer = await getKafkaProducer();
        await producer.send({
          topic: KAFKA_TOPICS.CART.CHECKED_OUT,
          messages: [{ value: JSON.stringify({ userId, cart }) }],
        });
      } catch (kafkaErr) {
        console.error('Failed to send CART_CHECKED_OUT Kafka message:', kafkaErr);
      }

      await prisma.cartItem.deleteMany({ where: { userId } });
      await deleteCache(cacheKey);

      return { status: 'checked_out', cart };
    } catch (error) {
      console.error('Error during checkout:', error);
      throw error;
    }
  },
};

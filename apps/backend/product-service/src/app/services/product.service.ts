import { PrismaClient } from '../../../generated/product-service';
import { v4 as uuid } from 'uuid';
import { minioClient } from '@shared/minio';
import { MinioBuckets, MinioFolderPaths } from '@shared/middlewares/minio/src/lib/minio-constants';

const prisma = new PrismaClient();

export const productService = {
  /**
   * 📦 Create a new product
   */
  async createProduct(data: any) {
  try {
    return await prisma.product.create({
      data: {
        ...data,
     
      },
    });
  } catch (error) {
    console.error('❌ Prisma createProduct error:', error);
    throw error;
  }
},

  /**
   * 📦 Get all products
   */
  async getAllProducts() {
    return prisma.product.findMany();
  },

  /**
   * 🔍 Get product by ID
   */
  async getProductById(id: string) {
    return prisma.product.findUnique({
      where: { id },
    });
  },

  /**
   * 🛠️ Update product details
   */
  async updateProduct(id: string, data: any) {
    return prisma.product.update({
      where: { id },
      data: {
        ...data,
       
      },
    });
  },

  /**
   * ❌ Delete product
   */
  async deleteProduct(id: string, deletedBy: string) {
    // Optionally record audit info here
    return prisma.product.delete({
      where: { id },
    });
  },

  /**
   * 🖼️ Upload product image to MinIO
   */
  async uploadProductImage(productId: string, imageBase64: string) {
    const buffer = Buffer.from(imageBase64, 'base64');
    const objectName = `${MinioFolderPaths.PRODUCT_IMAGES}${productId}-${uuid()}.png`;

    // Pass buffer length as 4th argument, metadata as 5th
    await minioClient.putObject(
      MinioBuckets.PRODUCT,
      objectName,
      buffer,
      buffer.length,
      { 'Content-Type': 'image/png' }
    );

    return {
      bucket: MinioBuckets.PRODUCT,
      key: objectName,
      url: `${process.env.MINIO_URL}/${MinioBuckets.PRODUCT}/${objectName}`,
    };
  }
};

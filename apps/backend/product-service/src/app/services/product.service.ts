import { PrismaClient, Prisma } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { minioClient } from '@shared/minio';
import { MinioBuckets, MinioFolderPaths } from '@shared/minio';
import {uploadToCloudinary} from '@shared/auth'
const prisma = new PrismaClient();

function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/-+/g, '-');         // Remove repeated hyphens
}

async function generateUniqueSlug(title: string): Promise<string> {
  const baseSlug = generateSlugFromTitle(title);
  let uniqueSlug = baseSlug;

  // Check if slug exists
  const exists = await prisma.product.findUnique({ where: { slug: uniqueSlug } });

  if (exists) {
    // append suffix to make it unique
    const uniqueSuffix = uuid().split('-')[0];
    uniqueSlug = `${baseSlug}-${uniqueSuffix}`;
  }
  return uniqueSlug;
}

export const productService = {
  /**
   * 📦 Create a new product along with listing and optional variants
   */
async createProduct(data: any) {
  try {
    const priceDecimal = new Prisma.Decimal(data.price);
    const originalPriceDecimal = new Prisma.Decimal(data.originalPrice);
    const shippingCostDecimal = new Prisma.Decimal(data.shippingCost || 0);

    const {
      title,
      description,
      category,
      subCategory,
      images, // array of base64 strings or URLs
      brand,
      includedComponents,
      numberOfItems,
      enclosureMaterial,
      productCareInstructions,
      productFeatures,

      sku,
      stock,
      unit,
      itemWeight,
      packageLength,
      packageWidth,
      packageHeight,
      deliveryEta,
      vendorId,
      variants,
      dispatchTimeInDays,
    } = data;

    console.log('Checking required fields for product creation:', {
      title,
      category,
      sku,
      price: data.price,
      originalPrice: data.originalPrice,
      stock,
      unit,
      itemWeight,
      vendorId,
      images,
    });

    if (
      !title || !category || !sku ||
      !priceDecimal || !originalPriceDecimal || !stock || !unit ||
      !itemWeight || !vendorId || !Array.isArray(images) || images.length === 0
    ) {
      throw new Error('Missing required fields for product creation (including images)');
    }

    // Check vendor existence
    const vendor = await prisma.vendor.findUnique({ where: { id: vendorId } });
    if (!vendor) throw new Error('Vendor not found');

    const generatedSlug = await generateUniqueSlug(title);

    // Create product without images first
    const product = await prisma.product.create({
      data: {
        title,
        description,
        category,
        subCategory,
        slug: generatedSlug,
        brand,
        includedComponents: includedComponents || [],
        numberOfItems,
        enclosureMaterial,
        productCareInstructions,
        productFeatures: productFeatures || [],
      },
    });

    // Helper: detect if string is base64 (crudely)
    function isBase64(str: string) {
      return !/^https?:\/\//.test(str);
    }
    function cleanBase64(base64: string): string {
      return base64.replace(/^data:image\/\w+;base64,/, '');
    }

    // Process images
    let uploadedImageUrls: string[] = [];

    uploadedImageUrls = await Promise.all(
      images.map(async (img: string, i: number) => {
        if (isBase64(img)) {
          console.log(`Uploading base64 image ${i + 1}`);
          const cleaned = cleanBase64(img);
          const buffer = Buffer.from(cleaned, 'base64');
          const filename = `product-${product.id}-${uuid()}`;
          const url = await uploadToCloudinary(buffer, 'product-images', filename);
          console.log(`Uploaded image ${i + 1}:`, url);
          return url;
        } else {
          // It's a direct URL
          console.log(`Using provided image URL ${i + 1}:`, img);
          return img;
        }
      })
    );

    // Save image URLs to product record
    if (uploadedImageUrls.length > 0) {
      await prisma.product.update({
        where: { id: product.id },
        data: { imageUrls: uploadedImageUrls },
      });
    }

    // Create listing
    const listing = await prisma.productListing.create({
      data: {
        productId: product.id,
        vendorId: vendor.id,
        sku,
        price: priceDecimal,
        originalPrice: originalPriceDecimal,
        stock,
        unit,
        itemWeight,
        packageLength,
        packageWidth,
        packageHeight,
        deliveryEta,
        brand,
        includedComponents: includedComponents || [],
        numberOfItems,
        enclosureMaterial,
        productCareInstructions,
        productFeatures: productFeatures || [],
        dispatchTimeInDays,
        shippingCost: shippingCostDecimal,
      },
    });

    // Create variants if any
    if (Array.isArray(variants) && variants.length > 0) {
      await prisma.productVariant.createMany({
        data: variants.map((variant: any) => ({
          productListingId: listing.id,
          name: variant.name,
          value: variant.value,
        })),
      });
    }

    return {
      success: true,
      product,
      listing,
      variantsAdded: variants?.length || 0,
      uploadedImageUrls,
    };
  } catch (error) {
    console.error('Error in createProduct:', error);
    throw error;
  }
},

  // Other methods like getAllProducts, getProductById, etc.



  /**
   * 📦 Get all products with vendor info inside listings
   */
  async getAllProducts() {
    return prisma.product.findMany({
      include: {
        listings: {
          include: {
            vendor: {
              include: {
                user: true, // fetch vendor's user (name, email, etc)
              },
            },
            variants: true,
          },
        },
        ratings: true,
      },
    });
  },

  /**
   * 🔍 Get product by ID with vendor info
   */
  async getProductById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        listings: {
          include: {
            variants: true,
            vendor: {
              include: {
                user: true,
              },
            },
          },
        },
        ratings: true,
      },
    });
  },

  /**
   * 🛠️ Update product details
   */
  async updateProduct(id: string, data: any) {
    return prisma.product.update({
      where: { id },
      data,
    });
  },

  /**
   * ❌ Delete product
   */
  async deleteProduct(id: string) {
    return prisma.product.delete({
      where: { id },
    });
  },

  /**
   * Fetch products for card view with prices, image, rating, vendor etc.
   */
  async getProductsForCard() {
    // Fetch all products with their listings and ratings
    const products = await prisma.product.findMany({
      include: {
        listings: {
          include: {
            vendor: {
              include: {
                user: true,
              },
            },
          },
        },
        ratings: true,
      },
    });

  return products.map(product => {
    const listing = product.listings?.[0]; // take the first listing
    const vendorUser = listing?.vendor?.user;

    // Ensure you handle missing or empty listings and ratings
    return {
      id: product.id,
      title: product.title,
      price: listing ? Number(listing.originalPrice) : 0,  // original (higher) price
      offerPrice: listing && listing.price < listing.originalPrice ? Number(listing.price) : undefined, // discounted offer price, only if a discount exists
      image: product.imageUrls?.[0] || '', // Fallback to empty string if imageUrls is empty
      rating: product.ratings?.length > 0 ? product.ratings[0].score : 0, // Return a default rating if no ratings exist
      href: `/shop/${product.slug || product.id}`, // Make sure to use slug for the URL
      category: product.category,
      vendorName: vendorUser?.name || 'Unknown Vendor', // Fallback vendor name
      vendorEmail: vendorUser?.email || 'Unknown Email', // Fallback vendor email
    };
  });
  },

  /**
   * 🖼️ Upload product image to MinIO
   */
 async uploadProductImage(productId: string, imageBase64: string) {
  const buffer = Buffer.from(imageBase64, 'base64');
  const filename = `product-${productId}-${uuid()}`;

  const url = await uploadToCloudinary(buffer, 'product-images', filename);

  // Optional: Add URL to product.imageUrls[]
  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: {
      imageUrls: {
        push: url,
      },
    },
  });

  return {
    url,
    message: 'Uploaded to Cloudinary successfully',
    productId: updatedProduct.id,
  };
},
async isUserAuthorizedForProduct(userId: string, productId: string): Promise<boolean> {
  // Find the vendor associated with the user
  const vendor = await prisma.vendor.findUnique({ where: { userId } });
  if (!vendor) return false;

  // Check if the product listing belongs to this vendor
  const listing = await prisma.productListing.findFirst({
    where: {
      productId,
      vendorId: vendor.id,
    },
  });

  return !!listing;
},

  /**
   * Get product by slug with variants and ratings
   */
  async getProductBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        listings: {
          include: {
            variants: true,
            vendor: {
              include: {
                user: true,
                productListings: true,
                
              },
            },
          },
        },
        ratings: true,
      },
    });
  
  },

  
};

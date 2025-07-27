import { Request, Response, NextFunction } from 'express';
/**
 * 📦 Create a new product
 */
export declare const createProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * 🔍 Get all products
 */
export declare const getAllProducts: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * 🔍 Get a product by ID
 */
export declare const getProductById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * 🛠️ Update product details
 */
export declare const updateProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * ❌ Delete a product
 */
export declare const deleteProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * 🖼️ Upload product image to MinIO
 */
export declare const uploadProductImage: (req: Request, res: Response, next: NextFunction) => Promise<void>;

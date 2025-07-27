export declare const productService: {
    /**
     * 📦 Create a new product
     */
    createProduct(data: any, createdBy: string): Promise<any>;
    /**
     * 📦 Get all products
     */
    getAllProducts(): Promise<any>;
    /**
     * 🔍 Get product by ID
     */
    getProductById(id: string): Promise<any>;
    /**
     * 🛠️ Update product details
     */
    updateProduct(id: string, data: any, updatedBy: string): Promise<any>;
    /**
     * ❌ Delete product
     */
    deleteProduct(id: string, deletedBy: string): Promise<any>;
    /**
     * 🖼️ Upload product image to MinIO
     */
    uploadProductImage(productId: string, imageBase64: string): Promise<{
        bucket: any;
        key: string;
        url: string;
    }>;
};

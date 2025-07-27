type SearchParams = {
    query?: string;
    category?: string;
    brand?: string;
};
export declare const searchService: {
    /**
     * Index product into Redis hash
     * @param product Product object to index
     */
    indexProduct: (product: Record<string, any>) => Promise<void>;
    /**
     * Search indexed products using filters
     * @param params SearchParams (query, category, brand)
     * @returns Filtered products
     */
    search: (params: SearchParams) => Promise<Record<string, string>[]>;
};
export {};

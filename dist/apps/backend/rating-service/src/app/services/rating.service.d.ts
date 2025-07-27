interface CreateRatingInput {
    productId: string;
    rating: number;
    comment?: string;
}
export declare const ratingService: {
    createRating: (userId: string, data: CreateRatingInput) => Promise<any>;
    getRatingsByProduct: (productId: string) => Promise<any>;
    updateRating: (userId: string, ratingId: string, ratingValue: number) => Promise<any>;
    deleteRating: (userId: string, ratingId: string) => Promise<any>;
};
export {};

export declare const recommendationService: {
    getRecommendationsForUser: (userId: string) => Promise<any>;
    addRecommendationEvent: (userId: string, productId: string) => Promise<void>;
};

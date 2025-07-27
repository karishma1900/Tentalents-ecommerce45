export declare const analyticsService: {
    /**
     * Increment an event type in analytics.
     * If it doesn't exist, create it.
     * @param type - Metric type, e.g., "user_signup", "product_view"
     */
    incrementEvent(type: string): Promise<void>;
};
/**
 * Get a summary of all metrics.
 * Returns an object like: { "user_s_*
 

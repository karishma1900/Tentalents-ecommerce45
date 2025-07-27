interface EmailParams {
    to: string;
    subject: string;
    html: string;
}
export declare const emailService: {
    /**
     * Send an email using the shared email utility.
     * Validates input and logs success or error.
     */
    send: ({ to, subject, html }: EmailParams) => Promise<{
        messageId: string;
    }>;
};
export {};

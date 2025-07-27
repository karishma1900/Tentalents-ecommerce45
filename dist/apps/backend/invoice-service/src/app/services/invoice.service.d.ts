import { Readable } from 'stream';
export declare const invoiceService: {
    generateInvoicePDF: (orderData: {
        orderId: string;
        userId: string;
        buyerEmail: string;
        items: {
            name: string;
            price: number;
            quantity: number;
        }[];
        total: number;
    }) => Promise<void>;
    getInvoiceFile: (userId: string, orderId: string) => Promise<Readable>;
};

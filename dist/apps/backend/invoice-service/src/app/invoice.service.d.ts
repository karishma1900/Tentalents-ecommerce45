import { Readable } from 'stream';
interface SaveInvoiceParams {
    filePath: string;
    userId: string;
    orderId: string;
}
/**
 * 🧾 Save an invoice PDF to MinIO storage
 */
export declare const saveInvoice: ({ filePath, userId, orderId, }: SaveInvoiceParams) => Promise<void>;
/**
 * 📥 Retrieve an invoice PDF from MinIO as a readable stream
 */
export declare const getInvoiceFile: (userId: string, orderId: string) => Promise<Readable>;
export {};

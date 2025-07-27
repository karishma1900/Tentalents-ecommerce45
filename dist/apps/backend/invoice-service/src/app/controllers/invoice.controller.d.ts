import { Request, Response } from 'express';
/**
 * Generate an invoice and upload PDF to MinIO.
 * Associates it with order and vendor.
 */
export declare function manualInvoiceGeneration(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Get signed URL from MinIO for invoice PDF download.
 */
export declare function getInvoiceDownloadUrl(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;

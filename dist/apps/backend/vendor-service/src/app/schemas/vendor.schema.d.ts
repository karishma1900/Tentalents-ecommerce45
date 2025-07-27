import { z } from 'zod';
import { VendorStatus } from '@shared/types';
export declare const CreateVendorSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    userId: z.ZodString;
    storeName: z.ZodString;
    storeSlug: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<typeof VendorStatus>>;
    documents: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const UpdateVendorSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodString>;
    storeName: z.ZodOptional<z.ZodString>;
    storeSlug: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodOptional<z.ZodEnum<typeof VendorStatus>>>;
    documents: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
export declare const UpdateVendorStatusSchema: z.ZodObject<{
    id: z.ZodString;
    status: z.ZodEnum<typeof VendorStatus>;
}, z.core.$strip>;
export type CreateVendorDto = z.infer<typeof CreateVendorSchema>;
export type UpdateVendorDto = z.infer<typeof UpdateVendorSchema>;
export type UpdateVendorStatusDto = z.infer<typeof UpdateVendorStatusSchema>;

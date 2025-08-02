import { VendorStatus } from '@shared/middlewares/types/src/index';

export interface VendorCreatedEvent {
  vendorId: string;
  name: string;
  status: VendorStatus;
  createdAt: string;
}

export interface VendorStatusUpdatedEvent {
  vendorId: string;
  status: VendorStatus;
  updatedAt: string;
}

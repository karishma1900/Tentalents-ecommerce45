// libs/shared/types/src/global.d.ts
import type { StaticImageData } from 'next/image';

/* ────────────────────────────────
   📦  Inventory
──────────────────────────────── */
export type InventoryStatus = 'Avail' | 'Restock' | 'Empty';

export type Variant = {
  id: number;
  name: string; // e.g., "Black / 128GB"
  stock: number;
  status: InventoryStatus;
};

export type InventoryItem = {
  id: number;
  variants: Variant[]; // ✅ New: List of variants
};
export type DropdownOption<T = string> = {
  label: string;
  value: T;
};
/* ────────────────────────────────
   🛍️  Product
──────────────────────────────── */
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  offerPrice?: number;
  image: StaticImageData;
  inventory: InventoryItem;
   sold?: number;
};

/* ────────────────────────────────
   📦  Orders
──────────────────────────────── */
export type OrderStatus =
  | 'unpaid'
  | 'paid'
  | 'failed'
  | 'fulfilled'
  | 'in process'
  | 'refunded'
  | 'unfulfilled'
  | 'paid, in process'
  | 'paid, fulfilled'
  | 'unpaid, in process';

export type ProductOrder = {
  id: number;
  product: Product;
  quantity: number;
  price: number;
  city: string;
  status: OrderStatus;
};

export {};

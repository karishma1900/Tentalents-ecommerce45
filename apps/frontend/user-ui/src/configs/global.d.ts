// global.d.ts
import type { StaticImageData } from 'next/image';

declare global {
  type NavItemsTypes = {
    title: string;
    href: string;
  };

  type CategoryItemsTypes = {
    image: string | StaticImageData;
    title: string;
    href: string;
  };

  type productItems = {
    id: string;
    image: (string | StaticImageData)[];
    title: string;
    href: string;
    price: number;
    offerPrice?: number;
    rating: number;
    category: string[];
    seller?: Seller;
  };

  type footerPages = {
    title: string;
    href: string;
  };

  type Seller = {
    name: string;
    image: string | StaticImageData;
  };

  type Address = {
    id: number;
    pinCode: number;
    city: string;
    state: string;
    country: string;
    name: string;
    address: string;
    phone: number;
    gmail: string;
  };
}

// This makes the file a module and avoids errors like 'Global augmentations can only be directly nested in external modules.'
export {};

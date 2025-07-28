export type NavItemsTypes = {
  title: string;
  href: string;
};

export type CategoryItemsTypes = {
  image: string;
  title: string;
  href: string;
};

export type productItems = {
  id: string;
  image: string[];
  title: string;
  price: number;
  offerPrice?: number;
  rating: number;
  category: string[];
  seller?: Seller;
};

export type footerPages = {
  title: string;
  href: string;
};

export type Seller = {
  name: string;
  image: string;
};

export type Address = {
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

// Uncomment and export these if needed
// export type CartItem = {
//   id: string;
//   title: string;
//   image: string;
//   price: number;
//   offerPrice?: number;
//   quantity: number;
// };

// export type CartContextType = {

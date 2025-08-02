import { atom } from "jotai";
import type { ProductOrder } from "../configs/global"; // Adjust the path if needed
import dummyImage from "../assets/productimage.png";

export const activeSideBarItem = atom<string>("/dashboard");

export const orderListAtom = atom<ProductOrder[]>([
  {
    id: 1,
    product: {
      id: 101,
      name: "Wireless Mouse",
      description: "Ergonomic wireless mouse",
      price: 999,
      offerPrice: 799,
      image: dummyImage,
      sold: 120,
      inventory: {
        id: 1,
        variants: [
          { id: 1, name: "Black", stock: 10, status: "Avail" },
          { id: 2, name: "Grey", stock: 5, status: "Restock" },
          { id: 3, name: "White", stock: 0, status: "Empty" },
        ],
      },
    },
    quantity: 2,
    price: 799,
    city: "Delhi",
    status: "paid",
    
  },
  {
    id: 2,
    product: {
      id: 102,
      name: "Mechanical Keyboard",
      description: "RGB backlit keyboard",
      price: 2999,
      image: dummyImage,
      sold: 10,
      inventory: {
        id: 2,
        variants: [
          { id: 1, name: "Blue Switch", stock: 20, status: "Avail" },
          { id: 2, name: "Red Switch", stock: 8, status: "Restock" },
          { id: 3, name: "Brown Switch", stock: 0, status: "Empty" },
        ],
      },
    },
    quantity: 1,
    price: 2999,
    city: "Mumbai",
    status: "paid, in process",
  },
  {
    id: 3,
    product: {
      id: 103,
      name: "Gaming Monitor",
      description: "27-inch full HD display",
      price: 14999,
      image: dummyImage,
      sold: 40,
      inventory: {
        id: 3,
        variants: [
          { id: 1, name: "144Hz", stock: 5, status: "Restock" },
          { id: 2, name: "165Hz", stock: 0, status: "Empty" },
          { id: 3, name: "240Hz", stock: 12, status: "Avail" },
        ],
      },
    },
    quantity: 1,
    price: 14999,
    city: "Chennai",
    status: "failed",
  },
  {
    id: 4,
    product: {
      id: 104,
      name: "Laptop Stand",
      description: "Aluminum adjustable stand",
      price: 1499,
      image: dummyImage,
      sold: 10,
      inventory: {
        id: 4,
        variants: [
          { id: 1, name: "Silver", stock: 25, status: "Avail" },
          { id: 2, name: "Black", stock: 3, status: "Restock" },
        ],
      },
    },
    quantity: 1,
    price: 1499,
    city: "Bangalore",
    status: "unpaid, in process",
  },
  {
    id: 5,
    product: {
      id: 105,
      name: "Noise Cancelling Headphones",
      description: "Bluetooth over-ear headphones",
      price: 4999,
      offerPrice: 4499,
      sold: 5,
      image: dummyImage,
      inventory: {
        id: 5,
        variants: [
          { id: 1, name: "Black", stock: 14, status: "Avail" },
          { id: 2, name: "White", stock: 0, status: "Empty" },
        ],
      },
    },
    quantity: 1,
    price: 4499,
    city: "Hyderabad",
    status: "paid, fulfilled",
  },
  {
    id: 6,
    product: {
      id: 106,
      name: "Smartwatch",
      description: "Fitness tracker with heart-rate monitor",
      price: 2999,
      image: dummyImage,
      sold: 120,
      inventory: {
        id: 6,
        variants: [
          { id: 1, name: "Black Strap", stock: 0, status: "Empty" },
          { id: 2, name: "Leather Strap", stock: 5, status: "Restock" },
          { id: 3, name: "Nylon Strap", stock: 7, status: "Avail" },
        ],
      },
    },
    quantity: 1,
    price: 2999,
    city: "Pune",
    status: "refunded",
  },
  {
    id: 7,
    product: {
      id: 107,
      name: "USB-C Hub",
      description: "7-in-1 docking station",
      price: 1899,
      image: dummyImage,
      sold: 120,
      inventory: {
        id: 7,
        variants: [
          { id: 1, name: "Silver", stock: 18, status: "Avail" },
          { id: 2, name: "Space Grey", stock: 0, status: "Empty" },
        ],
      },
    },
    quantity: 1,
    price: 1899,
    city: "Kolkata",
    status: "unfulfilled",
  },
]);

import { atom } from "jotai";
// import type { ProductOrder } from "@shared/types"; 
import dummyImage from "../assets/productimage.png"; // replace with actual StaticImageData import

export const activeSideBarItem = atom<string>("/dashboard");

export const orderListAtom = atom([
  {
    id: 1,
    product: {
      id: 101,
      name: "Wireless Mouse",
      description: "Ergonomic wireless mouse",
      price: 999,
      offerPrice: 799,
      image: dummyImage,
      inventory: {
        id: 1,
        quantity: 120,
        status: "in stock",
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
      inventory: {
        id: 2,
        quantity: 75,
        status: "in stock",
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
      inventory: {
        id: 3,
        quantity: 20,
        status: "restock",
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
      inventory: {
        id: 4,
        quantity: 200,
        status: "in stock",
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
      image: dummyImage,
      inventory: {
        id: 5,
        quantity: 50,
        status: "in stock",
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
      inventory: {
        id: 6,
        quantity: 0,
        status: "empty",
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
      inventory: {
        id: 7,
        quantity: 35,
        status: "in stock",
      },
    },
    quantity: 1,
    price: 1899,
    city: "Kolkata",
    status: "unfulfilled",
  },
]);

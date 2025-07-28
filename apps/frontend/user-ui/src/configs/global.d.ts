import type { StaticImageData } from 'next/image';


export type NavItemsTypes = {
    title:string;
    href:string;
}
export type CategoryItemsTypes = {
    image:string;
    title:string;
    href:string;
  
}
export type productItems = {
    id: string;
    image: (string | StaticImageData)[];
    title: string;
    href: string;
    price: number;
    offerPrice?: number;
    rating: number;
    category: string[];
    seller?: Seller;
    reviewCount: number; 
};

export type footerPages ={
    title:string;
    href:string;
}
export type Seller ={
    name:string;
    image:string;
}
// type CartItem ={
//     id:string;
//     title:string;
//     image:string;
//     price:number;
//     offerPrice?:number;
//     quantity:number;
// }
    
// type CartContextType ={
//     cart:CartItem[];
//     addToCart:(item:CartItem) => void;
//     removeFromCart:(id:string) => void;
//     clearCart:() =>void;
// }

export type Address ={
    id:number;
    pinCode:number;
    city:string;
    state:string;
    country:string;
     name:string;
    address:string;
    phone:number;
    gmail:string;
   

}

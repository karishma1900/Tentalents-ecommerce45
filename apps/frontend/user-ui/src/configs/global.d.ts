import type { StaticImageData } from 'next/image';


type NavItemsTypes = {
    title:string;
    href:string;
}
type CategoryItemsTypes = {
    image:string;
    title:string;
    href:string;
  
}
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

type footerPages ={
    title:string;
    href:string;
}
type Seller ={
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

type Address ={
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

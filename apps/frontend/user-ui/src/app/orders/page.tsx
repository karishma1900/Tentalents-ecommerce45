'use client';

import React, { useEffect, useState } from 'react';
import OrderCard from '../components/orderssec/ordercard';
import YourOrder from '../components/yourorder/yourorder';
import OrderPlaced from '../components/orderplaced/orderplaced';
import './orders.css';
import Closet from '../home-page/closet-section/closet';
import Products from '../home-page/products-grid/productsgrid';
import { ChevronRight, Search } from 'lucide-react';
import '../home-page/headerbanner.css';
import type { Product } from '../components/orderplaced/orderplaced';

interface ShippingAddress {
  name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  pinCode: string;
  addressLine1: string;
  addressLine2?: string;
  addressType: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  listingId: string;
  vendorId: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  status: string;
  addedAt: string;
  dispatchStatus: string;
  dispatchTime: string | null;
  product: {
    title: string;
    imageUrls: string[];
     slug: string;
  };
}

interface OrderData {
  id: string;
  buyerId: string;
  totalAmount: string;
  paymentMode: string;
  paymentStatus: string;
  shippingAddressId: string;
  placedAt: string;
  updatedAt: string;
  stripePaymentIntentId: string | null;
  dispatchStatus: string;
  dispatchTime: string | null;
  status: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
}

const Page = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [orderError, setOrderError] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch orders for the logged-in user
    async function fetchOrders() {
      const token = localStorage.getItem('token');
      if (!token) {
        setOrderError('No token found, please log in again.');
        setLoadingOrders(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:3002/api/orders/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) throw new Error('Failed to fetch orders');

        const json = await res.json();

        if (json.status === 'success') {
          setOrders(json.data); // set all orders
        } else {
          setOrderError('Error fetching order details');
        }
      } catch (err: any) {
        setOrderError(err.message || 'Unknown error fetching orders');
      } finally {
        setLoadingOrders(false);
      }
    }

    fetchOrders();
  }, []);

  // Your existing products fetch effect here
  useEffect(() => {
    async function fetchPopularProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_FETCH_LINK}/products`);
        if (!res.ok) throw new Error('Failed to fetch products');

        const json = await res.json();
        const data = json.data ?? [];

        const mapped: Product[] = data.map((p: any) => {
          const listing = p.listings?.[0];
          return {
            id: p.id,
            title: p.title,
            href: `/shop/${p.slug}`,
            price: listing ? Number(listing.originalPrice) : 0,
            offerPrice: listing ? Number(listing.price) : undefined,
            image: p.imageUrls?.[0] || '',
            rating: p.ratings?.[0]?.score || 0,
            reviewCount: p.ratings?.length || 0,
          };
        });

        setProducts(mapped.slice(0, 4));
      } catch (err: any) {
        setProductError(err.message || 'Something went wrong');
      } finally {
        setLoadingProducts(false);
      }
    }

    fetchPopularProducts();
  }, []);

  return (
  <div className="orderapagefull2">
  <div className="orderapagefull">
    <div className="orderpageleft-2">
      <div className="yourorder-header">
        <h2 className="sectiontitle">Your Orders</h2>

        <div className="dateorder">
          <div className="search-inputbutton">
            <input type="text" placeholder="Search Order By ID/Product name" />
            <button className="background-button">
              <Search className="search-icon" />
            </button>
          </div>
          <select id="dateFilter" className="bordered-button custom-dropdown">
            <option value="all">All Orders</option>
            <option value="15days">Past 15 Days</option>
            <option value="30days">Past 30 Days</option>
            <option value="3months">Past 3 Months</option>
            <option value="6months">Past 6 Months</option>
            <option value="1year">Past 1 Year</option>
          </select>
        </div>
      </div>

      <div className="sectionsorder">
        {orders.length > 0 && <OrderCard order={orders[0]} />}
        <YourOrder orders={orders} loading={loadingOrders} error={orderError} />
      </div>
    </div>

    {/* <div className="productpageright">
      <div className="popularproductcard">
        <h2 className="sectiontitle">Popular Products</h2>
        {loadingProducts && <p>Loading products...</p>}
        {productError && <p>Error: {productError}</p>}
        {!loadingProducts &&
          !productError &&
          products.slice(0, 4).map((product) => (
            <OrderPlaced key={product.id} product={product} />
          ))}
        <button className="background-button shopbutton">Explore Shop</button>
      </div>

      <div className="fullwidth-banner">
        <div className="section-1">
          <div className="content">
            <h3 className="banner-heading">Denim That Defines</h3>
            <p className="content-para">
              Explore premium fits, rugged comfort, and timeless style made for every move.
            </p>
            <button className="background-button mt-[10px]">
              Explore Now <ChevronRight />
            </button>
          </div>
        </div> */}
      
 
  </div>

  <div>
    <Products />
    <Closet />
  </div>
</div>
  );
};

export default Page;

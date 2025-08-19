'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import './yourorder.css';

interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  product: {
    title: string;
    imageUrls: string[];
    slug: string; // if available for link
  };
}

interface OrderData {
  id: string;
  items: OrderItem[];
}

interface YourOrderProps {
  orders: OrderData[];
  loading: boolean;
  error: string | null;
}

const YourOrder: React.FC<YourOrderProps> = ({ orders, loading, error }) => {
  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders: {error}</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  // Flatten all items from all orders into one array
  const allItems = orders.flatMap(order => order.items);

  return (
    <div className="products-lists productlistaddtocart2">
      <h2 className="yourorder">Your Orders</h2>
      <div className="product-list">
        {allItems.map(item => (
          <Link
            key={item.id}
            href={`/shop/${item.product.slug || ''}`}
            passHref
          >
            <div className="orderlistitem" style={{ cursor: 'pointer' }}>
              <div className="orderimage">
                <div className="image-wrapper2" style={{ position: 'relative', width: '100px', height: '100px' }}>
                  <Image
                    src={item.product.imageUrls?.[0] || '/placeholder.png'}
                    alt={item.product.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="ordercontentleft">
                  <h3 className="product-title">{item.product.title}</h3>
                </div>
              </div>

              <div className="flexcontainer">
                <div className="rating-stars staras">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="lucide-star" />
                  ))}
                </div>

                <div className="quantity price-section">
                  <p className="price-style">${parseFloat(item.unitPrice).toFixed(2)}</p>
                  {/* If you want to show total price too, add here */}
                </div>

                <div className="quantity-sec orderquantitypage">
                  <p>Qnty: {item.quantity}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="review-button-container">
        <button className="background-button">
          Give Us a Review <Star />
        </button>
      </div>
    </div>
  );
};

export default YourOrder;

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../../orders/orders.css'
export interface Product {
  id: string;
  title: string;
  href: string;
  price: number;
  offerPrice?: number | null;
  rating?: number;
  reviewCount?: number;
  image: string | string[];
}

const OrderPlaced: React.FC<{ product: Product }> = ({ product }) => {
  const { title, href, price, offerPrice, image, reviewCount } = product;
  const productImage = Array.isArray(image) ? image[0] : image;

  return (
    <Link href={href} className='main-containerproduct'>
      <div className="product-list-item2">
        <div className="image-wrapper2">
          <Image
            src={productImage}
            alt={title}
            className="product-image"
           width={100}
           height={100}
          />
        </div>
        <div className="content-area2">
          <h3 className="product-title">{title}</h3>
          <div className="price-main">
            <div className="price-section">
              {offerPrice != null ? (
                <>
                  <p className="original-price">${price}</p>
                  <p className="offer-price">${offerPrice}</p>
                </>
              ) : (
                <p>${price}</p>
              )}
            </div>
            <div className="quantity-sec">
              <p>
                {(reviewCount ?? 0) > 0
                  ? `${reviewCount} ${reviewCount === 1 ? 'Review' : 'Reviews'}`
                  : 'No reviews yet'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderPlaced;

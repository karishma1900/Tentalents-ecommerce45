import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { getAllProducts } from '../../../services/productService'; // Your service

type ProductType = {
  id: string;
  title: string;
  price: number;
  offerPrice?: number;
  image: string | string[];
  href: string;
  rating: number;
};

const ProductCart = ({ listCount = 2 }) => {
  const [items, setItems] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const rawProducts = await getAllProducts();
        const mappedProducts = rawProducts.map((p: any) => {
          const listing = p.listings?.[0];
          return {
            id: p.id,
            title: p.title,
            price: listing ? Number(listing.originalPrice) : 0,
            offerPrice: listing ? Number(listing.price) : undefined,
            image: p.imageUrls?.[0] || '',
            rating: p.ratings?.length > 0 ? p.ratings[0].score : 0,
            href: `/shop/${p.slug}`,
          };
        });
        setItems(mappedProducts.slice(0, listCount));
      } catch (error) {
        console.error('Failed to load products', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [listCount]);

  const getDiscount = (price: number, offerPrice?: number): number => {
    if (price <= 0 || offerPrice === undefined || offerPrice >= price) return 0;
    return Math.round(((price - offerPrice) / price) * 100);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="products-lists productlistaddtocart">
      <div className="main-heading">
        <h3 className="heading">People Also Bought</h3>
      </div>
      <div className="product-list">
        {items.map((i) => {
          const hasDiscount = i.offerPrice !== undefined && i.offerPrice < i.price;
          return (
            <div key={i.id}>
              <Link href={i.href}>
                <div className="product-list-item">
                  <div className="image-wrapper2">
                    {hasDiscount && (
                      <p className="discount">{getDiscount(i.price, i.offerPrice)}% OFF</p>
                    )}
                    <Image
                      src={Array.isArray(i.image) ? i.image[0] : i.image}
                      alt={i.title}
                      className="product-image"
                      fill
                    />
                  </div>
                  <div className="content-area2">
                    <h3 className="product-title">{i.title}</h3>
                    <div className="price-main">
                      <div className="price-section">
                        {hasDiscount ? (
                          <>
                            <p>${i.price}</p>
                            <p className="offer-price">${i.offerPrice}</p>
                          </>
                        ) : (
                          <p>${i.price}</p>
                        )}
                      </div>
                      <div className="rating">
                        <p>{i.rating}</p>
                        {/* Your star icon here */}
                        <img src="/star.png" alt="star" />
                        <p className="number">(100)</p>
                      </div>
                    </div>
                    <div className="add-tocart">
                      <button className="background-button">
                        Add to Cart <PlusIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCart;

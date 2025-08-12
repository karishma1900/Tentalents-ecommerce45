// Products.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import ProductCard, { ProductItem } from '../../components/productcard/productcard';
import { getAllProducts } from '../../../services/productService';
import './productgrid.css';

type ProductsProps = {
  columns?: number;
  category?: string;
  showHeader?: boolean;
};

const Products = ({ columns = 5, category, showHeader = true }: ProductsProps) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const rawProducts = await getAllProducts();
        // Map backend product to frontend ProductItem shape expected by ProductCard
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
            category: p.category,
          };
        });
        setProducts(mappedProducts);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const getDiscount = (price: number, offerPrice?: number): number => {
    if (price <= 0 || !offerPrice || offerPrice >= price) return 0;
    return Math.round(((price - offerPrice) / price) * 100);
  };

  // Filter products by category if provided
  const filteredProducts = category
    ? products.filter((item) =>
        Array.isArray(item.category)
          ? item.category.includes(category)
          : item.category === category
      )
    : products;

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="products-grid">
      {showHeader && (
        <div className="main-heading">
          <h3 className="heading">Popular Products</h3>
          <button className="background-button">
            Explore <ChevronRight />
          </button>
        </div>
      )}

      <div className={`product-grid columns-${columns}`}>
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.slice(0, columns).map((product, index) => (
            <ProductCard key={product.id} product={product} getDiscount={getDiscount} />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { categories } from '../../../configs/constants';
import './categories.css';

const Categories = () => {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/shop?category=${encodeURIComponent(category)}`);
  };

  return (
    <div>
      <div className="category-main">
        <div className="category-section">
          <ul className="category-list">
            {categories.map((cat, index) => (
              <li key={index} className="list-none">
                <button
                  className="lists"
                 
                  onClick={() => handleCategoryClick(cat.title)}
                >
                  <Image src={cat.image} alt={cat.title} width={30} height={30} />
                  <span>{cat.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Categories;

'use client';

import React from 'react';
import './productaccept.css';
import product from '../../../assets/productimage.png';
import Image from 'next/image';

const products = [
  {
    id: 1,
    image: product,
    title: 'Wireless Headphones',
    price: 89.99,
    city: 'New York',
    status: 'unpaid',
  },
  {
    id: 2,
    image: product,
    title: 'Smart Watch',
    price: 149.99,
    city: 'Los Angeles',
    status: 'paid',
  },
  {
    id: 3,
    image: product,
    title: 'Bluetooth Speaker',
    price: 39.99,
    city: 'Chicago',
    status: 'in process',
  },
  {
    id: 4,
    image: product,
    title: 'Gaming Mouse',
    price: 59.99,
    city: 'Houston',
    status: 'failed',
  },
  {
    id: 5,
    image: product,
    title: 'Portable Charger',
    price: 29.99,
    city: 'Miami',
    status: 'paid, in process',
  },
  {
    id: 6,
    image: product,
    title: 'Smartphone Case',
    price: 19.99,
    city: 'San Francisco',
    status: 'paid, fulfilled',
  },
];

const ProductAccept = () => {
  const handleConfirm = (id) => {
    console.log('Confirmed product ID:', id);
  };

  const handleDeny = (id) => {
    console.log('Denied product ID:', id);
  };

  const handleViewStatus = (id) => {
    console.log('Viewing status for product ID:', id);
  };

  const handleTrackOrder = (id) => {
    console.log('Tracking order for product ID:', id);
  };

  // Helper function to apply styling based on main status word
  const getStatusClass = (status) => {
    const lowerStatus = status.toLowerCase();

    if (lowerStatus.includes('paid') && lowerStatus.includes('fulfilled')) return 'paid';
    if (lowerStatus.includes('paid') && lowerStatus.includes('in process')) return 'process';
    if (lowerStatus.includes('fulfilled')) return 'paid';
    if (lowerStatus.includes('refunded')) return 'paid';
    if (lowerStatus.includes('failed') || lowerStatus.includes('unfulfilled')) return 'failed';
    if (lowerStatus.includes('unpaid')) return 'unpaid';
    if (lowerStatus.includes('in process')) return 'process';

    return '';
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <div className="product-section">
            <Image src={product.image} alt={product.title} width={100} />
            <h3 className="product-title">{product.title}</h3>
          </div>
          <div className="produtdetails">
<p>${product.price}</p>
<div>
  
          <p>{product.city}</p>
  </div>
<div>
          <p className={getStatusClass(product.status)}>{product.status}</p>
         </div>
          </div>
          

          {/* Buttons based on status */}
          <div className="productstatus">
          {product.status === 'unpaid' && (
            <div className="product-buttons">
              <button className="center-borderedbutton" onClick={() => handleDeny(product.id)}>Deny</button>
              <button className="background-buttonver" onClick={() => handleConfirm(product.id)}>Confirm</button>
            </div>
          )}

          {product.status === 'paid' && (
            <div className="product-buttons">
              <button className="center-borderedbutton" onClick={() => handleDeny(product.id)}>Deny</button>
              <button className="background-buttonver" onClick={() => handleConfirm(product.id)}>Confirm</button>
            </div>
          )}

          {product.status === 'failed' && (
            <div className="product-buttons">
              <button className="center-borderedbutton" onClick={() => handleViewStatus(product.id)}>View Status</button>
            </div>
          )}

          {(product.status === 'paid, in process' || product.status === 'paid, fulfilled') && (
            <div className="product-buttons">
              <button className="background-buttonver" onClick={() => handleTrackOrder(product.id)}>Track Order</button>
            </div>
          )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductAccept;

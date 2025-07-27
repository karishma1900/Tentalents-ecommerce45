'use client';

import React from 'react';
import './productaccept.css';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { orderListAtom } from '../../../configs/constants'; // adjust path as needed

const ProductAccept = () => {
  const [orders] = useAtom(orderListAtom);

  const handleConfirm = (id: number) => {
    console.log('Confirmed product ID:', id);
  };

  const handleDeny = (id: number) => {
    console.log('Denied product ID:', id);
  };

  const handleViewStatus = (id: number) => {
    console.log('Viewing status for product ID:', id);
  };

  const handleTrackOrder = (id: number) => {
    console.log('Tracking order for product ID:', id);
  };

  const getStatusClass = (status: string) => {
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

  const shouldShowTrackButton = (status: string) =>
    ['paid, in process', 'unpaid, in process'].includes(status.toLowerCase());

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id} className="product-item">
          <div className="product-section">
            <Image src={order.product.image} alt={order.product.name} width={100} />
            <h3 className="product-title">{order.product.name}</h3>
          </div>

          <div className="produtdetails">
            <p>₹{order.price}</p>
            <p>{order.city}</p>
            <div className="status-tags">
  {order.status.split(',').map((status) => (
    <span key={status.trim()} className={getStatusClass(status.trim())}>
      {status.trim()}
    </span>
  ))}
</div>

          </div>

          <div className="productstatus">
            {/* unpaid → Confirm + Deny */}
            {order.status === 'unpaid' && (
              <div className="product-buttons">
                <button className="center-borderedbutton" onClick={() => handleDeny(order.id)}>Deny</button>
                <button className="background-buttonver" onClick={() => handleConfirm(order.id)}>Confirm</button>
              </div>
            )}

            {/* paid → Confirm + Deny */}
            {order.status === 'paid' && (
              <div className="product-buttons">
                <button className="center-borderedbutton" onClick={() => handleDeny(order.id)}>Deny</button>
                <button className="background-buttonver" onClick={() => handleConfirm(order.id)}>Confirm</button>
              </div>
            )}

            {/* failed or unfulfilled → View Status */}
            {(order.status === 'failed' || order.status === 'unfulfilled') && (
              <div className="product-buttons">
                <button className="center-borderedbutton" onClick={() => handleViewStatus(order.id)}>View Status</button>
              </div>
            )}

            {/* paid, in process or unpaid, in process → Track Order */}
            {shouldShowTrackButton(order.status) && (
              <div className="product-buttons">
                <button className="background-buttonver" onClick={() => handleTrackOrder(order.id)}>Track Order</button>
              </div>
            )}

            {/* paid, fulfilled or refunded → View Order */}
            {(order.status === 'paid, fulfilled' || order.status === 'refunded') && (
              <div className="product-buttons">
                <button className="background-buttonver" onClick={() => handleViewStatus(order.id)}>View Order</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductAccept;

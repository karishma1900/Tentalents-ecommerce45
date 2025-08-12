'use client';
import React, { useEffect, useState } from 'react';

// Define types for the response data
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

const OrderDetails = ({ orderId }: { orderId: string }) => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch order data from the API
  const fetchOrderData = async () => {
    const token = localStorage.getItem('token');  // Retrieve token from localStorage

    if (!token) {
      setError('No token found, please log in again.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3002/api/orders/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  // Add token to the Authorization header
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch order data');
      }

      const data = await response.json();
      if (data.status === 'success') {
        setOrderData(data.data[0]); // Assuming data is an array
      } else {
        setError('Error fetching order details');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // Now TypeScript knows `err` is an instance of `Error`
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!orderData) {
    return <div>No order data found</div>;
  }

  const {
    totalAmount,
    paymentMode,
    paymentStatus,
    shippingAddress,
    placedAt,
    dispatchTime,
    status,
    items,
    id,
  } = orderData;

  return (
    <div className="order-details">
      <h2>Order Details</h2>
      <div className="order-info">
        <p><strong>Order ID:</strong> {id}</p>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Payment Mode:</strong> {paymentMode}</p>
        <p><strong>Payment Status:</strong> {paymentStatus}</p>
        <p><strong>Total Amount:</strong> ${totalAmount}</p>
        <p><strong>Order Date:</strong> {new Date(placedAt).toLocaleString()}</p>
        {dispatchTime && <p><strong>Dispatch Date:</strong> {new Date(dispatchTime).toLocaleString()}</p>}
      </div>

      <h3>Shipping Address</h3>
      <div className="shipping-address">
        <p><strong>Name:</strong> {shippingAddress.name}</p>
        <p><strong>Phone:</strong> {shippingAddress.phone}</p>
        <p><strong>Address:</strong> {shippingAddress.addressLine1}, {shippingAddress.addressLine2 || 'N/A'}</p>
        <p><strong>City:</strong> {shippingAddress.city}</p>
        <p><strong>State:</strong> {shippingAddress.state}</p>
        <p><strong>Country:</strong> {shippingAddress.country}</p>
        <p><strong>Pincode:</strong> {shippingAddress.pinCode}</p>
      </div>

      <h3>Ordered Items</h3>
      <div className="ordered-items">
       {items.map((item) => (
  <div key={item.id} className="item">
    <p><strong>Product ID:</strong> {item.productId}</p>
    <p><strong>Product Title:</strong> {item.product.title}</p>
    <div>
      <strong>Product Image:</strong>
      <img
        src={item.product.imageUrls[0]}  // first image URL
        alt={item.product.title}
        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
      />
    </div>
    <p><strong>Quantity:</strong> {item.quantity}</p>
    <p><strong>Unit Price:</strong> ${item.unitPrice}</p>
    <p><strong>Total Price:</strong> ${item.totalPrice}</p>
    <p><strong>Item Status:</strong> {item.status}</p>
  </div>
))}
      </div>
    </div>
  );
};

export default OrderDetails;

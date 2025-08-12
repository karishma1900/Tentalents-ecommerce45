'use client';
import React, { useState, useEffect } from 'react';
import Address from '../../components/addaddress/Address';
import Payment from '../../components/paymentmethod/payment';
import QuantityAdded from '../../components/quantity added/quantityadded';
import './checkout.css';
import '../cart.css';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import {initiatePayment,verifyPayment, sendPaymentStatus } from '../../../services/Payment'

// Replace with your actual public Stripe key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ''); // Public Key for Stripe Checkout

type CartItem = {
  id: string;
  listingId: string;
  productId: string;
  quantity: number;
  vendor: { id: string; name: string };
  product?: {
    id: string;
    title: string;
    description?: string;
    imageUrls: string[];
    category?: string;
    brand?: string;
  };
  productListing?: {
    id: string;
    price: number;
    stock?: number;
    sku?: string;
    status?: string;
  };
};

const Page = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState<string | null>(null);
  const [paymentMode, setPaymentMode] = useState<string>('');
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null); 
      const [orderId, setOrderId] = useState<string | null>(null);

  const NEXT_PUBLIC_ORDER_API_LINK = 'http://localhost:3002';
  const NEXT_PUBLIC_CART_API_LINK = 'http://localhost:3020';

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setCartItems([]);
        return;
      }

      const res = await fetch(`${NEXT_PUBLIC_CART_API_LINK}/api/cart`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch cart');

      const data = await res.json();

      const filteredItems = data.data
        .map((item: CartItem) => {
          const parsedPrice =
            typeof item.productListing?.price === 'number'
              ? item.productListing.price
              : parseFloat(item.productListing?.price || '0');

          if (
            item.product &&
            item.productListing &&
            !isNaN(parsedPrice) &&
            Array.isArray(item.product.imageUrls) &&
            item.product.imageUrls.length > 0 &&
            typeof item.product.title === 'string'
          ) {
            return {
              ...item,
              productListing: {
                ...item.productListing,
                price: parsedPrice,
              },
            };
          }
          return null;
        })
        .filter(Boolean) as CartItem[];

      setCartItems(filteredItems);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.productListing?.price ?? 0;
    return acc + price * item.quantity;
  }, 0);

  const shippingFee = 54;
  const platformFee = 4;
  const total = subtotal + shippingFee + platformFee;

  const vendorId = cartItems.length > 0 ? cartItems[0].vendor.id : '';

  const handlePlaceOrder = async () => {
  if (!address) {
    return toast.error('Please select or add a delivery address!');
  }
  if (!paymentMode) {
    return toast.error('Please choose a payment method!');
  }

  const token = localStorage.getItem('token');
  const orderData = {
    items: cartItems.map((item) => ({
      productId: item.productId,
      vendorId: item.vendor.id,
      listingId: item.listingId,
      quantity: item.quantity,
      price: Number((item.productListing?.price ?? 0).toFixed(2)),
    })),
    totalAmount: subtotal,
    shippingAddressId: address,
    paymentMode,
  };

  try {
    const res = await fetch(`${NEXT_PUBLIC_ORDER_API_LINK}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) throw new Error('Failed to place order');

    const data = await res.json();
    console.log('Payment API Response:', data); // Log the payment response for debugging

    // Handle Stripe payment
     if (paymentMode === 'credit_card' && data?.data?.checkoutUrl) {
      const checkoutUrl = data.data.checkoutUrl;
      console.log('Redirecting to Stripe Checkout:', checkoutUrl);

      // Open the checkout URL in a new tab
      window.open(checkoutUrl, '_blank');
    } 

//     if (paymentMode === 'credit_card' && data?.data?.orderId) {
//       const { orderId } = data.data;

//       // Now initiate payment
//       const paymentResponse = await initiatePayment(orderId, total);
// console.log('Payment Response:', paymentResponse); // Log full response

// if (paymentResponse?.checkoutUrl) {
//   console.log('Redirecting to checkout URL:', paymentResponse.checkoutUrl);
//   window.location.href = paymentResponse.checkoutUrl; // Trigger redirect
// } else {
//   toast.error('Error initializing payment!');
// }
//     }

    // Handle Cash on Delivery (COD)
    else if (paymentMode === 'cash_on_delivery') {
      toast.success('Order placed successfully!');
      return;
    } else {
      toast.error('Unexpected payment response!');
    }
  } catch (error) {
    console.error('Error placing order:', error);
    toast.error('Failed to place order!');
  }
};
const handlePaymentStatus = async (paymentId: string, signature: string) => {
  try {
    // First, verify payment status by calling the backend endpoint
    const paymentVerification = await verifyPayment(paymentId, orderId!, signature);  // Pass orderId to verify payment

    // Once you have the payment verification status
    if (paymentVerification.status === 'success') {
      // If payment is successful, send the success status to backend
      await sendPaymentStatus(orderId!, 'success');
      setPaymentStatus('success');
      toast.success('Payment successful! Order confirmed.');
    } else {
      // If payment fails, send the failed status to backend
      await sendPaymentStatus(orderId!, 'failed');
      setPaymentStatus('failed');
      toast.error('Payment failed! Please try again.');
    }
  } catch (error) {
    toast.error('Error confirming payment status!');
  }
};


  return (
    <div>
      <div className="deliverylocation">
        <div className="checkoutleft">
          <Address
            showLocate={false}
            vendorId={vendorId}
            setAddress={setAddress}
          />
          <Payment onPaymentModeSelect={setPaymentMode} total={total} />
        </div>

        <div className="checkoutright">
          <div className="subtotal-section">
            <div className="subtotal">
              <h2>Subtotal</h2>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="subtotal">
              <h2>Shipping</h2>
              <p>${shippingFee.toFixed(2)}</p>
            </div>
            <div className="subtotal">
              <h2>Platform Fee</h2>
              <p>${platformFee.toFixed(2)}</p>
            </div>
            <div className="subtotal total">
              <h2 className="alltotal">Total</h2>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>

          <QuantityAdded />
          <button onClick={handlePlaceOrder} className="background-button">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;

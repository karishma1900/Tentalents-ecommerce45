import React from 'react';
import './ordercard.css';
import { Package } from 'lucide-react';
import { RiCustomerService2Line } from 'react-icons/ri';

interface ShippingAddress {
  name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  pinCode: string;
  addressLine1: string;
  addressLine2?: string;
}

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  status: string;
  product: {
    title: string;
    imageUrls: string[];
  };
}

interface OrderData {
  id: string;
  totalAmount: string;
  paymentMode: string;
  paymentStatus: string;
  placedAt: string;
  dispatchTime: string | null;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
}

interface OrderCardProps {
  order: OrderData;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const {
    id,
    placedAt,
    dispatchTime,
    paymentMode,
    totalAmount,
    shippingAddress,
    items,
  } = order;

  // Calculate items subtotal by summing up totalPrice of each item
  const itemsSubtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.totalPrice),
    0
  );

  // Assume shipping cost is fixed or you can pass as part of order if available
  const shippingCost = 50; // you can replace with real data if available

  // Calculate grand total
  const grandTotal = itemsSubtotal + shippingCost;

  return (
    <div className="orderpage">
      <div className="orderpageheader">
        <div className="orderpage-headerleft">
          <p className="ordervalue border-grey">
            <span className="orderlabel pr-1">Order Placed</span>{' '}
            {new Date(placedAt).toLocaleDateString()}
          </p>
          <p className="ordervalue">
            <span className="orderlabel pr-1">Order ID</span> {id}
          </p>
        </div>
        <div className="orderheader-right">
          <p>Download Invoice</p>
        </div>
      </div>

      <div className="orderdetails">
        <div className="shipto">
          <p className="orderlabel">Ship To</p>
          <p className="ordervalue pr-2">
            {shippingAddress.addressLine1}
            {shippingAddress.addressLine2 ? `, ${shippingAddress.addressLine2}` : ''}
            , {shippingAddress.city} - {shippingAddress.pinCode} - {shippingAddress.state} - {shippingAddress.country}
          </p>
          <p className="ordervalue pr-2">
            <strong>Name:</strong> {shippingAddress.name} | <strong>Phone:</strong> {shippingAddress.phone}
          </p>
        </div>

        <div className="payment-method">
          <p className="orderlabel">Payment Method</p>
          <p className="ordervalue">{paymentMode}</p>
        </div>

        <div className="paymentamount">
          <p className="orderlabel">Payment Details</p>
          <div className="total">
            <p className="ordervalue">Items Subtotal</p>
            <p className="ordervalue">${itemsSubtotal.toFixed(2)}</p>
          </div>
          <div className="total">
            <p className="ordervalue">Shipping</p>
            <p className="ordervalue">${shippingCost.toFixed(2)}</p>
          </div>
          <div className="total">
            <p className="ordervalue">Grand Total</p>
            <p className="ordervalue">${grandTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="orderupdates">
        <div className="ordervalueleft">
          <Package />
          <p className="orderlabel">Order Updates</p>
          {dispatchTime ? (
            <p className="ordervalue">
              Dispatches on {new Date(dispatchTime).toLocaleDateString()} at {new Date(dispatchTime).toLocaleTimeString()}
            </p>
          ) : (
            <p className="ordervalue">Dispatch details not available yet</p>
          )}
        </div>

        <div className="ordervalueright">
          <button className="background-button">
            Need Support <RiCustomerService2Line />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

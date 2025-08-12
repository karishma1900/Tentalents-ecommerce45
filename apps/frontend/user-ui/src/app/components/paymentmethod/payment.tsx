'use client';  // Add this directive to mark it as a client-side component

import React, { useState } from 'react';
import { MapPinPlus, PlusIcon, DeleteIcon, EditIcon } from 'lucide-react';
import QR from '../../../assets/qr.png';
import Image from 'next/image';
import './payment.css';
import Card from '../../../assets/add_card.png';
import cash from '../../../assets/currency_rupee_circle.png';
import house from '../../../assets/account_balance.png';
import UPI from '../../../assets/upi.png';
import GooglePay from "../../../assets/gpay.png";
import Paytm from '../../../assets/paytm.png';
import Phonepay from '../../../assets/phone pay.png';
import toast from 'react-hot-toast';

const Payment = ({
  onPaymentModeSelect,
  total,
   onConfirmPayment
  
}: {
  onPaymentModeSelect: (paymentMode: string) => void;
  total: number;
  onConfirmPayment:() => void;  
  // Add 'total' here to accept it as a prop
}) => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<string>('');

  // Toggle payment visibility
  const togglePaymentTab = () => {
    setIsPaymentOpen((prevState) => !prevState);
  
  };

 const handlePaymentModeSelect = (mode: string) => {
  setSelectedPaymentMode(mode);
};

// Confirm selection
const confirmPaymentSelection = () => {
  if (!selectedPaymentMode) {
    toast.error('Please select a payment method first!');
    return;
  }
  onPaymentModeSelect(selectedPaymentMode); // Pass to parent
  setIsPaymentOpen(false); 
    onConfirmPayment();// Close after selection
};

  return (
    <div className="payment-main">
      <div className="paymentheader">
        <div className="payment-header">
          <div className="payment-headername">
            <h2>Payment Method</h2>
          </div>
          <div className="paymentbuttons">
            <button className="bordered-button" onClick={togglePaymentTab}>
              {isPaymentOpen ? 'Close' : 'Choose a Payment Method'}
            </button>
          </div>
        </div>

        {/* Conditionally render the payment options when isPaymentOpen is true */}
        {isPaymentOpen && (
          <div className="paymentcard">
            <div className="paymentheading">
              <h2>Pay By UPI</h2>
              <div className="paymentqr">
                <div className="qrcode">
                  <Image src={QR} alt="qrcode" />
                </div>
                <div className="paymentmethodicons">
                  <Image src={UPI} alt="UPI" />
                  <Image src={GooglePay} alt="Googlepay" />
                  <Image src={Paytm} alt="paytm" />
                  <Image src={Phonepay} alt="Phonepay" />
                </div>
                <p className="text">Scan and Pay with any UPI App</p>
         <p>Amount: ${total.toFixed(2)}</p>
                <div className="or">
                  <p>Or</p>
                </div>
                <div className="upisubmit">
                  <input type="text" name="upi" placeholder="UPI ID" />
                  <button className="background-button">Submit</button>
                </div>
              </div>
            </div>

            <div className="paymentright">
                    <div className={`debitcard ${selectedPaymentMode === 'credit_card' ? 'selected' : ''}`}
                      onClick={() => handlePaymentModeSelect('credit_card')}>
             <div
  className= 'debitleft'
 
>
  <Image src={Card} alt="card" />
  <h2>Debit/Credit Card</h2>
</div>
                
              </div>

              {/* <div className="cashondeilvery">
               <div
  className={`debitleft ${selectedPaymentMode === 'COD' ? 'selected' : ''}`}
  onClick={() => handlePaymentModeSelect('COD')}
>
  <Image src={cash} alt="cash" />
  <h2>Cash On Delivery(COD)</h2>
  </div>
                <input type="checkbox" />
              </div> */}
  <div  className={`cashondeilvery ${selectedPaymentMode === 'cash_on_delivery' ? 'selected' : ''}`}
  onClick={() => handlePaymentModeSelect('cash_on_delivery')}>
              <div
  className='debitleft '
  
>
  <Image src={cash} alt="cash" />
  <h2>Cash On Delivery (COD)</h2>
</div>
</div>

            <button
  className="paymentbutton background-button"
  onClick={confirmPaymentSelection}
>
  Use This Payment
</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;

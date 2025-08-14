export function buildOrderConfirmationEmail({
  buyerName,
  orderId,
  items,
  totalAmount,
  paymentMode,
  shippingAddress,
  estimatedDelivery,
}: {
  buyerName: string;
  orderId: string;
  items: { title: string; quantity: number; unitPrice: number }[];
  totalAmount: number;
  paymentMode: string;
  shippingAddress: string;
  estimatedDelivery: string;
}) {
  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td>${item.title}</td>
        <td>${item.quantity}</td>
        <td>$${item.unitPrice.toFixed(2)}</td>
        <td>$${(item.unitPrice * item.quantity).toFixed(2)}</td>
      </tr>`
    )
    .join('');

  return `
    <h2>Thank you for your order, ${buyerName}!</h2>
    <p>Your order <strong>#${orderId}</strong> has been successfully placed.</p>

    <h3>Shipping Address</h3>
    <p>${shippingAddress}</p>

    <h3>Order Summary</h3>
    <table border="1" cellpadding="5" cellspacing="0">
      <thead>
        <tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr>
      </thead>
      <tbody>${itemsHtml}</tbody>
    </table>

    <p><strong>Total:</strong> $${totalAmount.toFixed(2)}</p>
    <p><strong>Payment Mode:</strong> ${paymentMode}</p>
    <p><strong>Estimated Delivery:</strong> ${estimatedDelivery}</p>

    <p>We will notify you once your order is dispatched.</p>
  `;
}

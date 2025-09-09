import React from 'react';
import PolicyPageLayout from './PolicyPageLayout'; // Adjust the import path if needed

const ShippingPolicyPage = () => {
  return (
    <PolicyPageLayout title="Shipping Policy" lastUpdated="September 9, 2025">
      <h2>Order Processing</h2>
      <p>All orders are processed within 1-3 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.</p>
      
      <h2>Shipping Rates & Delivery Estimates</h2>
      <p>Shipping charges for your order will be calculated and displayed at checkout. We offer standard and express shipping options across India. Delivery delays can occasionally occur.</p>
      <ul>
        <li><strong>Standard Shipping:</strong> 5-7 business days</li>
        <li><strong>Express Shipping:</strong> 2-3 business days</li>
      </ul>

      <h2>Shipment Confirmation & Order Tracking</h2>
      <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>

      <h2>Damages</h2>
      <p>DIVA JEWELLER is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim.</p>
    </PolicyPageLayout>
  );
};

export default ShippingPolicyPage;
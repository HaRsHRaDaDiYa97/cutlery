import React from 'react';
import PolicyPageLayout from './PolicyPageLayout'; // Adjust the import path if needed

const RefundPolicyPage = () => {
  return (
    <PolicyPageLayout title="Refund Policy" lastUpdated="September 9, 2025">
      <h2>Returns</h2>
      <p>We have a 15-day return policy, which means you have 15 days after receiving your item to request a return. To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging.</p>

      <h2>Refunds</h2>
      <p>We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund too.</p>

      <h2>Exceptions / Non-returnable Items</h2>
      <p>Certain types of items cannot be returned, like custom products (such as special orders or personalized items). Please get in touch if you have questions or concerns about your specific item. Unfortunately, we cannot accept returns on sale items or gift cards.</p>
    </PolicyPageLayout>
  );
};

export default RefundPolicyPage;
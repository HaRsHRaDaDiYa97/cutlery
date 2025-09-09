import React from 'react';
import PolicyPageLayout from './PolicyPageLayout'; // Adjust the import path if needed

const PrivacyPolicyPage = () => {
  return (
    <PolicyPageLayout title="Privacy Policy" lastUpdated="September 9, 2025">
      <h2>Information We Collect</h2>
      <p>We collect information from you when you register on our site, place an order, or subscribe to our newsletter. When ordering or registering on our site, as appropriate, you may be asked to enter your name, e-mail address, mailing address, or phone number.</p>
      
      <h2>How We Use Your Information</h2>
      <p>Any of the information we collect from you may be used in one of the following ways:</p>
      <ul>
        <li>To personalize your experience</li>
        <li>To improve our website</li>
        <li>To improve customer service</li>
        <li>To process transactions</li>
        <li>To send periodic emails</li>
      </ul>
      
      <h2>Security of Your Data</h2>
      <p>We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.</p>

      <h2>Sharing Your Information</h2>
      <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>
    </PolicyPageLayout>
  );
};

export default PrivacyPolicyPage;
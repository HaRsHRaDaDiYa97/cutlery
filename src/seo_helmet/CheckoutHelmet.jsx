import { Helmet } from "react-helmet-async";

const CheckoutHelmet = () => {
  return (
    <Helmet>
      <title>Checkout | Modifix - Secure Payment for Premium Cutlery</title>
      <meta
        name="description"
        content="Complete your purchase securely at Modifix. Checkout with premium cutlery, dining sets, and utensils using safe payment options."
      />
      <link rel="canonical" href="https://modifix.com/checkout" />

      {/* Open Graph */}
      <meta property="og:title" content="Checkout | Modifix" />
      <meta
        property="og:description"
        content="Secure and easy checkout at Modifix for luxury cutlery and dining essentials."
      />
      <meta property="og:url" content="https://modifix.com/checkout" />
      <meta property="og:image" content="/checkout-og-image.jpg" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Checkout | Modifix" />
      <meta
        name="twitter:description"
        content="Review your cart and complete payment securely for Modifix cutlery."
      />
      <meta name="twitter:image" content="/checkout-og-image.jpg" />
    </Helmet>
  );
};

export default CheckoutHelmet;

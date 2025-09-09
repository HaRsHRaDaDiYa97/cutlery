import { Helmet } from "react-helmet-async";

const CartHelmet = () => {
  return (
    <Helmet>
      <title>Shopping Cart | Modifix - Review Your Cutlery Items</title>
      <meta
        name="description"
        content="Review your selected Modifix cutlery items in your shopping cart before checkout. Secure and fast shopping."
      />
      <link rel="canonical" href="https://modifix.com/cart" />

      {/* Open Graph */}
      <meta property="og:title" content="Shopping Cart | Modifix" />
      <meta property="og:description" content="Review and manage your Modifix shopping cart before completing checkout." />
      <meta property="og:url" content="https://modifix.com/cart" />
      <meta property="og:image" content="/cart-og-image.jpg" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Shopping Cart | Modifix" />
      <meta name="twitter:description" content="Check your Modifix cutlery items before checkout." />
      <meta name="twitter:image" content="/cart-og-image.jpg" />
    </Helmet>
  );
};

export default CartHelmet;

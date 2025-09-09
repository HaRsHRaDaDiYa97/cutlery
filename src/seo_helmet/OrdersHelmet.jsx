import { Helmet } from "react-helmet-async";

const OrdersHelmet = () => {
  return (
    <Helmet>
      <title>My Orders | Modifix - Track Your Purchases</title>
      <meta
        name="description"
        content="View your order history, check order status, and track Modifix premium cutlery purchases online."
      />
      <link rel="canonical" href="https://modifix.com/orders" />

      {/* Open Graph */}
      <meta property="og:title" content="My Orders | Modifix" />
      <meta property="og:description" content="Track and manage your Modifix cutlery orders." />
      <meta property="og:url" content="https://modifix.com/orders" />
      <meta property="og:image" content="/orders-og-image.jpg" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="My Orders | Modifix" />
      <meta name="twitter:description" content="Check your Modifix order history and track shipments." />
      <meta name="twitter:image" content="/orders-og-image.jpg" />
    </Helmet>
  );
};

export default OrdersHelmet;

import { Helmet } from "react-helmet-async";

const AccountHelmet = () => {
  return (
    <Helmet>
      <title>My Account | Modifix - Manage Your Profile & Orders</title>
      <meta
        name="description"
        content="Access your Modifix account to view profile details, manage orders, and track your cutlery purchases."
      />
      <link rel="canonical" href="https://modifix.com/account" />

      {/* Open Graph */}
      <meta property="og:title" content="My Account | Modifix" />
      <meta property="og:description" content="Manage your Modifix account, view orders, and update personal details." />
      <meta property="og:url" content="https://modifix.com/account" />
      <meta property="og:image" content="/account-og-image.jpg" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="My Account | Modifix" />
      <meta name="twitter:description" content="Log in to your Modifix account to manage profile and orders." />
      <meta name="twitter:image" content="/account-og-image.jpg" />
    </Helmet>
  );
};

export default AccountHelmet;

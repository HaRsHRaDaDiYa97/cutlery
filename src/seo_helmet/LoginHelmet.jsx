import { Helmet } from "react-helmet-async";

const LoginHelmet = () => {
  return (
    <Helmet>
      <title>Login | Modifix - Access Your Cutlery Account</title>
      <meta
        name="description"
        content="Log in to your Modifix account to manage your profile, track orders, and access saved cutlery items."
      />
      <link rel="canonical" href="https://modifix.com/login" />

      {/* Open Graph */}
      <meta property="og:title" content="Login | Modifix" />
      <meta
        property="og:description"
        content="Access your Modifix account to view orders and manage your profile."
      />
      <meta property="og:url" content="https://modifix.com/login" />
      <meta property="og:image" content="/login-og-image.jpg" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Login | Modifix" />
      <meta
        name="twitter:description"
        content="Log in to Modifix to track orders and manage your cutlery shopping."
      />
      <meta name="twitter:image" content="/login-og-image.jpg" />
    </Helmet>
  );
};

export default LoginHelmet;

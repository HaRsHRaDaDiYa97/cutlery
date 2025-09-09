import { Helmet } from "react-helmet-async";

const WishlistHelmet = () => {
  return (
    <Helmet>
      <title>My Wishlist | Modifix - Save Your Favorite Cutlery</title>
      <meta
        name="description"
        content="Save your favorite cutlery items and dining sets with the Modifix wishlist. Shop later with ease."
      />
      <link rel="canonical" href="https://modifix.com/wishlist" />

      {/* Open Graph */}
      <meta property="og:title" content="My Wishlist | Modifix" />
      <meta property="og:description" content="Save and shop your favorite Modifix luxury cutlery items." />
      <meta property="og:url" content="https://modifix.com/wishlist" />
      <meta property="og:image" content="/wishlist-og-image.jpg" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="My Wishlist | Modifix" />
      <meta name="twitter:description" content="Keep track of your favorite Modifix cutlery items in one place." />
      <meta name="twitter:image" content="/wishlist-og-image.jpg" />
    </Helmet>
  );
};

export default WishlistHelmet;

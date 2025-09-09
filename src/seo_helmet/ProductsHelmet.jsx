import { Helmet } from "react-helmet-async";

const ProductsHelmet = () => (
  <Helmet>
    {/* Basic SEO */}
    <title>Products | Modifix - Luxury Cutlery Collection</title>
    <meta
      name="description"
      content="Explore Modifix’s premium cutlery collection. Shop elegant knives, forks, spoons, and dining sets designed for luxury dining experiences."
    />
    <meta
      name="keywords"
      content="cutlery, luxury cutlery, Modifix, dining essentials, spoons, forks, knives, premium tableware"
    />
    <link rel="canonical" href="https://modifix.com/products" />

    {/* Open Graph */}
    <meta property="og:title" content="Products | Modifix - Luxury Cutlery Collection" />
    <meta
      property="og:description"
      content="Discover Modifix’s premium cutlery range. Elegant dining sets crafted with style, durability, and timeless luxury."
    />
    <meta property="og:url" content="https://modifix.com/products" />
    <meta property="og:image" content="/products-og-image.jpg" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Products | Modifix - Luxury Cutlery Collection" />
    <meta
      name="twitter:description"
      content="Browse Modifix’s luxury cutlery and dining essentials. Perfectly crafted spoons, forks, and knives for modern dining."
    />
    <meta name="twitter:image" content="/products-og-image.jpg" />
  </Helmet>
);

export default ProductsHelmet;

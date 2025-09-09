import { Helmet } from "react-helmet-async";

const ProductHelmet = ({ product }) => {
  return (
    <Helmet>
      {/* Page Title */}
      <title>{product.name} | Modifix - Premium Cutlery & Dining Essentials</title>

      {/* SEO Meta Description */}
      <meta
        name="description"
        content={`Buy ${product.name} from Modifix. Premium quality cutlery, utensils, and dining sets for elegant and durable kitchen essentials.`}
      />
      <meta
        name="keywords"
        content={`${product.name}, Modifix cutlery, premium cutlery, kitchen utensils, dining essentials`}
      />
      <link rel="canonical" href={`https://modifix.com/product/${product.slug}`} />

      {/* Open Graph */}
      <meta property="og:title" content={`${product.name} | Modifix`} />
      <meta
        property="og:description"
        content={`Shop ${product.name} online at Modifix. Elegant, premium, and durable cutlery for your kitchen and dining needs.`}
      />
      <meta property="og:url" content={`https://modifix.com/product/${product.slug}`} />
      <meta property="og:image" content={product.imageUrl || "/product-og-image.jpg"} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${product.name} | Modifix`} />
      <meta
        name="twitter:description"
        content={`Buy ${product.name} online at Modifix. Luxury cutlery and dining essentials.`}
      />
      <meta name="twitter:image" content={product.imageUrl || "/product-og-image.jpg"} />
    </Helmet>
  );
};

export default ProductHelmet;

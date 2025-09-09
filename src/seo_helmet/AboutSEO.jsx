import { Helmet } from "react-helmet-async";

const AboutSEO = () => (
  <Helmet>
    <title>About Us | Modifix - Luxury Cutlery & Dining Essentials</title>
    <meta
      name="description"
      content="Learn more about Modifix, your trusted brand for luxury cutlery and premium dining essentials. Discover our story, values, and commitment to quality."
    />
    <meta
      name="keywords"
      content="About Modifix, luxury cutlery brand, premium dining essentials, Modifix story, Modifix values"
    />
    <link rel="canonical" href="https://modifix.com/about" />

    {/* Open Graph */}
    <meta property="og:title" content="About Us | Modifix - Luxury Cutlery & Dining Essentials" />
    <meta
      property="og:description"
      content="Discover Modifix’s story and commitment to crafting premium cutlery and elegant dining experiences."
    />
    <meta property="og:url" content="https://modifix.com/about" />
    <meta property="og:image" content="/about-og-image.jpg" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="About Us | Modifix - Luxury Cutlery & Dining Essentials" />
    <meta
      name="twitter:description"
      content="Learn about Modifix, a luxury cutlery brand dedicated to elegance, quality, and premium dining."
    />
    <meta name="twitter:image" content="/about-og-image.jpg" />
  </Helmet>
);

export default AboutSEO;

import { Helmet } from "react-helmet-async";


const ContactHelmet = () => (
  <Helmet>
    {/* Basic SEO */}
    <title>Contact Us | Modifix - Get in Touch</title>
    <meta
      name="description"
      content="Have questions about Modifix cutlery or orders? Contact our support team today. We're here to help you with premium dining solutions."
    />
    <meta
      name="keywords"
      content="contact Modifix, customer support, Modifix help, Modifix inquiries, Modifix cutlery support"
    />
    <link rel="canonical" href="https://modifix.com/contact" />

    {/* Open Graph */}
    <meta property="og:title" content="Contact Us | Modifix - Get in Touch" />
    <meta
      property="og:description"
      content="Reach out to Modifix for inquiries, support, and customer service. We’re here to assist you with your luxury cutlery needs."
    />
    <meta property="og:url" content="https://modifix.com/contact" />
    <meta property="og:image" content="/contact-og-image.jpg" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Contact Us | Modifix - Get in Touch" />
    <meta
      name="twitter:description"
      content="Need assistance with Modifix products or orders? Contact our customer support team today."
    />
    <meta name="twitter:image" content="/contact-og-image.jpg" />
  </Helmet>
);

export default ContactHelmet;

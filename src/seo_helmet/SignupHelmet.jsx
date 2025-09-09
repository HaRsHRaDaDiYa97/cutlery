import { Helmet } from "react-helmet-async";

const SignupHelmet = () => {
  return (
    <Helmet>
      <title>Sign Up | Modifix - Create Your Cutlery Account</title>
      <meta
        name="description"
        content="Create a Modifix account to shop premium cutlery, manage orders, and save your favorite dining essentials."
      />
      <link rel="canonical" href="https://modifix.com/signup" />

      {/* Open Graph */}
      <meta property="og:title" content="Sign Up | Modifix" />
      <meta
        property="og:description"
        content="Join Modifix today! Create your account to enjoy a seamless cutlery shopping experience."
      />
      <meta property="og:url" content="https://modifix.com/signup" />
      <meta property="og:image" content="/signup-og-image.jpg" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Sign Up | Modifix" />
      <meta
        name="twitter:description"
        content="Sign up at Modifix and start shopping luxury cutlery sets today."
      />
      <meta name="twitter:image" content="/signup-og-image.jpg" />
    </Helmet>
  );
};

export default SignupHelmet;

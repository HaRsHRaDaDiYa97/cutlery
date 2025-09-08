
import React, { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { toast } from "react-toastify";

const ContactInfoItem = ({ icon, title, children }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0">
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-black text-white">
        {icon}
      </div>
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <div className="mt-1 text-base text-gray-600 space-y-1">{children}</div>
    </div>
  </div>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost/cutlery-backend/api/contact.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

     

      if (result.success) {
        toast.success("✅ Message sent successfully!", { toastId: "successMsg" });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error("❌ Failed to send message. Try again!", { toastId: "errorMsg" });
      }
    } catch (error) {
      console.error(error);
      if (!toast.isActive("serverError")) {
        toast.error("⚠️ Server error, please try later!", { toastId: "serverError" });
      }
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-gray-600">
            We'd love to hear from you. Whether you have a question about our
            products, pricing, or anything else, our team is ready to answer all
            your questions.
          </p>
        </div>

        {/* Contact Info + Form */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-10">
            <ContactInfoItem icon={<FiMapPin className="h-6 w-6" />} title="Our Address">
              <p>123 Jewelry Lane, Diamond District</p>
              <p>Rajkot, Gujarat, 360001, India</p>
            </ContactInfoItem>

            <ContactInfoItem icon={<FiMail className="h-6 w-6" />} title="Email Us">
              <a href="mailto:sales@divajeweller.com" className="hover:text-black">
                sales@divajeweller.com
              </a>
            </ContactInfoItem>

            <ContactInfoItem icon={<FiPhone className="h-6 w-6" />} title="Call Us">
              <a href="tel:+912812345678" className="hover:text-black">
                +91 (281) 234-5678
              </a>
            </ContactInfoItem>

            <ContactInfoItem icon={<FiClock className="h-6 w-6" />} title="Business Hours">
              <p>Mon - Fri: 9:00 AM - 7:00 PM</p>
              <p>Sat: 10:00 AM - 5:00 PM</p>
              <p>Sun: Closed</p>
            </ContactInfoItem>
          </div>

         {/* Right Column: Form */}
<div className="rounded-2xl bg-gray-50 p-8 shadow-sm">
  <form className="space-y-6" onSubmit={handleSubmit}>
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-900">
        Full Name
      </label>
      <input
        id="name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm 
                   ring-1 ring-gray-300 placeholder:text-gray-400 
                   focus:ring-2 focus:ring-black sm:text-sm"
      />
    </div>

    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-900">
        Email
      </label>
      <input
        id="email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm 
                   ring-1 ring-gray-300 placeholder:text-gray-400 
                   focus:ring-2 focus:ring-black sm:text-sm"
      />
    </div>

    <div>
      <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
        Phone Number (Optional)
      </label>
      <input
        id="phone"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm 
                   ring-1 ring-gray-300 placeholder:text-gray-400 
                   focus:ring-2 focus:ring-black sm:text-sm"
      />
    </div>

    <div>
      <label htmlFor="message" className="block text-sm font-medium text-gray-900">
        Message
      </label>
      <textarea
        id="message"
        name="message"
        rows={4}
        value={formData.message}
        onChange={handleChange}
        required
        className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm 
                   ring-1 ring-gray-300 placeholder:text-gray-400 
                   focus:ring-2 focus:ring-black sm:text-sm"
      ></textarea>
    </div>

    <button
      type="submit"
      className="w-full cursor-pointer rounded-md bg-black px-3 py-2.5 text-sm 
                 font-semibold text-white shadow-sm hover:bg-gray-800 transition"
    >
      Send Message
    </button>
  </form>
</div>

        </div>

        {/* Map */}
        <div className="mt-16 rounded-2xl overflow-hidden">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Our Location
          </h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=..."
            className="w-full h-96 border-0"
            allowFullScreen
            loading="lazy"
            title="Our Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

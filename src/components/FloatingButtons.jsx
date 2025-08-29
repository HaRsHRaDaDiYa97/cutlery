// src/components/FloatingButtons.jsx
import React, { useState, useEffect } from "react";
import { FaArrowUp, FaWhatsapp } from "react-icons/fa";

const FloatingButtons = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openWhatsApp = () => {
    const phoneNumber = "919428699448"; // 👉 replace with your number
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed z-10 bottom-6 right-6 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        className="p-3 cursor-pointer bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp size={22} />
      </button>

      {/* Back to Top Button */}
      {visible && (
        <button
          onClick={scrollToTop}
          className="p-3 cursor-pointer bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          title="Back to Top"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default FloatingButtons;

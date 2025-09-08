import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import FloatingButtons from "./components/FloatingButtons";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ make sure toast styles load

function App() {
  return (
    <>
      <Router>
        <div className="font-sans">
          <Header />
          <main className="min-h-screen container mx-auto py-4 lg:py-8">
            <AppRoutes />
          </main>
          <Footer />
        </div>
        <FloatingButtons />
      </Router>

      {/* Toast container must be added once */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </>
  );
}

export default App;

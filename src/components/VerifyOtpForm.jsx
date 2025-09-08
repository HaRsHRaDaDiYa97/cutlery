
import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../app/slice/authSlice";
import { toast } from "react-toastify";

function VerifyOtpForm() {
  // --- Your existing logic remains unchanged ---
  const { state } = useLocation();
  const email = state?.email;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);


  if (!email) {
    navigate("/login");
    return null;
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost/cutlery-backend/api/verify_otp.php", { email, otp });
      if (res.data.status === "success") {
        toast.success(res.data.message || "Verification successful!");
        dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
        navigate("/");
      } else {
        toast.error(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setIsResending(true); // ✅ start loading state
      await axios.post("http://localhost/cutlery-backend/api/login.php", { email });
      toast.success("A new OTP has been sent!");
    } catch {
      toast.error("Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg rounded-xl sm:px-10 border border-gray-200">

          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Check your email
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We've sent a 6-digit code to{' '}
              <span className="font-semibold text-black">{email}</span>.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium leading-6 text-gray-900 sr-only">
                Verification Code
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                required
                className="block w-full rounded-md border-0 py-3 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-2xl sm:leading-6 tracking-[0.5em]"
                placeholder="______"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center cursor-pointer rounded-md bg-black px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Verifying..." : "Verify"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-500">
              Didn't receive the code?{" "}
              <button
                onClick={handleResend}
                disabled={isResending}
                className="font-semibold cursor-pointer text-black hover:underline focus:outline-none disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                {isResending ? "Resending..." : "Resend"}
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default VerifyOtpForm;
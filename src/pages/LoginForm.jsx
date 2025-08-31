import React, { useState } from "react";
import { useLoginMutation } from "../features/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../app/slice/authSlice";

function LoginForm() {
  const [form, setForm] = useState({ mobile: "", password: "" });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form).unwrap();
      dispatch(setCredentials(res));
      alert("Login successful");
      // TODO: redirect to homepage with react-router
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 text-white font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 font-semibold hover:underline">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;

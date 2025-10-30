import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "https://melodia-data-5.onrender.com";

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await fetch(`${API_URL}/users?email=${values.email.toLowerCase()}`);
        const data = await res.json();

        if (!res.ok || data.length === 0) {
          toast.error("User not found!");
          return;
        }

        const user = data[0];
        if (user.password !== values.password) {
          toast.error("Incorrect password!");
          return;
        }

        await fetch(`${API_URL}/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ loggedIn: true }),
        });

        // store only username + email; keep role in Redux only
        dispatch(
  login({
    username: user.username,
    email: user.email,
  })
);

        toast.success(`Welcome ${user.username}! 🎶`);
        setTimeout(() => {
          if (user.role === "admin") navigate("/admin");
          else navigate("/");
        }, 1200);
      } catch (err) {
        console.error(err);
        toast.error("Server error. Try again later.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-[#0D0D0D] text-white">
      <h1 className="text-3xl mb-6 font-semibold">Login</h1>

      <form
        onSubmit={formik.handleSubmit}
        className="w-80 space-y-4 relative"
        autoComplete="off"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-[#FF9E2E]"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-400 text-sm">{formik.errors.email}</p>
        )}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-[#FF9E2E]"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-400 select-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={`w-full p-3 rounded font-semibold transition ${
            formik.isSubmitting
              ? "bg-gray-500 cursor-not-allowed text-gray-300"
              : "bg-[#FF9E2E] hover:bg-[#e88c25] text-black"
          }`}
        >
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="text-gray-400 text-sm text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#FF9E2E] cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </form>

      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </div>
  );
}
  
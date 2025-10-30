import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: "", email: "", password: "", role: "user", plan: "free","active": true,"loggedIn": false },
    validationSchema: Yup.object({
      username: Yup.string().required("Username required"),
      email: Yup.string().email("Invalid email").required("Email required"),
      password: Yup.string().min(6, "Min 6 characters").required("Password required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await fetch(`https://melodia-data-5.onrender.com/users?email=${values.email}`);
        const existing = await res.json();

        if (existing.length > 0) {
          toast.error("Email already registered!");
          return;
        }

        // ✅ Create the new user
        const createRes = await fetch(`https://melodia-data-5.onrender.com/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const newUser = await createRes.json();

        // ✅ Save safe data + id to localStorage
        const safeUser = {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          // role: newUser.role,
          plan: newUser.plan,
        };
        localStorage.setItem("melodia_user", JSON.stringify(safeUser));

        toast.success("Signup successful! Please login.");
        navigate("/login");
      } catch (error) {
        toast.error("Server error!");
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-140 bg-[#0D0D0D] text-white">
      <h1 className="text-3xl mb-6 font-semibold">Sign Up</h1>
      <form onSubmit={formik.handleSubmit} className="w-80 space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.errors.username && <p className="text-red-400">{formik.errors.username}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && <p className="text-red-400">{formik.errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && <p className="text-red-400">{formik.errors.password}</p>}

        <button
          type="submit"
          className="w-full bg-[#FF9E2E] p-3 rounded text-black font-semibold hover:bg-[#e88c25] transition"
        >
          Sign Up
        </button>

        <p className="text-gray-400 text-sm text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#FF9E2E] cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

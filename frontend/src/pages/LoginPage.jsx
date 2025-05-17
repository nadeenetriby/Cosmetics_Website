import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, loading } = useUserStore();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      const result = await login({ email, password });

      if (result.success) {
        const updatedUser = useUserStore.getState().user;

        if (updatedUser?.isAdmin) {
          navigate("/DashBoard");
        } else {
          navigate("/");
        }
      } else {
        // ❗ أضف ده لعرض رسالة في الكونسول أو في الواجهة
        console.error("Login failed:", result.error);
        alert(result.error || "Login failed. Please try again.");
      }
    },
  });

  return (
    <div
      className="relative min-h-screen flex justify-center items-center p-10 bg-no-repeat bg-cover bg-left-top"
      style={{
        backgroundImage: "url('/Test.jpeg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top left",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center mt-20 justify-center w-full">
        {/* Welcome Text */}
        <div className="text-center mb-8 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#E69DB8]">
            Welcome Back
          </h1>
          <p className="text-lg md:text-xl text-white font-medium">
            Login to continue your SugerBloom experience
          </p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="bg-[#1F2937] p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <label className="block text-sm font-medium text-white mb-1">
            Email address
          </label>
          <div className="flex items-center bg-gray-700 rounded px-3 py-2 mb-4">
            <Mail size={18} className="text-gray-400 mr-2" />
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="bg-transparent outline-none text-white w-full"
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-400 text-sm mb-2">{formik.errors.email}</p>
          )}

          <label className="block text-sm font-medium text-white mb-1">
            Password
          </label>
          <div className="flex items-center bg-gray-700 rounded px-3 py-2 mb-6">
            <Lock size={18} className="text-gray-400 mr-2" />
            <input
              name="password"
              type="password"
              placeholder="••••••"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="bg-transparent outline-none text-white w-full"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-400 text-sm mb-4">
              {formik.errors.password}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#D1BB9E] hover:bg-[#c1a888] text-white font-semibold py-2 rounded"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-300 mt-4">
            Don't have an account?{" "}
            <Link to="/Signup" className="text-[#E69DB8] hover:underline">
              Sign up here →
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

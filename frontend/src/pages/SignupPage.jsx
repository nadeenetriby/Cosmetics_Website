import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserPlus, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import SkinCarePage from "../pages/SkinCarePage"

const Signup = () => {
  const { signup, loading } = useUserStore();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const { name, email, password } = values;
      const result = await signup({ name, email, password });

      if (result.success) {
        navigate("/"); 
      }
    },
  });

  return (
    <div
      className="relative min-h-screen flex justify-center items-center p-10 bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: "url('/Test.jpeg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top left",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-center w-full mt-20">
        {/* Welcome Text */}
        <div className="text-white text-center md:text-left w-full md:w-1/2 px-4">
          <h1 className="text-4xl font-bold text-[#E69DB8] mb-4">
            Welcome to SugerBloom
          </h1>
          <p className="text-lg text-white font-medium">
            Your beauty journey starts here. Sign up and join our lovely
            community!
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="bg-[#1F2937] p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          {/* Full Name */}
          <label className="block text-sm font-medium text-white mb-1">
            Full name
          </label>
          <div className="flex items-center bg-gray-700 rounded px-3 py-2 mb-4">
            <UserPlus size={18} className="text-gray-400 mr-2" />
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="bg-transparent outline-none text-white w-full"
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-400 text-sm mb-2">{formik.errors.name}</p>
          )}

          {/* Email */}
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

          {/* Password */}
          <label className="block text-sm font-medium text-white mb-1">
            Password
          </label>
          <div className="flex items-center bg-gray-700 rounded px-3 py-2 mb-4">
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
            <p className="text-red-400 text-sm mb-2">
              {formik.errors.password}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#D1BB9E] hover:bg-[#c1a888] text-white font-semibold py-2 rounded"
          >
            Sign up
          </button>

          <p className="text-center text-sm text-gray-300 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#E69DB8] hover:underline">
              Login here →
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

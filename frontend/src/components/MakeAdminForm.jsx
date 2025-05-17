import { useState } from "react";
import { motion } from "framer-motion";
import { useProductStore } from "../stores/useProductStore";

const MakeAdminForm = () => {
  const { promoteUserToAdmin } = useProductStore();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      await promoteUserToAdmin(email);
      setMessage(`User with email ${email} is an admin access.`);
      setEmail("");
    } catch (error) {
      setMessage("Failed to make admin access");
      console.error(error);
    }
  };
  return (
    <motion.div
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-bold text-pink-500 mb-4">
        Grant Admin Access
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-pink-700"
          >
            User Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition"
        >
          Make Admin
        </button>
        {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
      </form>
    </motion.div>
  );
};

export default MakeAdminForm;

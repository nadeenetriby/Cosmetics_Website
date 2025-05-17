import { PlusCircle, ShoppingBasket, UserPlus } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import ProductsList from "../components/ProductsList.jsx";
import CreateProductForm from "../components/CreateProductForm.jsx";
import MakeAdminForm from "../components/MakeAdminForm.jsx";

const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "makeadmin", label: "Make Admin", icon: UserPlus },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="min-h-screen bg-pink-50 text-pink-800">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold mb-8 text-pink-500 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>

        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-pink-500 text-white"
                  : "bg-white text-pink-600 hover:bg-pink-100"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "create" && <CreateProductForm />}
        {activeTab === "products" && <ProductsList />}
        {activeTab === "makeadmin" && <MakeAdminForm />}
      </div>
    </div>
  );
};

export default AdminPage;

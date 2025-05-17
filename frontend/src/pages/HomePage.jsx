import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import HeroCarousel from "../components/HeroCarousel";
import CategoryCarousel from "../components/CategoryCarousel";
import { ShoppingCart, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useCart } from "../stores/useCart";

const HomePage = () => {
  const { products, getAllProducts, getProductRating, loading } =
    useProductStore();
  const [clickedCarts, setClickedCarts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    getAllProducts().then(async () => {
      const updatedProducts = await Promise.all(
        products.map(async (product) => {
          return { ...product };
        })
      );
      // setProducts(updatedProducts); ← حسب ما تحب تستخدمه
    });
  }, []);

  const handleCartClick = (index) => {
    // ✅ أضف أو احذف الـ index حسب الضغط
    setClickedCarts((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="mt-10">
      <HeroCarousel />

      <div className="relative text-white overflow-hidden bg-white px-4">
        <div className="text-left max-w-5xl">
          <h1 className="text-5xl sm:text-4xl font-bold text-[#E69DB8] mb-4 mt-10">
            Our categories
          </h1>
        </div>

        <div className="w-full mt-12">
          <CategoryCarousel />
        </div>

        <div className="relative text-white overflow-hidden bg-white py-12 px-4">
          <div className="text-left max-w-5xl">
            <h1 className="text-5xl sm:text-4xl font-bold text-[#E69DB8] mb-4 mt-10">
              Our products
            </h1>
          </div>

          <div className="w-[90%] m-auto mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? (
              <p>Loading products...</p>
            ) : products?.length > 0 ? (
              products.map((product, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden border hover:shadow-xl transition duration-300 bg-white"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-[#1F2937] mb-1">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-500 mb-2">
                      {product.category}
                    </p>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={
                            i < Math.round(product.averageRating)
                              ? "#E69DB8"
                              : "none"
                          }
                          stroke="#E69DB8"
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#E69DB8] font-semibold">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(product.price)}
                      </span>
                      <ShoppingCart
                        size={20}
                        stroke={
                          clickedCarts.includes(index)
                            ? "#c0648a" // لون بينك لما يتضغط
                            : "#E69DB8" // اللون العادي
                        }
                        fill={clickedCarts.includes(index) ? "#c0648a" : "none"}
                        className="cursor-pointer transition-colors duration-300"
                        onClick={() => {
                          addToCart(product._id);
                          handleCartClick(index);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1F2937] text-white py-8 px-4 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-[#E69DB8]">SugerBloom</h2>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

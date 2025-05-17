import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Star } from "lucide-react"; // ⭐ استيراد النجمة

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const name = queryParams.get("name");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/product/Search", {
          params: { category, name },
        });


        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

  if (category || name) fetchProducts(); 
  }, [category,name]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-[#c0648a] mt-16">
        {category}
      </h2>

      <p className="text-center text-gray-600 text-lg mb-8">
        Discover our exclusive {category?.toLowerCase()} collection and treat yourself today! ✨
      </p>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found in this category.</p>
      ) : (
        <div className="space-y-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col md:flex-row items-center gap-6 border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition duration-300"
            >
              {/* صورة المنتج */}
              <div className="w-full md:w-48 h-48 overflow-hidden rounded-md">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* بيانات المنتج */}
              <div className="flex-1 text-left space-y-2">
                <h3 className="text-2xl font-semibold text-[#E69DB8]">{product.name}</h3>
                <p className="text-gray-600 text-sm">
                  {product.description || "No description available."}
                </p>
                <p className="text-lg font-medium">
                  Price: <span className="text-[#c0648a]">{product.price} EGP</span>
                </p>
                <p className="text-sm text-gray-700">In Stock: {product.inStock}</p>
                <p className="text-sm text-gray-700">Category: {product.category}</p>

                {/* تقييم النجوم */}
                {product.averageRating > 0 ? (
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < Math.round(product.averageRating) ? "#E69DB8" : "none"}
                          stroke="#E69DB8"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700">
                      {product.averageRating.toFixed(1)} / 5
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No rating found</p>
                )}


              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;

import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 border rounded-lg shadow-md p-4 mb-4 bg-white hover:shadow-lg transition-shadow duration-300">
      {/* صورة المنتج */}
      <div className="w-full md:w-48 h-48 overflow-hidden rounded-md">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* البيانات */}
      <div className="flex-1 text-left space-y-2">
        <h2 className="text-xl font-bold text-[#c0648a]">{product.name}</h2>
        <p className="text-sm text-gray-600">{product.description || "No description available."}</p>
        <p className="text-base font-semibold">Price: <span className="text-[#E69DB8]">{product.price} EGP</span></p>
        <p className="text-sm">In Stock: {product.inStock}</p>
        <p className="text-sm">Category: <span className="font-medium">{product.category}</span></p>
      </div>
    </div>
  );
};

export default ProductCard;

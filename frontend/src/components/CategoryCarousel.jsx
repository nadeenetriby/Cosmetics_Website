import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Body Care', imageUrl: '/bodycare.jpeg' },
  { name: 'Face Care', imageUrl: '/facecare.jpeg' },
  { name: 'Lip Care', imageUrl: '/lipcare.jpeg' },
  { name: 'Hair Care', imageUrl: '/haircare.jpeg' },
  { name: 'Nail Care', imageUrl: '/nailcare.jpeg' },
  { name: 'Eye Makeup', imageUrl: '/eyecare.jpeg' },
];

const CategoryCarousel = () => {
  return (
    <>
      <div className="w-[90%] m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, index) => (
          <Link to={`/products/Search?category=${encodeURIComponent(cat.name)}`} key={index}>
            <div className="w-40 h-40 rounded-full border border-[#E69DB8] hover:border-[#c0648a] transition-all duration-300 shadow-md cursor-pointer mx-auto">
              <div className="w-full h-full rounded-full overflow-hidden relative group">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-lg text-center px-2">
                    {cat.name}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CategoryCarousel;

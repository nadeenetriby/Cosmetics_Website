import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const slides = [
  {
    image: '/productsImage/product1.jpeg',
    title: 'Glow Serum',
    description:
      'Bring out your natural glow with our best-selling serum. Enriched with Vitamin C and Hyaluronic Acid to hydrate and brighten your skin from the first use.',
  },
  {
    image: '/productsImage/products5.jpeg',
    title: 'Luxury Lipsticks',
    description:
      'Bold colors that last all day. Our creamy formula glides smoothly, providing intense color payoff with a satin finish – perfect for every occasion.',
  },
  {
    image: '/productsImage/product4.jpeg',
    title: 'Gentle Cleanser',
    description:
      'Soft on skin, tough on impurities. This cleanser gently removes dirt and excess oil without stripping your skin, making it ideal for daily use.',
  },
];

const HeroCarousel = () => {
  return (
    <div className="mt-10 w-full">
      {/* Hero Carousel */}
      <Carousel
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={4000}
        showStatus={true}
        showIndicators={true}
        dynamicHeight={true}
        stopOnHover
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-[95vh] overflow-hidden">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-[#E69DB8] mb-4">
                {slide.title}
              </h2>
              <p className="text-white text-lg md:text-xl">{slide.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;



import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import productsData from "../../data/products.json";

const Trending = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const products = Object.values(productsData);
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 8).map(product => ({
      id: product.id,
      img: product.images[0],
      category: product.category,
      name: product.title,
      price: product.price.toLocaleString(),
      discount: product.discount,
      rating: product.rating
    }));
    setTrendingProducts(selected);
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const formatPrice = (price) => `₹${price}`;

  return (

    <section className="relative bg-white py-10 md:py-10 overflow-hidden">

      {/* subtle white luxury glow */}
      <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] bg-black/5 rounded-full blur-[160px]" />
      <div className="absolute bottom-0 -right-40 w-[700px] h-[700px] bg-black/10 rounded-full blur-[200px]" />

      <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="flex justify-between items-end mb-10 md:mb-14">
          <div>
            <p className="text-[11px] tracking-[0.35em] text-gray-400 uppercase">
              Trending Now
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-gray-900">
              Featured Products
            </h2>
          </div>

          <button
            onClick={() => navigate('/collections')}
            className="text-xs sm:text-sm tracking-widest text-gray-900 flex items-center gap-2 hover:opacity-60 transition cursor-pointer"
          >
            VIEW ALL
            <ChevronRight size={16} />
          </button>
        </div>

        {/* SLIDER */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={14}
            slidesPerView={3}
            navigation={{
              nextEl: '.trending-next',
              prevEl: '.trending-prev',
            }}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 22 },

              1024: { slidesPerView: 5, spaceBetween: 24 },
              1280: { slidesPerView: 5, spaceBetween: 28 },
            }}
          >
            {trendingProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <div
                  onClick={() => handleProductClick(product.id)}
                  className="
                    group cursor-pointer
                    bg-white
                    rounded-[1.75rem]
                    overflow-hidden
                    shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]
                    transition-all duration-500
                    hover:-translate-y-1 hover:shadow-[0_40px_100px_-40px_rgba(0,0,0,0.5)]
                  "
                >
                  {/* IMAGE */}
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    {product.discount > 0 && (
                      <span className="absolute top-3 left-3 bg-black text-white px-3 py-1 rounded-full text-[10px] tracking-widest">
                        {product.discount}% OFF
                      </span>
                    )}

                    {product.rating && (
                      <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-medium">
                        ★ {product.rating}
                      </span>
                    )}
                  </div>

                  {/* INFO */}
                  <div className="px-4 py-5">
                    <p className="text-[10px] tracking-[0.25em] text-gray-400 uppercase mb-2">
                      {product.category}
                    </p>

                    <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-3 line-clamp-1 group-hover:opacity-70 transition">
                      {product.name}
                    </h3>

                    <div className="flex justify-between items-center">
                      <p className="text-base sm:text-lg font-semibold">
                        {formatPrice(product.price)}
                      </p>
                      <span className="text-[11px] tracking-widest text-gray-400 opacity-0 group-hover:opacity-100 transition">
                        VIEW →
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* NAVIGATION */}
          <div className="trending-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-white rounded-full p-3 shadow-lg cursor-pointer hover:scale-105 transition z-10">
            <ChevronLeft size={18} />
          </div>

          <div className="trending-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-white rounded-full p-3 shadow-lg cursor-pointer hover:scale-105 transition z-10">
            <ChevronRight size={18} />
          </div>
        </div>
      </div>
    </section>
  );
};


export default Trending;

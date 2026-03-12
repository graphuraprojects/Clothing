import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

const HeroCarousel = () => {
  const navigate = useNavigate();
  const visibleSlides = 3;

  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  /* 🔹 FETCH + FILTER CAROUSEL PRODUCTS */
  useEffect(() => {
    const fetchCarouselProducts = async () => {
      try {
        const res = await API.get("/products");

        const data = Array.isArray(res.data)
          ? res.data
          : res.data.products;

        /* ✅ ONLY PRODUCTS WITH CAROUSEL TEXT */
        const carouselProducts = data
          .filter(p =>
            p.carouselTitle ||
            p.carouselSubtitle ||
            p.carouselPriceText
          )
          .slice(0, 7); // ✅ MAX 7 PRODUCTS

        setProducts(carouselProducts);
      } catch (err) {
        console.error("Carousel fetch error:", err);
      }
    };

    fetchCarouselProducts();
  }, []);

  /* DUPLICATE SLIDES FOR INFINITE LOOP */
  const slides =
    products.length > 0
      ? [...products, ...products.slice(0, visibleSlides)]
      : [];

  /* AUTO SLIDE */
 /* AUTO SLIDE (FASTER ON MOBILE) */
useEffect(() => {
  if (!products.length) return;

  const isMobile = window.innerWidth < 640; // Tailwind sm breakpoint
  const intervalTime = isMobile ? 2000 : 3000; // faster on mobile

  const interval = setInterval(() => {
    setIndex(prev => prev + 1);
  }, intervalTime);

  return () => clearInterval(interval);
}, [products]);


  /* LOOP RESET */
  useEffect(() => {
    if (index === products.length) {
      setTimeout(() => {
        setIsAnimating(false);
        setIndex(0);
      }, 700);
    } else {
      setIsAnimating(true);
    }
  }, [index, products.length]);

  if (!products.length) return null;

  return (
    <div className="w-full relative py-4">
      <div className="w-full mx-auto px-4 sm:px-6 overflow-hidden relative">

        {/* LEFT NAV */}
        <button
          onClick={() => index > 0 && setIndex(index - 1)}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10
          p-2.5 sm:p-3.5 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 text-gray-700 hover:text-[#8b6f47] cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        {/* RIGHT NAV */}
        <button
          onClick={() => setIndex(index + 1)}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10
          p-2.5 sm:p-3.5 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 text-gray-700 hover:text-[#8b6f47] cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>

        {/* TRACK */}
        <div
          className={`flex w-[70%] ${
            isAnimating ? "transition-transform duration-700 ease-in-out" : ""
          }`}
          style={{
            transform: `translateX(-${index * (100 / visibleSlides)}%)`,
          }}
        >
          {slides.map((item, i) => (
            <div
              key={i}
              className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-3"
            >
              <div
                className="relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={item.colors?.[0]?.images?.[0]}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle bottom gradient for text readability */}
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>

                {/* Card details */}
                <div className="p-4 sm:p-5 space-y-1.5">
                  {/* Gold accent line */}
                  <div className="w-8 h-[2px] bg-[#c4a265] mb-2"></div>
                  <h2 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight line-clamp-2">
                    {item.carouselTitle || item.name}
                  </h2>
                  <p className="text-sm text-gray-500 tracking-wide">
                    {item.carouselSubtitle || item.category?.name || "Collection"}
                  </p>
                  <p className="font-bold text-[#8b6f47] text-base sm:text-lg tracking-wide">
                    {item.carouselPriceText || `₹${item.discountPrice ?? item.price ?? 0}`}
                  </p>
                  {item.size && (
                    <p className="text-xs text-gray-400 tracking-wider uppercase">
                      <span className="font-medium">Size:</span> {item.size}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide indicator dots */}
      <div className="flex justify-center gap-2 mt-6">
        {products.map((_, i) => (
          <div key={i}
               className="transition-all duration-300 rounded-full"
               style={{
                 width: i === (index % products.length) ? '24px' : '6px',
                 height: '4px',
                 background: i === (index % products.length) ? '#8b6f47' : 'rgba(139,111,71,0.2)',
                 borderRadius: '2px',
               }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;

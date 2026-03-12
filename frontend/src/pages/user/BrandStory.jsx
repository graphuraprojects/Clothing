import React from "react";
import { useNavigate } from "react-router-dom";
import philosophyImg from "../../assets/BrandStory/BrandStory.webp";

const PhilosophySection = () => {
   const navigate = useNavigate();
  return (
    <section className="brandstory-editorial section-editorial">
      <div className="max-w-7xl mx-auto">

        {/* Editorial label */}
        <div className="editorial-label sr visible mb-6">
          <span>Our Philosophy</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* LEFT IMAGE */}
          <div className="relative group w-full sr-left visible">
            <div className="brandstory-img-frame rounded-lg overflow-hidden">
              <img
                src={philosophyImg}
                alt="Craftsmanship"
                className="w-full 
             aspect-[4/5] 
             max-h-[500px]
             object-cover"
              />
            </div>

            {/* Floating Badge */}
            <div
              className="absolute 
                  bottom-4 left-4 
                  sm:bottom-6 sm:left-6 
                  lg:bottom-8 lg:left-8 
                  group"
            >
              <div
                className="relative 
                    bg-white/80 backdrop-blur-xl
                    px-5 py-2
                    sm:px-7 sm:py-3
                    lg:px-10 lg:py-4
                    border border-white/40
                    shadow-[0_12px_30px_rgba(0,0,0,0.12)]
                    sm:shadow-[0_16px_40px_rgba(0,0,0,0.15)]
                    lg:shadow-[0_20px_50px_rgba(0,0,0,0.18)]
                    tracking-[0.25em]
                    sm:tracking-[0.3em]
                    lg:tracking-[0.35em]
                    text-[9px]
                    sm:text-[10px]
                    lg:text-[11px]
                    font-semibold
                    transition-all duration-500
                    group-hover:-translate-y-2
                    lg:group-hover:-translate-y-3
                    group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
              >
                <span className="relative z-10 whitespace-nowrap gold-shimmer outfit">
                  HANDCRAFTED IN INDIA
                </span>

                <div
                  className="absolute inset-0 
                      bg-gradient-to-r 
                      from-white/30 via-transparent to-white/30
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-700"
                ></div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="text-left sr-right visible">
            <h2
              className="playfair text-3xl sm:text-5xl lg:text-6xl 
                           leading-[1.08] mb-8 text-center md:text-left"
              style={{ color: 'var(--noir)' }}
            >
              Crafted in India,
              <br />
              <span className="italic" style={{ color: 'var(--gold-dark)' }}>Worn Globally</span>
            </h2>

            <div className="editorial-sep"></div>

            <p className="outfit text-gray-600 text-sm sm:text-base leading-relaxed mb-4 max-w-xl font-light tracking-wide">
              Experience the timeless artistry of Indian craftsmanship, refined
              for a global audience.
            </p>

            <p className="outfit text-gray-600 text-sm sm:text-base leading-relaxed mb-10 max-w-xl font-light tracking-wide">
              We design minimalist, enduring silhouettes that embody quiet luxury
              — timeless fashion that stands the test of time.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-6 pointer-events-auto">
              <button
                onClick={() => navigate("/philosophy")}
                className="btn-editorial group relative inline-flex items-center gap-3
                           pointer-events-auto cursor-pointer"
              >
                <span>Discover Process</span>
                <span className="btn-arrow">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;

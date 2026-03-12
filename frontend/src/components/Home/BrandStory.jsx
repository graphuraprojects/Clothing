import React from "react";

import philosophyImg from "../../assets/BrandStory/BrandStory.webp";

const BrandStory = () => {
  return (
    <section className="relative py-10 px-4 sm:px-6 lg:px-12 bg-white overflow-hidden">

      {/* SILK LIGHT BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-black/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-black/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* IMAGE SIDE */}
        <div className="relative group">
          <div className="relative aspect-[5/3] rounded-[2.5rem] overflow-hidden shadow-[0_40px_120px_-30px_rgba(0,0,0,0.4)]">
            <img
              src={philosophyImg}
              alt="Our Philosophy"
              className="
                w-full h-full object-cover
                transition-transform duration-700
                group-hover:scale-105
              "
            />
          </div>

          {/* FLOATING CAPTION */}
          <div className="
            absolute -bottom-6 left-8
            bg-white/90 backdrop-blur-xl
            px-6 py-3
            rounded-full
            text-xs tracking-widest
            shadow-lg
          ">
            HANDCRAFTED IN INDIA
          </div>
        </div>

        {/* CONTENT SIDE */}
        <div className="max-w-xl">

          <p className="text-xs tracking-[0.35em] uppercase text-gray-500">
            Our Philosophy
          </p>

          <h2 className="
            mt-6
            font-serif
            text-4xl sm:text-5xl lg:text-6xl
            text-gray-900
            leading-tight
          ">
            Crafted in India, <br /> Worn Globally
          </h2>

          {/* DIVIDER */}
          <div className="mt-8 mb-10 h-px w-20 bg-black/20" />

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Graphura is a tribute to the timeless artistry of Indian weavers —
            refined for a global audience. From the historic looms of Maheshwar
            to the natural dye traditions of Bagru, each piece carries the soul
            of craftsmanship forward.
          </p>

          <p className="mt-5 text-gray-600 text-sm sm:text-base leading-relaxed">
            Our silhouettes are intentionally minimal, allowing heritage,
            sustainability, and uncompromising quality to take center stage.
            This isn’t trend-led fashion — it’s design meant to endure.
          </p>

          {/* CTA */}
          <button className="
            mt-12
            inline-flex items-center gap-3
            text-xs tracking-[0.3em] uppercase
            text-black
            border-b border-black
            pb-1
            hover:opacity-60
            transition
           cursor-pointer">
            Discover Our Process
            <span className="text-lg">→</span>
          </button>

        </div>
      </div>
    </section>
  );
};


export default BrandStory;


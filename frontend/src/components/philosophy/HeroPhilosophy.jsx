import React from "react";
import craftImage from "../../assets/philosophy/hero-craft.webp";

export default function HeroPhilosophy() {
  return (
    <section className="pt-20 w-full bg-[#EFEFEF] overflow-hidden">
      <div className="w-full auto md:h-screen grid grid-cols-1 md:grid-cols-2 px-4 md:px-0 gap-6 md:gap-0">
        {/* IMAGE */}
        <div className="relative w-full h-80 md:h-full overflow-hidden rounded-2xl">
          <img
            src={craftImage}
            alt="Artisan craftsmanship"
            className="w-full h-full 
  object-cover object-center md:object-[center_15%]
  transform transition-all duration-700
  group-hover:scale-105 group-hover:brightness-110
  rounded-2xl
"
          />

          <div className="absolute inset-0 bg-black/10 md:bg-black/15" />

          <p
            className="
              absolute bottom-6 left-6
              text-[10px] md:text-[11px]
              tracking-[0.45em]
              text-white/80
            "
          >
            OUR PROMISE
          </p>
        </div>

        {/* CONTENT */}
        <div className="w-full bg-white flex items-start md:items-center">
          <div
            className="
              w-full max-w-2xl
              px-6 py-12
              md:px-12 md:py-0
              mx-auto
            "
          >
            <h2
              className="
            
               pt-7 text-3xl md:text-4xl lg:text-4xl
                leading-snug font-serif
                mb-8
                text-black
              
              "
            >
              Clothing that feels considered from the first wear to the
              hundredth.
            </h2>

            <ul
              className="
                space-y-5
                text-[14px] md:text-[15px]
                text-gray-700
                mb-10
              "
            >
              <li className="flex gap-4 items-start">
                <span className="w-4 h-4 mt-1 rounded-full bg-black shrink-0" />
                <span>Fabric sourcing focused on natural softness.</span>
              </li>

              <li className="flex gap-4 items-start">
                <span className="w-4 h-4 mt-1 rounded-full bg-black shrink-0" />
                <span>Pattern systems engineered for movement.</span>
              </li>

              <li className="flex gap-4 items-start">
                <span className="w-4 h-4 mt-1 rounded-full bg-black shrink-0" />
                <span>Durable finishes that hold their confidence.</span>
              </li>
            </ul>

            <div className="mb-10">
              <p
                className="
                  text-[10px] md:text-[11px]
                  tracking-[0.35em]
                  text-gray-500
                  mb-3
                "
              >
                PROCESS
              </p>

              <p
                className="
                  text-[14px] md:text-[15px]
                  text-gray-600
                  leading-relaxed
                "
              >
                Our process is intentionally slow. Each garment is developed
                through repeated testing, wear trials, and refinement.
              </p>
            </div>

            <div className="mb-12">
              <p
                className="
                  text-[10px] md:text-[11px]
                  tracking-[0.35em]
                  text-gray-500
                  mb-3
                "
              >
                LONGEVITY
              </p>

              <p
                className="
                  text-[14px] md:text-[15px]
                  text-gray-600
                  leading-relaxed
                "
              >
                Materials and finishes are selected for how they age, not how
                they appear on day one.
              </p>
            </div>

            {/* COLLECTIONS */}
            <div className="text-center">
              <p
                className="
                  text-[10px] md:text-[11px]
                  tracking-[0.35em]
                  text-gray-500
                  mb-6
                "
              >
                COLLECTIONS
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                {["MENS", "WOMENS", "KIDS"].map((item) => (
                  <button
                    key={item}
                    className="
                      px-6 py-3
                      text-[12px] md:text-[13px]
                      bg-white text-black
                      rounded-xl
                      border border-gray-200
                      shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]
                      hover:bg-black hover:text-white hover:border-black
                      hover:-translate-y-[2px]
                      transition-all duration-300
                      font-medium
                     cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
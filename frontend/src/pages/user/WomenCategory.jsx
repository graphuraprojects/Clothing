import React, { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../../components/Home/ProductCard";
import API from "../../api/axios";
import Navbar from "../../components/Home/Navbar";
import { useShop } from "../../context/ShopContext";

/* HERO TEXT */
const HERO_TITLE = "Women's Collection";
const HERO_SUB =
  "Grace in every detail — timeless ethnic, modern western and elegant styles designed for every woman, every mood.";

export default function WomenCollectionPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [loading, setLoading] = useState(true);

  /* TYPEWRITER */
   const [typedText, setTypedText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(HERO_SUB.slice(0, i + 1));
      i++;
      if (i === HERO_SUB.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  /* LOAD PRODUCTS */
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await API.get("/products?collection=women");

      const womenProducts = Array.isArray(res.data)
        ? res.data
        : res.data.products;

      setProducts(womenProducts);

      const cats = [
        "All",
        ...new Set(womenProducts.map(p => p.category?.name)),
      ];
      setCategories(cats);

      const maxPrice = Math.max(
        ...womenProducts.map(p => p.discountPrice || p.price || 0)
      );

      setPriceRange([0, maxPrice]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* FILTER */
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const categoryMatch =
        activeCategory === "All" ||
        p.category?.name === activeCategory;

      const priceMatch =
        (p.discountPrice || p.price) <= priceRange[1];

      return categoryMatch && priceMatch;
    });
  }, [products, activeCategory, priceRange]);

  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <Navbar />

      {/* HERO */}
      <section
        className="relative h-[65vh] sm:h-[75vh] lg:h-[80vh] bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dttjgnypq/image/upload/v1770530846/FemailCollection_lqgld1.png)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

        <div className="relative z-10 px-6 sm:px-8 max-w-3xl text-white text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-4">
            Curated for Her
          </p>
          <h1 className="cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-4">
            {HERO_TITLE}
          </h1>

          <p className="text-[14px] sm:text-[16px] font-light text-white/60 tracking-wide max-w-xl mx-auto leading-relaxed">
            {typedText}
            <span
              className="inline-block w-[2px] h-[0.7em] ml-1 align-middle bg-white/60"
              style={{ animation: "gentlePulse 1s ease-in-out infinite" }}
            />
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* FILTERS */}
        <aside className="md:col-span-1">
          <div className="bg-white rounded-xl p-5 md:sticky md:top-24 space-y-6 border border-gray-100">
            {/* HEADER */}
            <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
              <SlidersHorizontal size={16} className="text-gray-400" />
              <h3 className="text-[12px] font-medium tracking-[0.15em] uppercase text-gray-900">
                Filters
              </h3>
            </div>

            {/* ================= CATEGORY ================= */}
            <div>
              <h4 className="mb-3 text-[11px] font-medium tracking-[0.15em] uppercase text-gray-500">
                Category
              </h4>

              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`cursor-pointer ${`whitespace-nowrap px-4 py-2.5 rounded-lg text-[13px] tracking-wide
                      transition-all duration-300
                      ${
                        activeCategory === cat
                          ? "bg-[#f5f0eb] text-[#8b6f47] font-medium"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* ================= PRICE ================= */}
            <div>
              <h4 className="mb-3 text-[11px] font-medium tracking-[0.15em] uppercase text-gray-500 flex items-center gap-2">
                <ArrowUpDown size={14} />
                Price Range
              </h4>

              <div className="flex justify-between text-[12px] mb-2 text-gray-500">
                <span>₹0</span>
                <span className="font-medium text-gray-900">₹{priceRange[1].toLocaleString()}</span>
              </div>

              <input
                type="range"
                min="0"
                max={Math.max(
                  ...products.map((p) => p.discountPrice || p.price || 0)
                )}
                step="100"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([0, Number(e.target.value)])
                }
                className="w-full accent-black"
              />
            </div>
          </div>
        </aside>

        {/* PRODUCTS GRID */}
        <div className="md:col-span-3">
          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-[13px] text-gray-400 tracking-wide">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </p>
          </div>

          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="skeleton-luxury aspect-[3/4]" />
                  <div className="skeleton-luxury h-4 w-3/4" />
                  <div className="skeleton-luxury h-4 w-1/2" />
                </div>
              ))}
            </div>
          )}

          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6">
            <AnimatePresence>
              {filteredProducts.map(product => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

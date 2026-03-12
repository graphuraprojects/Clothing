import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../../components/Home/ProductCard";
import API from "../../api/axios";
import Navbar from "../../components/Home/Navbar";
import { useShop } from "../../context/ShopContext";

/* HERO TEXT */
const TITLE_TEXT = "Little Styles. Big Smiles.";
const SUB_TEXT =
  "Playful, comfy & premium outfits made for every little moment";

export default function KidsCollection() {
  const [products, setProducts] = useState([]);
  const [gender, setGender] = useState("all");
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  const [priceRange, setPriceRange] = useState([0, 0]);
  const [sliderValue, setSliderValue] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [loading, setLoading] = useState(true);

  /* TYPEWRITER */
  const TYPING_SPEED = 90;
  const [typedText, setTypedText] = useState("");
  const [done, setDone] = useState(false);

   useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(TITLE_TEXT.slice(0, i + 1));
      i++;
      if (i === TITLE_TEXT.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  /* LOAD PRODUCTS */
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await API.get("/products?collection=kids");

      const kidsProducts = Array.isArray(res.data)
        ? res.data
        : res.data.products;

      setProducts(kidsProducts);

      const uniqueCats = [
        ...new Set(
          kidsProducts.map(p => p.category?.name?.toLowerCase())
        ),
      ].filter(Boolean);

      setCategories(uniqueCats);

      const rawMax = Math.max(
        ...kidsProducts.map(p => p.discountPrice || p.price || 0)
      );

      const max = Math.ceil(rawMax / 100) * 100;

      setMaxPrice(max);
      setPriceRange([0, max]);
      setSliderValue(max);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* FILTER */
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const genderMatch =
        gender === "all" || p.gender === gender;

      const categoryMatch =
        category === "all" ||
        p.category?.name?.toLowerCase() === category;

      const priceMatch =
        (p.discountPrice || p.price) <= priceRange[1];

      return genderMatch && categoryMatch && priceMatch;
    });
  }, [products, gender, category, priceRange]);

  // helper for explore buttons
  const handleExplore = (catName) => {
    const key = catName.toLowerCase();
    if (key === "all kids") {
      setGender("all");
      setCategory("all");
    } else if (key === "girls") {
      setGender("girls");
      setCategory("all");
    } else if (key === "boys") {
      setGender("boys");
      setCategory("all");
    } else if (key === "baby") {
      setGender("all");
      setCategory("baby");
    }
  };

  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <Navbar />

      {/* HERO */}
      <section
        className="relative h-[70vh] sm:h-[75vh] lg:h-[80vh] bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dttjgnypq/image/upload/v1770397575/Kid_s_kuv61w.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

        <div className="relative z-10 text-center text-white px-6 max-w-3xl">
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-4">
            Curated for Little Ones
          </p>
          <h1 className="cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide">
            {typedText}
            <span
              className="inline-block w-[2px] h-[0.7em] ml-1 align-middle bg-white/60"
              style={{ animation: "gentlePulse 1s ease-in-out infinite" }}
            />
          </h1>

          {done && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-4 text-[14px] sm:text-[16px] font-light text-white/60 tracking-wide"
            >
              {SUB_TEXT}
            </motion.p>
          )}
        </div>
      </section>

      {/* ================= CATEGORY SHOWCASE ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-3">Explore</p>
          <h2 className="cinzel text-3xl md:text-4xl font-light text-gray-900 mb-3">
            Shop by Category
          </h2>
          <div className="w-12 h-[1px] bg-[#c4a265] mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              name: 'All Kids',
              image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&h=300&fit=crop&crop=center',
              description: 'Complete collection for all ages',
            },
            {
              name: 'Girls',
              image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop&crop=center',
              description: 'Pretty dresses & accessories',
            },
            {
              name: 'Boys',
              image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400&h=300&fit=crop&crop=center',
              description: 'Cool outfits for young boys',
            },
          ].map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
            >
              {/* Background Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="cinzel text-xl font-light mb-1.5 tracking-wide">{cat.name}</h3>
                    <p className="text-[13px] text-white/60 mb-4 font-light">{cat.description}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExplore(cat.name);
                      }}
                      className="text-[11px] tracking-[0.15em] uppercase text-white border border-white/40 px-6 py-2.5
                        hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* FILTERS */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-xl p-5 lg:sticky lg:top-24 space-y-6 border border-gray-100">
            <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
              <h3 className="text-[12px] font-medium tracking-[0.15em] uppercase text-gray-900">
                Filters
              </h3>
            </div>

            {/* ================= GENDER ================= */}
            <div>
              <h4 className="mb-3 text-[11px] font-medium tracking-[0.15em] uppercase text-gray-500">
                Gender
              </h4>

              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                {["all", "boys", "girls"].map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      setGender(g);
                      setCategory("all");
                    }}
                    className={`cursor-pointer ${`whitespace-nowrap px-4 py-2.5 rounded-lg text-[13px] tracking-wide
                      transition-all duration-300
                      ${
                        gender === g
                          ? "bg-[#f5f0eb] text-[#8b6f47] font-medium"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}`}
                  >
                    {g.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* ================= CATEGORY ================= */}
            {gender !== "all" && categories.length > 0 && (
              <div>
                <h4 className="mb-3 text-[11px] font-medium tracking-[0.15em] uppercase text-gray-500">Category</h4>

                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`cursor-pointer ${`whitespace-nowrap px-4 py-2.5 rounded-lg text-[13px] tracking-wide
                        transition-all duration-300
                        ${
                          category === c
                            ? "bg-[#f5f0eb] text-[#8b6f47] font-medium"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}`}
                    >
                      {c.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ================= PRICE ================= */}
            <div>
              <h4 className="mb-3 text-[11px] font-medium tracking-[0.15em] uppercase text-gray-500">
                Price Range
              </h4>

              <div className="flex justify-between text-[12px] mb-2 text-gray-500">
                <span>₹0</span>
                <span className="font-medium text-gray-900">₹{sliderValue.toLocaleString()}</span>
              </div>

              <input
                type="range"
                min="0"
                max={maxPrice}
                step="100"
                value={sliderValue}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSliderValue(val);
                  setPriceRange([0, val]);
                }}
                className="w-full accent-black"
              />
            </div>
          </div>
        </aside>

        {/* PRODUCTS */}
        <main className="lg:col-span-3">
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

          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6 pb-10">
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
        </main>
      </div>
    </div>
  );
}

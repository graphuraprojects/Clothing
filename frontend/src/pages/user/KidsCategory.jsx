import React, { useState, useMemo, useEffect } from "react";
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

  /* ❤️ WISHLIST FROM CONTEXT (SAME AS MEN) */
  // const { wishlist, toggleWishlist } = useShop();

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
    <div className="bg-[#faf7f2] min-h-screen">
      <Navbar />

      {/* HERO */}
      <div
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dttjgnypq/image/upload/v1770397575/Kid_s_kuv61w.jpg)",
          backgroundAttachment: "cover",
        }}
      >
        {/* dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* centered hero text */}
        <div className="relative z-10 text-center text-white px-4 py-20 flex flex-col items-center justify-center">
          <h1 className="permanent-marker-regular text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg">
            {typedText}
          </h1>

          {done && (
            <p
              className="cinzel mt-4 md:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide text-gray-100 drop-shadow-md max-w-2xl"
            >
              {SUB_TEXT}
            </p>
          )}
        </div>
      </div>

      {/* ================= CATEGORY SHOWCASE ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg font-medium">Find the perfect outfit for your little one</p>
          <div className="flex justify-center mt-6">
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" />
          </div>
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
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-700 transform hover:-translate-y-2"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Background Image */}
              <div className="relative h-72 overflow-hidden bg-gray-200">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                    <p className="text-sm opacity-90 mb-5 leading-relaxed">{cat.description}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExplore(cat.name);
                      }}
                      className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold py-3 px-8 rounded-full hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                    >
                      Explore <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
 
        {/* FILTERS */}
      <aside className="lg:col-span-1">
  <div
    className="
      bg-white rounded-2xl shadow-md
      p-5 sm:p-7
      lg:sticky lg:top-24
      space-y-7
      border border-gray-100
    "
  >
    <div className="flex items-center gap-2">
      <div className="h-1 w-1 rounded-full bg-blue-600"></div>
      <h3 className="text-lg font-bold text-gray-900">Filters</h3>
    </div>

            {/* ================= GENDER ================= */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                Gender
              </h4>

      <div
        className="
          flex lg:flex-col gap-2
          overflow-x-auto lg:overflow-visible
          pb-2 lg:pb-0
        "
      >
        {["all", "boys", "girls"].map((g) => (
          <button
            key={g}
            onClick={() => {
              setGender(g);
              setCategory("all");
            }}
            className={`
              whitespace-nowrap px-4 py-2.5 rounded-lg
              text-xs sm:text-sm font-semibold tracking-wide
              transition-all duration-300 border
              ${
                gender === g
                  ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
              }
            `}
          >
            {g.toUpperCase()}
          </button>
        ))}
      </div>
    </div>

    {/* ================= CATEGORY ================= */}
    {gender !== "all" && categories.length > 0 && (
      <div className="space-y-3 pt-2">
        <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Category</h4>

        <div
          className="
            flex lg:flex-col gap-2
            overflow-x-auto lg:overflow-visible
            pb-2 lg:pb-0
          "
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`
                whitespace-nowrap px-4 py-2.5 rounded-lg
                text-xs sm:text-sm font-semibold tracking-wide
                transition-all duration-300 border
                ${
                  category === c
                    ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                }
              `}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    )}

    {/* ================= PRICE ================= */}
    <div className="space-y-4 pt-2">
      <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
        Price Range
      </h4>

      <div className="flex justify-between text-sm font-semibold text-gray-700">
        <span>₹{priceRange[0]}</span>
        <span>₹{sliderValue}</span>
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
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </div>
  </div>
</aside>

        {/* PRODUCTS */}
        <main className="lg:col-span-3">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600 font-medium">Loading products...</p>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 pb-10">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product._id}
                  product={product}
                 />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="text-center">
                <p className="text-gray-500 text-lg font-medium mb-2">No products found</p>
                <p className="text-gray-400 text-sm">Try adjusting your filters</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes zoomOnce {
          0% { transform: scale(0.96); }
          60% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .animate-zoomOnce {
          animation: zoomOnce 1.2s ease forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeUp {
          animation: fadeUp 0.8s ease forwards;
        }
      `}</style>
      

    </div>
  );
}

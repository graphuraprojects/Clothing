import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Grid, List, Search, X } from "lucide-react";
import API from "../../api/axios";
import Navbar from "../../components/Home/Navbar";
import ProductCard from "../../components/Home/ProductCard";
import { useShop } from "../../context/ShopContext";
import "./Collections.css";

/* HERO IMAGE */
const HERO_IMAGE =
  "https://res.cloudinary.com/dttjgnypq/image/upload/v1770274090/ALL_Collection_Hero-3_sdcysc.jpg";

/* HERO TEXT */


const CollectionsPage = () => {
  const navigate = useNavigate();

  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 50000]);

  const [tempGender, setTempGender] = useState("All");
  const [tempCategory, setTempCategory] = useState("All");

  const [showFilter, setShowFilter] = useState(false);
  const [products, setProducts] = useState([]);
const [collections, setCollections] = useState([]);

const [selectedCollections, setSelectedCollections] = useState([]);

const [gender, setGender] = useState("");

const [searchTerm, setSearchTerm] = useState("");

const [viewMode, setViewMode] = useState("grid");


  useEffect(() => {
    if (showFilter) {
      setTempGender(selectedGender);
      setTempCategory(selectedCategory);
    }
  }, [showFilter, selectedGender, selectedCategory]);

  /* HERO TYPEWRITER */
  const TITLE_TEXT = "All Collections";
  const SUB_TEXT =
    "Discover our complete range of thoughtfully designed outfits, crafted to elevate every style and every moment.";

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
    }, 80);
    return () => clearInterval(interval);
  }, []);

  /* LOAD PRODUCTS */
  useEffect(() => {
    const loadProducts = async () => {
      const res = await API.get("/products");
      const data = Array.isArray(res.data) ? res.data : res.data.products;

      setProducts(data || []);

      const colls = data
        .flatMap(p => p.collections || [])
        .map(c => c.name);

      setCollections([...new Set(colls)]);
    };

    loadProducts();
  }, []);

  /* COLLECTION TOGGLE */
  const toggleCollection = name => {
    setSelectedCategory("All");
    setGender("");
    setSelectedCollections(prev =>
      prev.includes(name)
        ? prev.filter(c => c !== name)
        : [...prev, name]
    );
  };

  const isKidsSelected = selectedCollections.includes("Kids");

  /* ================= 🔒 STABLE FILTER BASE ================= */
  const filterBaseProducts = products.filter(p => {
    const matchesCollection =
      selectedCollections.length === 0 ||
      p.collections?.some(c => selectedCollections.includes(c.name));

    const matchesGender = !gender || p.gender === gender;

    return matchesCollection && matchesGender;
  });

  /* ================= 🎯 CATEGORY LIST ================= */
  const filteredCategories = [
    "All",
    ...new Set(
      filterBaseProducts
        .map(p => p.category?.name)
        .filter(Boolean)
    ),
  ];

  /* ================= 🧮 FINAL PRODUCT LIST ================= */
  const filteredProducts = filterBaseProducts.filter(product => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const price = product.discountPrice || product.price;
    const matchesPrice =
      price >= priceRange[0] && price <= priceRange[1];

    const matchesCategory =
      selectedCategory === "All" ||
      product.category?.name === selectedCategory;

    return matchesSearch && matchesPrice && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ================= HERO ================= */}
      <div
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
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

      {/* ================= SEARCH + VIEW MODE ================= */}
      <div className="sticky top-20 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-all ${
                    viewMode === "grid"
                      ? "bg-black text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition-all ${
                    viewMode === "list"
                      ? "bg-black text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <List size={20} />
                </button>
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Filter size={20} />
                <span className="text-sm font-medium">Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PREMIUM SECTION COMPONENT ================= */}
      <PremiumSection
        title="Trending Collection"
        subtitle="Discover the styles everyone's talking about this season"
        badgeText="Trending"
        badgeGradient="from-amber-500 to-amber-600"
        accentColor="bg-gradient-to-b from-amber-500 to-amber-600"
        products={products.slice(0, 8)}
        navigate={navigate}
        backgroundColor="bg-gradient-to-b from-gray-50 to-white"
      />

      {/* ================= NEW ARRIVALS SECTION ================= */}
      <PremiumSection
        title="New Arrivals"
        subtitle="Fresh styles just added to our collection"
        badgeText="New"
        badgeGradient="from-rose-500 to-rose-600"
        accentColor="bg-gradient-to-b from-rose-500 to-rose-600"
        products={products.slice(8, 16)}
        navigate={navigate}
        backgroundColor="bg-white"
      />

      {/* ================= BEST SELLERS SECTION ================= */}
      <PremiumSection
        title="Best Sellers"
        subtitle="Customer favorites that keep selling out"
        badgeText="Best Seller"
        badgeGradient="from-blue-500 to-blue-600"
        accentColor="bg-gradient-to-b from-blue-500 to-blue-600"
        products={products.slice(16, 24)}
        navigate={navigate}
        backgroundColor="bg-gradient-to-b from-white to-gray-50"
      />

      {/* ================= FILTERS + PRODUCTS ================= */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* FILTERS - DESKTOP */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-32 max-h-[calc(100vh-140px)] overflow-y-auto">
              <h3 className="permanent-marker-regular font-bold text-lg mb-6 flex items-center gap-2">
                <Filter size={20} /> Filters
              </h3>

              {/* Collections */}
              <div className="mb-6">
                <h4 className="cinzel text-sm font-semibold text-gray-900 mb-3">Collections</h4>
                <div className="flex flex-col gap-2">
                  {collections.map((c) => (
                    <label
                      key={c}
                      className="cinzel flex items-center gap-2 text-sm px-3 py-2 rounded-lg
                        bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCollections.includes(c)}
                        onChange={() => toggleCollection(c)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span>{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Kids Gender */}
              {isKidsSelected && (
                <div className="mb-6">
                  <h4 className="cinzel text-sm font-semibold text-gray-900 mb-2">Gender</h4>
                  <select
                    className="cinzel border border-gray-300 p-2.5 rounded-lg w-full text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                    value={gender}
                    onChange={e => {
                      setGender(e.target.value);
                      setSelectedCategory("All");
                    }}
                  >
                    <option value="">Select Gender</option>
                    <option value="boys">Boys</option>
                    <option value="girls">Girls</option>
                  </select>
                </div>
              )}

              {/* Categories */}
              <div className="mb-6">
                <h4 className="cinzel text-sm font-semibold text-gray-900 mb-3">Category</h4>
                <div className="flex flex-col gap-2">
                  {filteredCategories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(c)}
                      className={`cinzel px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === c
                          ? "bg-black text-white shadow-md"
                          : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Slider */}
              <div className="mb-6">
                <label className="cinzel text-sm font-semibold text-gray-900 block mb-3">
                  Max Price: <span className="text-black font-bold">₹{priceRange[1].toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([0, Number(e.target.value)])
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-2">
                  <span>₹0</span>
                  <span>₹50,000</span>
                </div>
              </div>

              {/* Clear Button */}
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedCollections([]);
                  setGender("");
                  setPriceRange([0, 50000]);
                  setSearchTerm("");
                }}
                className="w-full py-2.5 border-2 border-gray-300 rounded-lg font-medium text-gray-900 hover:bg-black hover:text-white hover:border-black transition-all"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="w-full lg:w-3/4">
            <div className="mb-6">
              <p className="text-gray-600 text-sm">
                Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of <span className="font-semibold text-gray-900">{products.length}</span> products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedCollections([]);
                    setGender("");
                    setPriceRange([0, 50000]);
                    setSearchTerm("");
                  }}
                  className="px-6 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredProducts.map(product => (
                  <div
                    key={product._id}
                    onClick={() =>
                      navigate(`/product/${product._id}`)
                    }
                    className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-4 p-4 group"
                  >
                    <img
                      src={product.colors?.[0]?.images?.[0]}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                        {product.description}
                      </p>
                      <p className="font-bold text-black mt-2">
                        ₹{(
                          product.discountPrice || product.price
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {showFilter && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setShowFilter(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white p-6 overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="cinzel text-lg font-bold">
                Filters
              </h2>
              <button
                onClick={() => setShowFilter(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Collections */}
              <div>
                <h4 className="cinzel text-sm font-semibold text-gray-900 mb-3">Collections</h4>
                <div className="flex flex-col gap-2">
                  {collections.map((c) => (
                    <label
                      key={c}
                      className="cinzel flex items-center gap-2 text-sm px-3 py-2 rounded-lg
                        bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCollections.includes(c)}
                        onChange={() => toggleCollection(c)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span>{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender */}
              {isKidsSelected && (
                <div>
                  <h4 className="cinzel text-sm font-semibold text-gray-900 mb-2">Gender</h4>
                  <select
                    className="cinzel border border-gray-300 p-2.5 rounded-lg w-full text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                    value={gender}
                    onChange={e => {
                      setGender(e.target.value);
                      setSelectedCategory("All");
                    }}
                  >
                    <option value="">Select Gender</option>
                    <option value="boys">Boys</option>
                    <option value="girls">Girls</option>
                  </select>
                </div>
              )}

              {/* Categories */}
              <div>
                <h4 className="cinzel text-sm font-semibold text-gray-900 mb-3">Category</h4>
                <div className="flex flex-col gap-2">
                  {filteredCategories.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedCategory(c);
                        setShowFilter(false);
                      }}
                      className={`cinzel px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === c
                          ? "bg-black text-white shadow-md"
                          : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="cinzel text-sm font-semibold text-gray-900 block mb-3">
                  Max Price: <span className="text-black font-bold">₹{priceRange[1].toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([0, Number(e.target.value)])
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* Clear Button */}
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedCollections([]);
                  setGender("");
                  setPriceRange([0, 50000]);
                  setSearchTerm("");
                  setShowFilter(false);
                }}
                className="w-full py-2.5 border-2 border-gray-300 rounded-lg font-medium text-gray-900 hover:bg-black hover:text-white hover:border-black transition-all"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
// ================= PREMIUM SECTION COMPONENT =================
const PremiumSection = ({
  title,
  subtitle,
  badgeText,
  badgeGradient,
  accentColor,
  products,
  navigate,
  backgroundColor,
}) => {
  return (
    <section className={`py-16 sm:py-20 ${backgroundColor}`}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-1.5 h-8 sm:h-10 ${accentColor} rounded-full`} />
            <h2 className="permanent-marker-regular text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              {title}
            </h2>
          </div>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg ml-0 max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {products.map((product) => (
            <div
              key={`${title}-${product._id}`}
              onClick={() => navigate(`/product/${product._id}`)}
              className="group relative h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer bg-gray-100"
            >
              {/* Product Image */}
              <img
                src={product.colors?.[0]?.images?.[0] || "/placeholder.jpg"}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4 lg:p-5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                {/* Badge */}
                <div className="flex justify-end">
                  <span className={`bg-gradient-to-r ${badgeGradient} text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg backdrop-blur-sm`}>
                    {badgeText}
                  </span>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="text-white/90 font-bold text-xs sm:text-sm lg:text-base">
                      ₹{(product.discountPrice || product.price).toLocaleString()}
                    </p>
                    <button className="bg-white text-gray-900 rounded-full p-2 sm:p-2.5 hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-lg">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Hover Lift Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsPage;
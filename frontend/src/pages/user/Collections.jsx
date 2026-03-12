import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Grid, List, Search } from "lucide-react";
import API from "../../api/axios";
import Navbar from "../../components/Home/Navbar";
import ProductCard from "../../components/Home/ProductCard";
import { useShop } from "../../context/ShopContext";

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ================= HERO ================= */}
      <div
        className="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 max-w-3xl">
          <h1
            className={`permanent-marker-regular text-4xl md:text-6xl font-serif font-bold text-[#FDF2E9] mb-4 ${
              done ? "animate-zoomOnce" : ""
            }`}
          >
            {typedText}
          </h1>
          {done && (
            <p className=" font-dancing text-lg md:text-3xl text-[#FFE8D6] animate-fadeUp">
              {SUB_TEXT}
            </p>
          )}
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="container mx-auto px-4 py-8">
        {/* SEARCH + VIEW */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex bg-white border rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`cursor-pointer ${`p-2 rounded ${
                viewMode === "grid"
                  ? "bg-[#f5f0eb] text-[#8b6f47] font-medium"
                  : "text-gray-600"
              }`}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`cursor-pointer ${`p-2 rounded ${
                viewMode === "list"
                  ? "bg-[#f5f0eb] text-[#8b6f47] font-medium"
                  : "text-gray-600"
              }`}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* FILTERS */}
          <div className="lg:w-1/4">
           <div className=" bg-white rounded-lg shadow-sm p-6 sticky top-24 max-h-[calc(100vh-120px)]
                          overflow-y-auto
                          overscroll-contain
                          focus-within:outline-none
                        " >

              <h3 className="permanent-marker-regular font-bold text-lg mb-6 flex items-center gap-2">
                <Filter size={20} /> Filters
              </h3>

              {/* Collections */}
           <div className="mb-6">
  <div className="
    flex lg:flex-col gap-2
    overflow-x-auto lg:overflow-visible
    pb-2
  ">
    {collections.map((c) => (
      <label
        key={c}
        className="cinzel whitespace-nowrap flex items-center gap-2 
          text-sm px-3 py-2 rounded-lg
          bg-gray-100 hover:bg-gray-200 cursor-pointer"
      >
        <input
          type="checkbox"
          checked={selectedCollections.includes(c)}
          onChange={() => toggleCollection(c)}
          onMouseDown={(e) => e.preventDefault()}
        />
        {c}
      </label>
    ))}
  </div>
</div>


              {/* Kids Gender */}
              {isKidsSelected && (
                <select
                  className="permanent-marker-regular border p-2 rounded w-full mb-6"
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
              )}

              {/* Categories */}
             <div className="
  flex lg:flex-col gap-2
  overflow-x-auto lg:overflow-visible
  pb-2
">
  {filteredCategories.map((c) => (
    <button
      key={c}
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => setSelectedCategory(c)}
      className={`cursor-pointer ${`cinzel whitespace-nowrap
        px-4 py-2 rounded-lg text-sm sm:text-base
        ${
          selectedCategory === c
            ? "bg-[#f5f0eb] text-[#8b6f47] font-medium"
            : "bg-gray-100 hover:bg-gray-200"
        }`}`}
    >
      {c}
    </button>
  ))}
</div>


              {/* Price Slider */}
              <div className="mt-6">
                <label className="cinzel text-sm">
                  Max Price: ₹{priceRange[1]}
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
                  onMouseDown={(e) => e.preventDefault()}
                  className="w-full accent-black"
                />
              </div>

              {/* Clear */}
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedCollections([]);
                  setGender("");
                  setPriceRange([0, 50000]);
                  setSearchTerm("");
                }}
                className="w-full mt-6 border py-2 rounded hover:bg-[#8b6f47] hover:text-white transition-all duration-300 cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="lg:w-3/4">
            <p className="text-gray-600 mb-6">
              Showing {filteredProducts.length} of {products.length} products
            </p>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map(product => (
                 <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <div
                    key={product._id}
                    onClick={() =>
                      navigate(`/product/${product._id}`)
                    }
                    className="bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition cursor-pointer flex gap-4"
                  >
                    <img
                      src={product.colors?.[0]?.images?.[0]}
                      alt={product.name}
                      className="Cinzel w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product.description}
                      </p>
                      <p className="font-bold mt-1">
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
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm cursor-pointer"
          onClick={() => setShowFilter(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white p-6 overflow-y-auto no-scrollbar shadow-2xl cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="cinzel text-lg font-bold">
                Filters
              </h2>
              <button
                onClick={() => setShowFilter(false)}
                className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <X />
              </button>
            </div>

            <div className="space-y-6">
              <FilterContent />
            </div>
          </div>
        </div>
      )}
      

    </div>
  );
};

export default CollectionsPage;

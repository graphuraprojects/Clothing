import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.webp";
import Navbar from "../../components/Home/Navbar";

/* ---------------- DATA ---------------- */
const products = [
  {
    id: 1,
    title: "Ivory Lotus Tunic",
    category: "Tunics & Kurtas",
    fabric: "Mulmul Silk",
    price: 14500,
    image:
      "https://img.theloom.in/live/media/catalog/product/cache/55ec6b27b4851828f8e47373b4790526/f/c/fc25-sht02anas19oct_3_.jpg",
    colors: ["#e6d5b8", "#6b4f3f"],
  },
  {
    id: 2,
    title: "Midnight Indigo Overlay",
    category: "Handloom Sarees",
    fabric: "Khadi Blend",
    price: 18900,
    image:
      "https://cdn.shopify.com/s/files/1/0592/3117/4816/files/Handloom_Cotton_Sarees_480x480.jpg?v=1729418816",
    colors: ["#1f2933", "#6b7280"],
  },
  {
    id: 3,
    title: "Desert Saffron Silk Saree",
    category: "Handloom Sarees",
    fabric: "Organic Cotton",
    price: 42000,
    image:
      "https://www.elahe.in/cdn/shop/files/54_53d9de3a-5c8d-422e-97e1-0c75e3047cc0_2048x.jpg?v=1708323877",
    colors: ["#c2410c", "#fde68a"],
  },
  {
    id: 4,
    title: "Earth Bound Shift",
    category: "All Apparel",
    fabric: "Khadi Blend",
    price: 9800,
    image:
      "https://brownliving.in/cdn/shop/files/elegant-cotton-khadi-handkerchief-dress-for-women-dcss25d02s-dhwani-choksi-s-9543464.jpg?v=1762839134&width=1536",
    colors: ["#78716c", "#d6d3d1"],
  },
  {
    id: 5,
    title: "Oversized Chanderi Shirt",
    category: "All Apparel",
    fabric: "Organic Cotton",
    price: 11500,
    image: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0",
    colors: ["#065f46", "#e5e7eb"],
  },
  {
    id: 6,
    title: "Zardozi Evening Stole",
    category: "Accessories",
    fabric: "Mulmul Silk",
    price: 6500,
    image:
      "https://anjumodi.com/cdn/shop/products/1_a8f1119d-21f8-4386-9c01-c9be7b186cc9_393x@3x.progressive.jpg?v=1736159924",
    colors: ["#92400e", "#facc15"],
  },
];

/* ---------------- COMPONENT ---------------- */
const SilkRouteCollection = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [fabric, setFabric] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const categories = [
    "All",
    "All Apparel",
    "Tunics & Kurtas",
    "Handloom Sarees",
    "Accessories",
  ];

  const fabrics = ["All", "Mulmul Silk", "Organic Cotton", "Khadi Blend"];

  /* -------- FILTER + SORT -------- */
  const filteredProducts = useMemo(() => {
    let data = products.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" || p.category === category;
      const matchFabric = fabric === "All" || p.fabric === fabric;
      return matchSearch && matchCategory && matchFabric;
    });

    if (sortBy === "low-high") data.sort((a, b) => a.price - b.price);
    if (sortBy === "high-low") data.sort((a, b) => b.price - a.price);

    return data;
  }, [search, category, fabric, sortBy]);

  return (
    <div className="bg-[#faf8f5] min-h-screen">
      {/*Shop Collection Navbar */}
      <Navbar />

      {/* ---------- HEADER ---------- */}
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-8">
        <p className="text-xs text-gray-500 mb-2 tracking-wide">
          HOME / COLLECTIONS /{" "}
          <span className="text-gray-800">THE SILK ROUTE</span>
        </p>

        <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
          <div>
            <h1 className="cinzel text-4xl font-light mb-3">The Silk Route</h1>
            <p className="max-w-xl text-gray-600">
              A curated collection of hand-woven silks and organic textiles
              inspired by the heritage of the Indian subcontinent.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {filteredProducts.length} Products
            </span>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border rounded-full px-4 py-2 pr-10 text-sm"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- CONTENT ---------- */}
      <div className="max-w-7xl mx-auto px-4 pb-20 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* FILTERS */}
        <aside className="bg-white rounded-2xl p-6 h-fit sticky top-20">
          <div className="flex items-center gap-2 mb-6 font-semibold text-sm">
            <Filter size={16} /> Filters
          </div>

          <div className="mb-6 relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products"
              className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm"
            />
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-3 text-sm">Category</h4>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`cursor-pointer ${`group relative block w-full text-left text-sm mb-2 px-4 py-2.5 rounded-xl
                transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                hover:translate-x-1 active:scale-[0.97]
                ${
                  category === c
                    ? "bg-[#f5f0eb] text-[#8b6f47] font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div>
            <h4 className="font-medium mb-3 text-sm">Fabric</h4>
            {fabrics.map((f) => (
              <button
                key={f}
                onClick={() => setFabric(f)}
                className={`cursor-pointer ${`block w-full text-left text-sm mb-2 ${
                  fabric === f ? "font-semibold text-[#8b6f47]" : "text-gray-600"
                }`}`}
              >
                {f}
              </button>
            ))}
          </div>
        </aside>

        {/* PRODUCTS */}
        <section className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="
          cursor-pointer group
          transition-all duration-500 ease-out
          hover:-translate-y-2
        "
              >
                {/* Image */}
                <div
                  className="
            aspect-3/4 overflow-hidden rounded-2xl
            bg-gray-100
            shadow-sm
            transition-all duration-500 ease-out
            group-hover:shadow-xl
          "
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="
              w-full h-full object-cover
              transition-transform duration-500 ease-out
              group-hover:scale-105
            "
                  />
                </div>

                {/* Content */}
                <div
                  className="
            mt-4
            transition-all duration-300
          "
                >
                  <p className="text-xs tracking-wider text-gray-500 uppercase">
                    {product.fabric}
                  </p>

                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-[#8b6f47] transition">
                    {product.title}
                  </h3>

                  {/* Colors */}
                  <div className="flex gap-2 mt-2">
                    {product.colors.map((c, i) => (
                      <span
                        key={i}
                        style={{ backgroundColor: c }}
                        className="
                  w-4 h-4 rounded-full
                  border border-gray-300
                  transition-transform
                  group-hover:scale-110
                "
                      />
                    ))}
                  </div>

                  <p className="mt-2 font-semibold text-sm text-gray-900">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* LOADER */}
          <div className="flex flex-col items-center py-20">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
            <p className="mt-4 text-xs tracking-widest text-gray-400">
              DISCOVERING MORE HERITAGE...
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SilkRouteCollection;

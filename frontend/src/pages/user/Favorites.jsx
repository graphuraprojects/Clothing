import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/axios";
import ProductCard from "../../components/Home/ProductCard";
import Navbar from "../../components/Home/Navbar";

function Favorites() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [wishlistRaw, setWishlistRaw] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const loadData = async () => {
      try {
        const [meRes, productsRes] = await Promise.all([
          API.get("/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          API.get("/products"),
        ]);

        setWishlistRaw(meRes.data.wishlist || []);
        setProducts(productsRes.data.products || productsRes.data || []);
      } catch (err) {
        console.error("Failed to load favorites", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) loadData();
  }, [token]);

  /* ================= NORMALIZE WISHLIST ================= */
  const wishlistIds = useMemo(() => {
    return wishlistRaw.map(item =>
      typeof item === "string"
        ? item
        : item.product?._id || item.product || item._id
    );
  }, [wishlistRaw]);

  const favoriteProducts = useMemo(() => {
    return products.filter(p => wishlistIds.includes(p._id));
  }, [products, wishlistIds]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 skeleton-luxury" />
            <div className="h-4 w-32 skeleton-luxury" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="skeleton-luxury aspect-[3/4]" />
                  <div className="skeleton-luxury h-4 w-3/4" />
                  <div className="skeleton-luxury h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================= EMPTY ================= */
  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
            <Heart size={32} className="text-red-300" />
          </div>
          <h2 className="cinzel text-2xl font-light text-gray-900 mb-2">
            No favorites yet
          </h2>
          <p className="text-[14px] text-gray-400 mb-8 max-w-sm">
            Tap the heart on products you love to save them here
          </p>
          <button
            onClick={() => navigate("/collections")}
            className="inline-flex items-center gap-2 bg-[#8b6f47] text-white text-[12px] font-medium tracking-[0.15em] uppercase px-8 py-3.5
              hover:bg-[#7a6140] border border-[#8b6f47] transition-all duration-300 cursor-pointer"
          >
            Start Shopping
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-2">Your Wishlist</p>
            <h1 className="cinzel text-3xl md:text-4xl font-light text-gray-900">My Favorites</h1>
          </div>
          <p className="text-[13px] text-gray-400 tracking-wide">
            {favoriteProducts.length} saved {favoriteProducts.length === 1 ? "item" : "items"}
          </p>
        </div>

        {/* GRID */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          <AnimatePresence>
            {favoriteProducts.map((product, index) => (
              <motion.div
                key={`${product._id}-${index}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default Favorites;
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function ProductCard({
  product,
  isWishlisted: isWishlistedProp,
  onWishlistToggle,
}) {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [wishlisted, setWishlisted] = useState(!!isWishlistedProp);
  const [loading, setLoading] = useState(false);

  /* ================= SYNC WITH PROPS ================= */
  useEffect(() => {
    if (typeof isWishlistedProp === "boolean") {
      setWishlisted(isWishlistedProp);
    }
  }, [isWishlistedProp]);

  /* ================= PRICE SAFETY ================= */
  const sellingPrice =
    product?.discountPrice ??
    product?.price ??
    0;

  const originalPrice =
    product?.price ??
    sellingPrice;

  const hasDiscount =
    product?.discountPrice &&
    product.discountPrice < product.price;

  /* ================= NAV ================= */
  const goToDetails = () => {
    navigate(`/product/${product._id}`);
  };

  /* ================= WISHLIST ================= */
  const handleWishlistToggle = async (e) => {
    e.stopPropagation();

    // allow parent to control (Favorites page)
    if (onWishlistToggle) {
      onWishlistToggle(product);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/user/login");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      await API.post(
        `/cart/wishlist/${product._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // optimistic UI
      setWishlisted(prev => !prev);

    } catch (err) {
      console.error(
        "Wishlist error:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={goToDetails}
      className="cursor-pointer group"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-lg bg-[#f5f0eb] shadow-sm transition-shadow duration-500 group-hover:shadow-xl">
        <img
          src={product.image || product.colors?.[0]?.images?.[0]}
          alt={product.name}
          className="w-full aspect-[3/4] object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-110"
        />

        {/* HOVER OVERLAY */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />

        {/* DISCOUNT BADGE */}
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-[#8b6f47] text-white text-[10px] font-medium tracking-wider px-3 py-1.5 uppercase rounded-sm">
            {Math.round(
              ((originalPrice - sellingPrice) / originalPrice) * 100
            )}
            % Off
          </span>
        )}

        {/* ❤️ WISHLIST */}
        <button
          onClick={handleWishlistToggle}
          className={`cursor-pointer ${`absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-md
            transition-all duration-300 hover:scale-110
            ${
              wishlisted
                ? "bg-red-50 text-red-500 shadow-md"
                : "bg-white/80 text-gray-600 hover:bg-white hover:shadow-md opacity-0 group-hover:opacity-100"
            }
            ${wishlisted ? "opacity-100" : ""}`}`}
        >
          <Heart
            size={15}
            className={`transition-all duration-300 ${wishlisted ? "fill-red-500 scale-110" : ""}`}
          />
        </button>

        {/* QUICK VIEW — appears on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToDetails();
            }}
            className="w-full py-2.5 bg-white/95 backdrop-blur-md text-gray-800 text-[11px] font-medium tracking-[0.15em] uppercase
              hover:bg-white shadow-sm transition-all duration-300 cursor-pointer"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* INFO */}
      <div className="pt-4 space-y-1.5">
        {product.category && (
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] font-medium">
            {product.category?.name || product.category}
          </p>
        )}

        <h4 className="cinzel text-[14px] font-medium text-gray-900 line-clamp-1 tracking-wide">
          {product.name}
        </h4>

        {/* PRICE */}
        <div className="flex items-center gap-2.5 pt-0.5">
          <span className="text-[14px] font-semibold text-gray-900 tracking-wide">
            ₹{sellingPrice.toLocaleString()}
          </span>

          {hasDiscount && (
            <span className="text-[12px] text-gray-400 line-through font-light">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

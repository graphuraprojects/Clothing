import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  product,
  onWishlistToggle,
  isWishlisted = false,
  showViewButton = true,
}) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/product/${product._id}`);
  };

  const handleViewClick = (e) => {
    e.stopPropagation();
    goToDetails();
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    onWishlistToggle?.(product);
  };

  const hasDiscount = product.discountPercent > 0;
  const finalPrice = product.discountPrice || product.price;

  return (
    <div
      onClick={goToDetails}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
    >
      {/* IMAGE */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.colors?.[0]?.images?.[0] || "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* DISCOUNT */}
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
            {product.discountPercent}% OFF
          </span>
        )}

        {/* HEART */}
        <button
          onClick={handleWishlistClick}
          className={`cursor-pointer ${`absolute top-3 right-3 bg-white p-2 rounded-full shadow ${
            isWishlisted ? "text-red-500" : "text-gray-600"
          }`}`}
        >
          <Heart
            size={16}
            className={isWishlisted ? "fill-red-500" : ""}
          />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 text-center">
        <h3 className="font-medium text-sm line-clamp-2">
          {product.name}
        </h3>

        {product.category?.name && (
          <p className="text-gray-500 text-xs mt-1">
            {product.category.name}
          </p>
        )}

        {/* PRICE */}
        <div className="flex justify-center items-center gap-2 mt-2">
          <span className="font-semibold">
            ₹{finalPrice.toLocaleString()}
          </span>

          {product.discountPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* VIEW BUTTON */}
        {showViewButton && (
          <button
            onClick={handleViewClick}
            className="mt-3 w-full py-2 rounded-full text-sm border border-black hover:bg-black hover:text-white transition cursor-pointer"
          >
            View Product
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

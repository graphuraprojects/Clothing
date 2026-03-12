import { Heart } from "lucide-react";

const ProductCard = ({ product, onClick, onWishlist, wished }) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
    >
      {/* IMAGE */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.title || product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* TAG */}
        {product.tag && (
          <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
            {product.tag}
          </span>
        )}

        {/* WISHLIST */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWishlist?.();
          }}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow cursor-pointer"
        >
          <Heart
            size={16}
            className={
              wished ? "fill-red-500 text-red-500" : "text-gray-600"
            }
          />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 text-center">
        <h3 className="font-medium text-sm line-clamp-2">
          {product.title || product.name}
        </h3>

        <p className="text-gray-500 text-xs mt-1">
          {product.category}
        </p>

        <p className="font-semibold mt-2">₹{product.price}</p>

        <button className="mt-3 w-full py-2 rounded-full text-sm border border-black hover:bg-black hover:text-white transition cursor-pointer">
          View Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
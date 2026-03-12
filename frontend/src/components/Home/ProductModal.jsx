// components/ProductModal.jsx
import { useEffect } from 'react';
import { X, Star, ShoppingBag, Heart, Share2, Truck, Shield, RefreshCw } from 'lucide-react';

const ProductModal = ({ product, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={18}
          className={i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      );
    }
    return stars;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 cursor-pointer" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg cursor-pointer"
          >
            <X size={24} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Left side - Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={product.images?.[0] || 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop'}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images?.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(0, 4).map((img, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <img
                        src={img}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right side - Product Info */}
            <div className="space-y-6">
              {/* Category & Title */}
              <div>
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-2">
                  {product.category}
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h2>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">{renderStars(product.rating || 4.5)}</div>
                  <span className="text-gray-600">
                    {product.rating?.toFixed(1)} ({product.reviews || 0} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price?.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.originalPrice?.toLocaleString()}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm font-bold">
                      Save {product.discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Variants if available */}
              {product.variants && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Available Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant, index) => (
                      <button
                        key={index}
                        className={`cursor-pointer ${`px-4 py-2 rounded-lg border ${
                          variant.inStock
                            ? 'border-gray-300 hover:border-purple-500 hover:bg-purple-50'
                            : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}`}
                        disabled={!variant.inStock}
                      >
                        {variant.size}
                        {!variant.inStock && ' (Out of stock)'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Details if available */}
              {product.details && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Product Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {Object.entries(product.details).slice(0, 6).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-gray-500">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <button className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                    <ShoppingBag size={20} />
                    Add to Cart
                  </button>
                  <button className="p-3 border border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-colors cursor-pointer">
                    <Heart size={20} />
                  </button>
                  <button className="p-3 border border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-colors cursor-pointer">
                    <Share2 size={20} />
                  </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <Truck className="mx-auto mb-2 text-purple-600" size={24} />
                    <span className="text-sm font-medium">Free Shipping</span>
                  </div>
                  <div className="text-center">
                    <Shield className="mx-auto mb-2 text-purple-600" size={24} />
                    <span className="text-sm font-medium">Secure Payment</span>
                  </div>
                  <div className="text-center">
                    <RefreshCw className="mx-auto mb-2 text-purple-600" size={24} />
                    <span className="text-sm font-medium">Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
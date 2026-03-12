import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import SectionAccordion from "../../components/SectionAccordion";
import ProductCard from "../../components/Home/ProductCard";
import ProductSkeleton from "../../components/ProductSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import API from "../../api/axios";

import "swiper/css";
import "swiper/css/navigation";
import { X, ZoomIn, AlertCircle } from "lucide-react";
// Import from lucide-react instead of react-icons/fi
import {
  Heart,
  ShoppingCart,
  Share2,
  ChevronLeft,
  ChevronRight,
  User,
  ShoppingBag,
  ArrowLeft,
  Check,
  Star,
  Package,
  Truck,
  RefreshCw,
  Shield
} from "lucide-react";

import Navbar from "../../components/Home/Navbar";

function ProductDetails() {
  // URL and navigation
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, cart } = useShop();

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Product and variant states
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  
  // Image states
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  
  // Cart and UI states
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showWishlistMessage, setShowWishlistMessage] = useState(false);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  // ============ DATA FETCHING ============
  const loadProduct = useCallback(async () => {
    // Safety check
    if (!id) {
      setError("Product ID is invalid");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch product details
      const productRes = await API.get(`/products/${id}`, {
        timeout: 10000, // 10 second timeout
      });
      
      if (!productRes.data) {
        throw new Error("No product data received from server");
      }

      const prod = productRes.data;
      
      // Validate product has required fields
      if (!prod._id || !prod.name) {
        throw new Error("Product data is incomplete");
      }

      setProduct(prod);
      
      // Set initial color
      if (prod.colors && prod.colors.length > 0) {
        setSelectedColor(prod.colors[0]);
      } else if (prod.colors) {
        setSelectedColor(null);
      }
      
      // Reset image selection
      setSelectedImage(0);
      setImageLoading(true);

      // Fetch related products
      try {
        const relRes = await API.get("/products", {
          timeout: 10000,
        });

        const allProducts = Array.isArray(relRes.data)
          ? relRes.data
          : relRes.data?.products || [];

        const related = allProducts
          .filter((p) => p._id !== prod._id && p.category === prod.category)
          .slice(0, 4);

        setRelatedProducts(related);
      } catch (relErr) {
        console.warn("Failed to fetch related products:", relErr.message);
        // Don't fail the entire load if related products fail
        setRelatedProducts([]);
      }

    } catch (err) {
      console.error("Product loading error:", err);
      
      let errorMessage = "Failed to load product";
      
      if (err.response?.status === 404) {
        errorMessage = "Product not found";
      } else if (err.response?.status === 500) {
        errorMessage = "Server error. Please try again later";
      } else if (err.code === "ECONNABORTED") {
        errorMessage = "Request timeout. Please check your connection";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Load product when ID changes
  useEffect(() => {
    loadProduct();
  }, [id, loadProduct]);

  // Set initial size when product or color changes
  useEffect(() => {
    if (product?.inventory && product.inventory.length > 0) {
      const firstSize = product.inventory[0].size;
      setSelectedSize(firstSize);
    } else {
      setSelectedSize(null);
    }
  }, [product]);



  // ============ DERIVED VALUES ============
  const selectedVariant = product?.inventory?.find(
    (i) => i.size === selectedSize && i.color === selectedColor?.name
  );

  const variantStock = selectedVariant?.stock || 0;

  const sizes = product?.inventory
    ? Array.from(new Set(product.inventory.map((i) => i.size))).sort()
    : [];

  const isInWishlist =
    product && Array.isArray(wishlist) && wishlist.includes(product._id);

  const isInCart =
    product &&
    cart.some(
      (item) =>
        item.id === product._id &&
        item.size === selectedSize &&
        item.color === selectedColor?.name
    );

  // ============ EVENT HANDLERS ============
  const handleAddToCart = useCallback(async () => {
    // Validate prerequisites
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/user/login");
      return;
    }

    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    if (!product) {
      alert("Product data is not loaded");
      return;
    }

    try {
      const cartItem = {
        product: product._id,
        name: product.name,
        price: product.discountPrice || product.price,
        image: product.colors?.[0]?.images?.[0],
        size: selectedSize,
        color: selectedColor?.name,
        quantity,
      };

      await API.post("/cart", cartItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update local cart state
      addToCart({
        id: product._id,
        name: product.name,
        price: product.discountPrice || product.price,
        image: product.colors?.[0]?.images?.[0],
        size: selectedSize,
        color: selectedColor?.name,
        quantity,
      });

      setShowCartMessage(true);
      setTimeout(() => setShowCartMessage(false), 3000);
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Failed to add to cart. Please try again.");
    }
  }, [product, selectedSize, selectedColor, quantity, navigate, addToCart]);

  const handleBuyNow = useCallback(() => {
    handleAddToCart();
    setTimeout(() => navigate("/checkout"), 300);
  }, [handleAddToCart, navigate]);

  const handleWishlistToggle = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/user/login");
      return;
    }

    if (!product) {
      alert("Product data is not loaded");
      return;
    }

    try {
      await API.post(
        `/cart/wishlist/${product._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowWishlistMessage(true);
      setTimeout(() => setShowWishlistMessage(false), 3000);
    } catch (err) {
      console.error("Wishlist error:", err);
      alert("Failed to update wishlist");
    }
  }, [product, navigate]);

  const handleShare = useCallback(() => {
    if (!product) return;

    const shareData = {
      title: product.name,
      text: `Check out ${product.name} on Graphura - ₹${product.price}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  }, [product]);

  const handleImageNavigation = useCallback((direction) => {
    // Get the images array from selectedColor or default to first color
    const currentImages =
      selectedColor?.images || product?.colors?.[0]?.images || [];

    if (!currentImages || currentImages.length === 0) return;

    const newIndex =
      direction === "next"
        ? (selectedImage + 1) % currentImages.length
        : (selectedImage - 1 + currentImages.length) % currentImages.length;

    setSelectedImage(newIndex);
  }, [selectedColor, product, selectedImage]);

  const handleColorSelect = useCallback((color) => {
    setSelectedColor(color);
    setSelectedImage(0);
    setImageLoading(true);
  }, []);

  const handleQuantityChange = useCallback((change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (variantStock || 10)) {
      setQuantity(newQuantity);
    }
  }, [quantity, variantStock]);

  const handleImageZoom = useCallback((e) => {
    if (!product) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);

    if (!clientX || !clientY) return;

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
    setIsZoomed(true);
  }, [product]);

  const handleMouseMove = useCallback((e) => {
    if (isZoomed) {
      handleImageZoom(e);
    }
  }, [isZoomed, handleImageZoom]);

  // ============ RENDER STATES ============
  if (loading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-4">
            <AlertCircle size={64} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error === "Product not found" ? "Product Not Found" : "Oops! Something went wrong"}
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "Unable to load the product. Please try again."}
          </p>
          <div className="space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/collections")}
              className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors inline-block"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/collections")}
            className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // const ProductNavbar = () => (
  //   <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
  //     <div className="w-full px-6">
  //       <div className="flex justify-between items-center h-16 px-4">
  //         {/* Logo */}
  //         <div className="flex items-center justify-start">
  //           <img className="w-auto h-15" src={graphura} alt="Graphura Logo" />
  //         </div>

  //         {/* Desktop Navigation */}
  //         <div className="hidden md:flex items-center space-x-8">
  //           <a
  //             href="/contactus"
  //             className="text-gray-600 hover:text-black font-medium transition"
  //           >
  //             Support
  //           </a>
  //         </div>

  //         {/* Desktop Icons */}
  //         <div className="hidden md:flex items-center space-x-6">
  //           <button className="text-gray-600 hover:text-black relative">
  //             <ShoppingBag size={20} />
  //             <span className="absolute -top-1 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
  //               {cart.length}
  //             </span>
  //           </button>
  //           <button
  //             onClick={() => navigate("/favorites")}
  //             className="text-gray-600 hover:text-red-500 relative transition-colors"
  //           >
  //             <Heart size={20} />
  //             {wishlist.length > 0 && (
  //               <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
  //                 {wishlist.length > 9 ? "9+" : wishlist.length}
  //               </span>
  //             )}
  //           </button>
  //           <button className="text-gray-600 hover:text-black">
  //             <User size={20} />
  //           </button>
  //         </div>

  //         {/* Mobile Menu Button */}
  //         <div className="md:hidden flex items-center">
  //           <button
  //             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  //             className="text-gray-600 focus:outline-none"
  //           >
  //             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
  //           </button>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Mobile Menu Dropdown */}
  //     {isMobileMenuOpen && (
  //       <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg">
  //         <div className="px-4 pt-2 pb-6 space-y-2">
  //           <a
  //             href="/contactus"
  //             className="block px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-50 rounded-md"
  //           >
  //             Support
  //           </a>

  //           <a
  //             href="#"
  //             className="block px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-50 rounded-md"
  //           >
  //             My Account
  //           </a>
  //         </div>
  //       </div>
  //     )}
  //   </nav>
  // );

  return (
    <>
    {/* <ProductNavbar /> */}
    <Navbar/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-8 grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="lg:sticky lg:top-24 self-start relative">

          <div className="l-1xl relative rounded-2xl overflow-hidden shadow-lg">
            <div className="relative w-full">
              <div className="relative pt-[100%] md:pt-[75%] overflow-hidden cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onClick={handleImageZoom}>
             <img
  src={selectedColor?.images?.[selectedImage]}
  alt={`${product.name} - View ${selectedImage + 1}`}
  className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 pointer-events-none ${
    isZoomed ? "scale-150" : "hover:scale-105"
  } ${imageLoading ? "opacity-0" : "opacity-100"}`}
  style={{
    transformOrigin: isZoomed
      ? `${zoomPosition.x}% ${zoomPosition.y}%`
      : "center",
  }}
  onLoad={() => setImageLoading(false)}
  loading="lazy"
/>


                {/* Wishlist button on image */}
               {/* ❤️ Wishlist button (ON IMAGE) */}
{/* <button
  onClick={(e) => {
    e.stopPropagation();
    handleWishlistToggle();
  }}
  className="absolute top-4 right-4 w-12 h-12 rounded-full
             flex items-center justify-center
             shadow-lg transition-all duration-300
             z-[999]
             pointer-events-auto
             bg-white/90 backdrop-blur-sm hover:bg-white"
>
  <Heart size={24} />
</button> */}



                {/* Zoom indicator */}
                {!isZoomed && (
                  <div className="absolute bottom-4 right-4 bg-black/50 pointer-events-none text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                    <ZoomIn size={16} className="inline mr-1" />
                    Click to zoom
                  </div>
                )}

                {/* Close zoom button */}
                {isZoomed && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsZoomed(false);
                    }}
                    className="absolute top-4 left-4 bg-black/60 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/80 transition-colors shadow-lg z-20"
                    title="Exit zoom"
                    aria-label="Exit zoom mode"
                  >
                    <X size={20} className="sm:size-6" />
                  </button>
                )}
              </div>
            </div>

          {(selectedColor?.images || product.colors?.[0]?.images)?.length >= 1 && (

              <>
                <button
                  onClick={() => handleImageNavigation("prev")}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-md z-10"
                >
                  <ChevronLeft className="text-xl" />
                </button>
                <button
                  onClick={() => handleImageNavigation("next")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-md z-10"
                >
                  <ChevronRight className="text-xl" />
                </button>
              </>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.discount > 0 && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                  {product.discount}% OFF
                </span>
              )}
              {variantStock < 10 && variantStock > 0 && (
                <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                  Only {variantStock} left
                </span>
              )}
              {variantStock === 0 && (
                <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                  Out of Stock
                </span>
              )}
              {product.details?.featured && (
                <span className="bg-blue-500 text-white px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold shadow-md">
                  Featured
                </span>
              )}
            </div>
          </div>

         {(selectedColor?.images || product.colors?.[0]?.images)?.length >= 1 && (

            <div className="grid grid-cols-4 gap-3 mt-4">
            {(selectedColor?.images || product.colors?.[0]?.images || []).map((img,index)=>(
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImage(index);
                    setIsZoomed(false);
                  }}
                  className={`rounded-xl overflow-hidden border-2 transition-all relative ${selectedImage === index ? "border-blue-600 scale-105 ring-2 ring-blue-100" : "border-transparent hover:border-gray-300"}`}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-16 sm:h-24 object-cover"
                    loading="lazy"
                  />
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-blue-600/10"></div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-500 flex items-center">
            <button
              onClick={() => navigate("/")}
              className="hover:text-black transition-colors flex items-center"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back
            </button>
            <span className="mx-2">•</span>
            <button
              onClick={() => navigate("/")}
              className="hover:text-black transition-colors"
            >
              Home
            </button>
            <span className="mx-2">/</span>
            <button
              onClick={() => navigate("/collections")}
              className="hover:text-black transition-colors"
            >
              Collections
            </button>
            <span className="mx-2">/</span>
            <span className="text-black font-medium truncate">
              {product.name}
            </span>
          </nav>

          {/* Product Header */}
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                {product.category?.name}
              </p>
              {/* <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                SKU: {product.sku}
              </span> */}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center">
               <span className="text-2xl font-bold text-gray-900">
  ₹{(product.discountPrice || product.price).toLocaleString()}
                      </span>

                {product.discountPrice && product.discountPrice < product.price && (
                    <>
                      <span className="ml-3 text-gray-500 line-through">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="ml-2 bg-red-100 text-green-600 text-sm font-semibold px-2 py-0.5 rounded">
                        Save ₹
                       {(
                          product.price - product.discountPrice
                        ).toLocaleString()}

                      </span>
                    </>
                  )}
              </div>
            </div>
          </div>

          {/* Rating & Share */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400"
                        : "stroke-yellow-400"
                    }
                  />
                ))}
              </div>
              <span className="text-sm sm:text-base text-gray-600">
                {(product?.rating ?? 0).toFixed(1)} • {product.reviews} reviews
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
              >
                <Share2 size={20} />
                <span className="text-sm hidden sm:inline">Share</span>
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-4 border-t">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
              <Truck size={16} className="sm:size-4" />
              <span>Free Shipping</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
              <RefreshCw size={16} className="sm:size-4" />
              <span>30 Day Returns</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
              <Shield size={16} className="sm:size-4" />
              <span>2 Year Warranty</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
              <Package size={16} className="sm:size-4" />
              <span>Authentic</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="font-medium mb-3 text-sm sm:text-base text-gray-900">
                Color:{" "}
                <span className="font-semibold text-gray-700">
                  {selectedColor?.name}
                </span>
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => handleColorSelect(color)}
                    className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-transform shadow-sm ${selectedColor?.id === color.id ? "border-black scale-110 ring-2 ring-black ring-opacity-20" : "border-gray-300 hover:scale-105"}`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                    aria-label={`Select ${color.name} color`}
                  >
                    {selectedColor?.id === color.id && (
                      <div className="absolute inset-0 border-2 border-white rounded-full"></div>
                    )}
                    {selectedColor?.id === color.id && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-black rounded-full flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {/* {product.variants && product.variants.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-sm sm:text-base text-gray-900">
                  Select Size
                </h3>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs sm:text-sm text-blue-600 hover:underline font-medium"
                >
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.size}
                    onClick={() => setSelectedSize(variant.size)}
                    disabled={!variant.inStock}
                    className={`relative py-2 sm:py-3 px-2 sm:px-3 rounded-lg text-center border text-sm sm:text-base transition-all ${selectedSize === variant.size ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100 text-blue-700" : "border-gray-200 hover:border-gray-400 text-gray-700"} ${!variant.inStock ? "opacity-50 cursor-not-allowed bg-gray-100" : "hover:shadow-md"}`}
                    aria-label={`Size ${variant.size} ${variant.inStock ? "available" : "out of stock"}`}
                  >
                    <span
                      className={`font-medium ${!variant.inStock ? "text-gray-400" : ""}`}
                    >
                      {variant.size}
                    </span>
                    {!variant.inStock && (
                      <span className="block text-xs text-gray-400 mt-0.5">
                        Out of stock
                      </span>
                    )}
                    {selectedSize === variant.size && variant.inStock && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )} */}
          {/* Size Selection */}
{sizes.length > 0 && (
  <div>
    <div className="flex justify-between items-center mb-3">
      <h3 className="font-medium text-sm sm:text-base text-gray-900">
        Select Size
      </h3>
      <button
        onClick={() => setShowSizeGuide(true)}
        className="text-xs sm:text-sm text-blue-600 hover:underline font-medium"
      >
        Size Guide
      </button>
    </div>

    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
      {sizes.map((size) => {
        const stock = product.inventory.find(
          i => i.size === size && i.color === selectedColor?.name
        )?.stock ?? 0;

        return (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            disabled={stock === 0}
            className={`relative py-2 px-3 rounded-lg border ${
              selectedSize === size
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200"
            } ${stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {size}
          </button>
        );
      })}
    </div>
  </div>
)}


          {/* Quantity & Stock */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-900">Quantity</h3>
              <span
                className={`text-sm ${variantStock < 10 ? "text-amber-600" : "text-green-600"}`}
              >
                {variantStock} items in stock
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-200 rounded-lg shadow-sm">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="px-3 sm:px-4 py-2 sm:py-3 text-gray-600 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Decrease quantity"
                >
                  –
                </button>
                <span className="w-10 sm:w-12 text-center font-medium text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= variantStock}
                  className="px-4 py-3 text-gray-600 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Delivery Estimate */}
          <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start sm:items-center gap-2 sm:gap-3">
              <Truck className="text-blue-600 flex-shrink-0" size={18} />
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-900">
                  Delivery Estimate
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {product.stock > 0
                    ? `Free delivery by ${new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })}`
                    : "Available for pre-order. Ships in 2-3 weeks"}
                </p>
              </div>
            </div>
          </div>

          {/* Success Messages */}
          {showWishlistMessage && (
            <div className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg animate-fadeIn">
              <p className="text-green-700 font-medium flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-sm sm:text-base">
                <Heart
                  size={18}
                  className="fill-green-600 text-green-600 flex-shrink-0 sm:size-5"
                />
                <span>
                  Added to favorites!
                  <button
                    onClick={() => navigate("/favorites")}
                    className="ml-0 sm:ml-2 block sm:inline text-green-800 underline font-semibold hover:text-green-900"
                  >
                    View favorites
                  </button>
                </span>
              </p>
            </div>
          )}

          {showCartMessage && (
            <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg animate-fadeIn">
              <p className="text-blue-700 font-medium flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-sm sm:text-base">
                <ShoppingCart
                  size={18}
                  className="fill-blue-600 text-blue-600 flex-shrink-0 sm:size-5"
                />
                <span>
                  Item added to cart!
                  <button
                    onClick={() => navigate("/cart")}
                    className="ml-0 sm:ml-2 block sm:inline text-blue-800 underline font-semibold hover:text-blue-900"
                  >
                    View cart
                  </button>
                </span>
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 sm:space-y-4 pt-4 border-t">
            <button
              onClick={handleBuyNow}
              disabled={!selectedSize || product.stock === 0}
              className={`w-full py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl ${
                !selectedSize || product.stock === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-linear-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
              }`}
            >
              {product.stock === 0 ? "Out of Stock" : "Buy Now"}
            </button>

            <button
              onClick={() => navigate("/ai-try-on")}
              className="w-full py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md"
            >
              Try your clothes
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || product.stock === 0 || isInCart}
                className={`py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-md hover:shadow-lg ${
                  isInCart
                    ? "bg-green-100 text-green-700 border-2 border-green-300"
                    : !selectedSize || product.stock === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-900 text-white hover:bg-black"
                }`}
              >
                <ShoppingCart size={18} className="sm:size-5" />
                <span className="font-semibold">
                  {isInCart ? "✓ Added" : "Add to Cart"}
                </span>
              </button>

              <button
                onClick={handleWishlistToggle}
                className={`py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base border-2 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-md hover:shadow-lg ${
                  isInWishlist
                    ? "border-red-500 text-red-600 bg-red-50 hover:bg-red-100"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700"
                }`}
              >
                <Heart
                  size={18}
                  className={`sm:size-5 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`}
                />
                <span className="font-semibold">
                  {isInWishlist ? "Wishlist" : "Save"}
                </span>
              </button>
            </div>
          </div>

          {/* Tabs for Product Details */}
          <div className="mt-6 sm:mt-8">
            <div className="border-b border-gray-200 overflow-x-auto">
              <div className="flex space-x-4 sm:space-x-8 min-w-max sm:min-w-0">
                {["description", "details", "shipping", "reviews"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-2 sm:py-3 px-1 font-medium text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="py-6">
              {activeTab === "description" && (
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                  {product.details?.features && (
                    <ul className="mt-4 space-y-2">
                      {product.details.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-gray-600"
                        >
                          <Check
                            size={16}
                            className="text-green-500 mt-1 shrink-0-flex"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {activeTab === "details" && (
                <div className="space-y-4">
                  {product.details &&
                    Object.entries(product.details).map(
                      ([key, value]) =>
                        key !== "features" &&
                        key !== "delivery" &&
                        key !== "return" && (
                          <div
                            key={key}
                            className="flex justify-between py-2 border-b border-gray-100"
                          >
                            <span className="font-medium text-gray-700 capitalize">
                              {key.replace(/([A-Z])/g, " $1")}:
                            </span>
                            <span className="text-gray-600">{value}</span>
                          </div>
                        ),
                    )}
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Shipping Information
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <Truck size={16} className="text-green-500" />
                        <span>
                          Free standard shipping on orders above ₹2000
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Package size={16} className="text-blue-500" />
                        <span>Express shipping available at ₹200</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <RefreshCw size={16} className="text-purple-500" />
                        <span>30-day easy return policy</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <span className="text-3xl font-bold text-gray-900">
                        {(product.rating ?? 0).toFixed(1)}
                      </span>
                      <div className="flex text-yellow-400 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400"
                                : "stroke-yellow-400"
                            }
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {product.reviews} reviews
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/product/${id}/reviews`)}
                    className="text-blue-600 hover:underline font-medium flex items-center gap-2"
                  >
                    Read all reviews
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Product Details Accordion (Mobile) */}
          <div className="lg:hidden mt-8 space-y-2">
            <SectionAccordion title="Product Details" defaultOpen={true}>
              <ul className="space-y-3 text-gray-600">
                {product.details.fabric && (
                  <li className="flex justify-between">
                    <strong>Fabric:</strong>{" "}
                    <span>{product.details.fabric}</span>
                  </li>
                )}
                {product.details.material && (
                  <li className="flex justify-between">
                    <strong>Material:</strong>{" "}
                    <span>{product.details.material}</span>
                  </li>
                )}
                {product.details.care && (
                  <li className="flex justify-between">
                    <strong>Care:</strong> <span>{product.details.care}</span>
                  </li>
                )}
                {product.details.weight && (
                  <li className="flex justify-between">
                    <strong>Weight:</strong>{" "}
                    <span>{product.details.weight}</span>
                  </li>
                )}
                {product.details.dimensions && (
                  <li className="flex justify-between">
                    <strong>Dimensions:</strong>{" "}
                    <span>{product.details.dimensions}</span>
                  </li>
                )}
                {product.details.origin && (
                  <li className="flex justify-between">
                    <strong>Origin:</strong>{" "}
                    <span>{product.details.origin}</span>
                  </li>
                )}
              </ul>
            </SectionAccordion>

            <SectionAccordion title="Shipping & Returns">
              <ul className="space-y-3 text-gray-600">
                {product.details.delivery && (
                  <li className="flex items-start gap-2">
                    <Truck size={16} className="mt-0.5 shrink-0" />{" "}
                    <span>{product.details.delivery}</span>
                  </li>
                )}
                {product.details.return && (
                  <li className="flex items-start gap-2">
                    <RefreshCw size={16} className="mt-0.5  shrink-0-flex" />{" "}
                    <span>{product.details.return}</span>
                  </li>
                )}
                <li>Express shipping available at ₹200</li>
                <li>Free pickup from our stores</li>
              </ul>
            </SectionAccordion>

            <SectionAccordion title={`Reviews (${product.reviews})`}>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-gray-900">
                      {(product.rating || 4.5).toFixed(1)} • {product.reviews || 0} reviews
                    </span>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400"
                              : "stroke-yellow-400"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {product.reviews} reviews
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/product/${id}/reviews`)}
                  className="text-blue-600 hover:underline font-medium flex items-center gap-2"
                >
                  Read all reviews
                  <ChevronRight size={16} />
                </button>
              </div>
            </SectionAccordion>
          </div>
        </div>
      </div>

      {/* Related Products - Responsive Carousel */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-3 sm:px-6 mt-12 sm:mt-16 mb-20 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              Complete the Look
            </h2>
            <button
              onClick={() => navigate("/collections")}
              className="text-sm text-blue-600 hover:underline flex items-center gap-1 font-medium"
            >
              View All
              <ChevronRight size={16} />
            </button>
          </div>

         {/* ================= RELATED PRODUCTS ================= */}
<section className="mt-14">
  <h2 className="permanent-marker-regular text-2xl mb-6">
    Related Products
  </h2>

  <div
    className="
      grid
      grid-cols-2
      sm:grid-cols-3
      lg:grid-cols-4
      gap-4 sm:gap-6
    "
  >
    {relatedProducts.map((relatedProduct) => (
      <ProductCard
        key={relatedProduct._id || relatedProduct.id}
        product={{
          ...relatedProduct,
          _id: relatedProduct._id || relatedProduct.id,
          colors: relatedProduct.colors?.length
            ? relatedProduct.colors
            : [
                {
                  images: [relatedProduct.image],
                },
              ],
        }}
      />
    ))}
  </div>
</section>

        </div>
      )} 

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-slideUp">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  Size Guide
                </h3>
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Size
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Bust (cm)
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Waist (cm)
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Hip (cm)
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Length (cm)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        size: "XS",
                        bust: "81-86",
                        waist: "64-69",
                        hip: "89-94",
                        length: "145",
                      },
                      {
                        size: "S",
                        bust: "86-91",
                        waist: "69-74",
                        hip: "94-99",
                        length: "145",
                      },
                      {
                        size: "M",
                        bust: "91-96",
                        waist: "74-79",
                        hip: "99-104",
                        length: "145",
                      },
                      {
                        size: "L",
                        bust: "96-101",
                        waist: "79-84",
                        hip: "104-109",
                        length: "145",
                      },
                      {
                        size: "XL",
                        bust: "101-106",
                        waist: "84-89",
                        hip: "109-114",
                        length: "145",
                      },
                    ].map((row) => (
                      <tr key={row.size} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{row.size}</td>
                        <td className="py-3 px-4">{row.bust}</td>
                        <td className="py-3 px-4">{row.waist}</td>
                        <td className="py-3 px-4">{row.hip}</td>
                        <td className="py-3 px-4">{row.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-600">
                  <strong className="text-gray-900">Note:</strong> This size
                  guide is for reference only. For the best fit, we recommend
                  measuring yourself and comparing with our size chart. If
                  you're between sizes, we suggest sizing up.
                </p>
              </div>

              <div className="mt-4 sm:mt-6 flex justify-end">
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS animations and Swiper styling */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(-10px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(10px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-in-out;
        }
        .related-products-swiper {
          position: relative;
        }
        .related-products-swiper .swiper-button-next,
        .related-products-swiper .swiper-button-prev {
          width: 40px;
          height: 40px;
          background-color: white;
          border-radius: 12px;
          color: #1f2937;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 10;
          top: 50%;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .related-products-swiper .swiper-button-next {
          right: 10px;
          animation: slideInRight 0.5s ease-out;
          transform: translateY(-50%);
        }
        .related-products-swiper .swiper-button-prev {
          left: 10px;
          animation: slideInLeft 0.5s ease-out;
          transform: translateY(-50%);
        }
        .related-products-swiper .swiper-button-next::after,
        .related-products-swiper .swiper-button-prev::after {
          font-size: 18px;
          font-weight: bold;
          color: #1f2937;
        }
        .related-products-swiper .swiper-button-next:hover,
        .related-products-swiper .swiper-button-prev:hover {
          background-color: white;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          transform: translateY(calc(-50% - 3px));
          color: #1e40af;
        }
        .related-products-swiper .swiper-button-next:hover::after,
        .related-products-swiper .swiper-button-prev:hover::after {
          color: #1e40af;
        }
        .related-products-swiper .swiper-button-next:active,
        .related-products-swiper .swiper-button-prev:active {
          transform: translateY(-50%);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .related-products-swiper .swiper-button-disabled {
          opacity: 0.35;
          cursor: not-allowed;
          background-color: #f3f4f6;
        }
        .related-products-swiper .swiper-button-disabled:hover {
          background-color: #f3f4f6;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transform: translateY(-50%);
        }
        .related-products-swiper .swiper-button-disabled::after {
          color: #d1d5db;
        }
        @media (max-width: 768px) {
          .related-products-swiper .swiper-button-next,
          .related-products-swiper .swiper-button-prev {
            width: 36px;
            height: 36px;
            border-radius: 10px;
          }
          .related-products-swiper .swiper-button-next::after,
          .related-products-swiper .swiper-button-prev::after {
            font-size: 16px;
          }
          .related-products-swiper .swiper-button-next {
            right: 8px;
          }
          .related-products-swiper .swiper-button-prev {
            left: 8px;
          }
          .related-products-swiper .swiper-button-next:hover,
          .related-products-swiper .swiper-button-prev:hover {
            transform: translateY(calc(-50% - 2px));
          }
        }
      `}</style>
    </>
  );
}
export default ProductDetails;

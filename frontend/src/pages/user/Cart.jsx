import React,{useState,useEffect} from "react";
import {Link,useNavigate} from "react-router-dom";
import API from "../../api/axios";
import {Trash2,Heart,Plus,Minus,ArrowLeft,ShoppingBag,Shield,Truck,RotateCcw} from "lucide-react";

const Cart=()=>{
  const isInWishlist = (id) => {
 return wishlist.some(item => item._id === id);
};


const [cart,setCart]=useState([]);
const [wishlist,setWishlist]=useState([]);
const [recommendedItems,setRecommendedItems]=useState([]);

const [promoCode,setPromoCode]=useState("");
const [discount,setDiscount]=useState(0);
const [loadingCart,setLoadingCart]=useState(true);
const [loading, setLoading] = useState(true);



const freeShippingThreshold=7000;
const shippingCost=150;
const gstRate=0.12;

const navigate=useNavigate();

/* ================= LOAD CART ================= */
useEffect(() => {
  loadCart();
  loadWishlist();
}, []);

useEffect(() => {
  if (cart.length) loadRecommended();
}, []);


const loadCart = async () => {
 try {
  const res = await API.get("/users/me", {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
   }
  });

  console.log(res)

  // console.log("ME:", res.data);

  setCart(res.data?.cart || []);

 } catch (err) {
  console.log(err.response?.data || err.message);
 }
};

const loadWishlist = async () => {
 try {
  const res = await API.get("/users/me", {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
   }
  });

  setWishlist(res.data?.wishlist || []);

 } catch (err) {
  console.log(err.response?.data || err.message);
 }
};



/* ================= RECOMMENDED ================= */
const loadRecommended = async () => {
  if (!cart.length) return;

  // Take collection from first cart item
  const collectionSlug =
    cart[0]?.product?.collections?.[0]?.slug ||
    cart[0]?.collections?.[0]?.slug;

  if (!collectionSlug) return;

  const res = await API.get(`/products?collection=${collectionSlug}`);

  const products = Array.isArray(res.data)
    ? res.data
    : res.data.products;

  // Remove items already in cart
  const filtered = products.filter(
    p => !cart.some(c => c.product?._id === p._id)
  );

  setRecommendedItems(filtered.slice(0, 4));
};


/* ================= CART TOTAL ================= */
const cartTotal=cart.reduce((a,b)=>a+(b.price*b.quantity),0);

/* ================= REMOVE ================= */
const removeFromCart=async(id)=>{
 await API.delete(`/cart/${id}`);
 loadCart();
};

/* ================= UPDATE QTY ================= */
const updateQuantity=async(id,qty)=>{
 await API.put(`/cart/${id}`,{quantity:qty});
 loadCart();
};

/* ================= ADD RECOMMENDED ================= */
const addRecommendedItem=async(item)=>{

 await API.post("/cart",{
  product:item._id,
  quantity:1,
  size:"M",
  color:"Default"
 });

 loadCart();
};

/* ================= WISHLIST ================= */
const toggleWishlist = async(id)=>{
  try {
    await API.post(`/wishlist/${id}`);
    loadWishlist();
  } catch (err) {
    console.log(err);
  }
};


const subtotal = cart.reduce((sum, item) => {
  const price =
    item.product?.discountPrice ??
    item.product?.price ??
    0;

  return sum + price * item.quantity;
}, 0);

/* ================= PROMO ================= */
const handleApplyPromo = async () => {
  try {
    const code = promoCode.trim().toUpperCase();

    if (!code) {
      alert("Enter a coupon code");
      return;
    }

    const res = await API.get(`/coupons/validate/${code}`);

    if (!res.data.valid) {
      alert("Invalid coupon code");
      return;
    }

    // min spend check
    if (subtotal < res.data.minSpend) {
      alert(`Minimum spend ₹${res.data.minSpend} required`);
      return;
    }

    let discountAmount = 0;

    if (res.data.type === "Percentage") {
      discountAmount = (subtotal * res.data.discount) / 100;
    } else {
      discountAmount = res.data.discount;
    }

    setDiscount(discountAmount);

    // Optional: mark coupon used
    await API.put(`/coupons/use/${code}`);

  } catch (err) {
    console.error(err);
    alert("Failed to apply coupon");
  }
};


const handleCheckout = () => {
 console.log("CHECKOUT CLICKED");
 console.log("cart before nav:", cart);
 console.log("Navigate")
 navigate("/checkout");
};



const cartCount = cart.reduce((a,b)=>a + b.quantity,0);



const estimatedShipping =
  subtotal >= freeShippingThreshold ? 0 : shippingCost;

const gst = (subtotal + estimatedShipping) * gstRate;

const totalAmount = subtotal + estimatedShipping + gst - discount;

const freeShippingProgress = Math.min(
  (subtotal / freeShippingThreshold) * 100,
  100
);

const amountNeeded = Math.max(freeShippingThreshold - subtotal, 0);
const handleQuantityChange = async (item, delta) => {
 const newQty = item.quantity + delta;
 if (newQty < 1) return;

 await API.put(`/cart/${item._id}`, {
  quantity: newQty
 });

 loadCart();
};


  return (
    <div className="min-h-screen bg-[#faf8f5] mt-10">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Page Header */}
        <div className="mb-8">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-2">Your Bag</p>
          <h1 className="cinzel text-3xl md:text-4xl font-light text-gray-900">
            Shopping Bag
            <span className="text-[16px] text-gray-400 font-light ml-3">({cartCount})</span>
          </h1>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-8">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[12px] font-medium text-gray-600 tracking-wide">
              {subtotal >= freeShippingThreshold
                ? "Free shipping unlocked!"
                : "Free shipping progress"}
            </span>
            <span className="text-[13px] font-semibold text-gray-900">
              {freeShippingProgress.toFixed(0)}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
            <div
              className="h-1.5 rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${freeShippingProgress}%`,
                background: freeShippingProgress >= 100
                  ? '#0a0a0a'
                  : 'linear-gradient(90deg, #c4a265, #d4b87a)'
              }}
            />
          </div>

          <p className="text-[12px] text-gray-500">
            {subtotal >= freeShippingThreshold ? (
              <span className="text-[#0a0a0a] font-medium">
                ✦ You've unlocked Free Express Shipping
              </span>
            ) : (
              <>Add <span className="font-medium text-gray-900">₹{amountNeeded.toLocaleString()}</span> more for free shipping</>
            )}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:w-2/3">
            {cart.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag size={32} className="text-gray-300" />
                </div>
                <h3 className="cinzel text-xl font-light text-gray-900 mb-2">
                  Your bag is empty
                </h3>
                <p className="text-[14px] text-gray-400 mb-8">
                  Looks like you haven't added anything yet.
                </p>
                <Link
                  to="/collections"
                  className="inline-flex items-center gap-2 bg-[#8b6f47] text-white text-[12px] font-medium tracking-[0.15em] uppercase px-8 py-3.5
                    hover:bg-[#7a6140] border border-[#8b6f47] transition-all duration-300 cursor-pointer"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6 hover:border-gray-200 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row gap-5">
                      {/* Product Image */}
                      <div className="sm:w-28 md:w-32 flex-shrink-0">
                        <div className="aspect-square bg-[#f5f0eb] rounded-lg overflow-hidden">
                          <img
                            src={
                              item.product?.colors?.[0]?.images?.[0] ||
                              item.product?.images?.[0] ||
                              "/placeholder.jpg"
                            }
                            alt={item.product?.name || "Product"}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-4">
                          <div className="min-w-0">
                            <h3 className="cinzel text-[15px] font-medium text-gray-900 mb-1.5 truncate">
                              {item.product?.name || item.name}
                            </h3>
                            <p className="text-[12px] text-gray-400 tracking-wide">
                              Size: {item.size} &nbsp;·&nbsp; Color: {item.color}
                            </p>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <p className="text-[16px] font-semibold text-gray-900">
                              ₹{(
                                (item.product?.discountPrice ??
                                  item.product?.price ?? 0) * item.quantity
                              ).toLocaleString()}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-[11px] text-gray-400 mt-0.5">
                                ₹{(item.product?.discountPrice ?? item.product?.price ?? 0).toLocaleString()} each
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Quantity + Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mt-5 pt-4 border-t border-gray-50">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item, -1)}
                              className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-10 text-center text-[14px] font-medium text-gray-900 border-x border-gray-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item, 1)}
                              className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => {
                                const wishlistItem = {
                                  id: item.id,
                                  name: item.name,
                                  price: item.price,
                                  image: item.image,
                                  category: item.category || "General",
                                };
                                toggleWishlist(wishlistItem);
                              }}
                              className={`cursor-pointer ${`flex items-center gap-1.5 text-[11px] tracking-wider uppercase px-3 py-2 rounded-lg transition-all duration-300
                                ${
                                  isInWishlist(item._id)
                                    ? "text-red-500 bg-red-50"
                                    : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                                }`}`}
                            >
                              <Heart
                                size={13}
                                className={
                                  isInWishlist(item.id) ? "fill-red-500" : ""
                                }
                              />
                              {isInWishlist(item.id) ? "Saved" : "Save"}
                            </button>
                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="flex items-center gap-1.5 text-[11px] tracking-wider uppercase text-gray-400 hover:text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 transition-all duration-300 cursor-pointer"
                            >
                              <Trash2 size={13} />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Continue Shopping */}
            {cart.length > 0 && (
              <div className="mt-8">
                <Link
                  to="/collections"
                  className="inline-flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase text-gray-400 hover:text-gray-900 transition-all duration-300 cursor-pointer"
                >
                  <ArrowLeft size={14} />
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              {/* Order Summary Card */}
              <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
                <h2 className="text-[12px] font-medium tracking-[0.15em] uppercase text-gray-900 mb-6 pb-4 border-b border-gray-100">
                  Order Summary
                </h2>

                <div className="space-y-3.5 mb-6">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-gray-500">Subtotal ({cartCount} items)</span>
                    <span className="font-medium text-gray-900">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium">
                      {subtotal >= freeShippingThreshold ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        <span className="text-gray-900">₹{estimatedShipping.toLocaleString()}</span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-gray-500">GST (12%)</span>
                    <span className="font-medium text-gray-900">₹{gst.toFixed(0)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-[13px] text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">
                        -₹{discount.toFixed(0)}
                      </span>
                    </div>
                  )}

                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex justify-between">
                      <span className="text-[14px] font-medium text-gray-900">Total</span>
                      <span className="cinzel text-lg font-semibold text-gray-900">₹{totalAmount.toFixed(0)}</span>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-5 py-3 bg-gray-100 text-gray-900 text-[12px] font-medium tracking-wider uppercase rounded-lg hover:bg-[#8b6f47] hover:text-white transition-all duration-300 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className={`cursor-pointer ${`w-full py-4 text-[12px] font-medium tracking-[0.15em] uppercase rounded-lg transition-all duration-300 ${
                    cart.length === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-[#8b6f47] text-white hover:bg-[#7a6140] active:scale-[0.98]"
                  }`}`}
                >
                  Proceed to Checkout
                </button>

                {/* Trust Badges */}
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[
                    { icon: Shield, title: "Secure", sub: "SSL Protected" },
                    { icon: RotateCcw, title: "15-Day", sub: "Easy Returns" },
                    { icon: Truck, title: "Free Ship", sub: "Over ₹7,000" },
                  ].map(({ icon: Icon, title, sub }, i) => (
                    <div key={i} className="text-center">
                      <Icon size={16} className="mx-auto mb-1.5 text-gray-400" />
                      <p className="text-[10px] font-medium text-gray-900 tracking-wider uppercase">{title}</p>
                      <p className="text-[10px] text-gray-400">{sub}</p>
                    </div>
                  ))}
                </div>

                {/* Help Section */}
                <div className="mt-8 pt-5 border-t border-gray-100">
                  <p className="text-[12px] text-gray-400 mb-2">
                    Need help?
                  </p>
                  <a
                    href="tel:+917378021327"
                    className="text-[13px] font-medium text-gray-900 hover:text-[#c4a265] transition-colors cursor-pointer"
                  >
                    +91 7378021327
                  </a>
                </div>
              </div>

              {/* Complete the Look */}
              {cart.length > 0 && recommendedItems.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <h3 className="text-[12px] font-medium tracking-[0.15em] uppercase text-gray-900 mb-5">
                    Complete the Look
                  </h3>

                  <div className="space-y-3">
                    {recommendedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                        onClick={(e) => goToProductDetail(item.id, e)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 bg-[#f5f0eb] rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-[13px] font-medium text-gray-900 truncate">
                              {item.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <p className="text-[13px] font-semibold text-gray-900">
                                ₹{item.price.toLocaleString()}
                              </p>
                              {item.originalPrice &&
                                item.originalPrice > item.price && (
                                  <p className="text-[11px] text-gray-400 line-through">
                                    ₹{item.originalPrice.toLocaleString()}
                                  </p>
                                )}
                              {item.discount > 0 && (
                                <span className="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded font-medium">
                                  {item.discount}% Off
                                </span>
                              )}
                            </div>
                            {item.rating && (
                              <div className="flex items-center mt-0.5">
                                <span className="text-[11px] text-amber-500">★</span>
                                <span className="text-[11px] text-gray-400 ml-1">{item.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addRecommendedItem(item);
                          }}
                          className="text-[10px] font-medium tracking-wider uppercase text-gray-900 border border-gray-200 px-3 py-1.5 rounded-lg
                            hover:bg-[#0a0a0a] hover:text-white hover:border-[#0a0a0a] transition-all duration-300 flex-shrink-0 cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* View More Link */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      to="/collections"
                      className="block text-center text-[12px] tracking-wider uppercase text-gray-400 hover:text-gray-900 font-medium transition-colors cursor-pointer"
                    >
                      View More →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import graphura from "../../assets/graphuralogo/graphura.webp";
import gpay from "../../assets/payment/gpay.webp";
import phonepe from "../../assets/payment/phonepe.webp";
import paytm from "../../assets/payment/paytm.webp";
import API from "../../api/axios";
import { toast } from "react-hot-toast";

import {
  CreditCard,
  Smartphone,
  Truck,
  Landmark,
  ShieldCheck,
  MapPin,
  Menu,
  ShoppingBag,
  User,
  X,
  Check,
  AlertCircle,
  RefreshCw,
  Lock,
  Shield,
  Package,
  Clock,
  ChevronLeft,
  Loader2,
} from "lucide-react";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};


// import {
//   CreditCard,
//   Smartphone,
//   Truck,
//   Landmark,
//   ShieldCheck,
//   MapPin,
//   Menu,
//   ShoppingBag,
//   User,
//   X,
//   Check,
//   AlertCircle,
//   RefreshCw,
//   Lock,
//   Shield,
//   Package,
//   Clock,
//   ChevronLeft,
// } from "lucide-react";

// Enhanced Checkout Stepper Component with failure state
const CheckoutStepper = ({ currentStep, hasFailed }) => {
  const steps = [
    { title: "Address", step: 1, description: "Shipping details" },
    { title: "Payment", step: 2, description: "Payment method" },
    { title: hasFailed ? "Failed" : "Success", step: 3, description: hasFailed ? "Try again" : "Order confirmed" },
  ];

  return (
    <div className="max-w-4xl mx-auto mb-10 px-4">
      <div className="relative">
        {/* Steps Container */}
        <div className="flex justify-between items-start relative">
          {/* Full Background Line */}
          <div
            className="absolute top-6 h-0.5 bg-gray-300"
            style={{
              left: "24px",
              right: "24px",
              width: "calc(100% - 48px)",
            }}
          ></div>

          {/* Progress Line */}
          <div
            className={`absolute top-6 h-0.5 transition-all duration-300 ${hasFailed && currentStep === 3 ? "bg-red-500" : "bg-green-600"
              }`}
            style={{
              left: "24px",
              width: `${(currentStep - 1) * 50}%`,
              maxWidth: "calc(100% - 48px)",
            }}
          ></div>

          {steps.map((step, index) => {
            const isCompleted = currentStep > step.step;
            const isActive = currentStep === step.step;
            const isCurrentFailed = hasFailed && currentStep === 3 && step.step === 3;

            return (
              <div
                key={step.title}
                className="flex flex-col items-center relative z-20"
                style={{
                  width: index === 1 ? "auto" : "calc(50% - 24px)",
                }}
              >
                {/* Circle Container */}
                <div className="relative">
                  {index === 1 && (
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-14 h-0.5 bg-white z-10"></div>
                  )}

                  {/* Circle */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg mb-2 border-2 transition-all duration-300 relative z-20
                      ${isCurrentFailed
                        ? "bg-red-500 text-white border-red-500"
                        : isCompleted || isActive
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-gray-600 border-gray-300"
                      }`}
                  >
                    {isCurrentFailed ? (
                      <X size={20} className="text-white" />
                    ) : isCompleted ? (
                      <Check size={20} className="text-white" />
                    ) : (
                      step.step
                    )}
                  </div>
                </div>

                {/* Step Title */}
                <span
                  className={`text-sm font-medium ${isCurrentFailed
                    ? "text-red-600"
                    : isCompleted || isActive
                      ? "text-green-600"
                      : "text-gray-500"
                    }`}
                >
                  {step.title}
                </span>

                {/* Step Description */}
                <span
                  className={`text-xs mt-1 text-center ${isCurrentFailed ? "text-red-400" : "text-gray-400"
                    }`}
                >
                  {step.description}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  // --- STATE MANAGEMENT ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(""); // "", "success", "failed"
  const [paymentError, setPaymentError] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  // const [paymentAttempts, setPaymentAttempts] = useState(0);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const [promoCode, setPromoCode] = useState("");
  // const [discount, setDiscount] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);

  const [freeShippingThreshold] = useState(7000);
  const [shippingCost] = useState(150);
  const [gstRate] = useState(0.12);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState("");



  // Get real cart data from context
  // const { cart, cartTotal, cartCount } = useShop();
  const navigate = useNavigate();

  const cartTotal = cart.reduce((sum, item) => {
    const price =
      item.product?.discountPrice ??
      item.product?.price ??
      0;

    return sum + price * (item.quantity || 1);
  }, 0);



  const cartCount = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const subtotal = cartTotal;

  const estimatedShipping =
    subtotal >= freeShippingThreshold ? 0 : shippingCost;

  const discountAmount = subtotal * discountPercent;

  const gst = (subtotal - discountAmount + estimatedShipping) * gstRate;

  const total = subtotal - discountAmount + estimatedShipping + gst;



  // Calculate free shipping progress
  const freeShippingProgress = Math.min(
    (subtotal / freeShippingThreshold),
    100
  );
  const amountNeeded = Math.max(freeShippingThreshold - subtotal, 0);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await API.get("/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setCart(res.data?.cart || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    if (!loading && cart.length === 0 && currentStep !== 3) {
      navigate("/cart");
    }
  }, [loading]);



  const isAddressValid = () => {
    const { fullName, email, phone, address, zip, city, state } = shippingInfo;

    if (!fullName.trim()) return false;
    if (!email.trim()) return false;
    if (!phone.trim() || phone.length < 10) return false;
    if (!address.trim()) return false;
    if (!zip || zip.length !== 6) return false;
    if (!city || !state) return false;

    return true;
  };

  // Handle promo code
  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    try {
      const res = await API.get(`/coupons/validate/${promoCode}`);

      if (!res.data.valid) {
        alert("Invalid promo code");
        setDiscountPercent(0);
        return;
      }

      // ✅ Minimum spend check
      if (cartTotal < res.data.minSpend) {
        alert(`Minimum spend ₹${res.data.minSpend} required`);
        return;
      }

      // ✅ Apply discount
      setDiscountPercent(res.data.discount / 100);
      toast(`Promo applied! You saved ${res.data.discount}%`);

      await API.put(`/coupons/use/${promoCode}`);
    } catch (err) {
      alert("Invalid promo code");
      setDiscountPercent(0);
    }
  };

  // --- HANDLERS ---
  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    // Normal input update
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 👇 PINCODE AUTO-FILL LOGIC
    if (name === "zip" && value.length === 6) {
      try {
        const res = await fetch(
          `https://api.postalpincode.in/pincode/${value}`
        );
        const data = await res.json();

        if (data[0].Status === "Success") {
          const postOffice = data[0].PostOffice[0];

          setShippingInfo((prev) => ({
            ...prev,
            city: postOffice.District,
            state: postOffice.State,
          }));
        } else {
          setShippingInfo((prev) => ({
            ...prev,
            city: "",
            state: "",
          }));
          alert("Invalid Pincode");
        }
      } catch (error) {
        alert("Unable to fetch location");
      }
    }
  };


  const handlePlaceOrder = async () => {
  if (!paymentMethod) {
    toast.error("Select payment method");
    return;
  }

  if (isProcessing) return;

  // ✅ Format cart according to Order model
  const formattedItems = cart.map((item) => ({
    product: item.product?._id,
    name: item.product?.name,
    price:
      item.product?.discountPrice ??
      item.product?.price ??
      0,
    image:
      item.product?.colors?.[0]?.images?.[0] ||
      item.product?.images?.[0] ||
      item.product?.image ||
      "",
    size: item.size || "M",
    color: item.colors?.[0]?.name || "",
    quantity: item.quantity || 1,
  }));

  /* ================= COD FLOW ================= */
  if (paymentMethod === "cod") {
    setIsProcessing(true);
    try {
      const res = await API.post(
        "/orders",
        {
          shipping: shippingInfo,
          items: formattedItems,
          subtotal,
          shippingCost: estimatedShipping,
          gst,
          discount: discountAmount,
          total,
          paymentMethod: "cod",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setOrderId(res.data.orderId || res.data._id);
      setPaymentStatus("success");
      setCurrentStep(3);
    } catch (err) {
      setPaymentStatus("failed");
      setPaymentError(
        err.response?.data?.message || "Order failed"
      );
      setCurrentStep(3);
    } finally {
      setIsProcessing(false);
    }

    return;
  }

  /* ================= ONLINE PAYMENT ================= */

  const loaded = await loadRazorpay();
  if (!loaded) {
    toast.error("Razorpay SDK failed to load");
    return;
  }

  try {
    setShowPaymentModal(true);
    setIsProcessing(true);

    // Create Razorpay Order
    const { data } = await API.post(
      "/payment/razorpay-order",
      {
        amount: Math.round(total), // convert to paisa
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: data.amount,
      currency: "INR",
      name: "Graphura",
      description: "Order Payment",
      order_id: data.id,

      handler: async function (response) {
        try {
          const verify = await API.post(
            "/payment/razorpay-verify",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,

              shipping: shippingInfo,
              items: formattedItems,
              subtotal,
              shippingCost: estimatedShipping,
              gst,
              discount: discountAmount,
              total,
              paymentMethod,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          setOrderId(verify.data.orderId);
          setPaymentStatus("success");
          setCurrentStep(3);
        } catch (error) {
          setPaymentStatus("failed");
          setPaymentError("Payment verification failed");
          setCurrentStep(3);
        } finally {
          setIsProcessing(false);
          setShowPaymentModal(false);
        }
      },

      modal: {
        ondismiss: function () {
          setIsProcessing(false);
          setShowPaymentModal(false);
          toast.error("Payment cancelled");
        },
      },

      prefill: {
        name: shippingInfo.fullName,
        email: shippingInfo.email,
        contact: shippingInfo.phone,
      },

      theme: {
        color: "#16a34a",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Payment Error:", err);
    setIsProcessing(false);
    setShowPaymentModal(false);
    toast.error("Something went wrong");
  }
};

  const handleRetryPayment = () => {
    setPaymentStatus("");
    setPaymentError("");
    setShowPaymentModal(false);

    handlePlaceOrder(new Event("submit"));
  };


  const handleTryDifferentMethod = () => {
    setPaymentStatus("");
    setPaymentError("");
    setShowPaymentModal(false);
    setCurrentStep(2);
  };


  // --- NAVBAR COMPONENT ---
  // const Navbar = () => (
  //   <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
  //     <div className="w-full px-6">
  //       <div className="flex justify-between items-center h-16 px-4">
  //         {/* Logo */}
  //         <div className="flex items-center justify-start">
  //           <a href="/">
  //             <img className="w-auto h-15" src={graphura} alt="Graphura Logo" />
  //           </a>
  //         </div>

  //         {/* Desktop Icons */}
  //         <div className="hidden md:flex items-center space-x-6">
  //           <div className="hidden md:flex items-left text-left space-x-8">
  //             <a
  //               href="#"
  //               className="text-gray-600 hover:text-black font-medium transition"
  //             >
  //               Support
  //             </a>
  //           </div>
  //           <button
  //             onClick={() => navigate("/cart")}
  //             className="text-gray-600 hover:text-black relative cursor-pointer"
  //           >
  //             <ShoppingBag size={20} />
  //             <span className="absolute -top-1 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
  //               {cartCount}
  //             </span>
  //           </button>
  //           <button className="text-gray-600 hover:text-black cursor-pointer">
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
  //             href="#"
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

  // --- Payment Processing Modal ---
  const PaymentProcessingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 animate-fade-in">
        {isProcessing ? (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <div className="relative">
                <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-green-600 rounded-full animate-spin border-t-transparent"></div>
                <Lock className="absolute inset-4 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Payment</h3>
            <p className="text-gray-600 mb-6">Please wait while we process your payment securely...</p>
            <div className="space-y-2">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 rounded-full animate-pulse w-3/4"></div>
              </div>
              <p className="text-sm text-gray-500">Do not refresh or close this window</p>
            </div>
          </div>
        ) : paymentStatus === "failed" ? (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="text-red-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Failed</h3>
            <p className="text-gray-600 mb-4">{paymentError}</p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-red-500 mt-0.5 shrink-0-flex" />
                <div>
                  <p className="text-sm font-medium text-red-800">Troubleshooting tips:</p>
                  <ul className="text-sm text-red-700 mt-1 space-y-1">
                    <li>• Check your account balance</li>
                    <li>• Verify card details are correct</li>
                    <li>• Contact your bank if issue persists</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRetryPayment}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw size={18} /> Try Again
              </button>
              <button
                onClick={handleTryDifferentMethod}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition cursor-pointer"
              >
                Change Method
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );

  // --- Success Content ---
  const SuccessContent = () => (
    <div className="col-span-1 lg:col-span-3">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <ShieldCheck className="text-green-600 w-10 h-10" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Order Placed Successfully 🎉
          </h2>

          <div className="bg-linear-to-r from-green-50 to-emerald-50 p-4 rounded-lg mb-6">
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg inline-block mb-3 animate-fade-in">
              <span className="font-semibold">Order ID:</span> {orderId || "Generating..."}



            </div>
            <p className="text-green-700 font-medium">
              Estimated Delivery: {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Package className="text-gray-600" />
                <span className="font-semibold">Shipping To</span>
              </div>
              <p className="text-gray-700">{shippingInfo.fullName}</p>
              <p className="text-sm text-gray-600">{shippingInfo.address}, {shippingInfo.city}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CreditCard className="text-gray-600" />
                <span className="font-semibold">Payment Method</span>
              </div>
              <p className="text-gray-700 capitalize">{paymentMethod}</p>
              <p className="text-sm text-green-600 font-medium">Payment Successful</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="text-gray-600" />
                <span className="font-semibold">Order Summary</span>
              </div>
              <p className="text-gray-700">{cartCount} items</p>
              <p className="text-lg font-bold text-gray-900">₹{total.toFixed(0)}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate(`/dashboard/orders/${orderId}`)}
              className="px-8 py-3 bg-white text-green-600 border-2 border-green-600 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 cursor-pointer"
            >
              View Order Details
            </button>
            <button
              onClick={() => window.print()}
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition cursor-pointer"
            >
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // --- Failure Content ---
  const FailureContent = () => (
    <div className="col-span-1 lg:col-span-3">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-red-100 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <AlertCircle className="text-red-600 w-10 h-10" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Payment Failed ❌
          </h2>

          <div className="bg-linear-to-r from-red-50 to-orange-50 p-4 rounded-lg mb-6">
            <p className="text-red-700 font-medium mb-3">
              <AlertCircle className="inline mr-2" />
              {paymentError}
            </p>
            <p className="text-gray-600">
              Order ID: <span className="font-semibold">ORD{Date.now()}</span> • Amount: ₹{total.toFixed(0)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="text-red-600" />
                <span className="font-semibold">Security Alert</span>
              </div>
              <p className="text-sm text-gray-700">Your transaction was declined for security reasons</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CreditCard className="text-red-600" />
                <span className="font-semibold">Payment Method</span>
              </div>
              <p className="text-gray-700 capitalize">{paymentMethod}</p>
              <p className="text-sm text-red-600 font-medium">Payment Failed</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="text-red-600" />
                <span className="font-semibold">Next Steps</span>
              </div>
              <p className="text-sm text-gray-700">Try a different payment method</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetryPayment}
              className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw size={18} /> Try Payment Again
            </button>
            <button
              onClick={handleTryDifferentMethod}
              className="px-8 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 hover:border-gray-400 flex items-center justify-center gap-2 cursor-pointer"
            >
              <CreditCard size={18} /> Change Payment Method
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <ChevronLeft size={18} /> Back to Cart
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 mb-3">Need immediate assistance?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+917378021327"
                className="text-green-600 font-medium hover:text-green-800 hover:underline cursor-pointer"
              >
                📞 Call Support: +91 7378021327
              </a>
              <span className="text-gray-400">•</span>
              <a
                href="mailto:support@graphura.com"
                className="text-green-600 font-medium hover:text-green-800 hover:underline cursor-pointer"
              >
                ✉️ Email: support@graphura.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- MAIN LAYOUT ---
  return (
    <div className="min-h-screen bg-[#faf8f5] font-sans">
      {/* <Navbar /> */}

      <main className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <ShieldCheck className="text-green-600" /> Secure Checkout
          </h1>

          <CheckoutStepper currentStep={currentStep} hasFailed={paymentStatus === "failed"} />

          {/* Payment Processing Modal */}
          {showPaymentModal && <PaymentProcessingModal />}

          {/* Free Shipping Progress Bar */}
          {currentStep !== 3 && cart.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Almost there!
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {freeShippingProgress.toFixed(0)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                ></div>
              </div>

              <p className="text-sm text-gray-600">
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-green-600 font-medium">
                    🎉 You've unlocked Free Express Shipping!
                  </span>
                ) : (
                  `Add ₹${amountNeeded} more to unlock Free Express Shipping.`
                )}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN: Shipping & Payment */}
            {currentStep === 1 || currentStep === 2 ? (
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Details Form */}
                {currentStep === 1 && (
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <MapPin size={20} /> Shipping Address
                    </h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* ... (existing address form code remains the same) ... */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#c4a265] focus:border-transparent outline-none transition"
                          placeholder="Enter Full Name"
                          onChange={handleInputChange}
                          value={shippingInfo.fullName}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#c4a265] outline-none"
                          placeholder="Enter your Email"
                          onChange={handleInputChange}
                          value={shippingInfo.email}
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <div
                          className={`flex items-center rounded-lg border transition
                            ${shippingInfo.phone.length === 10
                              ? "border-green-500"
                              : "border-gray-300 focus-within:border-[#c4a265]"
                            }`}
                        >
                          <div className="flex items-center gap-1 px-3 bg-gray-100 text-sm font-medium text-gray-700 rounded-l-lg border-r">
                            <span className="text-lg">🇮🇳</span>
                            +91
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            maxLength={10}
                            value={shippingInfo.phone}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, "");
                              setShippingInfo((prev) => ({
                                ...prev,
                                phone: val,
                              }));
                            }}
                            placeholder="Enter mobile no."
                            className="w-full px-4 py-3 outline-none rounded-r-lg placeholder-gray-400"
                          />
                          {shippingInfo.phone.length === 10 && (
                            <span className="px-3 text-green-600 font-bold">
                              ✔
                            </span>
                          )}
                        </div>
                        <p className="text-xs mt-1 text-gray-500">
                          We'll use this number for delivery updates
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#c4a265] outline-none"
                          placeholder="Enter Full Address"
                          onChange={handleInputChange}
                          value={shippingInfo.address}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={shippingInfo.city}
                          readOnly
                          className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={shippingInfo.state}
                          readOnly
                          className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pincode <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="zip"
                          value={shippingInfo.zip}
                          onChange={handleInputChange}
                          maxLength={6}
                          placeholder="Enter 6-digit pincode"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#c4a265] outline-none placeholder-gray-400"
                        />
                      </div>
                    </form>
                    <button
                      disabled={!isAddressValid()}
                      onClick={() => {
                        if (!isAddressValid()) return;
                        setCurrentStep(2);
                      }}
                      className={`cursor-pointer ${`mt-6 px-6 py-3 rounded-lg font-semibold transition
                        ${isAddressValid()
                          ? "bg-[#8b6f47] text-white hover:bg-[#7a6140]"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }
                      `}`}
                    >
                      Continue to Payment →
                    </button>
                  </div>
                )}

                {/* Payment Method Selection */}
                {currentStep === 2 && (
                  <>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Payment Method
                      </h2>
                      <div className="space-y-3">
                        {/* ... (existing payment method options remain the same) ... */}
                        <label
                          className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all
                            ${paymentMethod === "upi" ? "border-green-600 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value="upi"
                            checked={paymentMethod === "upi"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-5 h-5 text-green-600 focus:ring-green-500"
                          />
                          <div className="flex items-center gap-2">
                            <img src={gpay} alt="Google Pay" className="h-5 w-auto object-contain" />
                            <img src={phonepe} alt="PhonePe" className="h-5 w-auto object-contain" />
                            <img src={paytm} alt="Paytm" className="h-5 w-auto object-contain" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">
                              UPI (GPay, PhonePe, Paytm)
                            </p>
                            <p className="text-sm text-gray-500">
                              Fast & Secure | Most Preferred
                            </p>
                          </div>
                        </label>

                        <label
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "card"
                            ? "border-green-600 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                            }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value="card"
                            checked={paymentMethod === "card"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-5 h-5 text-green-600 focus:ring-green-500"
                          />
                          <div className="ml-4 flex items-center gap-4">
                            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                              <CreditCard className="text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800">
                                Credit / Debit Card
                              </p>
                              <p className="text-sm text-gray-500">
                                Visa, Mastercard, RuPay
                              </p>
                            </div>
                          </div>
                        </label>

                        <label
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "netbanking"
                            ? "border-green-600 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                            }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value="netbanking"
                            checked={paymentMethod === "netbanking"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-5 h-5 text-green-600 focus:ring-green-500"
                          />
                          <div className="ml-4 flex items-center gap-4">
                            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                              <Landmark className="text-green-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800">
                                Net Banking
                              </p>
                              <p className="text-sm text-gray-500">
                                All major Indian banks supported
                              </p>
                            </div>
                          </div>
                        </label>

                        <label
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "cod"
                            ? "border-green-600 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                            }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value="cod"
                            checked={paymentMethod === "cod"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-5 h-5 text-green-600 focus:ring-green-500"
                          />
                          <div className="ml-4 flex items-center gap-4">
                            <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                              <Truck className="text-orange-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800">
                                Cash on Delivery
                              </p>
                              <p className="text-sm text-gray-500">
                                COD available on orders below ₹199.
                                <br />
                                Pay when you receive your order
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition cursor-pointer"
                      >
                        ← Back to Address
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        disabled={!paymentMethod || isProcessing}
                        className={`cursor-pointer px-6 py-3 rounded-lg font-semibold transition disabled:opacity-70 flex items-center justify-center gap-2
                          ${paymentMethod ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                      >
                        {isProcessing ? <><Loader2 size={20} className="animate-spin" /> Processing...</> : "Place Order & Pay →"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : null}

            {/* Step 3 Content (Success/Failure) */}
            {currentStep === 3 && (
              paymentStatus === "failed" ? <FailureContent /> : <SuccessContent />
            )}

            {/* RIGHT COLUMN: Order Summary */}
            {currentStep !== 3 && cart.length > 0 && (
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  {/* ... (existing order summary code remains the same) ... */}
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                      Order Summary ({cartCount} items)
                    </h2>
                    <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                      {cart.map((item) => (
                        <div
                          key={`${item._id}-${item.colors?.[0]?.name || "Default"}`}

                          className="flex gap-3 pb-4 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="w-16 h-16 bg-gray-200 rounded-md shrink-0 overflow-hidden">
                            <img
                              src={
                                item.product?.colors?.[0]?.images?.[0] ||
                                item.product?.images?.[0]||
                                item.product?.image ||
                            "/placeholder.png"
                              }
                            alt={item.product?.name}
                            className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-800 line-clamp-2">
                                  {item.product?.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Size: {item.size || "M"} | Qty: {item.quantity || 1}
                                </p>
                                {item.colors?.[0]?.name && (
                                  <p className="text-xs text-gray-500">
                                    Color: {item.colors[0].name}
                                  </p>
                                )}

                                <div>
                                  {item.discountPrice && (
                                    <span className="text-xs line-through text-gray-400 mr-1">
                                      ₹{item.price.toLocaleString()}
                                    </span>
                                  )}

                                  <span className="font-bold">
                                    ₹{(
                                      item.product?.discountPrice ??
                                      item.product?.price ??
                                      0
                                    )}
                                  </span>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-gray-700">
                        <span>Subtotal ({cartCount} items)</span>
                        <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Estimated Shipping</span>
                        <span className="font-medium">
                          {subtotal >= freeShippingThreshold ? (
                            <span className="text-green-600">FREE</span>
                          ) : (
                            `₹${estimatedShipping.toLocaleString()}`
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>GST (12%)</span>
                        <span className="font-medium">₹{gst.toFixed(0)}</span>
                      </div>
                      {discountPercent > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount Applied</span>
                          <span className="font-medium">-₹{discountAmount.toFixed(0)}</span>
                        </div>
                      )}
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between text-lg font-bold text-gray-900">
                          <span>Total Amount</span>
                          <span>₹{total.toFixed(0)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Promo Code"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <button
                          onClick={handleApplyPromo}
                          className="px-6 py-3 bg-[#8b6f47] text-white font-medium rounded-md hover:bg-[#7a6140] transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                    <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                      <div className="text-xs">
                        <div className="text-gray-900 font-semibold mb-1">100% SECURE CHECKOUT</div>
                        <div className="text-gray-500">SSL Protected</div>
                      </div>
                      <div className="text-xs">
                        <div className="text-gray-900 font-semibold mb-1">EASY 15-DAY RETURNS</div>
                        <div className="text-gray-500">No Questions Asked</div>
                      </div>
                      <div className="text-xs">
                        <div className="text-gray-900 font-semibold mb-1">FREE SHIPPING</div>
                        <div className="text-gray-500">Over ₹7,000</div>
                      </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <p className="text-gray-700 mb-3">Need help? Contact Styling Expert</p>
                      <a
                        href="tel:+917378021327"
                        className="text-green-600 font-medium hover:text-green-800 cursor-pointer"
                      >
                        +91 7378021327
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Empty Cart Message */}
            {currentStep !== 3 && cart.length === 0 && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <div className="text-5xl mb-4">🛒</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Please add items to your cart first.
                  </p>
                  <button
                    onClick={() => navigate("/collections")}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition cursor-pointer"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
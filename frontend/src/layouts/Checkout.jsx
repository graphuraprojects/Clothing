import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import {
  CreditCard,
  Smartphone,
  Truck,
  Landmark,
  ShieldCheck,
  MapPin,
  Check,
  AlertCircle,
  RefreshCw,
  Lock,
  Shield,
  Package,
  Clock,
  ChevronLeft,
} from "lucide-react";
// import CheckoutNavbar from "../components/Home/CheckoutNavbar";
import gpay from "../assets/payment/gpay.webp";
import phonepe from "../assets/payment/phonepe.webp";
import paytm from "../assets/payment/paytm.webp";
import CheckoutStepper from "../components/CheckoutStepper";

const OrderSummarySection = ({
  cart,
  cartCount,
  subtotal,
  estimatedShipping,
  freeShippingThreshold,
  gst,
  discount,
  total,
  promoCode,
  setPromoCode,
  handleApplyPromo,
}) => (
  <div className="lg:col-span-1">
    <div className="sticky top-8">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
          Order Summary ({cartCount} items)
        </h2>

        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.size || "M"}-${item.color || "Default"}`}
              className="flex gap-3 pb-4 border-b border-gray-100 last:border-b-0"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 line-clamp-2">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500">
                  Size: {item.size || "M"} | Qty: {item.quantity || 1}
                </p>
                {item.color && (
                  <p className="text-xs text-gray-500">Color: {item.color}</p>
                )}
                <p className="text-sm font-bold text-gray-900 mt-1">
                  ₹{item.price?.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span>Subtotal ({cartCount} items)</span>
            <span className="font-medium">₹{subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-medium">
              {subtotal >= freeShippingThreshold ? (
                <span className="text-green-600">FREE</span>
              ) : (
                `₹${estimatedShipping}`
              )}
            </span>
          </div>

          <div className="flex justify-between">
            <span>GST (12%)</span>
            <span>₹{gst.toFixed(0)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{discount.toFixed(0)}</span>
            </div>
          )}

          <div className="border-t pt-4 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{total.toFixed(0)}</span>
          </div>
        </div>

        {/* PROMO CODE */}
        <div className="flex gap-2 mb-6">
          <input
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Promo Code"
            className="flex-1 px-4 py-3 border rounded-md"
          />
          <button
            onClick={handleApplyPromo}
            className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        <div className="text-xs">
          <div className="text-gray-900 font-semibold mb-1">
            100% SECURE CHECKOUT
          </div>
          <div className="text-gray-500">SSL Protected</div>
        </div>
        <div className="text-xs">
          <div className="text-gray-900 font-semibold mb-1">
            EASY 15-DAY RETURNS
          </div>
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
);

const CheckoutPage = () => {

  console.log("Enter2")

  const [paymentMethod, setPaymentMethod] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAttempts, setPaymentAttempts] = useState(0);

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
  const [discount, setDiscount] = useState(0);
  const [freeShippingThreshold] = useState(7000);
  const [shippingCost] = useState(150);
  const [gstRate] = useState(0.12);

  const { cart, cartTotal, cartCount } = useShop();

  console.log(cart, cartTotal, cartCount)
  const navigate = useNavigate();

  const subtotal = cartTotal;
  const estimatedShipping =
    subtotal >= freeShippingThreshold ? 0 : shippingCost;
  const gst = (subtotal + estimatedShipping) * gstRate;
  const total = subtotal + estimatedShipping + gst - discount;
  const freeShippingProgress = Math.min(
    (subtotal / freeShippingThreshold) * 100,
    100,
  );
  const amountNeeded = Math.max(freeShippingThreshold - subtotal, 0);

  useEffect(() => {
    if (cart.length === 0 && currentStep !== 3) {
      navigate("/cart");
    }
  }, [cart, navigate, currentStep]);

  const isAddressValid = () => {
    const { fullName, email, phone, address, zip, city, state } = shippingInfo;

    const validations = [
      !fullName.trim(),
      !email.trim(),
      !phone.trim() || phone.length < 10,
      !address.trim(),
      !zip || zip.length !== 6,
      !city || !state,
    ];

    return !validations.some((v) => v);
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;

    const validPromoCodes = {
      WELCOME15: 0.15,
      SAVE10: 0.1,
      FASHION20: 0.2,
    };

    const discountRate = validPromoCodes[promoCode.toUpperCase()];
    if (discountRate) {
      const discountAmount = subtotal * discountRate;
      setDiscount(discountAmount);
      alert(`Promo code applied! You saved ₹${discountAmount.toFixed(2)}`);
    } else {
      alert("Invalid promo code. Please try again.");
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));

    if (name === "zip" && value.length === 6) {
      try {
        const res = await fetch(
          `https://api.postalpincode.in/pincode/${value}`,
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
          setShippingInfo((prev) => ({ ...prev, city: "", state: "" }));
          alert("Invalid Pincode");
        }
      } catch (error) {
        alert("Unable to fetch location");
      }
    }
  };

  const simulatePayment = () => {
    setIsProcessing(true);
    setShowPaymentModal(true);

    setTimeout(() => {
      const isSuccess = Math.random() > 0.2 || paymentAttempts >= 2;

      if (isSuccess) {
        setPaymentStatus("success");

        const orderData = {
          orderId: `ORD${Date.now()}`,
          shipping: shippingInfo,
          payment: paymentMethod,
          items: cart,
          subtotal,
          shippingCost: estimatedShipping,
          gst,
          discount,
          total,
          orderDate: new Date().toISOString(),
        };

        localStorage.setItem("lastOrder", JSON.stringify(orderData));
        setCurrentStep(3);
        setPaymentAttempts(0);
      } else {
        setPaymentStatus("failed");
        setPaymentAttempts((prev) => prev + 1);

        const errors = [
          "Insufficient funds in your account.",
          "Payment gateway timeout. Please try again.",
          "Bank server is currently unavailable.",
          "Card declined by issuer bank.",
          "Transaction amount exceeds daily limit.",
        ];
        setPaymentError(errors[Math.floor(Math.random() * errors.length)]);
      }

      setIsProcessing(false);
    }, 2500);
  };

  // const handlePlaceOrder = (e) => {
  //   e.preventDefault();
  //   simulatePayment();
  // };


  const handlePlaceOrder = async (e) => {
    e.preventDefault();
  
    // ✅ COD FLOW (REAL ORDER)
    if (paymentMethod === "cod") {
      try {
        const res = await fetch("http://localhost:4000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // if using auth
          },
          body: JSON.stringify({
            shipping: shippingInfo,
            items: cart,
            subtotal,
            shippingCost: estimatedShipping,
            gst,
            discount,
            total,
            paymentMethod: "cod",
          }),
        });
  
        const data = await res.json();
  
        if (data.success) {
          setPaymentStatus("success");
          setCurrentStep(3);
        } else {
          setPaymentStatus("failed");
          setPaymentError(data.message);
          setCurrentStep(3);
        }
      } catch (err) {
        setPaymentStatus("failed");
        setPaymentError("Something went wrong");
        setCurrentStep(3);
      }
  
      return;
    }
  
    // 💳 ONLINE PAYMENT FLOW
    simulatePayment();
  };


  const handleRetryPayment = () => {
    setPaymentStatus("");
    setPaymentError("");
    setShowPaymentModal(false);
    simulatePayment();
  };

  const handleTryDifferentMethod = () => {
    setPaymentStatus("");
    setPaymentError("");
    setShowPaymentModal(false);
    setCurrentStep(2);
  };

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
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Processing Payment
            </h3>
            <p className="text-gray-600 mb-6">
              Please wait while we process your payment securely...
            </p>
            <div className="space-y-2">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 rounded-full animate-pulse w-3/4"></div>
              </div>
              <p className="text-sm text-gray-500">
                Do not refresh or close this window
              </p>
            </div>
          </div>
        ) : paymentStatus === "failed" ? (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="text-red-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Payment Failed
            </h3>
            <p className="text-gray-600 mb-4">{paymentError}</p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-800">
                    Troubleshooting tips:
                  </p>
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

  const ShippingAddressSection = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <MapPin size={20} /> Shipping Address
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
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
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
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
            ${shippingInfo.phone.length === 10 ? "border-green-500" : "border-gray-300 focus-within:border-black"}`}
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
                setShippingInfo((prev) => ({ ...prev, phone: val }));
              }}
              placeholder="Enter mobile no."
              className="w-full px-4 py-3 outline-none rounded-r-lg placeholder-gray-400"
            />
            {shippingInfo.phone.length === 10 && (
              <span className="px-3 text-green-600 font-bold">&#10004;</span>
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
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
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
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none placeholder-gray-400"
          />
        </div>
      </form>

      <button
        disabled={!isAddressValid()}
        onClick={() => isAddressValid() && setCurrentStep(2)}
        className={`cursor-pointer ${`mt-6 px-6 py-3 rounded-lg font-semibold transition
          ${
            isAddressValid()
              ? "bg-black text-white hover:bg-green-800"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}`}
      >
        Continue to Payment →
      </button>
    </div>
  );

  //  Payment Method Section
  const PaymentMethodSection = () => (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>
        <div className="space-y-3">
          {[
            {
              value: "upi",
              label: "UPI (GPay, PhonePe, Paytm)",
              description: "Fast & Secure | Most Preferred",
              icons: [gpay, phonepe, paytm],
              iconComponent: null,
            },
            {
              value: "card",
              label: "Credit / Debit Card",
              description: "Visa, Mastercard, RuPay",
              icons: [],
              iconComponent: <CreditCard className="text-purple-600" />,
            },
            {
              value: "netbanking",
              label: "Net Banking",
              description: "All major Indian banks supported",
              icons: [],
              iconComponent: <Landmark className="text-green-600" />,
            },
            {
              value: "cod",
              label: "Cash on Delivery",
              description:
                "COD available on orders below ₹199. Pay when you receive your order",
              icons: [],
              iconComponent: <Truck className="text-orange-600" />,
            },
          ].map((method) => (
            <label
              key={method.value}
              className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all
                ${
                  paymentMethod === method.value
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
            >
              <input
                type="radio"
                name="payment"
                value={method.value}
                checked={paymentMethod === method.value}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-5 h-5 text-green-600 focus:ring-green-500"
              />

              {method.icons.length > 0 ? (
                <>
                  <div className="flex items-center gap-2">
                    {method.icons.map((icon, idx) => (
                      <img
                        key={idx}
                        src={icon}
                        alt=""
                        className="h-5 w-auto object-contain"
                      />
                    ))}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {method.label}
                    </p>
                    <p className="text-sm text-gray-500">
                      {method.description}
                    </p>
                  </div>
                </>
              ) : (
                <div className="ml-4 flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${
                      method.value === "card"
                        ? "bg-purple-50"
                        : method.value === "netbanking"
                          ? "bg-green-50"
                          : "bg-orange-50"
                    }`}
                  >
                    {method.iconComponent}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      {method.label}
                    </p>
                    <p className="text-sm text-gray-500">
                      {method.description}
                    </p>
                  </div>
                </div>
              )}
            </label>
          ))}
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
          disabled={!paymentMethod}
          className={`cursor-pointer ${`px-6 py-3 rounded-lg font-semibold transition
            ${
              paymentMethod
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}`}
        >
          Place Order & Pay →
        </button>
      </div>
    </>
  );

  //  Success Content Section
  const SuccessContentSection = () => (
    <div className="col-span-1 lg:col-span-3">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <ShieldCheck className="text-green-600 w-10 h-10" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Order Placed Successfully
          </h2>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg mb-6">
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg inline-block mb-3 animate-fade-in">
              <span className="font-semibold">Order ID:</span> ORD{Date.now()}
            </div>
            <p className="text-green-700 font-medium">
              Estimated Delivery:{" "}
              {new Date(
                Date.now() + 3 * 24 * 60 * 60 * 1000,
              ).toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Package className="text-gray-600" />
                <span className="font-semibold">Shipping To</span>
              </div>
              <p className="text-gray-700">{shippingInfo.fullName}</p>
              <p className="text-sm text-gray-600">
                {shippingInfo.address}, {shippingInfo.city}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CreditCard className="text-gray-600" />
                <span className="font-semibold">Payment Method</span>
              </div>
              <p className="text-gray-700 capitalize">{paymentMethod}</p>
              <p className="text-sm text-green-600 font-medium">
                Payment Successful
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="text-gray-600" />
                <span className="font-semibold">Order Summary</span>
              </div>
              <p className="text-gray-700">{cartCount} items</p>
              <p className="text-lg font-bold text-gray-900">
                ₹{total.toFixed(0)}
              </p>
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
              onClick={() => navigate("/my-account/orders")}
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

  //  Failure Content Section
  const FailureContentSection = () => (
    <div className="col-span-1 lg:col-span-3">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-red-100 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <AlertCircle className="text-red-600 w-10 h-10" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Payment Failed
          </h2>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg mb-6">
            <p className="text-red-700 font-medium mb-3">
              <AlertCircle className="inline mr-2" />
              {paymentError}
            </p>
            <p className="text-gray-600">
              Order ID: <span className="font-semibold">ORD{Date.now()}</span> •
              Amount: ₹{total.toFixed(0)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="text-red-600" />
                <span className="font-semibold">Security Alert</span>
              </div>
              <p className="text-sm text-gray-700">
                Your transaction was declined for security reasons
              </p>
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
              <p className="text-sm text-gray-700">
                Try a different payment method
              </p>
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
                &#9742; Call Support: +91 7378021327
              </a>
              <span className="text-gray-400">•</span>
              <a
                href="mailto:support@graphura.com"
                className="text-green-600 font-medium hover:text-green-800 hover:underline cursor-pointer"
              >
                &#9993; Email: support@graphura.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const EmptyCartSection = () => (
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
  );

  //  Free Shipping Progress Section
  const FreeShippingProgressSection = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Almost there!</span>
        <span className="text-lg font-bold text-gray-900">
          {freeShippingProgress.toFixed(0)}%
        </span>
      </div>

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
  );



  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <ShieldCheck className="text-green-600" /> Secure Checkout
          </h1>

          {/* Checkout Stepper */}
          <CheckoutStepper
            currentStep={currentStep}
            hasFailed={paymentStatus === "failed"}
          />

          {/* Payment Processing Modal */}
          {showPaymentModal && <PaymentProcessingModal />}

          {/* Development Testing Panel */}
          {/* {process.env.NODE_ENV === "development" && (
            <DevelopmentTestingPanel />
          )} */}

          {/* Free Shipping Progress */}
          {currentStep !== 3 && cart.length > 0 && (
            <FreeShippingProgressSection />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN: Shipping & Payment Forms */}
            {(currentStep === 1 || currentStep === 2) && (
              <div className="lg:col-span-2 space-y-6">
                {currentStep === 1 && <ShippingAddressSection />}
                {currentStep === 2 && <PaymentMethodSection />}
              </div>
            )}

            {/* Step 3 Content (Success/Failure) */}
            {currentStep === 3 &&
              (paymentStatus === "failed" ? (
                <FailureContentSection />
              ) : (
                <SuccessContentSection />
              ))}

            {currentStep !== 3 &&
              (cart.length > 0 ? (
                <OrderSummarySection
                  cart={cart}
                  cartCount={cartCount}
                  subtotal={subtotal}
                  estimatedShipping={estimatedShipping}
                  freeShippingThreshold={freeShippingThreshold}
                  gst={gst}
                  discount={discount}
                  total={total}
                  promoCode={promoCode}
                  setPromoCode={setPromoCode}
                  handleApplyPromo={handleApplyPromo}
                />
              ) : (
                <EmptyCartSection />
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;

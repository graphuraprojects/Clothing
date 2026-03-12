import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Package,
  RefreshCw,
  Clock,
  Shield,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Globe,
  Home,
  Store,
  CreditCard,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Check,
  X,
  TrendingUp,
  Heart,
  Zap,
  Star,
  MessageSquare,
  Users,
  Award,
  Gift,
  Tag,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";

const ShippingReturns = () => {
  const [activeTab, setActiveTab] = useState("shipping");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="bg-white overflow-hidden">
      {/* HERO BANNER - MOBILE RESPONSIVE */}
      <section className="relative min-h-[50vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 to-[#2C1810]">
        {/* Background pattern - hidden on mobile, visible on desktop */}
        <div className="absolute inset-0 w-full opacity-5 md:opacity-10">
          <div className="absolute top-1/4 left-4 md:left-10 w-32 h-32 md:w-96 md:h-96 bg-[#ECD1A8] rounded-full blur-xl md:blur-3xl"></div>
          <div className="absolute bottom-1/4 right-4 md:right-10 w-32 h-32 md:w-96 md:h-96 bg-[#ECD1A8] rounded-full blur-xl md:blur-3xl"></div>
        </div>

        {/* Fashion-themed background images - hidden on mobile */}
        <div className="hidden md:block absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-48 h-64 bg-gradient-to-br from-[#ECD1A8] to-transparent rounded-lg rotate-12"></div>
          <div className="absolute bottom-20 right-10 w-48 h-64 bg-gradient-to-br from-transparent to-[#ECD1A8] rounded-lg -rotate-12"></div>
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 md:mb-8 w-full"
          >
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="w-20 h-20 md:w-32 md:h-32 bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg md:shadow-2xl border-2 md:border-4 border-[#ECD1A8]/30">
                <Truck className="w-10 h-10 md:w-16 md:h-16 text-[#ECD1A8]" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 text-white tracking-tight px-2">
              Shipping & <span className="text-[#ECD1A8]">Returns</span>
            </h1>
            <div className="w-16 h-0.5 md:w-24 md:h-1 bg-[#ECD1A8] mx-auto mb-4 md:mb-6"></div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-sm sm:text-base md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6 md:mb-8 px-2"
          >
            Transparent shipping policies and hassle-free returns. Your
            satisfaction is our priority.
          </motion.p>

          {/* Stats Banner - Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#ECD1A8]" />
              <span className="text-xs sm:text-sm md:text-base text-white font-medium">
                Free Shipping Over ₹5000
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#ECD1A8]" />
              <span className="text-xs sm:text-sm md:text-base text-white font-medium">
                30-Day Returns
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#ECD1A8]" />
              <span className="text-xs sm:text-sm md:text-base text-white font-medium">
                Quality Guaranteed
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TAB NAVIGATION - MOBILE RESPONSIVE */}
      <section className="py-4 sm:py-6 md:py-8 w-full px-4 sm:px-6 md:px-8 lg:px-16 -mt-4 md:-mt-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="w-full"
        >
          <motion.div
            variants={itemVariants}
            className="w-full bg-white p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-lg md:shadow-2xl border border-gray-200"
          >
            <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2">
              <button
                onClick={() => setActiveTab("shipping")}
                className={`cursor-pointer ${`flex-1 flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base md:text-lg transition-all ${
                  activeTab === "shipping"
                    ? "bg-[#8b6f47] text-white shadow"
                    : "text-gray-700 hover:bg-gray-50"
                }`}`}
              >
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span className="hidden sm:inline">Shipping</span>
                <span className="sm:hidden">Ship</span>
              </button>

              <button
                onClick={() => setActiveTab("returns")}
                className={`cursor-pointer ${`flex-1 flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base md:text-lg transition-all ${
                  activeTab === "returns"
                    ? "bg-[#8b6f47] text-white shadow"
                    : "text-gray-700 hover:bg-gray-50"
                }`}`}
              >
                <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span className="hidden sm:inline">Returns</span>
                <span className="sm:hidden">Return</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* MAIN CONTENT - MOBILE RESPONSIVE */}
      <section className="py-8 sm:py-12 md:py-16 w-full px-4 sm:px-6 md:px-8 lg:px-16">
        {activeTab === "shipping" && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="w-full space-y-8 sm:space-y-10 md:space-y-12"
          >
            {/* Shipping Methods - Responsive Grid */}
            <motion.div variants={itemVariants}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#ECD1A8] to-[#D4B483] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <Truck className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 sm:mb-2">
                    Shipping Methods & Delivery
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                    Choose the shipping option that works best for you
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {[
                  {
                    title: "Standard Shipping",
                    time: "5-7 Business Days",
                    price: "Free on orders above ₹5000",
                    icon: (
                      <Package className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    ),
                    color: "bg-gradient-to-br from-blue-50 to-blue-100",
                    borderColor: "border-blue-200",
                    features: [
                      "Tracking included",
                      "Insurance covered",
                      "Doorstep delivery",
                    ],
                  },
                  {
                    title: "Express Shipping",
                    time: "2-3 Business Days",
                    price: "₹299 flat rate",
                    icon: (
                      <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    ),
                    color: "bg-gradient-to-br from-emerald-50 to-emerald-100",
                    borderColor: "border-emerald-200",
                    features: [
                      "Priority handling",
                      "Real-time tracking",
                      "Metro cities only",
                    ],
                  },
                  {
                    title: "International Shipping",
                    time: "10-15 Business Days",
                    price: "Calculated at checkout",
                    icon: (
                      <Globe className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    ),
                    color: "bg-gradient-to-br from-purple-50 to-purple-100",
                    borderColor: "border-purple-200",
                    features: [
                      "50+ countries",
                      "Customs assistance",
                      "DDP available",
                    ],
                  },
                ].map((method, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-xl sm:rounded-2xl shadow-lg md:shadow-xl ${method.borderColor} border overflow-hidden group hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="h-32 sm:h-0.25 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-700"></div>
                    <div className="p-4 sm:p-5 md:p-6">
                      <div
                        className={`inline-flex p-2 sm:p-3 rounded-lg sm:rounded-xl ${method.color} mb-3 sm:mb-4`}
                      >
                        {method.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                        {method.title}
                      </h3>
                      <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">
                          {method.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4 md:mb-6">
                        <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        <span className="text-gray-700 text-sm sm:text-base">
                          {method.price}
                        </span>
                      </div>
                      <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                        {method.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1.5 sm:gap-2"
                          >
                            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                            <span className="text-gray-700 text-xs sm:text-sm md:text-base">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Shipping Process Timeline - Responsive */}
            <motion.div variants={itemVariants}>
              <div className="bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl shadow-lg md:shadow-2xl border border-gray-200">
                <div className="text-center mb-6 sm:mb-8 md:mb-12">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
                    Shipping Process Timeline
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
                    From order to doorstep - follow your premium fashion journey
                  </p>
                </div>

                <div className="relative">
                  {/* Timeline line - Hidden on mobile, visible on desktop */}
                  <div className="hidden sm:block absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-[#ECD1A8] via-[#D4B483] to-[#ECD1A8] -translate-y-1/2"></div>

                  {/* Timeline steps - Responsive grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-2 md:gap-4 relative">
                    {[
                      {
                        step: "1",
                        title: "Order Placed",
                        desc: "Within 24 hours",
                        icon: (
                          <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                        ),
                      },
                      {
                        step: "2",
                        title: "Processing",
                        desc: "1-2 business days",
                        icon: (
                          <Tag className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                        ),
                      },
                      {
                        step: "3",
                        title: "Quality Check",
                        desc: "Final inspection",
                        icon: (
                          <Shield className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                        ),
                      },
                      {
                        step: "4",
                        title: "Dispatched",
                        desc: "Shipping label",
                        icon: (
                          <Truck className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                        ),
                      },
                      {
                        step: "5",
                        title: "Delivered",
                        desc: "At your doorstep",
                        icon: (
                          <Home className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                        ),
                      },
                    ].map((step, index) => (
                      <div key={index} className="text-center group">
                        <div className="relative mx-auto mb-3 sm:mb-4 md:mb-6">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white border-2 sm:border-3 md:border-4 border-[#ECD1A8] rounded-full flex items-center justify-center mx-auto shadow-lg md:shadow-2xl group-hover:scale-105 transition-transform duration-300">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#ECD1A8] to-[#D4B483] rounded-full flex items-center justify-center text-white">
                              {step.icon}
                            </div>
                          </div>
                          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-[#8b6f47] text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm md:text-base shadow">
                            {step.step}
                          </div>
                        </div>
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg lg:text-xl mb-1 sm:mb-2 group-hover:text-[#B89A67] transition-colors">
                          {step.title}
                        </h4>
                        <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Shipping Info Cards - Responsive */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {/* What We Ship */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg md:shadow-xl border border-blue-200">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                        What We Ship
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Premium fashion delivered worldwide
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-lg hover:shadow transition-shadow">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">
                          All Collections
                        </div>
                        <div className="text-gray-700 text-xs sm:text-sm">
                          Ready-to-wear, accessories, limited editions
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-lg hover:shadow transition-shadow">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">
                          International Shipping
                        </div>
                        <div className="text-gray-700 text-xs sm:text-sm">
                          Available to 50+ countries worldwide
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-lg hover:shadow transition-shadow">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">
                          Gift Packaging
                        </div>
                        <div className="text-gray-700 text-xs sm:text-sm">
                          Available for all orders upon request
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Restrictions */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg md:shadow-xl border border-amber-200">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow">
                      <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                        Shipping Restrictions
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Important information to know
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-lg hover:shadow transition-shadow">
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">
                          Remote Areas
                        </div>
                        <div className="text-gray-700 text-xs sm:text-sm">
                          Additional delivery time may apply
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-lg hover:shadow transition-shadow">
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">
                          PO Boxes
                        </div>
                        <div className="text-gray-700 text-xs sm:text-sm">
                          Not available for international shipping
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-lg hover:shadow transition-shadow">
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">
                          Restricted Items
                        </div>
                        <div className="text-gray-700 text-xs sm:text-sm">
                          Certain countries have import restrictions
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === "returns" && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="w-full space-y-8 sm:space-y-10 md:space-y-12"
          >
            {/* Returns Policy - Responsive */}
            <motion.div variants={itemVariants}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <RefreshCw className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 sm:mb-2">
                    Returns & Exchange Policy
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                    Hassle-free returns and exchanges for your peace of mind
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
                <div className="md:w-2/3">
                  <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl shadow-lg md:shadow-xl border border-gray-200">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">
                      Our Return Policy
                    </h3>
                    <div className="space-y-4 sm:space-y-6 md:space-y-8">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 md:gap-6">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#ECD1A8] to-[#D4B483] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow">
                          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 md:mb-3">
                            30-Day Return Window
                          </h4>
                          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                            You have 30 days from the delivery date to return
                            your items for a full refund. Items must be unworn,
                            unwashed, and in their original condition with tags
                            attached.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 md:gap-6">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#ECD1A8] to-[#D4B483] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow">
                          <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 md:mb-3">
                            Free Returns in India
                          </h4>
                          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                            We offer free returns for all orders within India.
                            For international returns, shipping costs are
                            deducted from your refund amount.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/3 space-y-4 sm:space-y-6">
                  {/* Return Eligibility */}
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-emerald-200">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-emerald-600" />
                      <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                        Return Eligibility
                      </h4>
                    </div>
                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-lg">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-emerald-600" />
                        <span className="text-gray-700 text-xs sm:text-sm md:text-base">
                          Unworn, unwashed items
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-lg">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-emerald-600" />
                        <span className="text-gray-700 text-xs sm:text-sm md:text-base">
                          Original tags attached
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-lg">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-emerald-600" />
                        <span className="text-gray-700 text-xs sm:text-sm md:text-base">
                          Original packaging
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-lg">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-emerald-600" />
                        <span className="text-gray-700 text-xs sm:text-sm md:text-base">
                          Within 30 days
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Non-Returnable Items */}
                  <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-rose-200">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                      <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-rose-600" />
                      <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                        Non-Returnable Items
                      </h4>
                    </div>
                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-lg">
                        <X className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-rose-600" />
                        <span className="text-gray-700 text-xs sm:text-sm md:text-base">
                          Final sale items
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-lg">
                        <X className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-rose-600" />
                        <span className="text-gray-700 text-xs sm:text-sm md:text-base">
                          Worn or damaged items
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-lg">
                        <X className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-rose-600" />
                        <span className="text-gray-700 text-xs sm:text-sm md:text-base">
                          Gift cards
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/80 backdrop-blur-sm rounded-lg">
                        <X className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-rose-600" />
                        <span className="text-gray-700 text-xs sm:text-sm md:text-base">
                          Personalized items
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Returns Process - Responsive */}
            <motion.div variants={itemVariants}>
              <div className="bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl shadow-lg md:shadow-2xl border border-gray-200">
                <div className="text-center mb-6 sm:mb-8 md:mb-12">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
                    Simple 4-Step Return Process
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                    Easy returns designed with your convenience in mind
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {[
                    {
                      step: "1",
                      title: "Initiate Return",
                      desc: "Login and request return",
                      icon: (
                        <RefreshCw className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                      ),
                      color: "bg-gradient-to-br from-blue-500 to-blue-600",
                    },
                    {
                      step: "2",
                      title: "Print Label",
                      desc: "Download prepaid label",
                      icon: (
                        <Package className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                      ),
                      color:
                        "bg-gradient-to-br from-emerald-500 to-emerald-600",
                    },
                    {
                      step: "3",
                      title: "Pack & Ship",
                      desc: "Pack and drop at courier",
                      icon: (
                        <Truck className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                      ),
                      color: "bg-gradient-to-br from-amber-500 to-amber-600",
                    },
                    {
                      step: "4",
                      title: "Get Refund",
                      desc: "Receive refund after check",
                      icon: (
                        <CreditCard className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                      ),
                      color: "bg-gradient-to-br from-purple-500 to-purple-600",
                    },
                  ].map((step, index) => (
                    <div key={index} className="text-center group">
                      <div className="relative mb-4 sm:mb-6 md:mb-8">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mx-auto shadow-lg border-2 border-gray-200 group-hover:border-[#ECD1A8] transition-all duration-300">
                          <div
                            className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 ${step.color} rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow`}
                          >
                            {step.icon}
                          </div>
                        </div>
                        <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#8b6f47] text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm md:text-base shadow">
                          {step.step}
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 text-base sm:text-lg md:text-xl mb-1 sm:mb-2 md:mb-3">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Exchange & Warranty - Responsive */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {/* Exchange Policy */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg md:shadow-xl border border-purple-200">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow">
                      <Store className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                        Exchange Policy
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Easy size and color exchanges
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-lg hover:shadow transition-shadow">
                      <div className="font-bold text-gray-900 text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                        Size/Color Exchange
                      </div>
                      <div className="text-gray-700 text-xs sm:text-sm md:text-base">
                        Free exchanges for different sizes or colors (subject to
                        availability)
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-lg hover:shadow transition-shadow">
                      <div className="font-bold text-gray-900 text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                        Exchange Window
                      </div>
                      <div className="text-gray-700 text-xs sm:text-sm md:text-base">
                        Same 30-day period as returns. Exchanges processed
                        within 5-7 business days.
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-lg hover:shadow transition-shadow">
                      <div className="font-bold text-gray-900 text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                        Price Differences
                      </div>
                      <div className="text-gray-700 text-xs sm:text-sm md:text-base">
                        If the new item costs more, you'll pay the difference.
                        If it costs less, you'll receive a refund.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Warranty & Damages */}
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg md:shadow-xl border border-cyan-200">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow">
                      <Shield className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                        Warranty & Damages
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Quality assurance and support
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-lg hover:shadow transition-shadow">
                      <div className="font-bold text-gray-900 text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                        Manufacturing Defects
                      </div>
                      <div className="text-gray-700 text-xs sm:text-sm md:text-base">
                        1-year warranty against manufacturing defects. Contact
                        us with photos and details.
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-lg hover:shadow transition-shadow">
                      <div className="font-bold text-gray-900 text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                        Damaged in Transit
                      </div>
                      <div className="text-gray-700 text-xs sm:text-sm md:text-base">
                        Report damaged items within 48 hours of delivery with
                        photos for immediate replacement.
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-lg hover:shadow transition-shadow">
                      <div className="font-bold text-gray-900 text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                        Wrong Item Received
                      </div>
                      <div className="text-gray-700 text-xs sm:text-sm md:text-base">
                        Contact us immediately. We'll arrange pickup and send
                        correct item with priority shipping.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* FAQ SECTION - MOBILE RESPONSIVE */}
      <section className="py-8 sm:py-12 md:py-16 w-full px-4 sm:px-6 md:px-8 lg:px-16 bg-gray-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="w-full"
        >
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
              Quick answers to common shipping and returns questions
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
            {/* Shipping FAQs */}
            <div className="md:w-1/2">
              <motion.div
                variants={itemVariants}
                className="space-y-4 sm:space-y-6"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3">
                  <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#B89A67]" />
                  Shipping Questions
                </h3>

                {[
                  {
                    question: "How do I track my order?",
                    answer:
                      "Once your order ships, you'll receive a tracking number via email and SMS. You can also track it from your account dashboard.",
                    icon: <Truck className="w-5 h-5 sm:w-6 sm:h-6" />,
                  },
                  {
                    question: "What if I'm not home for delivery?",
                    answer:
                      "Our courier partner will attempt delivery twice. After that, the package will be held at the nearest facility for pickup.",
                    icon: <Home className="w-5 h-5 sm:w-6 sm:h-6" />,
                  },
                  {
                    question: "Do you ship internationally?",
                    answer:
                      "Yes, we ship to 50+ countries worldwide. Shipping costs and delivery times vary by destination.",
                    icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />,
                  },
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl shadow border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#ECD1A8] to-[#D4B483] rounded-lg flex items-center justify-center flex-shrink-0 shadow">
                        {faq.icon}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg md:text-lg font-bold text-gray-900 mb-1 sm:mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-gray-700 text-sm sm:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Returns FAQs */}
            <div className="md:w-1/2">
              <motion.div
                variants={itemVariants}
                className="space-y-4 sm:space-y-6"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3">
                  <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 text-[#B89A67]" />
                  Returns Questions
                </h3>

                {[
                  {
                    question: "How long do refunds take?",
                    answer:
                      "Refunds are processed within 7-10 business days after we receive your return. Bank processing may take additional 3-5 days.",
                    icon: <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />,
                  },
                  {
                    question: "What is your return window?",
                    answer:
                      "We offer a 30-day return window from the delivery date for unworn items in original condition with tags attached.",
                    icon: <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />,
                  },
                  {
                    question: "What if I receive a damaged item?",
                    answer:
                      "Contact us within 48 hours with photos of the damaged item and packaging. We'll arrange immediate replacement.",
                    icon: <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
                  },
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl shadow border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#ECD1A8] to-[#D4B483] rounded-lg flex items-center justify-center flex-shrink-0 shadow">
                        {faq.icon}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg md:text-lg font-bold text-gray-900 mb-1 sm:mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-gray-700 text-sm sm:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SUPPORT CTA - MOBILE RESPONSIVE */}
      <section className="py-8 sm:py-12 md:py-16 w-full px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="w-full"
        >
          <div className="w-full bg-gradient-to-br from-gray-900 to-[#c56e4b] p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl sm:rounded-2xl shadow-xl md:shadow-2xl text-white text-center">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#ECD1A8] to-[#D4B483] rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg md:shadow-2xl">
                  <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-900" />
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6">
                Need More Help?
              </h2>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-2">
                Our customer support team is ready to assist you with any
                shipping or returns questions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10 md:mb-12">
                <div className="p-4 sm:p-5 md:p-6 lg:p-8 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/20 hover:border-[#ECD1A8] transition-all duration-300">
                  <Phone className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#ECD1A8] mx-auto mb-3 sm:mb-4 md:mb-6" />
                  <div className="font-bold text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2">
                    Call Us
                  </div>
                  <div className="text-gray-300 text-sm sm:text-base md:text-lg">
                    +91 7378021327
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm mt-1">
                    Mon-Fri, 9AM-6PM IST
                  </div>
                </div>

                <div className="p-4 sm:p-5 md:p-6 lg:p-8 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/20 hover:border-[#ECD1A8] transition-all duration-300">
                  <Mail className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#ECD1A8] mx-auto mb-3 sm:mb-4 md:mb-6" />
                  <div className="font-bold text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2">
                    Email Us
                  </div>
                  <a
                    href="mailto:support@graphura.in"
                    className="text-[#ECD1A8] hover:underline text-sm sm:text-base md:text-lg block cursor-pointer"
                  >
                    support@graphura.in
                  </a>
                  <div className="text-gray-400 text-xs sm:text-sm mt-1">
                    24/7 email support
                  </div>
                </div>

                <div className="p-4 sm:p-5 md:p-6 lg:p-8 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/20 hover:border-[#ECD1A8] transition-all duration-300">
                  <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#ECD1A8] mx-auto mb-3 sm:mb-4 md:mb-6" />
                  <div className="font-bold text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2">
                    Live Chat
                  </div>
                  <div className="text-gray-300 text-sm sm:text-base md:text-lg">
                    Available on website
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm mt-1">
                    Mon-Fri, 10AM-7PM IST
                  </div>
                </div>
              </div>

              <button className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 bg-[#ECD1A8] text-gray-900 font-bold text-sm sm:text-base md:text-lg rounded-full hover:bg-[#D4B483] transition-colors shadow-lg hover:shadow-xl cursor-pointer">
                Start Live Chat Now
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FINAL CTA - MOBILE RESPONSIVE */}
      <section className="py-8 sm:py-12 md:py-16 w-full px-4 sm:px-6 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="w-full"
        >
          <div className="w-full bg-gradient-to-br from-[#ECD1A8] to-[#D4B483] p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl sm:rounded-2xl shadow-xl md:shadow-2xl border-2 sm:border-3 md:border-4 border-white text-center relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 sm:opacity-20">
              <div className="absolute top-4 left-4 w-16 h-16 sm:top-10 sm:left-10 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 sm:bottom-10 sm:right-10 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white rounded-full"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
                Ready to Shop With Confidence?
              </h2>
              <p className="text-gray-900 text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-2">
                Enjoy free shipping, easy returns, and premium quality
                guaranteed.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <a
                  href="/collections"
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 bg-[#8b6f47] text-white font-bold rounded-full hover:bg-[#7a6140] transition-colors shadow-lg hover:shadow-xl text-sm sm:text-base cursor-pointer"
                >
                  <Store className="w-4 h-4 sm:w-5 sm:h-5" />
                  Shop Premium Collection
                </a>

                <a
                  href="/dashboard/orders"
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl text-sm sm:text-base cursor-pointer"
                >
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
                  Track Your Order
                </a>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 pt-4 sm:pt-6 md:pt-8 border-t border-gray-900/20">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#8b6f47] rounded-full flex items-center justify-center mb-1 sm:mb-2">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
                    Secure Payments
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-900 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                    <Truck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
                    Free Shipping
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-900 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
                    30-Day Returns
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default ShippingReturns;

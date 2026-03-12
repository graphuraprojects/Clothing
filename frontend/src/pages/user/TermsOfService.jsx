import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  FileText,
  Scale,
  Gavel,
  AlertCircle,
  ChevronRight,
  Search,
  Download,
  User,
  Lock,
  Globe,
  CreditCard,
  Shield,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Check,
  X,
  AlertTriangle,
  Users,
  Building,
  GraduationCap,
  Award,
  Heart,
  TrendingUp,
  Database,
  Server,
  Key,
  Bell,
  Trash2,
  Eye,
  ClipboardCheck,
  Share2,
  Cpu,
  ShoppingBag,
  Package,
  Truck,
  Gift,
  RefreshCw,
  ThumbsUp,
  HelpCircle,
} from "lucide-react";

const TermsOfService = () => {
  const refs = useRef([]);
  const isInView = useInView(refs.current, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="bg-white overflow-hidden">
      {/* HERO BANNER - FULL WIDTH */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-white">
        {/* Full width background pattern */}
        <div className="absolute inset-0 w-full">
          <div className="absolute top-1/4 left-10 w-[40%] h-96 bg-[#ECD1A8]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-[40%] h-96 bg-[#ECD1A8]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#ECD1A8] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#ECD1A8] to-transparent"></div>
        </div>

        <div className="relative z-10 w-full px-4 md:px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8 w-full"
          >
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-2xl border-4 border-[#D4B483]">
                <Scale className="w-16 h-16 text-gray-900" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900 tracking-tight px-4">
              Terms of <span className="text-[#B89A67]">Service</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Graphura Clothing Co.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="w-full"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-[#8b6f47] text-white rounded-full text-lg font-semibold shadow-2xl">
              <Gavel className="w-6 h-6" />
              Effective Date: February 2026
            </div>
          </motion.div>
        </div>
      </section>

      {/* INTRODUCTION - FULL WIDTH */}
      <section className="py-16 w-full px-4 md:px-8 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="w-full"
        >
          <motion.div
            variants={itemVariants}
            className="w-full bg-linear-to-br from-white to-gray-50 p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200 mb-8"
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Welcome to Graphura
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                These Terms of Service ("Terms") govern your use of graphura
                Clothing Co.'s website, mobile site, and online store. By
                accessing or purchasing from our store, you agree to be bound by
                these Terms. If you disagree with any part of the terms, please
                do not use our services.
              </p>
              <div className="p-6 bg-[#ECD1A8]/10 rounded-xl border border-[#D4B483]/30">
                <p className="text-gray-900 font-semibold text-lg">
                  <AlertCircle className="inline w-6 h-6 mr-2 text-[#B89A67]" />
                  Important: These Terms constitute a legally binding agreement
                  between you and graphura Clothing Co. Please read them
                  carefully before placing an order.
                </p>
              </div>
            </div>
          </motion.div>

          {/* QUICK NAVIGATION - FULL WIDTH */}
          <motion.div
            variants={itemVariants}
            className="w-full bg-[#ECD1A8] p-8 md:p-12 rounded-2xl shadow-xl border border-[#D4B483]"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <FileText className="w-6 h-6" />
                  Quick Navigation
                </h3>
                <p className="text-gray-700">
                  Jump directly to any section of our Terms of Service
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search in terms..."
                    className="pl-12 pr-4 py-3 bg-white rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B89A67] w-64"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  num: "1",
                  title: "Acceptance of Terms",
                  icon: <Check className="w-5 h-5" />,
                  color: "bg-blue-100 text-blue-800",
                },
                {
                  num: "2",
                  title: "Eligibility",
                  icon: <User className="w-5 h-5" />,
                  color: "bg-emerald-100 text-emerald-800",
                },
                {
                  num: "3",
                  title: "Orders & Payments",
                  icon: <CreditCard className="w-5 h-5" />,
                  color: "bg-amber-100 text-amber-800",
                },
                {
                  num: "4",
                  title: "Shipping & Delivery",
                  icon: <Truck className="w-5 h-5" />,
                  color: "bg-purple-100 text-purple-800",
                },
                {
                  num: "5",
                  title: "Returns & Refunds",
                  icon: <RefreshCw className="w-5 h-5" />,
                  color: "bg-red-100 text-red-800",
                },
                {
                  num: "6",
                  title: "User Accounts",
                  icon: <Users className="w-5 h-5" />,
                  color: "bg-cyan-100 text-cyan-800",
                },
                {
                  num: "7",
                  title: "Intellectual Property",
                  icon: <BookOpen className="w-5 h-5" />,
                  color: "bg-indigo-100 text-indigo-800",
                },
                {
                  num: "8",
                  title: "Prohibited Activities",
                  icon: <X className="w-5 h-5" />,
                  color: "bg-gray-100 text-gray-800",
                },
                {
                  num: "9",
                  title: "Limitation of Liability",
                  icon: <Shield className="w-5 h-5" />,
                  color: "bg-pink-100 text-pink-800",
                },
                {
                  num: "10",
                  title: "Governing Law",
                  icon: <Scale className="w-5 h-5" />,
                  color: "bg-orange-100 text-orange-800",
                },
                {
                  num: "11",
                  title: "Contact Us",
                  icon: <Mail className="w-5 h-5" />,
                  color: "bg-teal-100 text-teal-800",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={`#section-${item.num}`}
                  className="flex items-center gap-4 p-6 bg-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                >
                  <span
                    className={`flex items-center justify-center w-12 h-12 ${item.color} rounded-xl text-lg font-bold group-hover:scale-110 transition-transform`}
                  >
                    {item.num}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {item.icon}
                      <span className="font-bold text-gray-900 group-hover:text-[#B89A67] transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">Click to jump</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 ml-auto group-hover:translate-x-2 transition-transform" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* TERMS SECTIONS - FULL WIDTH */}
      <section className="py-16 w-full px-4 md:px-8 lg:px-16 space-y-12">
        {/* Section 1 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-1"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">1</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Acceptance of Terms
                </h2>
                <p className="text-gray-600 mt-2">
                  Understanding your agreement with us
                </p>
              </div>
            </div>

            <div className="w-full bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Check className="w-6 h-6 text-blue-600" />
                    1.1 Agreement
                  </h3>
                  <p className="text-gray-700">
                    By accessing, browsing, or making a purchase on graphura.in,
                    you acknowledge that you have read, understood, and agree to
                    be bound by these Terms of Service.
                  </p>
                </div>

                <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-emerald-600" />
                    1.2 Modifications
                  </h3>
                  <p className="text-gray-700">
                    We reserve the right to update these Terms at any time.
                    Continued use of our website or placing orders after changes
                    constitutes acceptance of the new Terms.
                  </p>
                </div>
              </div>

              <div className="p-8 bg-linear-to-r from-[#ECD1A8]/20 to-[#D4B483]/20 rounded-2xl border-2 border-[#D4B483]/30">
                <div className="flex items-start gap-4">
                  <Scale className="w-8 h-8 text-[#B89A67] shrink-0-flex" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-xl mb-2">
                      Legal Binding
                    </h4>
                    <p className="text-gray-700">
                      These Terms constitute a legally binding agreement between
                      you (the "Customer") and Graphura Clothing Co. ("Company,"
                      "we," "us," or "our"). By completing a purchase, you agree
                      to these Terms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-2"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">2</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Eligibility Requirements
                </h2>
                <p className="text-gray-600 mt-2">Who can shop at Graphura</p>
              </div>
            </div>

            <div className="w-full space-y-8">
              {[
                {
                  number: "2.1",
                  icon: <User className="w-10 h-10" />,
                  title: "Age Requirement",
                  content:
                    "You must be at least 18 years of age to make a purchase. If you are under 18, you may use our site only with involvement of a parent or guardian.",
                  color: "bg-blue-50",
                },
                {
                  number: "2.2",
                  icon: <Globe className="w-10 h-10" />,
                  title: "Shipping Eligibility",
                  content:
                    "We currently ship to select countries. Please check our shipping policy at checkout. Some products may have regional availability restrictions.",
                  color: "bg-emerald-50",
                },
                {
                  number: "2.3",
                  icon: <CreditCard className="w-10 h-10" />,
                  title: "Payment Method",
                  content:
                    "You must have a valid payment method accepted by our partners (credit/debit card, UPI, net banking, or COD where available).",
                  color: "bg-amber-50",
                },
                {
                  number: "2.4",
                  icon: <Shield className="w-10 h-10" />,
                  title: "Account Integrity",
                  content:
                    "You agree to provide accurate, current, and complete information during account creation and checkout. False information may result in order cancellation.",
                  color: "bg-purple-50",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`w-full ${item.color} p-8 rounded-2xl shadow-lg border border-gray-200`}
                >
                  <div className="flex items-start gap-6">
                    <div className="shrink-0-flex">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
                          <span className="text-xl font-bold text-gray-900">
                            {item.number}
                          </span>
                        </div>
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
                          {item.icon}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 text-lg">{item.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-3"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">3</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Orders & Payments
                </h2>
                <p className="text-gray-600 mt-2">
                  How we process your purchases
                </p>
              </div>
            </div>

            <div className="w-full bg-linear-to-br from-white to-gray-50 p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
                  <div className="w-12 h-12 bg-[#ECD1A8] rounded-lg flex items-center justify-center mb-4">
                    <ShoppingBag className="w-6 h-6 text-gray-900" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    3.1 Order Placement
                  </h3>
                  <p className="text-gray-700">
                    Placing an item in your cart does not guarantee availability
                    or pricing. Your order is confirmed when you receive an
                    order confirmation email.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
                  <div className="w-12 h-12 bg-[#ECD1A8] rounded-lg flex items-center justify-center mb-4">
                    <CreditCard className="w-6 h-6 text-gray-900" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    3.2 Pricing & Payment
                  </h3>
                  <p className="text-gray-700">
                    All prices are in INR inclusive of applicable taxes. We
                    accept Visa, Mastercard, RuPay, UPI, Net Banking, and COD
                    (orders under ₹5000).
                  </p>
                </div>

                <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
                  <div className="w-12 h-12 bg-[#ECD1A8] rounded-lg flex items-center justify-center mb-4">
                    <X className="w-6 h-6 text-gray-900" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    3.3 Order Cancellation
                  </h3>
                  <p className="text-gray-700">
                    You may cancel your order within 2 hours of placement before
                    processing. Once shipped, our return policy applies.
                  </p>
                </div>
              </div>

              <div className="p-8 bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Order Processing Timeline
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-xl font-bold text-[#B89A67] mb-1">
                      0-2 Hours
                    </div>
                    <div className="text-sm text-gray-600">
                      Free cancellation window
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-xl font-bold text-[#B89A67] mb-1">
                      24-48 Hours
                    </div>
                    <div className="text-sm text-gray-600">
                      Order processing
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-xl font-bold text-[#B89A67] mb-1">
                      3-7 Days
                    </div>
                    <div className="text-sm text-gray-600">
                      Shipping (domestic)
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-xl font-bold text-[#B89A67] mb-1">
                      7-15 Days
                    </div>
                    <div className="text-sm text-gray-600">
                      International shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 4 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-4"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">4</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Shipping & Delivery
                </h2>
                <p className="text-gray-600 mt-2">
                  How we get your order to you
                </p>
              </div>
            </div>

            <div className="w-full space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  4.1 Shipping Partners & Timelines
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Truck className="w-5 h-5" />
                      Domestic Shipping
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0-flex" />
                        <span className="text-gray-700">
                          Metro cities: 3-5 business days
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0-flex" />
                        <span className="text-gray-700">
                          Tier 2/3 cities: 5-7 business days
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0-flex" />
                        <span className="text-gray-700">
                          Free shipping on orders above ₹999
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-amber-50 rounded-xl border border-amber-200">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      International Shipping
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0-flex" />
                        <span className="text-gray-700">
                          USA/UK/Europe: 7-12 business days
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0-flex" />
                        <span className="text-gray-700">
                          UAE/Singapore: 5-8 business days
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <X className="w-5 h-5 text-red-600 mt-0.5 shrink-0-flex" />
                        <span className="text-gray-700">
                          Customs duties borne by customer
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-700 text-sm">
                    <span className="font-bold">Note:</span> Delivery timelines
                    are estimates and may vary due to unforeseen circumstances.
                    We are not liable for delays caused by courier partners or
                    customs.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 5 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-5"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">5</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Returns, Exchanges & Refunds
                </h2>
                <p className="text-gray-600 mt-2">
                  Our policy if you're not satisfied
                </p>
              </div>
            </div>

            <div className="w-full space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-linear-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl shadow-lg border border-emerald-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    5.1 Return Window
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                      <span className="font-medium text-gray-900">
                        Domestic Orders
                      </span>
                      <span className="font-bold text-[#B89A67]">
                        7 Days Delivery
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                      <span className="font-medium text-gray-900">
                        International Orders
                      </span>
                      <span className="font-bold text-[#B89A67]">
                        10 Days Delivery
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                      <span className="font-medium text-gray-900">
                        Store Credit Validity
                      </span>
                      <span className="font-bold text-[#B89A67]">1 Year</span>
                    </div>
                  </div>
                </div>

                <div className="bg-linear-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg border border-purple-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    5.2 Refund Policy
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Prepaid Orders</span>
                      <span className="font-bold text-green-600">
                        5-7 business days
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">COD Orders</span>
                      <span className="font-bold text-amber-600">
                        Store credit / Bank transfer
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">
                        Non-returnable Items
                      </span>
                      <span className="font-bold text-red-600">
                        Innerwear, masks, sale items
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  5.3 Return Conditions
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-start gap-2 mb-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0-flex" />
                      <span className="text-gray-700">
                        Item unused, unwashed, with tags attached
                      </span>
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0-flex" />
                      <span className="text-gray-700">
                        Original packaging intact
                      </span>
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0-flex" />
                      <span className="text-gray-700">
                        Return request initiated within window
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-2 mb-2">
                      <X className="w-5 h-5 text-red-600 mt-0.5 shrink-0-flex" />
                      <span className="text-gray-700">
                        Customized or personalized items
                      </span>
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <X className="w-5 h-5 text-red-600 mt-0.5 shrink-0-flex" />
                      <span className="text-gray-700">
                        Final sale / clearance products
                      </span>
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <X className="w-5 h-5 text-red-600 mt-0.5 shrink-0-flex" />
                      <span className="text-gray-700">
                        Damaged due to customer misuse
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 6 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-6"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">6</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  User Accounts & Loyalty Program
                </h2>
                <p className="text-gray-600 mt-2">
                  Managing your Graphura profile
                </p>
              </div>
            </div>

            <div className="w-full bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="p-6 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Users className="w-6 h-6 text-blue-600" />
                    6.1 Account Creation
                  </h3>
                  <p className="text-gray-700 mb-4">
                    You are responsible for maintaining the confidentiality of
                    your account credentials. Notify us immediately of any
                    unauthorized use.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0-flex" />
                      <span className="text-gray-700">
                        One account per user
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0-flex" />
                      <span className="text-gray-700">
                        Accurate personal information
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-linear-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Gift className="w-6 h-6 text-amber-600" />
                    6.2 Graphura Loyalty
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Earn points on every purchase. 100 points = ₹50 off. Points
                    expire after 12 months of inactivity.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0-flex" />
                      <span className="text-gray-700">
                        1 point per ₹100 spent
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0-flex" />
                      <span className="text-gray-700">
                        Double points on birthday month
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-linear-to-r from-red-50 to-red-100 rounded-2xl border border-red-200">
                <h4 className="font-bold text-gray-900 text-xl mb-4">
                  6.3 Account Suspension
                </h4>
                <p className="text-gray-700 mb-4">
                  We reserve the right to suspend or terminate accounts that
                  violate our Terms, including but not limited to:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2 p-3 bg-white rounded-lg">
                    <X className="w-5 h-5 text-red-600 mt-0.5 shrink-0-flex" />
                    <span className="text-gray-700">
                      Fraudulent transactions
                    </span>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-white rounded-lg">
                    <X className="w-5 h-5 text-red-600 mt-0.5 shrink-0-flex" />
                    <span className="text-gray-700">
                      Abusive return behavior
                    </span>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-white rounded-lg">
                    <X className="w-5 h-5 text-red-600 mt-0.5 shrink-0-flex" />
                    <span className="text-gray-700">Multiple chargebacks</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-white rounded-lg">
                    <X className="w-5 h-5 text-red-600 mt-0.5 shrink-0-flex" />
                    <span className="text-gray-700">Bot/reseller abuse</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 7 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-7"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">7</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Intellectual Property
                </h2>
                <p className="text-gray-600 mt-2">
                  Our brand, designs, and content
                </p>
              </div>
            </div>

            <div className="w-full bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="p-6 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    7.1 Our Content
                  </h3>
                  <p className="text-gray-700">
                    All content on Graphura.in—including logos, graphics,
                    product images, taglines, and original designs—is the sole
                    property of Graphura Clothing Co. and protected under
                    intellectual property laws.
                  </p>
                </div>

                <div className="p-6 bg-linear-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Eye className="w-6 h-6 text-emerald-600" />
                    7.2 Limited License
                  </h3>
                  <p className="text-gray-700">
                    We grant you a personal, non-exclusive, non-transferable
                    license to access our site and view content for personal
                    shopping purposes only.
                  </p>
                </div>
              </div>

              <div className="p-8 bg-linear-to-r from-[#ECD1A8]/20 to-[#D4B483]/20 rounded-2xl border-2 border-[#D4B483]/30">
                <h4 className="font-bold text-gray-900 text-xl mb-4">
                  Restrictions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
                    <X className="w-5 h-5 text-red-600 mt-1 shrink-0-flex" />
                    <span className="text-gray-700">
                      Do not reproduce, duplicate, or copy product images
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
                    <X className="w-5 h-5 text-red-600 mt-1 shrink-0-flex" />
                    <span className="text-gray-700">
                      Do not use our logo or branding without permission
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
                    <X className="w-5 h-5 text-red-600 mt-1 shrink-0-flex" />
                    <span className="text-gray-700">
                      Do not scrape or data-mine our website
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
                    <X className="w-5 h-5 text-red-600 mt-1 shrink-0-flex" />
                    <span className="text-gray-700">
                      Do not sell counterfeit Graphura merchandise
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 8 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-8"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">8</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Prohibited Activities
                </h2>
                <p className="text-gray-600 mt-2">
                  What you cannot do on our platform
                </p>
              </div>
            </div>

            <div className="w-full bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-linear-to-br from-red-50 to-red-100 rounded-xl border border-red-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    8.1 Strictly Prohibited
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-600 mt-0.5 shrink-0-flex" />
                      <span className="text-gray-700">
                        Reselling Graphura products at inflated prices
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-600 mt-0.5 shrink-0-flex" />
                      <span className="text-gray-700">
                        Using bots to bypass purchase limits
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-600 mt-0.5 shrink-0-flex" />
                      <span className="text-gray-700">
                        Uploading malicious code or viruses
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-600 mt-0.5 shrink-0-flex" />
                      <span className="text-gray-700">
                        Harassing other customers or staff
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-linear-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <HelpCircle className="w-6 h-6 text-amber-600" />
                    8.2 Bulk Purchases
                  </h3>
                  <p className="text-gray-700 mb-3">
                    We reserve the right to cancel orders that appear to be for
                    commercial resale. For wholesale inquiries:
                  </p>
                  <a
                    href="mailto:wholesale@graphura.in"
                    className="text-[#B89A67] font-semibold hover:underline cursor-pointer"
                  >
                    wholesale@graphura.in
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 9 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-9"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">9</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Limitation of Liability
                </h2>
                <p className="text-gray-600 mt-2">
                  Legal disclaimers for our products
                </p>
              </div>
            </div>

            <div className="w-full bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
              <div className="space-y-8">
                <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    9.1 No Warranty
                  </h3>
                  <p className="text-gray-700">
                    Our products are provided "AS IS" without any express or
                    implied warranties. We do not guarantee that product
                    descriptions, colors, or sizing are 100% accurate due to
                    monitor variations and manufacturing tolerances.
                  </p>
                </div>

                <div className="p-6 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    9.2 Liability Cap
                  </h3>
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="shrink-0-flex">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <Shield className="w-12 h-12 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-700">
                        To the maximum extent permitted by law, Graphura
                        Clothing Co.'s total liability for any claim arising
                        from your purchase shall not exceed the amount you paid
                        for the product. We are not liable for indirect,
                        incidental, or consequential damages.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 10 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-10"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">10</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Governing Law & Disputes
                </h2>
                <p className="text-gray-600 mt-2">
                  Legal jurisdiction and resolution
                </p>
              </div>
            </div>

            <div className="w-full grid md:grid-cols-2 gap-8">
              <div className="bg-linear-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl shadow-lg border border-indigo-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md">
                    <Scale className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      10.1 Governing Law
                    </h3>
                    <div className="w-12 h-1 bg-indigo-600 rounded-full"></div>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  These Terms shall be governed by the laws of India. Any
                  disputes arising hereunder shall be subject to the exclusive
                  jurisdiction of courts in Gurgaon, Haryana.
                </p>
              </div>

              <div className="bg-linear-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl shadow-lg border border-emerald-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md">
                    <Users className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      10.2 Dispute Resolution
                    </h3>
                    <div className="w-12 h-1 bg-emerald-600 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <span className="font-bold text-emerald-600">1</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        Customer Support
                      </div>
                      <div className="text-gray-700">
                        Contact us first to resolve issues
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <span className="font-bold text-emerald-600">2</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Mediation</div>
                      <div className="text-gray-700">
                        If unresolved within 30 days
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 11 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-11"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">11</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Contact Us
                </h2>
                <p className="text-gray-600 mt-2">
                  How to reach our support team
                </p>
              </div>
            </div>

            <div className="w-full grid md:grid-cols-2 gap-8">
              <div className="bg-linear-to-br from-gray-900 to-[#2C1810] p-8 rounded-2xl shadow-xl text-white">
                <h3 className="text-2xl font-bold mb-6">
                  11.1 Customer Support
                </h3>

                <div className="space-y-6">
                  <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="w-5 h-5 text-[#ECD1A8]" />
                      <h4 className="font-bold">Order Support</h4>
                    </div>
                    <a
                      href="mailto:orders@graphura.in"
                      className="text-[#ECD1A8] hover:underline block cursor-pointer"
                    >
                      orders@graphura.in
                    </a>
                  </div>

                  <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <RefreshCw className="w-5 h-5 text-[#ECD1A8]" />
                      <h4 className="font-bold">Returns & Exchanges</h4>
                    </div>
                    <a
                      href="mailto:returns@graphura.in"
                      className="text-[#ECD1A8] hover:underline block cursor-pointer"
                    >
                      returns@graphura.in
                    </a>
                  </div>

                  <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Phone className="w-5 h-5 text-[#ECD1A8]" />
                      <h4 className="font-bold">Phone Support</h4>
                    </div>
                    <div className="text-[#ECD1A8]">+91 98765 43210</div>
                    <div className="text-gray-400 text-sm mt-1">
                      Mon-Sat, 10AM-7PM IST
                    </div>
                  </div>

                  <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-5 h-5 text-[#ECD1A8]" />
                      <h4 className="font-bold">Registered Office</h4>
                    </div>
                    <div className="text-gray-300">
                      Graphura Clothing Co.
                      <br />
                      123, Fashion Street
                      <br />
                      Gurgaon, Haryana 122001
                      <br />
                      India
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  11.2 Miscellaneous
                </h3>

                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-2">
                      Entire Agreement
                    </h4>
                    <p className="text-gray-700 text-sm">
                      These Terms constitute the entire agreement between you
                      and Graphura regarding your use of our store.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-2">
                      Severability
                    </h4>
                    <p className="text-gray-700 text-sm">
                      If any provision is found unenforceable, the remaining
                      provisions remain in full force.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-2">No Waiver</h4>
                    <p className="text-gray-700 text-sm">
                      Our failure to enforce a right does not waive our right to
                      enforce it later.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full mt-8 bg-linear-to-r from-[#ECD1A8] to-[#D4B483] p-8 rounded-2xl shadow-xl border border-[#D4B483]">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Acknowledgement
                  </h3>
                  <p className="text-gray-900">
                    By completing a purchase or creating an account, you
                    acknowledge that you have read, understood, and agree to be
                    bound by these Terms of Service.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <Scale className="w-6 h-6 text-gray-900" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      February 2026
                    </div>
                    <div className="text-gray-900">Effective Date</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Back to Top - Full Width */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full mt-16 pt-8 border-t border-gray-200 text-center"
        >
          <a
            href="#top"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#8b6f47] text-white font-bold text-lg rounded-full hover:shadow-2xl transition-all hover:scale-105 hover:bg-[#7a6140] cursor-pointer"
          >
            <span>Back to Top</span>
            <ChevronRight className="w-6 h-6 -rotate-90" />
          </a>

          <div className="mt-8 text-gray-600">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <Gavel className="w-5 h-5 text-[#B89A67]" />
                <span className="font-semibold">Legally Binding</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#B89A67]" />
                <span className="font-semibold">Effective February 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#B89A67]" />
                <span className="font-semibold">Jurisdiction: Gurgaon</span>
              </div>
            </div>
            <p>© 2026 Graphura Clothing Co. All rights reserved.</p>
            <p className="mt-1">
              These Terms of Service were last updated in February 2026
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default TermsOfService;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MessageSquare,
  Search,
  Truck,
  CreditCard,
  Users,
  ShieldCheck,
  RefreshCw,
  Leaf,
  Globe,
  ShoppingBag,
} from "lucide-react";

const FAQPage = () => {
  // activeId is now a string (e.g., "0-1") or null, ensuring only one stays open
  const [activeId, setActiveId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const faqCategories = [
    {
      id: "shipping",
      title: "Shipping & Logistics",
      icon: <Truck className="w-6 h-6" />,
      color: "bg-blue-50 text-blue-700",
      questions: [
        {
          q: "How long does standard delivery take?",
          a: "For orders within India, delivery typically takes 5-7 business days. For remote areas, it may take up to 10 days. You will receive a tracking link as soon as your order is dispatched.",
        },
        {
          q: "Do you offer Next-Day delivery?",
          a: "Currently, we offer Express Shipping (2-3 business days) for select metropolitan cities. Next-day delivery is not available at this moment.",
        },
        {
          q: "Can I change my shipping address after placing an order?",
          a: "Address changes are only possible within 4 hours of order placement. Once the order is processed for dispatch, we cannot redirect the shipment.",
        },
        {
          q: "What happens if my package is lost in transit?",
          a: "While rare, if a package is confirmed lost by our courier partner, we will either send a replacement or issue a full refund immediately.",
        },
      ],
    },
    {
      id: "returns",
      title: "Returns & Refunds",
      icon: <RefreshCw className="w-6 h-6" />,
      color: "bg-emerald-50 text-emerald-700",
      questions: [
        {
          q: "What is your return window?",
          a: "We accept returns within 15 days of delivery. Items must be unworn, unwashed, and have all original tags and packaging intact.",
        },
        {
          q: "Are returns free?",
          a: "We provide one free return/exchange per order within India. For subsequent returns from the same order, a nominal shipping fee of ₹150 is charged.",
        },
        {
          q: "How do I initiate an exchange for a different size?",
          a: "Visit our 'Returns Center' on the website, enter your Order ID, and select 'Exchange'. We will pick up the old item and ship the new size simultaneously.",
        },
        {
          q: "When will I receive my refund?",
          a: "Once the item reaches our warehouse and passes quality check (usually 48 hours), the refund is initiated. It takes 5-7 business days to reflect in your original payment method.",
        },
      ],
    },
    {
      id: "products",
      title: "Product & Fabric Care",
      icon: <Leaf className="w-6 h-6" />,
      color: "bg-amber-50 text-amber-700",
      questions: [
        {
          q: "Will the colors bleed during the first wash?",
          a: "Our fabrics are pre-washed, but since we use natural dyes for many collections, we recommend washing dark colors separately in cold water for the first few cycles.",
        },
        {
          q: "Do you provide a size chart for each product?",
          a: "Yes, every product page has a 'Size Guide' button with specific measurements. Please note that handmade items may have a slight 0.5-inch variance.",
        },
        {
          q: "Are your fabrics organic?",
          a: "We prioritize GOTS-certified organic cotton and sustainable linen. Check the 'Composition' section on the product page for specific material details.",
        },
        {
          q: "How should I store my hand-woven garments?",
          a: "We recommend hanging delicate items on padded hangers or folding them neatly in breathable cotton bags to avoid snagging or stretching.",
        },
      ],
    },
    {
      id: "payments",
      title: "Payments & Security",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "bg-purple-50 text-purple-700",
      questions: [
        {
          q: "Is it safe to use my credit card on your site?",
          a: "Absolutely. We use SSL encryption and PCI-DSS compliant payment gateways (Razorpay/Stripe) to ensure your data is never stored and always encrypted.",
        },
        {
          q: "Do you offer Cash on Delivery (COD)?",
          a: "Yes, COD is available for orders up to ₹10,000 within India. A small convenience fee may apply at checkout.",
        },
        {
          q: "What should I do if my payment failed but money was deducted?",
          a: "Don't worry! This is usually a bank sync issue. The amount is typically refunded automatically within 24-48 hours. Please contact us if it doesn't reflect.",
        },
      ],
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase().trim();
    if (!query) return;

    let foundId = null;
    faqCategories.forEach((cat, catIdx) => {
      cat.questions.forEach((q, qIdx) => {
        if (
          q.q.toLowerCase().includes(query) ||
          q.a.toLowerCase().includes(query)
        ) {
          foundId = `${catIdx}-${qIdx}`;
        }
      });
    });

    if (foundId) {
      setActiveId(foundId);
      document
        .getElementById(`faq-${foundId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="bg-white min-h-screen text-gray-900 pb-20">
      {/* Header Section */}
      <section className="bg-[#efe7da] py-20 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            Help <span className="text-[#B89A67]">Center</span>
          </motion.h1>
          <p className="text-gray-600 mb-10 text-lg">
            Have a question? We're here to help you every step of the way.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for topics (e.g. 'washing', 'tracking')..."
              className="w-full pl-14 pr-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#B89A67] outline-none shadow-sm transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#8b6f47] text-white px-6 py-2 rounded-xl hover:bg-[#7a6140] transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 mt-16">
        <div className="space-y-12">
          {faqCategories.map((category, catIdx) => (
            <div key={category.id} className="scroll-mt-24" id={category.id}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-2xl ${category.color}`}>
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold">{category.title}</h2>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {category.questions.map((faq, qIdx) => {
                  const id = `${catIdx}-${qIdx}`;
                  const isOpen = activeId === id;
                  return (
                    <div
                      key={id}
                      id={`faq-${id}`}
                      className="border-b last:border-0 border-gray-50"
                    >
                      <button
                        onClick={() => toggleAccordion(id)}
                        className="w-full flex justify-between items-center px-6 py-6 text-left hover:bg-gray-50/50 transition-colors cursor-pointer"
                      >
                        <span
                          className={`text-lg font-medium pr-8 transition-colors ${isOpen ? "text-[#B89A67]" : "text-gray-800"}`}
                        >
                          {faq.q}
                        </span>
                        <div
                          className={`p-1 rounded-full transition-transform duration-300 ${isOpen ? "bg-[#ECD1A8] rotate-180" : "bg-gray-100"}`}
                        >
                          <ChevronDown
                            size={20}
                            className={
                              isOpen ? "text-gray-900" : "text-gray-400"
                            }
                          />
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="px-6 pb-8 text-gray-600 leading-relaxed text-base border-l-4 border-[#B89A67] ml-6 mr-6 mb-4 bg-gray-50/30 p-4 rounded-r-xl">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Contact CTA */}
      <section className="max-w-4xl mx-auto px-4 mt-24">
        <div className="bg-[#f5f0eb] rounded-[2.5rem] p-10 text-center text-gray-800 relative overflow-hidden border border-[#e8e2d9]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#B89A67] blur-[100px] opacity-20"></div>
          <h3 className="text-3xl font-bold mb-4">Didn't find your answer?</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Our support team is available via chat and email to assist you with
            specific inquiries.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+917378021327"
              className="flex items-center gap-2 bg-[#fbf6ed] text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-[#ECD1A8] transition-colors cursor-pointer"
            >
              <Phone size={18} />
              Call Now
            </a>
            <a
              href="mailto:support@graphura.in"
              className="flex items-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-[#ECD1A8] transition-colors cursor-pointer"
            >
              <Mail size={18} />
              Email Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;

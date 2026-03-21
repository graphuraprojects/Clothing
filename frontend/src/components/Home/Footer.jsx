import React, { useState } from "react";
import logo from "../../assets/logo/logo.webp";
import logoWhite from "../../assets/logo/logoWhite.webp";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaArrowLeft,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredSection, setHoveredSection] = useState(null);
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleAboutLinkClick = (sectionId) => {
    sessionStorage.setItem("previousPage", location.pathname);
    const cleanSectionId = sectionId
      .replace("/about#", "")
      .replace("#", "")
      .replace("/about", "");
    navigate(`/about#${cleanSectionId}`);
  };

  const handleAboutNavigation = () => {
    sessionStorage.setItem("previousPage", location.pathname);
    navigate("/about");
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const navLinks = {
    Shopping: [
      { to: "/men", label: "Men's Collection" },
      { to: "/women", label: "Women's Collection" },
      { to: "/kids", label: "Kids" },
      { to: "/collections", label: "All Collections" },
    ],
    Company: [
      { action: () => navigate("/about"), label: "About" },
      { action: () => navigate("/weavers"), label: "Our Weavers" },
      { action: () => navigate("/sustainability"), label: "Sustainability" },
    ],
    Support: [
      { action: () => navigate("/shipping"), label: "Shipping & Returns" },
      { action: () => navigate("/faq"), label: "FAQ" },
    ],
  };

  const socials = [
    { href: "https://x.com/Graphura", Icon: FaXTwitter, label: "X / Twitter" },
    {
      href: "https://www.linkedin.com/company/graphura-india-private-limited/",
      Icon: FaLinkedinIn,
      label: "LinkedIn",
    },
    {
      href: "https://www.facebook.com/Graphura.in?mibextid=ZbWKwL",
      Icon: FaFacebookF,
      label: "Facebook",
    },
    {
      href: "https://www.instagram.com/graphura.in?igsh=cW9laTd6amxjeWZh",
      Icon: FaInstagram,
      label: "Instagram",
    },
  ];

  return (
    <footer className="bg-[#f9f6f1] text-gray-500 border-t border-[#e8e2d9] relative overflow-hidden">
      {/* Decorative background texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #c4a265 0px, #c4a265 1px, transparent 1px, transparent 12px)`,
        }}
      />

      {/* Gold accent line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c4a265]/40 to-transparent" />

      {/* Newsletter strip */}
      <div className="w-full bg-[#1a1612] relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-[#c4a265] text-[10px] tracking-[0.3em] uppercase font-medium mb-1">
              Join the Circle
            </p>
            <p className="text-white/80 text-[13px] font-light">
              Exclusive access to new collections & artisan stories
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="flex gap-2 w-full sm:w-auto"
          >
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="your@email.com"
              className="bg-white/10 text-white placeholder:text-white/30 border border-white/15 rounded-full px-5 py-2.5 text-[13px] font-light outline-none focus:border-[#c4a265]/60 transition-all duration-300 w-full sm:w-64"
            />
            <button
              type="submit"
              className="bg-[#c4a265] hover:bg-[#b8924f] text-white text-[12px] tracking-[0.15em] uppercase font-medium px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              {subscribed ? "✓ Done!" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-20 relative">
        {/* Top Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-14 mb-14 lg:mb-16">
          {/* Brand */}
          <div className="space-y-6 lg:col-span-1">
            {/* LARGER LOGO */}
            <div className="group cursor-pointer" onClick={() => navigate("/")}>
              <img
                src={logo}
                alt="Graphura Logo"
                className="h-16 w-auto transition-all duration-500 group-hover:opacity-80 group-hover:scale-[1.03]"
              />
            </div>

            <p className="text-[13px] leading-relaxed text-gray-400 font-light">
              Modern heritage redefined. Elevating Indian luxury through
              minimalist design and artisanal craft.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5 pt-1">
              {socials.map(({ href, Icon, label }, index) => (
                <a
                  key={index}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-400
                    hover:border-[#c4a265] hover:text-[#c4a265] hover:bg-[#c4a265]/8
                    transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:shadow-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="text-[12px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Shopping */}
          <div
            onMouseEnter={() => setHoveredSection("Shopping")}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <h3
              className={`text-[11px] font-medium tracking-[0.2em] uppercase mb-6 transition-colors duration-300 ${
                hoveredSection === "Shopping"
                  ? "text-[#c4a265]"
                  : "text-gray-800"
              }`}
            >
              Shopping
            </h3>
            <ul className="space-y-3.5">
              {navLinks.Shopping.map(({ to, label }) => (
                <li key={to} className="group flex items-center gap-1.5">
                  <span className="w-0 group-hover:w-3 h-[1px] bg-[#c4a265] transition-all duration-300 flex-shrink-0" />
                  <Link
                    to={to}
                    className="text-[13px] font-light tracking-wide transition-all duration-300 hover:text-[#8b6f47]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div
            onMouseEnter={() => setHoveredSection("Company")}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <h3
              className={`text-[11px] font-medium tracking-[0.2em] uppercase mb-6 transition-colors duration-300 ${
                hoveredSection === "Company"
                  ? "text-[#c4a265]"
                  : "text-gray-800"
              }`}
            >
              Company
            </h3>
            <ul className="space-y-3.5">
              {navLinks.Company.map(({ action, label }) => (
                <li key={label} className="group flex items-center gap-1.5">
                  <span className="w-0 group-hover:w-3 h-[1px] bg-[#c4a265] transition-all duration-300 flex-shrink-0" />
                  <button
                    onClick={action}
                    className="text-left text-[13px] font-light tracking-wide transition-all duration-300 hover:text-[#8b6f47]"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div
            onMouseEnter={() => setHoveredSection("Support")}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <h3
              className={`text-[11px] font-medium tracking-[0.2em] uppercase mb-6 transition-colors duration-300 ${
                hoveredSection === "Support"
                  ? "text-[#c4a265]"
                  : "text-gray-800"
              }`}
            >
              Support
            </h3>
            <ul className="space-y-3.5">
              {navLinks.Support.map(({ action, label }) => (
                <li key={label} className="group flex items-center gap-1.5">
                  <span className="w-0 group-hover:w-3 h-[1px] bg-[#c4a265] transition-all duration-300 flex-shrink-0" />
                  <button
                    onClick={action}
                    className="text-left text-[13px] font-light tracking-wide transition-all duration-300 hover:text-[#8b6f47]"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <a href="/contact" className="inline-block group mb-6">
              <div className="flex items-center gap-2">
                <h3 className="text-gray-800 text-[11px] font-medium tracking-[0.2em] uppercase group-hover:text-[#c4a265] transition-all duration-300">
                  Contact Us
                </h3>
                <FaArrowRight className="text-gray-300 text-[10px] transform transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#c4a265]" />
              </div>
            </a>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <FaMapMarkerAlt className="text-gray-300 mt-1 text-sm flex-shrink-0 transition-all duration-300 group-hover:text-[#c4a265]" />
                <span className="text-[13px] font-light leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                  Graphura India Private Limited, near RSF, Pataudi, Gurgaon,
                  Haryana 122503
                </span>
              </li>

              <li className="flex items-center gap-3 group">
                <FaPhoneAlt className="text-gray-300 text-xs flex-shrink-0 transition-all duration-300 group-hover:text-[#c4a265]" />
                <a
                  href="tel:+917378021327"
                  className="text-[13px] font-light hover:text-[#8b6f47] transition-all duration-300 group-hover:translate-x-0.5"
                >
                  +91 7378021327
                </a>
              </li>

              <li className="flex items-center gap-3 group">
                <FaEnvelope className="text-gray-300 text-xs flex-shrink-0 transition-all duration-300 group-hover:text-[#c4a265]" />
                <a
                  href="mailto:support@graphura.in"
                  className="text-[13px] font-light hover:text-[#8b6f47] transition-all duration-300"
                >
                  support@graphura.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#e8e2d9] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-wider text-gray-400">
            <p>© 2025 Graphura India Private Limited. All rights reserved.</p>
            <div className="flex gap-8">
              <Link
                to="/privacy-policy"
                className="hover:text-[#8b6f47] transition-all duration-300 relative group"
              >
                Privacy Policy
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#c4a265] group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                to="/terms-of-service"
                className="hover:text-[#8b6f47] transition-all duration-300 relative group"
              >
                Terms of Service
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#c4a265] group-hover:w-full transition-all duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

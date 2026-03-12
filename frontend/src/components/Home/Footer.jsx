import React from "react";
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

  return (
    <footer className="bg-[#f9f6f1] text-gray-500 border-t border-[#e8e2d9]">
      {/* Gold accent line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c4a265]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-20">
        {/* Top Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-14 mb-14 lg:mb-16">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-1">
            <img src={logo} alt="Graphura Logo" className="h-10 w-auto" />

            <p className="text-[14px] leading-relaxed text-gray-400 font-light">
              Modern heritage redefined. Elevating Indian luxury through
              minimalist design and artisanal craft.
            </p>

            <div className="flex gap-3 pt-1">
              {[
                { href: "https://x.com/Graphura", Icon: FaXTwitter },
                { href: "https://www.linkedin.com/company/graphura-india-private-limited/", Icon: FaLinkedinIn },
                { href: "https://www.facebook.com/Graphura.in?mibextid=ZbWKwL", Icon: FaFacebookF },
                { href: "https://www.instagram.com/graphura.in?igsh=cW9laTd6amxjeWZh", Icon: FaInstagram },
              ].map(({ href, Icon }, index) => (
                <a
                  key={index}
                  href={href}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-400
                    hover:border-[#c4a265] hover:text-[#c4a265] hover:bg-[#c4a265]/5
                    transition-all duration-300 hover:scale-105 cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="text-[13px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Shopping */}
          <div>
            <h3 className="text-gray-800 text-[11px] font-medium tracking-[0.2em] uppercase mb-6">
              Shopping
            </h3>
            <ul className="space-y-3.5">
              {[
                { to: "/men", label: "Men's Collection" },
                { to: "/women", label: "Women's Collection" },
                { to: "/kids", label: "Kids" },
                { to: "/collections", label: "All Collections" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-[13px] font-light tracking-wide inline-block transition-all duration-300 hover:text-[#8b6f47] hover:translate-x-1 cursor-pointer"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-gray-800 text-[11px] font-medium tracking-[0.2em] uppercase mb-6">
              Company
            </h3>
            <ul className="space-y-3.5">
              {[
                { action: () => navigate("/about"), label: "About" },
                { action: () => navigate("/weavers"), label: "Our Weavers" },
                { action: () => navigate("/sustainability"), label: "Sustainability" },
              ].map(({ action, label }) => (
                <li key={label}>
                  <button
                    onClick={action}
                    className="w-full text-left text-[13px] font-light tracking-wide transition-all duration-300 hover:text-[#8b6f47] hover:translate-x-1 cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-gray-800 text-[11px] font-medium tracking-[0.2em] uppercase mb-6">
              Support
            </h3>
            <ul className="space-y-3.5">
              {[
                { action: () => navigate("/shipping"), label: "Shipping & Returns" },
                { action: () => navigate("/faq"), label: "FAQ" },
              ].map(({ action, label }) => (
                <li key={label}>
                  <button
                    onClick={action}
                    className="w-full text-left text-[13px] font-light tracking-wide transition-all duration-300 hover:text-[#8b6f47] hover:translate-x-1 cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <a href="/contact" className="inline-block group mb-6 cursor-pointer">
              <div className="flex items-center gap-2">
                <h3 className="text-gray-800 text-[11px] font-medium tracking-[0.2em] uppercase group-hover:text-[#c4a265] transition-all duration-300">
                  Contact Us
                </h3>
                <FaArrowRight className="text-gray-300 text-[10px] transform transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#c4a265]" />
              </div>
            </a>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-gray-300 mt-1 text-sm flex-shrink-0 transition-all duration-300 hover:text-[#c4a265]" />
                <span className="text-[13px] font-light leading-relaxed">
                  Graphura India Private Limited, near RSF, Pataudi, Gurgaon,
                  Haryana 122503
                </span>
              </li>

              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-gray-300 text-xs flex-shrink-0 transition-all duration-300 hover:text-[#c4a265]" />
                <a
                  href="tel:+917378021327"
                  className="text-[13px] font-light hover:text-[#8b6f47] transition-all duration-300 cursor-pointer"
                >
                  +91 7378021327
                </a>
              </li>

              <li className="flex items-center gap-3">
                <FaEnvelope className="text-gray-300 text-xs flex-shrink-0 transition-all duration-300 hover:text-[#c4a265]" />
                <a
                  href="mailto:support@graphura.in"
                  className="text-[13px] font-light hover:text-[#8b6f47] transition-all duration-300 cursor-pointer"
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
            <p>© 2026 Graphura India Private Limited. All rights reserved.</p>
            <div className="flex gap-8">
              <Link to="/privacy-policy" className="hover:text-[#8b6f47] transition-all duration-300 cursor-pointer">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-[#8b6f47] transition-all duration-300 cursor-pointer">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

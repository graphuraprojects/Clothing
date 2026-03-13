import heroImage from "../../assets/Home/herobg2.webp";
import HeroCarousel from "./HeroCarousel";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import BrandStory from "./BrandStory";
import InnerCircle from "./InnerCircle";
import { Link } from "react-router-dom";
import Coupons from "../../components/Home/Coupons";
import API from "../../api/axios";
import "./Home.css";

const AnimatedHeading = () => {
  const text = "Style for Every Story";
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    if (!isDeleting && displayedText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length + 1));
      }, 80);
    } else if (!isDeleting && displayedText.length === text.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length - 1));
      }, 40);
    } else if (isDeleting && displayedText.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting]);

  return (
    <div className="min-h-[40px] sm:min-h-[50px] md:min-h-[70px]">
      <h1 className="hero-main-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
        <b>{displayedText}</b>
        <span
          className="inline-block w-[2px] h-[0.8em] ml-1 align-middle"
          style={{
            background: "var(--gold)",
            animation: "gentlePulse 1s ease-in-out infinite",
          }}
        ></span>
      </h1>
    </div>
  );
};

/* ─── Scroll Reveal Hook ─── */
const useScrollReveal = () => {
  const observe = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observe, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    });
    document
      .querySelectorAll(".sr, .sr-left, .sr-right, .sr-scale")
      .forEach((el) => {
        observer.observe(el);
      });
    return () => observer.disconnect();
  }, [observe]);
};

const Landing = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  /* ─── Activate scroll reveals ─── */
  useScrollReveal();

  /* ================= FETCH PRODUCTS (LOGIC ONLY) ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        const data = res.data.products || res.data;

        const newArrivals = [...data]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 2)
          .map((p) => ({ ...p, badge: "NEW ARRIVAL" }));

        const trending = data
          .filter((p) => p.isTrending)
          .slice(0, 2)
          .map((p) => ({ ...p, badge: "TRENDING" }));

        const premium = data
          .filter((p) => p.isPremium)
          .slice(0, 2)
          .map((p) => ({ ...p, badge: "PREMIUM" }));

        const limited = data
          .filter((p) => p.isLimited)
          .slice(0, 2)
          .map((p) => ({ ...p, badge: "LIMITED EDITION" }));

        const usedIds = new Set(
          [...newArrivals, ...trending, ...premium, ...limited].map(
            (p) => p._id,
          ),
        );

        const bestSeller = data
          .filter((p) => !usedIds.has(p._id))
          .slice(0, 2)
          .map((p) => ({ ...p, badge: "BEST SELLER" }));

        const final = [
          ...bestSeller,
          ...newArrivals,
          ...trending,
          ...premium,
          ...limited,
        ];

        const unique = Array.from(
          new Map(final.map((p) => [p._id, p])).values(),
        );

        setProducts(unique.slice(0, 8));
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-editorial">
      {/* ════════════════════════════════════════════════════════════
           HERO — ULTRA-ADVANCED LIGHT LUXURY
           ════════════════════════════════════════════════════════════ */}
      <section className="hero-editorial">
        {/* Gold progress bar at top */}
        <div className="hero-progress">
          <div className="hero-progress-bar"></div>
        </div>

        {/* Golden ratio grid overlay */}
        <div className="hero-grid-overlay">
          <div className="grid-line-v" style={{ left: "38.2%" }}></div>
          <div className="grid-line-v" style={{ left: "61.8%" }}></div>
          <div className="grid-line-h" style={{ top: "38.2%" }}></div>
          <div className="grid-line-h" style={{ top: "61.8%" }}></div>
        </div>

        {/* Parallax floating shapes */}
        <div className="hero-shape hero-shape-diamond"></div>
        <div className="hero-shape hero-shape-circle"></div>
        <div className="hero-shape hero-shape-cross"></div>
        <div className="hero-shape hero-shape-dot"></div>

        {/* LEFT — Content panel */}
        <div className="hero-content-panel">
          {/* Background watermark */}
          <div className="hero-watermark">ATELIER</div>

          {/* Outline text — decorative */}
          <div
            className="hero-outline-text"
            style={{ position: "relative", zIndex: 5 }}
          >
            LUXURY
          </div>

          <div
            className="hero-eyebrow"
            style={{ position: "relative", zIndex: 5 }}
          >
            <span>Luxury Fashion — 2026</span>
          </div>

          <div style={{ position: "relative", zIndex: 5 }}>
            <AnimatedHeading />
          </div>

          <p
            className="hero-subtext cinzel text-sm sm:text-sm md:text-base lg:text-lg mt-4"
            style={{ position: "relative", zIndex: 5 }}
          >
            From little moments to big occasions — explore fashion for men,
            women, and kids. Designed for comfort, crafted for confidence.
          </p>

          <div
            className="flex flex-col sm:flex-row items-start gap-4"
            style={{ position: "relative", zIndex: 5 }}
          >
            <Link className="cursor-pointer" to="/collections">
              <button className="hero-cta cursor-pointer">
                <span>Shop Collection</span>
                <span className="hero-cta-arrow">→</span>
              </button>
            </Link>
          </div>

          {/* Trust bar */}
          <div
            className="hero-trust-bar"
            style={{ position: "relative", zIndex: 5 }}
          >
            <div className="hero-trust-item">
              <span className="hero-trust-number">50K+</span>
              <span className="hero-trust-label">Happy Customers</span>
            </div>
            <div className="hero-trust-divider"></div>
            <div className="hero-trust-item">
              <span className="hero-trust-number">100%</span>
              <span className="hero-trust-label">Premium Quality</span>
            </div>
            <div className="hero-trust-divider"></div>
            <div className="hero-trust-item">
              <span className="hero-trust-number">India</span>
              <span className="hero-trust-label">Handcrafted</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="scroll-indicator hidden md:flex">
            <span
              className="outfit text-[9px] tracking-[0.3em] uppercase"
              style={{ color: "var(--gold)", opacity: 0.6 }}
            >
              Scroll
            </span>
            <div className="scroll-line"></div>
          </div>
        </div>

        {/* RIGHT — Image panel */}
        <div className="hero-image-panel">
          <img src={heroImage} alt="Hero" />
          {/* Film grain overlay */}
          <div className="hero-grain"></div>
          {/* Corner accent frames */}
          <div className="hero-image-accent hero-image-accent-tl"></div>
          <div className="hero-image-accent hero-image-accent-br"></div>
          {/* Year badge */}
          <div className="hero-year-badge">26</div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
           MARQUEE — BRAND TICKER (Light mode)
           ════════════════════════════════════════════════════════════ */}
      <div
        style={{
          background: "var(--ivory)",
          borderTop: "1px solid var(--gold-pale)",
          borderBottom: "1px solid var(--gold-pale)",
        }}
        className="py-4 overflow-hidden"
      >
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-8 px-4"
                style={{ minWidth: "100%", justifyContent: "space-around" }}
              >
                {[
                  "PREMIUM",
                  "✦",
                  "HANDCRAFTED",
                  "✦",
                  "LUXURY",
                  "✦",
                  "TIMELESS",
                  "✦",
                  "EXCLUSIVE",
                  "✦",
                  "ARTISAN",
                  "✦",
                ].map((word, j) => (
                  <span
                    key={j}
                    className="outfit text-[11px] tracking-[0.4em] uppercase shrink-0"
                    style={{
                      color:
                        word === "✦" ? "var(--gold)" : "rgba(10,10,10,0.25)",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
           PREMIUM / WARDROBE PICKS — CAROUSEL
           ════════════════════════════════════════════════════════════ */}
      <div className="section-editorial section-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 sm:mb-14">
            <div>
              <div className="editorial-label sr visible">
                <span>Curated Selection</span>
              </div>
              <p className="editorial-title text-3xl sm:text-5xl md:text-6xl sr visible sr-d1" style={{ color: "var(--noir)" }}>
                <b>PREMIUM</b>
              </p>
            </div>
            <button
              className="outfit text-sm sm:text-base tracking-[0.15em] uppercase pb-1 text-gray-500 hover:text-gray-900 transition-colors duration-300 sr visible sr-d2 cursor-pointer"
              style={{ borderBottom: "1px solid var(--gold)" }}
            >
              Wardrobe Picks
            </button>
          </div>
        </div>

        <HeroCarousel />
      </div>

      {/* ════════════════════════════════════════════════════════════
           PRODUCT GRID — EDITORIAL SHOWCASE
           ════════════════════════════════════════════════════════════ */}
      <section className="section-editorial section-silk">
        <div className="max-w-7xl mx-auto">
          {/* Header — asymmetric layout */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4 sr visible">
            <div>
              <div className="editorial-label">
                <span>Here For You</span>
              </div>
              <p
                className="editorial-title text-3xl sm:text-5xl md:text-6xl"
                style={{ color: "var(--noir)" }}
              >
                The Edit
              </p>
            </div>
          </div>

          <div className="permanent-marker-regular flex gap-4 sm:gap-8 mb-8 sm:mb-12 sr visible sr-d1">
            <button
              className="text-base sm:text-xl tracking-wide pb-2 text-inherit cursor-pointer"
              style={{ borderBottom: "2px solid var(--gold)" }}
            >
              BESTSELLER
            </button>

            {/* <button className="text-base sm:text-xl tracking-wide text-gray-400 transition-colors duration-300 hover:text-gray-600 pb-2 cursor-pointer">
              THIS IS NEW
            </button> */}
          </div>

          {/* ─── PRODUCT GRID — Asymmetric editorial ─── */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
  {products.map((item, i) => (
    <Link
      key={`${item._id}-${i}`}
      to={`/product/${item._id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] cursor-pointer flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden aspect-[4/5] bg-gray-50 shrink-0">
        <img
          src={item.colors?.[0]?.images?.[0] || "/fallback.jpg"}
          alt={item.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 group-hover:brightness-95 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        />

        {/* Overlay Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Badge */}
        {item.badge && (
          <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-gray-900 shadow-sm text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-full uppercase z-10 transition-transform duration-500 group-hover:scale-105">
            {item.badge}
          </span>
        )}

        {/* View Details Pill */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-10 w-[85%] sm:w-auto text-center">
          <span className="inline-block w-full sm:w-auto bg-white/95 backdrop-blur-md text-gray-900 text-xs font-semibold tracking-wider px-6 py-2.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
            View Details
          </span>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-5 flex flex-col grow justify-between bg-white relative">
        <div className="space-y-1">
          <p className="text-sm md:text-[15px] font-medium text-gray-800 line-clamp-2 group-hover:text-black transition-colors duration-300">
            {item.name}
          </p>
          <p className="text-[11px] font-medium tracking-wider text-gray-500 uppercase mt-1">
            {item.sizes?.length ? item.sizes.join(", ") : "Free Size"}
          </p>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <p className="text-base font-semibold text-gray-900">
            ₹{item.discountPrice ?? item.price ?? 0}
          </p>
          {item.discountPrice && item.discountPrice < item.price && (
            <p className="text-xs text-gray-400 line-through decoration-gray-300">
              ₹{item.price}
            </p>
          )}
        </div>
      </div>
    </Link>
  ))}
</div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
           COUPONS — EDITORIAL TREATMENT
           ════════════════════════════════════════════════════════════ */}
      <div className="section-editorial section-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 sr visible">
            <div>
              <div className="editorial-label">
                <span>Exclusive Offers</span>
              </div>
              <p
                className="editorial-title text-3xl sm:text-5xl md:text-6xl"
                style={{ color: "var(--noir)" }}
              >
                Curated Saving
              </p>
            </div>
          </div>
        </div>
        <Coupons />
      </div>

      <BrandStory />

      <InnerCircle />

      {/* ════════════════════════════════════════════════════════════
           FOOTER MARQUEE
           ════════════════════════════════════════════════════════════ */}
      <div
        style={{
          background: "var(--noir)",
          borderTop: "1px solid rgba(196,162,101,0.12)",
        }}
        className="py-5 overflow-hidden"
      >
        <div className="marquee-wrapper">
          <div className="marquee-track" style={{ animationDuration: "25s" }}>
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-12 px-6"
                style={{ minWidth: "100%", justifyContent: "space-around" }}
              >
                {[
                  "STYLE FOR EVERY STORY",
                  "◆",
                  "DESIGNED FOR CONFIDENCE",
                  "◆",
                  "CRAFTED IN INDIA",
                  "◆",
                ].map((word, j) => (
                  <span
                    key={j}
                    className="playfair text-sm sm:text-lg tracking-[0.2em] shrink-0 italic"
                    style={{
                      color:
                        word === "◆" ? "var(--gold)" : "rgba(255,255,255,0.2)",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

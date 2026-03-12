import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  Heart,
  LogIn,
  LogOut,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoWhite from "../../assets/logo/logoWhite.webp";
import logo from "../../assets/logo/logo.webp";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  /* LOGIN STATE */
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  /* SCROLL LISTENER — visual change on scroll */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setOpen(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  /* On home page: transparent → white on scroll. On other pages: always white */
  const showTransparent = isHome && !scrolled;

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${
          showTransparent
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.04)] border-b border-gray-100/50"
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 h-16 sm:h-18 md:h-[72px] flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className={`cursor-pointer ${`md:hidden p-2 rounded-lg transition-all duration-300 flex-shrink-0
                ${
                  showTransparent
                    ? "text-white hover:bg-white/10"
                    : "text-gray-700 hover:bg-gray-100"
                }`}`}
            >
              <Menu size={22} />
            </button>

            {/* LOGO */}
            <Link
              to="/"
              className="flex items-center ml-1 sm:ml-2 md:ml-0 flex-shrink-0 cursor-pointer"
            >
              <img
                src={logo}
                alt="logo"
                className="h-7 sm:h-8 md:h-9 lg:h-10 w-auto object-contain flex-shrink-0 transition-all duration-300 hover:opacity-80"
              />
            </Link>
          </div>

          {/* DESKTOP NAV — Center */}
          <div className="hidden md:flex items-center gap-1 lg:gap-6">
            {[
              { to: "/", label: "Home" },
              { to: "/men", label: "Men" },
              { to: "/women", label: "Women" },
              { to: "/kids", label: "Kids" },
              { to: "/collections", label: "Collections" },
              { to: "/about", label: "About" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`cursor-pointer ${`relative px-2 lg:px-3 py-2 text-[13px] font-medium tracking-[0.06em] uppercase transition-all duration-300
                  ${
                    showTransparent
                      ? isActive(to)
                        ? "text-gray"
                        : "text-gray/70 hover:text-white"
                      : isActive(to)
                      ? "text-[#8b6f47]"
                      : "text-gray-500 hover:text-gray-900"
                  }`}`}
              >
                {label}
                {/* Underline indicator */}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] transition-all duration-300
                    ${isActive(to) ? "w-4/5" : "w-0"}
                    ${showTransparent ? "bg-white" : "bg-[#c4a265]"}`}
                />
              </Link>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
            {/* SEARCH DESKTOP */}
            <div
              onClick={() => inputRef.current?.focus()}
              className={`cursor-pointer ${`hidden md:flex items-center px-3 py-2 rounded-full border overflow-hidden flex-shrink-0
                w-9 focus-within:w-48 hover:w-48 transition-all duration-500 cursor-text
                ${
                  showTransparent
                    ? "border-white/20 bg-white/10 backdrop-blur-sm"
                    : "border-gray-200 bg-gray-50/50"
                }`}`}
            >
              <Search
                size={14}
                className={`shrink-0 ${
                  showTransparent ? "text-white/70" : "text-gray-400"
                }`}
              />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                className={`ml-2 text-[13px] outline-none bg-transparent w-full font-light tracking-wide
                  ${
                    showTransparent
                      ? "text-white placeholder-white/40"
                      : "text-gray-700 placeholder-gray-400"
                  }`}
              />
            </div>

            {/* MOBILE SEARCH */}
            <div
              onClick={() => inputRef.current?.focus()}
              className={`cursor-pointer ${`flex md:hidden items-center px-2 py-1.5 rounded-full border overflow-hidden flex-shrink-0
                w-9 focus-within:w-32 transition-all duration-500
                ${
                  showTransparent
                    ? "border-white/20 bg-white/10"
                    : "border-gray-200 bg-gray-50/50"
                }`}`}
            >
              <Search
                size={15}
                className={`shrink-0 ${
                  showTransparent ? "text-white/70" : "text-gray-400"
                }`}
              />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                className={`ml-2 text-sm outline-none bg-transparent w-full
                  ${
                    showTransparent
                      ? "text-white placeholder-white/40"
                      : "text-gray-700 placeholder-gray-400"
                  }`}
              />
            </div>

            {/* ICONS DESKTOP */}
            <div className="hidden md:flex items-center gap-5 flex-shrink-0">
              <Link to="/favorites" className="relative group cursor-pointer">
                <Heart
                  className={`w-[18px] h-[18px] transition-all duration-300 group-hover:scale-110
                  ${
                    showTransparent
                      ? "text-white/70 group-hover:text-white"
                      : "text-gray-400 group-hover:text-[#c4a265]"
                  }`}
                />
              </Link>

              <Link to="/dashboard/profile" className="relative group cursor-pointer">
                <User
                  className={`w-[18px] h-[18px] transition-all duration-300 group-hover:scale-110
                  ${
                    showTransparent
                      ? "text-white/70 group-hover:text-white"
                      : "text-gray-400 group-hover:text-[#c4a265]"
                  }`}
                />
              </Link>

              <Link to="/cart" className="relative group cursor-pointer">
                <ShoppingBag
                  className={`w-[18px] h-[18px] transition-all duration-300 group-hover:scale-110
                  ${
                    showTransparent
                      ? "text-white/70 group-hover:text-white"
                      : "text-gray-400 group-hover:text-[#c4a265]"
                  }`}
                />
              </Link>

              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className={`cursor-pointer ${`flex items-center gap-1.5 text-[12px] tracking-wider uppercase transition-all duration-300
                    ${
                      showTransparent
                        ? "text-white/50 hover:text-red-300"
                        : "text-gray-400 hover:text-red-400"
                    }`}`}
                >
                  <LogOut size={15} />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className={`cursor-pointer ${`flex items-center gap-1.5 text-[12px] tracking-wider uppercase transition-all duration-300
                    ${
                      showTransparent
                        ? "text-white/70 hover:text-white"
                        : "text-gray-400 hover:text-gray-900"
                    }`}`}
                >
                  <LogIn size={15} />
                  <span className="hidden lg:inline">Login</span>
                </Link>
              )}
            </div>

            {/* MOBILE CART */}
            <Link
              to="/cart"
              className={`cursor-pointer ${`md:hidden flex-shrink-0 transition-all duration-300
              ${
                showTransparent
                  ? "text-white/80 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
              }`}`}
            >
              <ShoppingBag size={20} />
            </Link>
          </div>
        </div>
      </nav>

      {/* SPACER — only on non-home pages */}
      {/* {!isHome && location.pathname !== "/men" && (
        <div className="h-20 md:h-[90px]" />
      )} */}

      {/* OVERLAY */}
      <div
        className={`cursor-pointer ${`fixed inset-0 bg-black/30 backdrop-blur-sm z-[998]
        transition-all duration-500
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}`}
        onClick={() => setOpen(false)}
      />

      {/* MOBILE SIDEBAR — Light theme */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-sm z-[999]
        bg-white text-gray-800 shadow-2xl
        transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <img src={logo} className="h-8 w-auto flex-shrink-0" alt="Logo" />
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-all duration-300 text-gray-400 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Nav */}
        <div className="flex flex-col p-6 gap-1">
          {[
            { to: "/", label: "Home" },
            { to: "/men", label: "Men" },
            { to: "/women", label: "Women" },
            { to: "/kids", label: "Kids" },
            { to: "/collections", label: "Collections" },
            { to: "/about", label: "About" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              onClick={() => setOpen(false)}
              to={to}
              className={`cursor-pointer ${`py-3 px-4 text-[14px] font-medium tracking-[0.08em] uppercase rounded-lg transition-all duration-300
                ${
                  isActive(to)
                    ? "text-[#8b6f47] bg-[#f5f0eb]"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}`}
            >
              {label}
            </Link>
          ))}

          {/* Sidebar Icons */}
          <div className="flex gap-6 pt-6 mt-4 border-t border-gray-100">
            <Link
              to="/favorites"
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-[#c4a265] transition-all duration-300 cursor-pointer"
            >
              <Heart size={20} />
            </Link>
            <Link
              to="/dashboard/profile"
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-[#c4a265] transition-all duration-300 cursor-pointer"
            >
              <User size={20} />
            </Link>
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-[#c4a265] transition-all duration-300 cursor-pointer"
            >
              <ShoppingBag size={20} />
            </Link>
          </div>

          {/* Login/Logout */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-400 hover:text-red-500 pt-6 text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-900 pt-6 text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer"
            >
              <LogIn size={16} />
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

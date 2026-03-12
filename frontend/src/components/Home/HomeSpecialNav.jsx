import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StickyCategoryBar = ({ activeGender, setActiveGender }) => {
  const navigate = useNavigate();

  const [showBar, setShowBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // scroll down → hide
        setShowBar(false);
      } else {
        // scroll up → show
        setShowBar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`
        w-full
        bg-transparent
        sticky top-16 z-[999] pointer-events-auto

        transition-transform duration-300 ease-in-out
        ${showBar ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 h-14">
        
        {/* GENDER SWITCH */}
       <div className="flex bg-white/70 backdrop-blur-md rounded-full p-1 shadow-md relative z-[1000] pointer-events-auto">

  <button
    onClick={() => {
      setActiveGender("men");
      navigate("/men");
    }}
    className={`cursor-pointer ${`
      px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300
      ${
        activeGender === "men"
          ? "bg-black text-white shadow"
          : "text-gray-600 hover:bg-black/5"
      }
    `}`}
  >
    MEN
  </button>

  <button
    onClick={() => {
      setActiveGender("women");
      navigate("/women");
    }}
    className={`cursor-pointer ${`
      px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300
      ${
        activeGender === "women"
          ? "bg-black text-white shadow"
          : "text-gray-600 hover:bg-black/5"
      }
    `}`}
  >
    WOMEN
  </button>
</div>


        {/* LINKS */}
        <ul className="hidden md:flex gap-6 text-sm font-medium text-black">
          <a className="cursor-pointer" href="#winterwear"><li>WINTERWEAR</li></a>
          <a className="cursor-pointer" href="/collections"><li>SHOP NOW</li></a>
          <a className="cursor-pointer" href=""><li>PLUS SIZE</li></a>
          <a className="cursor-pointer" href=""><li>OFFICIAL MERCH</li></a>
        </ul>
      </div>
    </div>
  );
};


export default StickyCategoryBar;


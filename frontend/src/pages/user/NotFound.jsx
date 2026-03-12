import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Search, ArrowLeft, Sparkles } from "lucide-react";

import graphura from "../../assets/graphuralogo/graphura.webp";
import bgImage from "../../assets/404/fashion.bg.webp";

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[3px]" />

      {/* <img
        src={graphura}
        className="absolute top-8 left-10 h-16 md:h-20 z-20 drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
        alt="Graphura Logo"
      /> */}

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 text-center">
        {/* 404 creative */}
        <div className="flex items-center gap-6 mb-8">
          <motion.span
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-[110px] md:text-[160px] font-heading font-bold tracking-widest"
          >
            4
          </motion.span>

          {/* Hanging bag */}
          <div className="flex flex-col items-center">
            <div className="w-[2px] h-[100px] bg-white/40" />

            <motion.div
              animate={{ rotate: [0, 12, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
              <ShoppingBag size={80} strokeWidth={1.5} />
            </motion.div>
          </div>

          <motion.span
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="text-[110px] md:text-[160px] font-heading font-bold tracking-widest"
          >
            4
          </motion.span>
        </div>

        {/* ERROR label */}
        <div className="flex items-center gap-2 text-yellow-400 font-body uppercase tracking-[4px] text-sm">
          <Sparkles size={16} />
          Error 404
        </div>

        {/* MAIN TITLE */}
        <h1 className="font-brand text-4xl md:text-6xl font-semibold mt-4 leading-tight max-w-3xl">
          This Outfit is No Longer Available
        </h1>

        {/* Description */}
        <p className="font-body text-white/70 mt-4 text-lg max-w-xl">
          The item you're looking for may have been sold out, discontinued, or
          removed from our exclusive collection.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 mt-10">
          <Link
            to="/"
            className="font-body px-10 py-4 bg-white text-black rounded-full font-medium flex items-center gap-2 justify-center hover:scale-105 hover:shadow-[0_10px_40px_rgba(255,255,255,0.25)] transition cursor-pointer"
          >
            <ShoppingBag size={18} />
            Back to Store
          </Link>

          <Link
            to="/collections"
            className="font-body px-10 py-4 border border-white/40 rounded-full flex items-center gap-2 justify-center hover:bg-white hover:text-black hover:scale-105 transition cursor-pointer"
          >
            <Search size={18} />
            Explore Collection
          </Link>
        </div>

        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="font-body mt-8 flex items-center gap-2 text-white/60 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft size={18} />
          Return to Previous Page
        </button>
      </div>
    </div>
  );
}

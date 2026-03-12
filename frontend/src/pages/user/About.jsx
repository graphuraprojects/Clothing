import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "../../components/Home/Navbar";
import {
  Scissors, Heart, Users, Leaf, Sparkles, Target, Award,
  Palette, Gem, Clock, Shield, CheckCircle, Factory, MapPin,
  TrendingUp, Globe as GlobeIcon, ShoppingBag, Check, Crown, Globe
} from "lucide-react";

// Soft organic upward float
const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
      transition={{ duration: 0.9, delay, ease: [0.25, 1, 0.5, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const About = () => {
  return (
    <main className="bg-[#FCF9F5] min-h-screen text-[#4A3F35] font-sans selection:bg-[#E3A881] selection:text-white overflow-x-hidden">
      <Navbar />

      {/* ── 1. HERO (Earthy & Sunbaked) ─────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#FFF2E5]/50 to-[#FCF9F5] pt-24 pb-20">
        {/* Abstract painted background shapes */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#EBB493]/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D4C3B3]/30 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center flex flex-col items-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FCF9F5] border border-[#EBB493] text-[#A65B3F] text-xs font-bold tracking-widest uppercase mb-10 shadow-[0_4px_20px_rgb(235,180,147,0.2)]">
              <Sparkles className="w-4 h-4 text-[#D88A62]" /> 
              Established 2018
            </div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#3A2E25] mb-8 tracking-tighter leading-[0.95]">
              Crafting <br className="hidden sm:block" />
              <span className="font-serif italic font-light text-[#A65B3F]">Timeless</span> Elegance.
            </h1>

            <p className="text-xl md:text-2xl text-[#6B5A4E] leading-relaxed font-medium max-w-2xl mx-auto mb-12">
              Where traditional craftsmanship meets contemporary luxury. Each thread tells a story of heritage, sustainability, and unparalleled quality.
            </p>

            {/* Arched Pill Containers */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: <Users className="w-4 h-4" />, label: "200+ Artisan Families", color: "text-[#A65B3F]", bg: "bg-[#FFF4ED]" },
                { icon: <Leaf className="w-4 h-4" />, label: "100% Organic Fabrics", color: "text-[#5C705B]", bg: "bg-[#F0F5F1]" },
                { icon: <CheckCircle className="w-4 h-4" />, label: "Fair Trade Certified", color: "text-[#D49A5E]", bg: "bg-[#FFF9F0]" },
              ].map((pill, i) => (
                <div key={i} className={`inline-flex items-center gap-2.5 px-6 py-3.5 ${pill.bg} border border-[#EAE1D8] rounded-full text-[#4A3F35] font-bold text-sm shadow-sm`}>
                  <span className={pill.color}>{pill.icon}</span>
                  {pill.label}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 2. HERITAGE (Architectural Layout) ─────────────────────────────── */}
      <section className="py-28 bg-[#F4EFEA] relative overflow-hidden border-t border-[#EAE1D8]">
        
        {/* ORIGINAL: Soft Terracotta arch in background behind Sustainable */}
        <div className="absolute top-1/2 right-10 w-[400px] h-[600px] bg-[#EBB493]/10 rounded-t-full pointer-events-none -translate-y-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-16 items-center">

            {/* Left: Content */}
            <div className="lg:col-span-5">
              <FadeIn>
                <div className="w-16 h-16 bg-[#FCF9F5] border border-[#EAE1D8] rounded-t-full rounded-b-xl flex items-center justify-center mb-8 shadow-sm">
                  <Palette className="w-8 h-8 text-[#A65B3F]" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[#3A2E25] mb-8 tracking-tight">
                  Our <span className="font-serif italic font-light text-[#A65B3F]">Heritage</span>
                </h2>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <span className="shrink-0 w-12 h-12 rounded-full bg-[#EBB493]/20 flex items-center justify-center">
                      <Factory className="w-5 h-5 text-[#A65B3F]" />
                    </span>
                    <p className="text-lg text-[#6B5A4E] font-medium leading-relaxed pt-2">
                      Born from a passion for preserving India's rich textile heritage, <strong className="font-bold text-[#3A2E25]">Graphura</strong> was founded in 2018 as a bridge between centuries-old craftsmanship and modern luxury fashion.
                    </p>
                  </div>
                  <div className="flex items-start gap-5">
                    <span className="shrink-0 w-12 h-12 rounded-full bg-[#EBB493]/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#A65B3F]" />
                    </span>
                    <p className="text-lg text-[#6B5A4E] font-medium leading-relaxed pt-2">
                      We partner with master artisans from Varanasi, Maheshwar, and Bhuj, empowering them with fair wages while bringing their exquisite work to global audiences.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right: Arched Cards */}
            <div className="lg:col-span-7 relative flex flex-col sm:flex-row gap-6 lg:pl-8">
              
              {/* NEW: Arch shadow specifically for Artisan First (From down to up) */}
              <div className="absolute -bottom-24 left-0 sm:left-12 w-[300px] sm:w-[340px] h-[550px] bg-[#EAE1D8]/60 rounded-t-full pointer-events-none -z-10" />

              {/* UNTOUCHED: Artisan First Card is EXACTLY as you provided it */}
              <FadeIn delay={0.15} className="flex-1">
                <div className="bg-[#FCF9F5] rounded-t-full rounded-b-[2rem] p-8 md:p-10 border border-[#EAE1D8] shadow-lg shadow-[#EBB493]/10 hover:-translate-y-2 transition-transform duration-500 h-full flex flex-col items-center text-center pt-16">
                  <div className="shrink-0 w-20 h-20 rounded-full bg-[#FFF4ED] border border-[#FADACA] flex items-center justify-center mb-6 shadow-inner">
                    <Heart className="w-10 h-10 text-[#C26D4A]" />
                  </div>
                  <h3 className="text-2xl font-black text-[#3A2E25] mb-4">Artisan First</h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A65B3F] bg-[#FFF4ED] border border-[#FADACA] px-4 py-2 rounded-full mb-6">
                    <TrendingUp className="w-4 h-4" /> 40% Above Standard
                  </span>
                  <p className="text-[#6B5A4E] leading-relaxed font-medium">
                    Handcrafted by skilled artisans who receive premium wages, health benefits, and continuous skill development.
                  </p>
                </div>
              </FadeIn>

              {/* UNTOUCHED: Sustainable Card is EXACTLY as you provided it */}
              <FadeIn delay={0.3} className="flex-1 mt-10 sm:mt-20">
                <div className="bg-[#FCF9F5] rounded-t-full rounded-b-[2rem] p-8 md:p-10 border border-[#EAE1D8] shadow-lg shadow-[#5C705B]/10 hover:-translate-y-2 transition-transform duration-500 h-full flex flex-col items-center text-center pt-16">
                  <div className="shrink-0 w-20 h-20 rounded-full bg-[#F0F5F1] border border-[#D5E0D6] flex items-center justify-center mb-6 shadow-inner">
                    <Leaf className="w-10 h-10 text-[#5C705B]" />
                  </div>
                  <h3 className="text-2xl font-black text-[#3A2E25] mb-4">Sustainable</h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5C705B] bg-[#F0F5F1] border border-[#D5E0D6] px-4 py-2 rounded-full mb-6">
                    <GlobeIcon className="w-4 h-4" /> Eco-Conscious
                  </span>
                  <p className="text-[#6B5A4E] leading-relaxed font-medium">
                    From 100% organic cotton and natural dyes to zero-waste production, true sustainability is woven into every thread.
                  </p>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. VALUES (Earthy Grid) ── */}
      <section className="py-28 bg-[#FCF9F5] relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-[#3A2E25] mb-6 tracking-tight">
              What Makes Us <span className="font-serif italic font-light text-[#A65B3F]">Different</span>
            </h2>
            <p className="text-[#6B5A4E] text-lg font-medium">
              We seamlessly combine traditional craftsmanship with modern ethics to create exceptional, purposeful fashion.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Scissors className="w-8 h-8 text-[#A65B3F]" />, title: "Master Craft", stat: "200+", desc: "Rigorous quality checks on every garment.", bg: "bg-[#FFF4ED]" },
              { icon: <Leaf className="w-8 h-8 text-[#5C705B]" />, title: "Eco-Friendly", stat: "100%", desc: "Organic fabrics and biodegradable packaging.", bg: "bg-[#F0F5F1]" },
              { icon: <Users className="w-8 h-8 text-[#D49A5E]" />, title: "Fair Trade", stat: "200+", desc: "Artisan families earning premium living wages.", bg: "bg-[#FFF9F0]" },
              { icon: <Clock className="w-8 h-8 text-[#8B7A6A]" />, title: "Timeless", stat: "∞", desc: "Collections designed to transcend every season.", bg: "bg-[#F5F2EF]" },
            ].map((v, i) => (
              <FadeIn key={i} delay={i * 0.1} className="h-full">
                <div className="h-full bg-white rounded-t-full rounded-b-[2.5rem] p-8 border border-[#EAE1D8] shadow-[0_8px_30px_rgb(74,63,53,0.04)] hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center pt-12">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-inner ${v.bg}`}>
                    {v.icon}
                  </div>
                  <div className="text-4xl font-black text-[#3A2E25] tracking-tighter mb-4">{v.stat}</div>
                  <h3 className="text-xl font-bold text-[#3A2E25] mb-3">{v.title}</h3>
                  <p className="text-[#6B5A4E] text-sm font-medium leading-relaxed flex-grow">{v.desc}</p>
                  <div className="mt-8 pt-6 border-t border-[#FCF9F5] flex items-center gap-2 text-xs font-bold text-[#A65B3F] uppercase tracking-wider w-full justify-center">
                    <CheckCircle className="w-4 h-4" /> Verified
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. IMPACT (Terracotta Block) ──────────────── */}
      <section className="py-28 bg-[#A65B3F] text-[#FFF4ED] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C26D4A] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8A462C] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          {/* Main Flex Wrapper: Grid on Left, Content Column on Right */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
            
            {/* LEFT SIDE: 2x2 Numbers Grid */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-16 max-w-xl">
              {[
                { num: "200+", label: "Artisan Families", icon: <Users className="w-7 h-7 text-[#A65B3F]" /> },
                { num: "15M+", label: "Liters Saved", icon: <Leaf className="w-7 h-7 text-[#A65B3F]" /> },
                { num: "50K+", label: "Garments Crafted", icon: <Award className="w-7 h-7 text-[#A65B3F]" /> },
                { num: "95%", label: "Waste Diverted", icon: <Globe className="w-7 h-7 text-[#A65B3F]" /> },
              ].map((s, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex flex-col items-start text-left">
                    <div className="w-16 h-16 rounded-t-full rounded-b-2xl bg-[#FFF4ED] flex items-center justify-center mb-6 shadow-lg">
                      {s.icon}
                    </div>
                    <div className="text-5xl md:text-6xl font-black tracking-tighter mb-2">{s.num}</div>
                    <p className="text-[#FADACA] text-sm font-bold uppercase tracking-widest">{s.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* RIGHT SIDE: Vertical Stack (Heading + Card) */}
            <div className="flex flex-col items-center lg:items-end text-center lg:text-right lg:max-w-md">
              
              {/* Heading shifted to Right side of container */}
              <FadeIn className="mb-12 lg:mr-40">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  Our <span className="font-serif italic font-light text-[#FADACA]">Impact</span><br className="hidden md:block" /> in Numbers
                </h2>
              </FadeIn>

              {/* Description Card placed below the Heading */}
              <FadeIn delay={0.2}>
                <div className="relative group text-left">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#FADACA]/0 via-[#FADACA]/30 to-[#FADACA]/0 blur opacity-40"></div>
                  <p className="relative text-[#FFF4ED] text-xl md:text-2xl font-medium leading-relaxed px-7 py-6 rounded-2xl bg-[#C26D4A]/20 backdrop-blur-sm border border-[#FADACA]/30 shadow-[0_12px_35px_rgba(0,0,0,0.18)]">
                    <span className="block w-12 h-[2px] bg-[#FADACA] mb-4 opacity-80"></span>
                    Creating sustainable fashion while empowering communities and preserving India's textile heritage.
                  </p>
                </div>
              </FadeIn>

            </div>
          </div>
        </div>
      </section>

      {/* ── 5. VISION & MISSION ──────────────── */}
      <section className="py-28 bg-[#FCF9F5] relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#3A2E25] tracking-tight">Vision & Mission</h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn delay={0.1} className="h-full">
              <div className="h-full bg-white rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-xl rounded-bl-xl p-10 md:p-14 border border-[#EAE1D8] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden">
                <Target strokeWidth={0.5} className="absolute -right-8 -bottom-8 w-44 h-44 text-[#FFF4ED] pointer-events-none" />
                
                <div className="relative z-10 w-16 h-16 bg-[#FFF4ED] border border-[#FADACA] rounded-t-full rounded-b-xl flex items-center justify-center mb-10">
                  <Target className="w-8 h-8 text-[#A65B3F]" />
                </div>
                <h3 className="relative z-10 text-3xl font-black text-[#3A2E25] mb-6 tracking-tight">Our Vision</h3>
                <p className="relative z-10 text-[#6B5A4E] text-lg leading-relaxed font-medium flex-grow">
                  To redefine luxury fashion by creating a world where sustainability and elegance coexist — where every garment tells a story of heritage, craftsmanship, and conscious living.
                </p>
                <div className="relative z-10 mt-10 inline-flex items-center gap-3 font-bold text-[#A65B3F] bg-[#FFF4ED] px-6 py-3 rounded-xl self-start text-sm">
                  <Sparkles className="w-5 h-5 text-[#D88A62]" />
                  Leading the sustainable revolution
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="h-full">
              <div className="h-full bg-white rounded-tr-[4rem] rounded-bl-[4rem] rounded-tl-xl rounded-br-xl p-10 md:p-14 border border-[#EAE1D8] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden">
                <Crown strokeWidth={0.5} className="absolute -right-8 -bottom-8 w-44 h-44 text-[#F0F5F1] pointer-events-none" />

                <div className="relative z-10 w-16 h-16 bg-[#F0F5F1] border border-[#D5E0D6] rounded-t-full rounded-b-xl flex items-center justify-center mb-10">
                  <Crown className="w-8 h-8 text-[#5C705B]" />
                </div>
                <h3 className="relative z-10 text-3xl font-black text-[#3A2E25] mb-6 tracking-tight">Our Mission</h3>
                <p className="relative z-10 text-[#6B5A4E] text-lg leading-relaxed font-medium flex-grow">
                  To craft timeless apparel that celebrates Indian craftsmanship while setting global standards for ethical production, environmental responsibility, and inclusive growth.
                </p>
                <div className="relative z-10 mt-10 inline-flex items-center gap-3 font-bold text-[#5C705B] bg-[#F0F5F1] px-6 py-3 rounded-xl self-start text-sm">
                  <CheckCircle className="w-5 h-5 text-[#5C705B]" />
                  Every stitch, a step toward excellence
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 6. CTA (Inviting Banner) ───────────────────────────────────── */}
      <section className="py-32 bg-[#F4EFEA] relative overflow-hidden border-t border-[#EAE1D8]">
        {/* Sunburst glow behind center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EBB493]/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="w-24 h-24 bg-white border border-[#FADACA] rounded-t-full rounded-b-2xl flex items-center justify-center mx-auto mb-10 shadow-[0_10px_30px_rgb(235,180,147,0.3)]">
              <Gem className="w-10 h-10 text-[#A65B3F]" />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-[#3A2E25] mb-8 tracking-tighter leading-tight">
              Join Our Journey of <br className="hidden sm:block" />
              <span className="font-serif italic font-light text-[#A65B3F]">Conscious Fashion.</span>
            </h2>
            
            <p className="text-xl text-[#6B5A4E] mb-14 max-w-2xl mx-auto font-medium leading-relaxed">
              Experience clothing that feels good, looks beautiful, and does good for the planet and its people.
            </p>

            <a href="/collections" className="inline-block mb-16 cursor-pointer">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#A65B3F] text-white px-12 py-5 rounded-full font-bold text-lg flex items-center gap-3 shadow-[0_10px_30px_rgb(166,91,63,0.3)] hover:bg-[#8A462C] transition-colors border border-[#C26D4A] cursor-pointer"
              >
                <ShoppingBag className="w-6 h-6" />
                Shop Our Collections
              </motion.button>
            </a>

            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-bold text-[#6B5A4E] border-t border-[#EAE1D8] pt-10">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#5C705B]" /> 100% Sustainable
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#D49A5E]" /> Fair Trade
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#A65B3F]" /> Carbon Neutral
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default About;
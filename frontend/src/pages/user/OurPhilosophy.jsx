import React from "react";
import { motion } from "framer-motion";
import { Award, Globe, Compass, Heart, Sparkles, Users, Target, CheckCircle } from "lucide-react";

const OurPhilosophy = () => {
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

  const pillars = [
    {
      icon: <Target className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: "Minimalist Design",
      description: "Clean, enduring silhouettes that transcend seasonal trends"
    },
    {
      icon: <Heart className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: "Quiet Luxury",
      description: "Understated elegance through exceptional craftsmanship"
    },
    {
      icon: <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: "Timeless Fashion",
      description: "Pieces designed to stand the test of time"
    },
    {
      icon: <Users className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: "Global Refinement",
      description: "Indian artistry perfected for worldwide appreciation"
    }
  ];

  const craftProcess = [
    {
      step: "01",
      title: "Design Philosophy",
      description: "Creating minimalist silhouettes with enduring appeal",
      color: "from-[#ECD1A8] to-[#D4B483]"
    },
    {
      step: "02",
      title: "Material Selection",
      description: "Curating premium fabrics that age gracefully",
      color: "from-[#D4B483] to-[#B89A67]"
    },
    {
      step: "03",
      title: "Artisan Craftsmanship",
      description: "Handcrafted by skilled artisans preserving traditional techniques",
      color: "from-[#B89A67] to-[#9A7D4A]"
    },
    {
      step: "04",
      title: "Quality Refinement",
      description: "Meticulous attention to detail in every stitch",
      color: "from-[#9A7D4A] to-[#7C5F2D]"
    },
    {
      step: "05",
      title: "Global Delivery",
      description: "Sharing Indian craftsmanship with the world",
      color: "from-[#7C5F2D] to-[#5E4110]"
    }
  ];

  // Fixed SVG texture - properly encoded
  const textureSVG = "data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='texture' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23ECD1A8' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23texture)'/%3E%3C/svg%3E";

  return (
    <main className="bg-white overflow-hidden pt-20">
      {/* HERO BANNER */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-[#F8F3E9]">
        {/* Background pattern */}
        <div className="absolute inset-0 w-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-[#ECD1A8] rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-[#D4B483] rounded-full blur-3xl"></div>
        </div>

        {/* Textured overlay - FIXED */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url("${textureSVG}")` }}
        ></div>

        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 md:mb-12 w-full"
          >
            <div className="flex justify-center mb-8 md:mb-12">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 backdrop-blur-sm rounded-2xl md:rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/30">
                <Compass className="w-12 h-12 md:w-16 md:h-16 text-[#B89A67]" />
              </div>
            </div>
            
            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-4 tracking-wider text-gray-800">
                OUR PHILOSOPHY
              </h1>
              <div className="w-32 h-0.5 md:w-48 md:h-1 bg-gradient-to-r from-transparent via-[#ECD1A8] to-transparent mx-auto"></div>
            </div>

            <div className="space-y-4 mb-8">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-700 tracking-wider"
              >
                CRAFTED IN INDIA,
                <span className="block mt-2 text-[#B89A67]">WORN GLOBALLY</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed italic px-4"
            >
              Experience the timeless artistry of Indian craftsmanship, refined
              for a global audience.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-[#ECD1A8]/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#ECD1A8] rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* PHILOSOPHY STATEMENT */}
      <section className="py-16 sm:py-20 md:py-24 w-full px-4 sm:px-6 md:px-8 lg:px-16 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-6 bg-[#F8F3E9] px-4 sm:px-6 py-2 sm:py-3 rounded-full">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#B89A67]" />
              <span className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
                HANDCRAFTED IN INDIA
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light text-gray-800 mb-6 sm:mb-8 leading-tight">
              We design minimalist, enduring silhouettes that embody quiet
              luxury
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              — timeless fashion that stands the test of time.
            </p>
          </motion.div>

          {/* Pillars of Philosophy */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {pillars.map((pillar, index) => (
                <div
                  key={index}
                  className="group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:border-[#ECD1A8] transition-all duration-300 hover:shadow-xl"
                >
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 bg-[#ECD1A8] rounded-full"></div>
                  </div>

                  <div className="mb-4 sm:mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#F8F3E9] to-[#ECD1A8] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                      <div className="text-[#B89A67]">{pillar.icon}</div>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-serif font-medium text-gray-800 mb-2 sm:mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CRAFT PROCESS */}
      <section className="py-16 sm:py-20 md:py-15 w-full px-4 sm:px-6 md:px-8 lg:px-16 bg-gradient-to-b from-white to-[#F8F3E9]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#ECD1A8] to-transparent"></div>
              <span className="text-sm sm:text-base font-medium tracking-widest text-[#B89A67] uppercase">
                DISCOVER PROCESS
              </span>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#ECD1A8] to-transparent"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-gray-800 mb-4">
              The Art of Creation
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              From concept to creation, each piece undergoes a meticulous
              journey
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="relative">
              {/* Timeline line - Hidden on mobile, visible on desktop */}
              <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-[#ECD1A8] via-[#D4B483] to-[#ECD1A8] -translate-y-1/2"></div>

              {/* Process steps */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 relative">
                {craftProcess.map((step, index) => (
                  <div key={index} className="relative group">
                    {/* Step number */}
                    <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-8 h-8 sm:w-12 sm:h-12 bg-white border-2 border-[#ECD1A8] rounded-full flex items-center justify-center font-serif font-bold text-gray-800 text-sm sm:text-base shadow-lg z-20">
                      {step.step}
                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden group-hover:shadow-2xl transition-all duration-300 h-full">
                      {/* Top gradient bar */}
                      <div
                        className={`h-2 sm:h-3 bg-gradient-to-r ${step.color}`}
                      ></div>

                      <div className="p-6 sm:p-8">
                        <h3 className="text-xl sm:text-2xl font-serif font-medium text-gray-800 mb-3 sm:mb-4">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      {/* Bottom decorative line */}
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-[#ECD1A8] to-transparent"></div>
                      </div>
                    </div>
                    {/* Connecting line for mobile */}
                    {index < craftProcess.length - 1 && (
                      <div className="lg:hidden absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-[#ECD1A8] to-transparent"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-16 sm:py-20 md:py-24 w-full px-4 sm:px-6 md:px-8 lg:px-16 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-gray-800 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Guiding principles that shape every creation
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
              <div className="space-y-8 sm:space-y-12">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center justify-center lg:justify-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F8F3E9] to-[#ECD1A8] flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-[#B89A67]" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-medium text-gray-800">
                      Sustainability
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    We believe in creating fashion that lasts, reducing waste
                    through timeless designs and durable materials that age
                    gracefully.
                  </p>
                </div>

                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center justify-center lg:justify-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F8F3E9] to-[#ECD1A8] flex items-center justify-center">
                      <Users className="w-5 h-5 text-[#B89A67]" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-medium text-gray-800">
                      Artisan Support
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Preserving traditional Indian craftsmanship while providing
                    fair wages and sustainable livelihoods for our artisans.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="lg:absolute lg:inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-full lg:h-full max-w-sm max-h-sm rounded-full border-2 border-[#ECD1A8]/30 flex items-center justify-center p-8">
                    <div className="w-full h-full rounded-full border-2 border-[#ECD1A8]/50 flex items-center justify-center p-8">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#F8F3E9] to-[#ECD1A8] flex items-center justify-center p-8">
                        <Globe className="w-16 h-16 sm:w-20 sm:h-20 text-[#B89A67]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8 sm:space-y-12">
                <div className="text-center lg:text-right">
                  <div className="inline-flex items-center justify-center lg:justify-end gap-3 mb-4">
                    <h3 className="text-xl sm:text-2xl font-serif font-medium text-gray-800">
                      Quality First
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F8F3E9] to-[#ECD1A8] flex items-center justify-center">
                      <Award className="w-5 h-5 text-[#B89A67]" />
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Uncompromising attention to detail in every stitch, ensuring
                    each piece meets our rigorous standards of excellence.
                  </p>
                </div>

                <div className="text-center lg:text-right">
                  <div className="inline-flex items-center justify-center lg:justify-end gap-3 mb-4">
                    <h3 className="text-xl sm:text-2xl font-serif font-medium text-gray-800">
                      Global Vision
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F8F3E9] to-[#ECD1A8] flex items-center justify-center">
                      <Compass className="w-5 h-5 text-[#B89A67]" />
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Bringing Indian craftsmanship to the global stage while
                    maintaining cultural authenticity and artisanal integrity.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 sm:py-20 md:py-24 w-full px-4 sm:px-6 md:px-8 lg:px-16 bg-gradient-to-br from-gray-50 to-[#F8F3E9]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-3 sm:gap-4 bg-white/50 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-[#B89A67]" />
              <span className="text-sm sm:text-base font-medium text-gray-700">
                WORLD-CLASS CRAFTSMANSHIP
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-gray-800 mb-4 sm:mb-6">
              Experience Indian Craftsmanship
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12">
              Discover collections that celebrate heritage while embracing
              contemporary elegance
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <a
              href="/collections"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#8b6f47] text-white font-medium rounded-full hover:bg-[#7a6140] transition-colors shadow-lg hover:shadow-xl text-sm sm:text-base group cursor-pointer"
            >
              Explore Collections
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-800 font-medium rounded-full hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl text-sm sm:text-base border border-gray-200 cursor-pointer"
            >
              Learn Our Story
            </a>
          </div>
        </motion.div>
      </section>

      {/* SIGNATURE */}
      <section className="py-12 sm:py-16 w-full px-4 sm:px-6 md:px-8 lg:px-16 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#ECD1A8] to-transparent mx-auto mb-6"></div>
          <p className="text-sm sm:text-base text-gray-500 font-light tracking-wider">
            WHERE TRADITION MEETS CONTEMPORARY ELEGANCE
          </p>
        </div>
      </section>
    </main>
  );
};

export default OurPhilosophy;

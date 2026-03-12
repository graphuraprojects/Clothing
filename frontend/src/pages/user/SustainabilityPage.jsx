import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Globe,
  Recycle,
  Droplets,
  Sun,
  TreePine,
  Factory,
  Users,
  Shield,
  Award,
  TrendingUp,
  CheckCircle,
  Heart,
  ArrowRight,
  Star,
  Target,
  PieChart,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  ChevronRight,
  Zap,
  Wind,
  Sprout,
  Cloud,
  Mountain,
  Coffee,
} from "lucide-react";

const SustainabilityPage = () => {
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
      {/* HERO BANNER */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-900 to-teal-800">
        {/* Background pattern */}
        <div className="absolute inset-0 w-full opacity-20">
          <div className="absolute top-1/4 left-10 w-[40%] h-96 bg-emerald-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-[40%] h-96 bg-teal-400 rounded-full blur-3xl"></div>
        </div>

        {/* Nature-themed background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-48 h-48 bg-gradient-to-br from-emerald-400 to-transparent rounded-lg rotate-12"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-transparent to-teal-400 rounded-lg -rotate-12"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-b from-teal-400 to-transparent rounded-lg rotate-45"></div>
        </div>

        <div className="relative z-10 w-full px-4 md:px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8 w-full"
          >
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 bg-[#dec195] rounded-2xl flex items-center justify-center shadow-2xl border-4 border-[#D4B483]">
                <Leaf className="w-16 h-16 text-gray-900" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 tracking-tight px-4">
              Sustainable <span className="text-[#B89A67]">Fashion</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Our commitment to the planet goes beyond fashion. We're creating
            beautiful clothing that respects both people and the environment.
          </motion.p>

          {/* Stats Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Recycle className="w-5 h-5 text-emerald-300" />
              <span className="text-white font-medium">95% Waste Recycled</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Droplets className="w-5 h-5 text-emerald-300" />
              <span className="text-white font-medium">70% Less Water</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Sun className="w-5 h-5 text-emerald-300" />
              <span className="text-white font-medium">Solar Powered</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OUR PHILOSOPHY */}
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
            className="w-full bg-gradient-to-br from-emerald-50 to-teal-50 p-8 md:p-12 rounded-2xl shadow-xl border border-emerald-200"
          >
            <div className="text-center mb-12">
              <div className="inline-flex p-3 bg-emerald-100 rounded-xl mb-6">
                <Target className="w-8 h-8 text-emerald-700" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Sustainability Philosophy
              </h2>
              <p className="text-gray-700 max-w-3xl mx-auto text-lg">
                At Graphura, sustainability isn't a trend—it's our foundation.
                We believe fashion should be beautiful, ethical, and
                environmentally responsible.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: "People First",
                  description:
                    "Fair wages, safe working conditions, and community development for all artisans",
                  color: "bg-pink-100 text-pink-800",
                },
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: "Planet Positive",
                  description:
                    "Carbon-neutral operations, water conservation, and waste reduction",
                  color: "bg-emerald-100 text-emerald-800",
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Transparent Process",
                  description:
                    "Full traceability from farm to finished product",
                  color: "bg-blue-100 text-blue-800",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center"
                >
                  <div
                    className={`inline-flex p-4 rounded-xl ${item.color} mb-6`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SUSTAINABLE MATERIALS */}
      <section className="py-16 w-full px-4 md:px-8 lg:px-16 bg-gray-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="w-full"
        >
          <div className="flex items-center gap-6 mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sprout className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Sustainable Materials
              </h2>
              <p className="text-gray-600 mt-2 text-lg">
                Eco-friendly fabrics that feel good and do good
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Organic Cotton",
                percentage: "45%",
                description: "GOTS certified, chemical-free farming",
                icon: <TreePine className="w-8 h-8" />,
                color: "bg-emerald-100 text-emerald-800",
                features: ["No pesticides", "Less water", "Soil health"],
              },
              {
                title: "Linen",
                percentage: "25%",
                description: "From sustainable European farms",
                icon: <Wind className="w-8 h-8" />,
                color: "bg-amber-100 text-amber-800",
                features: ["Biodegradable", "Low water", "Natural fiber"],
              },
              {
                title: "Recycled Polyester",
                percentage: "20%",
                description: "From plastic bottles & ocean waste",
                icon: <Recycle className="w-8 h-8" />,
                color: "bg-blue-100 text-blue-800",
                features: ["Waste reduction", "Energy saving", "Durable"],
              },
              {
                title: "Natural Dyes",
                percentage: "100%",
                description: "Plant-based & eco-friendly colors",
                icon: <Coffee className="w-8 h-8" />,
                color: "bg-purple-100 text-purple-800",
                features: ["Non-toxic", "Biodegradable", "Traditional"],
              },
            ].map((material, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden group hover:shadow-2xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`inline-flex p-3 rounded-xl ${material.color}`}
                      >
                        {material.icon}
                      </div>
                      <div className="text-3xl font-bold text-gray-900">
                        {material.percentage}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {material.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{material.description}</p>

                    <div className="space-y-2">
                      {material.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span className="text-gray-700 text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PRODUCTION PROCESS */}
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
            className="w-full bg-white p-10 rounded-2xl shadow-2xl border border-gray-200"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Eco-Friendly Production
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                Our innovative manufacturing processes minimize environmental
                impact
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 -translate-y-1/2"></div>

              {/* Timeline steps */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative">
                {[
                  {
                    step: "1",
                    title: "Design",
                    desc: "Zero-waste patterns",
                    icon: <PieChart className="w-7 h-7" />,
                  },
                  {
                    step: "2",
                    title: "Dyeing",
                    desc: "Natural plant dyes",
                    icon: <Droplets className="w-7 h-7" />,
                  },
                  {
                    step: "3",
                    title: "Weaving",
                    desc: "Solar-powered looms",
                    icon: <Sun className="w-7 h-7" />,
                  },
                  {
                    step: "4",
                    title: "Stitching",
                    desc: "Handcrafted quality",
                    icon: <Factory className="w-7 h-7" />,
                  },
                  {
                    step: "5",
                    title: "Packaging",
                    desc: "Compostable materials",
                    icon: <Recycle className="w-7 h-7" />,
                  },
                ].map((step, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative mx-auto mb-6">
                      <div className="w-24 h-24 bg-white border-4 border-emerald-300 rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white">
                          {step.icon}
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#8b6f47] text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                        {step.step}
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-emerald-600 transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ENVIRONMENTAL IMPACT */}
      <section className="py-16 w-full px-4 md:px-8 lg:px-16 bg-gradient-to-b from-emerald-50 to-teal-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="w-full"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Environmental Impact (2026)
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Measurable positive change through sustainable practices
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                value: "15M",
                unit: "Liters",
                title: "Water Saved",
                description: "Through recycling systems",
                icon: <Droplets className="w-8 h-8" />,
                color: "bg-blue-100 text-blue-800",
              },
              {
                value: "2.5T",
                unit: "Plastic",
                title: "Bottles Recycled",
                description: "Transformed into fabric",
                icon: <Recycle className="w-8 h-8" />,
                color: "bg-emerald-100 text-emerald-800",
              },
              {
                value: "200+",
                unit: "Artisans",
                title: "Empowered",
                description: "Fair trade livelihoods",
                icon: <Users className="w-8 h-8" />,
                color: "bg-amber-100 text-amber-800",
              },
              {
                value: "95%",
                unit: "Waste",
                title: "Diverted",
                description: "From landfills",
                icon: <Shield className="w-8 h-8" />,
                color: "bg-purple-100 text-purple-800",
              },
            ].map((impact, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow">
                  <div
                    className={`inline-flex p-4 rounded-xl ${impact.color} mb-6`}
                  >
                    {impact.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {impact.value}
                  </div>
                  <div className="text-gray-600 text-sm mb-2">
                    {impact.unit}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {impact.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{impact.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CERTIFICATIONS & AWARDS */}
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
            className="w-full bg-gradient-to-br from-gray-900 to-emerald-900 p-12 rounded-2xl shadow-2xl text-white"
          >
            <div className="text-center mb-12">
              <div className="inline-flex p-3 bg-emerald-500/20 rounded-xl mb-6">
                <Award className="w-8 h-8 text-emerald-300" />
              </div>
              <h2 className="text-4xl font-bold mb-4">
                Certifications & Awards
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Recognition for our commitment to ethical and sustainable
                fashion
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "GOTS Certified",
                  description: "Global Organic Textile Standard",
                  icon: <Leaf className="w-6 h-6" />,
                },
                {
                  name: "Fair Trade",
                  description: "Ethical production certified",
                  icon: <Shield className="w-6 h-6" />,
                },
                {
                  name: "PETA Approved",
                  description: "Vegan & cruelty-free",
                  icon: <Heart className="w-6 h-6" />,
                },
                {
                  name: "B Corp",
                  description: "Social & environmental performance",
                  icon: <Globe className="w-6 h-6" />,
                },
              ].map((cert, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center"
                >
                  <div className="w-12 h-12 bg-[#B89A67]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {cert.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{cert.name}</h3>
                  <p className="text-gray-400 text-sm">{cert.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SUSTAINABLE FUTURE */}
      <section className="py-16 w-full px-4 md:px-8 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="w-full"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Vision for a Sustainable Future
              </h2>
              <p className="text-gray-700 mb-6 text-lg">
                We're committed to pushing the boundaries of sustainable fashion
                through innovation, transparency, and continuous improvement.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-[#B89A67]" />
                  <span className="font-semibold text-gray-900">
                    100% Renewable Energy by 2025
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mountain className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-gray-900">
                    Carbon Negative Operations by 2026
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Cloud className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-gray-900">
                    Closed-Loop Water Systems
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-[#B89A67]" />
                  <span className="font-semibold text-gray-900">
                    500+ Artisan Families Supported
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#B89A67] to-[#D4B483] p-8 rounded-2xl shadow-2xl text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <Star className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Join Our Mission</h3>
                  <p className="text-emerald-100">
                    Be part of the sustainable fashion movement
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl">
                  <CheckCircle className="w-5 h-5" />
                  <span>Shop consciously with traceable products</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl">
                  <CheckCircle className="w-5 h-5" />
                  <span>Support artisan communities directly</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl">
                  <CheckCircle className="w-5 h-5" />
                  <span>Reduce environmental impact</span>
                </div>
              </div>

              <button className="w-full mt-8 py-4 bg-white text-emerald-700 font-bold rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                Explore Sustainable Collection
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SUPPORT SECTION */}
      <section className="py-16 w-full px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <div className="w-full bg-gradient-to-br from-gray-900 to-gray-800 p-12 rounded-2xl shadow-2xl text-white text-center">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-8">
                <div className="w-24 h-24 bg-[#B89A67] rounded-2xl flex items-center justify-center shadow-2xl">
                  <Leaf className="w-12 h-12 text-white" />
                </div>
              </div>

              <h2 className="text-4xl font-bold mb-4">
                Join the Sustainable Fashion Movement
              </h2>
              <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
                Every purchase supports ethical production, artisan livelihoods,
                and environmental conservation.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <Users className="w-12 h-12 text-emerald-300 mx-auto mb-6" />
                  <div className="font-bold text-2xl mb-2">Artisan Support</div>
                  <div className="text-emerald-100 text-lg">
                    200+ families empowered
                  </div>
                  <div className="text-emerald-200 mt-2">
                    Fair trade partnerships
                  </div>
                </div>

                <div className="p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <Globe className="w-12 h-12 text-emerald-300 mx-auto mb-6" />
                  <div className="font-bold text-2xl mb-2">
                    Environmental Impact
                  </div>
                  <div className="text-emerald-100 text-lg">
                    15M liters water saved
                  </div>
                  <div className="text-emerald-200 mt-2">
                    95% waste diverted
                  </div>
                </div>

                <div className="p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <Shield className="w-12 h-12 text-emerald-300 mx-auto mb-6" />
                  <div className="font-bold text-2xl mb-2">
                    Quality Assurance
                  </div>
                  <div className="text-emerald-100 text-lg">GOTS certified</div>
                  <div className="text-emerald-200 mt-2">
                    100% natural materials
                  </div>
                </div>
              </div>

              <a className="cursor-pointer" href="/collections">
                <button className="inline-flex items-center gap-3 px-10 py-4 bg-white text-emerald-700 font-bold text-lg rounded-full hover:bg-emerald-50 transition-colors shadow-lg hover:shadow-xl cursor-pointer">
                  Shop Sustainable Collection
                  <ArrowRight className="w-5 h-5" />
                </button>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 w-full px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-emerald-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <div className="w-full bg-gradient-to-br from-emerald-400 to-teal-500 p-12 rounded-2xl shadow-2xl border-4 border-white text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-6">
                Make a Difference with Every Purchase
              </h2>
              <p className="text-emerald-50 text-xl mb-10 max-w-2xl mx-auto">
                Choose fashion that cares for people and the planet. Your choice
                creates positive change.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="/collections"
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white text-emerald-700 font-bold rounded-full hover:bg-emerald-50 transition-colors shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <Leaf className="w-5 h-5" />
                  Shop Sustainable Collection
                </a>

                <a
                  href="/weavers"
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-emerald-800 text-white font-bold rounded-full hover:bg-emerald-900 transition-colors shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <Users className="w-5 h-5" />
                  Meet Our Artisans
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default SustainabilityPage;

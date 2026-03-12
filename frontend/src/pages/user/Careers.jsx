import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  Award,
  TrendingUp,
  Heart,
  Shield,
  Globe,
  Star,
  Clock,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Zap,
  Home,
  Coffee,
  DollarSign,
  Calendar,
  MessageSquare,
  ChevronRight,
  Target,
  Rocket,
  Sparkles,
  Building,
  Laptop,
  Palette,
  ShoppingBag,
  Truck,
  Factory,
  Leaf,
  Search,
} from "lucide-react";

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");

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

  const departments = [
    {
      id: "all",
      name: "All Departments",
      icon: <Briefcase className="w-5 h-5" />,
      color: "bg-gray-100 text-gray-800",
    },
    {
      id: "design",
      name: "Design",
      icon: <Palette className="w-5 h-5" />,
      color: "bg-pink-100 text-pink-800",
    },
    {
      id: "tech",
      name: "Technology",
      icon: <Laptop className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "marketing",
      name: "Marketing",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "bg-emerald-100 text-emerald-800",
    },
    {
      id: "operations",
      name: "Operations",
      icon: <Factory className="w-5 h-5" />,
      color: "bg-amber-100 text-amber-800",
    },
    {
      id: "artisan",
      name: "Artisan Relations",
      icon: <Users className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-800",
    },
  ];

  const jobOpenings = [
    {
      id: 1,
      title: "Sustainable Fashion Designer",
      department: "design",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "3+ years",
      description:
        "Create innovative sustainable fashion collections using eco-friendly materials and traditional techniques.",
      requirements: [
        "Degree in Fashion Design",
        "Experience with sustainable materials",
        "Portfolio required",
      ],
      benefits: ["Health insurance", "Flexible hours", "Skill development"],
    },
    {
      id: 2,
      title: "Frontend Developer",
      department: "tech",
      location: "Remote",
      type: "Full-time",
      experience: "2+ years",
      description:
        "Build beautiful, responsive e-commerce experiences for our sustainable fashion platform.",
      requirements: [
        "React/Next.js expertise",
        "Tailwind CSS",
        "E-commerce experience",
      ],
      benefits: ["Remote work", "Learning budget", "Stock options"],
    },
    {
      id: 3,
      title: "Artisan Community Manager",
      department: "artisan",
      location: "Varanasi, India",
      type: "Full-time",
      experience: "3+ years",
      description:
        "Work directly with artisan communities, ensuring fair trade practices and skill development.",
      requirements: [
        "Community management experience",
        "Hindi language skills",
        "Travel required",
      ],
      benefits: ["Travel allowance", "Healthcare", "Impact bonus"],
    },
    {
      id: 4,
      title: "E-commerce Marketing Manager",
      department: "marketing",
      location: "Gurgaon, India",
      type: "Full-time",
      experience: "4+ years",
      description:
        "Drive growth for our sustainable fashion brand through digital marketing strategies.",
      requirements: [
        "E-commerce marketing experience",
        "Analytics skills",
        "Content strategy",
      ],
      benefits: ["Performance bonus", "Flexible schedule", "Brand discounts"],
    },
    {
      id: 5,
      title: "Supply Chain Sustainability Lead",
      department: "operations",
      location: "Delhi, India",
      type: "Full-time",
      experience: "5+ years",
      description:
        "Oversee sustainable supply chain operations and implement eco-friendly logistics.",
      requirements: [
        "Supply chain management",
        "Sustainability experience",
        "Vendor management",
      ],
      benefits: [
        "Leadership role",
        "Sustainability impact",
        "Comprehensive benefits",
      ],
    },
    {
      id: 6,
      title: "UX/UI Designer",
      department: "design",
      location: "Remote",
      type: "Contract",
      experience: "2+ years",
      description:
        "Design intuitive user experiences for our sustainable fashion digital platforms.",
      requirements: ["Figma expertise", "Mobile design", "User research"],
      benefits: ["Project-based", "Flexible hours", "Creative freedom"],
    },
  ];

  const filteredJobs =
    selectedDepartment === "all"
      ? jobOpenings
      : jobOpenings.filter((job) => job.department === selectedDepartment);

  return (
    <main className="bg-white overflow-hidden">
      {/* HERO BANNER */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 to-[#2C1810]">
        {/* Background pattern */}
        <div className="absolute inset-0 w-full opacity-10">
          <div className="absolute top-1/4 left-10 w-[40%] h-96 bg-[#ECD1A8] rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-[40%] h-96 bg-[#ECD1A8] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 w-full px-4 md:px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8 w-full"
          >
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl border-4 border-[#ECD1A8]/30">
                <Briefcase className="w-16 h-16 text-[#ECD1A8]" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight px-4">
              Build Your <span className="text-[#ECD1A8]">Career</span>
            </h1>
            <div className="w-24 h-1 bg-[#ECD1A8] mx-auto mb-6"></div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Join our mission to revolutionize sustainable fashion. Create
            meaningful impact while building your career.
          </motion.p>

          {/* Stats Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users className="w-5 h-5 text-[#ECD1A8]" />
              <span className="text-white font-medium">50+ Team Members</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <TrendingUp className="w-5 h-5 text-[#ECD1A8]" />
              <span className="text-white font-medium">300% Growth</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Globe className="w-5 h-5 text-[#ECD1A8]" />
              <span className="text-white font-medium">Remote Friendly</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY JOIN US */}
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
            className="w-full bg-[#ECD1A8] p-8 md:p-12 rounded-2xl shadow-xl border border-[#D4B483]"
          >
            <div className="text-center mb-12">
              <div className="inline-flex p-3 bg-white rounded-xl mb-6">
                <Heart className="w-8 h-8 text-gray-900" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Join Graphura?
              </h2>
              <p className="text-gray-900 max-w-3xl mx-auto text-lg">
                Work with purpose, grow with impact, and be part of a team
                that's changing fashion for good.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Target className="w-8 h-8" />,
                  title: "Purpose-Driven Work",
                  description:
                    "Create meaningful impact through sustainable fashion",
                  color: "bg-emerald-100 text-emerald-800",
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: "Growth Opportunities",
                  description:
                    "Clear career paths and skill development programs",
                  color: "bg-blue-100 text-blue-800",
                },
                {
                  icon: <Home className="w-8 h-8" />,
                  title: "Flexible Work",
                  description: "Remote options and flexible working hours",
                  color: "bg-purple-100 text-purple-800",
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Comprehensive Benefits",
                  description: "Health, wellness, and financial benefits",
                  color: "bg-amber-100 text-amber-800",
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

      {/* JOB OPENINGS */}
      <section className="py-16 w-full px-4 md:px-8 lg:px-16 bg-gray-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="w-full"
        >
          <div className="flex items-center gap-6 mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-[#ECD1A8] to-[#D4B483] rounded-2xl flex items-center justify-center shadow-lg">
              <Briefcase className="w-10 h-10 text-gray-900" />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Current Openings
              </h2>
              <p className="text-gray-600 mt-2 text-lg">
                Join our team of innovators and changemakers
              </p>
            </div>
          </div>

          {/* Department Filter */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex flex-wrap gap-3">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`cursor-pointer ${`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${selectedDepartment === dept.id ? "bg-[#8b6f47] text-white" : dept.color} hover:shadow-lg`}`}
                >
                  {dept.icon}
                  {dept.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                variants={itemVariants}
                className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          job.department === "design"
                            ? "bg-pink-100 text-pink-800"
                            : job.department === "tech"
                              ? "bg-blue-100 text-blue-800"
                              : job.department === "marketing"
                                ? "bg-emerald-100 text-emerald-800"
                                : job.department === "operations"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {job.department.charAt(0).toUpperCase() +
                          job.department.slice(1)}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                        {job.type}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {job.experience} experience
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      window.open("https://www.graphura.online/apply.html")
                    }
                    className="lg:self-start px-6 py-3 bg-[#8b6f47] text-white font-semibold rounded-xl hover:bg-[#7a6140] transition-colors cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>

                <p className="text-gray-700 mb-6">{job.description}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      Requirements
                    </h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-600" />
                      Benefits
                    </h4>
                    <ul className="space-y-2">
                      {job.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No openings in this department
              </h3>
              <p className="text-gray-600 mb-6">
                Check back soon or explore opportunities in other departments
              </p>
              <button
                onClick={() => setSelectedDepartment("all")}
                className="px-6 py-3 bg-[#ECD1A8] text-gray-900 font-semibold rounded-xl hover:bg-[#D4B483] transition-colors cursor-pointer"
              >
                View All Openings
              </button>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* BENEFITS & PERKS */}
      <section className="py-16 w-full px-4 md:px-8 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="w-full"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Benefits & Perks
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              We take care of our team so they can do their best work
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: "Competitive Salary",
                description:
                  "Above industry standards with performance bonuses",
                color: "bg-emerald-100 text-emerald-800",
              },
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: "Learning & Development",
                description: "Annual learning budget and training programs",
                color: "bg-blue-100 text-blue-800",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Health & Wellness",
                description: "Comprehensive healthcare and wellness programs",
                color: "bg-pink-100 text-pink-800",
              },
              {
                icon: <Coffee className="w-8 h-8" />,
                title: "Work-Life Balance",
                description: "Flexible hours and generous time off",
                color: "bg-purple-100 text-purple-800",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Growth Opportunities",
                description: "Clear promotion paths and leadership training",
                color: "bg-amber-100 text-amber-800",
              },
              {
                icon: <ShoppingBag className="w-8 h-8" />,
                title: "Product Discounts",
                description: "Employee discounts on all Graphura products",
                color: "bg-rose-100 text-rose-800",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Remote Work",
                description: "Work from anywhere with our remote-first policy",
                color: "bg-cyan-100 text-cyan-800",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Recognition",
                description: "Regular recognition and rewards programs",
                color: "bg-indigo-100 text-indigo-800",
              },
            ].map((benefit, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow">
                  <div
                    className={`inline-flex p-3 rounded-xl ${benefit.color} mb-4`}
                  >
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* COMPANY CULTURE */}
      <section className="py-16 w-full px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="w-full"
        >
          <motion.div
            variants={itemVariants}
            className="w-full bg-gradient-to-br from-white to-gray-50 p-12 rounded-2xl shadow-2xl border border-gray-200"
          >
            <div className="text-center mb-12">
              <div className="inline-flex p-3 bg-[#ECD1A8] rounded-xl mb-6">
                <Users className="w-8 h-8 text-gray-900" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Culture
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                A collaborative, inclusive environment where innovation thrives
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Collaboration",
                  description:
                    "Cross-functional teams working together towards common goals",
                  stat: "100%",
                  icon: <Users className="w-6 h-6" />,
                },
                {
                  title: "Innovation",
                  description:
                    "Weekly innovation time to explore new ideas and technologies",
                  stat: "20%",
                  icon: <Rocket className="w-6 h-6" />,
                },
                {
                  title: "Diversity",
                  description:
                    "Inclusive workplace with team members from 15+ countries",
                  stat: "15+",
                  icon: <Globe className="w-6 h-6" />,
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-bold text-gray-900 mb-4">
                    {item.stat}
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {item.icon}
                    <h3 className="font-bold text-gray-900 text-lg">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-12 border-t border-gray-200">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-[#ECD1A8]/10 p-6 rounded-xl">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    What Our Team Says
                  </h4>
                  <p className="text-gray-700 italic">
                    "Working at Graphura has been transformative. I get to
                    combine my passion for fashion with making real
                    environmental impact."
                  </p>
                  <div className="mt-4 font-semibold text-gray-900">
                    - Priya Sharma, Lead Designer
                  </div>
                </div>

                <div className="bg-[#8b6f47] text-white p-6 rounded-xl">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Our Mission
                  </h4>
                  <p className="text-gray-200">
                    We're building more than a fashion brand - we're creating a
                    movement towards sustainable, ethical fashion that empowers
                    artisans and protects our planet.
                  </p>
                  <a className="cursor-pointer" href="/philosophy">
                    <button className="mt-6 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                      Learn About Our Mission
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* APPLICATION PROCESS */}
      <section className="py-16 w-full px-4 md:px-8 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="w-full"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Application Process
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Our streamlined process to ensure the best fit for you and our
              team
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Apply",
                description:
                  "Submit your application with resume and portfolio",
                icon: <MessageSquare className="w-8 h-8" />,
                color: "bg-blue-100 text-blue-800",
              },
              {
                step: "2",
                title: "Screening",
                description: "Initial call with our talent team",
                icon: <Phone className="w-8 h-8" />,
                color: "bg-emerald-100 text-emerald-800",
              },
              {
                step: "3",
                title: "Interviews",
                description: "Meet the team and showcase your skills",
                icon: <Users className="w-8 h-8" />,
                color: "bg-amber-100 text-amber-800",
              },
              {
                step: "4",
                title: "Offer",
                description: "Welcome to the Graphura family!",
                icon: <CheckCircle className="w-8 h-8" />,
                color: "bg-purple-100 text-purple-800",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-lg border-4 border-gray-200">
                    <div
                      className={`w-14 h-14 ${step.color} rounded-xl flex items-center justify-center`}
                    >
                      {step.icon}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#8b6f47] text-white rounded-full flex items-center justify-center font-bold shadow">
                    {step.step}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 w-full px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <div className="w-full bg-gradient-to-br from-gray-900 to-[#2C1810] p-12 rounded-2xl shadow-2xl text-white text-center">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-[#ECD1A8] to-[#D4B483] rounded-2xl flex items-center justify-center shadow-2xl">
                  <Rocket className="w-12 h-12 text-gray-900" />
                </div>
              </div>

              <h2 className="text-4xl font-bold mb-4">
                Ready to Launch Your Career?
              </h2>
              <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
                Join a team that's passionate about creating beautiful,
                sustainable fashion with purpose.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#ECD1A8] text-gray-900 font-bold text-lg rounded-full hover:bg-[#D4B483] transition-colors shadow-lg hover:shadow-xl cursor-pointer">
                  View All Openings
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-full hover:bg-white/20 transition-colors border border-white/20 cursor-pointer">
                  <Mail className="w-5 h-5" />
                  Send General Inquiry
                </button>
              </div>

              <div className="mt-12 pt-12 border-t border-white/20">
                <p className="text-gray-400">
                  Have questions? Contact our Talent Team at{" "}
                  <a
                    href="mailto:careers@graphura.in"
                    className="text-[#ECD1A8] hover:underline cursor-pointer"
                  >
                    careers@graphura.in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Careers;

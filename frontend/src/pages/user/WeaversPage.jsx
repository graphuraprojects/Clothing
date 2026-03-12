import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Award,
  MapPin,
  Calendar,
  Scissors,
  Home,
  Coins,
  GraduationCap,
  Heart,
  Shield,
  Globe,
  Star,
  Factory,
  Briefcase,
  Clock,
  CheckCircle,
  HeartHandshake,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  ShoppingBag,
  Handshake,
} from "lucide-react";

const WeaversPage = () => {
  const [activeWeaver, setActiveWeaver] = useState(null);
  const [showWeaverDetail, setShowWeaverDetail] = useState(false);

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

  const weavers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Varanasi, Uttar Pradesh",
      experience: "25 years",
      specialization: "Banarasi Silk Weaving",
      story:
        "Fifth generation weaver preserving the ancient art of Banarasi silk weaving. Rajesh learned the craft from his grandfather and has trained over 50 apprentices in traditional weaving techniques.",
      familyMembers: 4,
      looms: 3,
      productsPerMonth: 20,
      dailyHours: 8,
      earningsIncrease: "40%",
      image:
        "https://assets0.mirraw.com/images/8049926/Apple-2204_2_zoom.jpg?1592215047",
      skills: [
        "Silk Weaving",
        "Zari Work",
        "Design Adaptation",
        "Pattern Making",
      ],
      achievements: [
        "National Award 2018",
        "Master Weaver Certification",
        "Heritage Artisan",
      ],
      quote:
        "Every thread I weave connects me to my ancestors and carries forward our family legacy.",
    },
    {
      id: 2,
      name: "Meera Devi",
      location: "Maheshwar, Madhya Pradesh",
      experience: "18 years",
      specialization: "Maheshwari Cotton Sarees",
      story:
        "Started as an apprentice at age 14, now leads a women's weaving cooperative of 25 artisans. Focuses on sustainable dyes and organic cotton, empowering rural women through traditional crafts.",
      familyMembers: 3,
      looms: 2,
      productsPerMonth: 30,
      dailyHours: 6,
      earningsIncrease: "50%",
      image:
        "https://www.taneira.com/dw/image/v2/BKMH_PRD/on/demandware.static/-/Sites-Taneira-product-catalog/default/dw2e64b127/images/Taneira/Catalog/SABFCFHSC0101_1.jpg?sw=1000&sh=1500",
      skills: [
        "Cotton Weaving",
        "Natural Dyes",
        "Pattern Design",
        "Cooperative Management",
      ],
      achievements: [
        "Women Empowerment Award",
        "Eco Warrior 2022",
        "Social Entrepreneur",
      ],
      quote:
        "Weaving is meditation with threads. Each piece tells a story of empowerment and sustainability.",
    },
    {
      id: 3,
      name: "Abdul Karim",
      location: "Kashmir Valley",
      experience: "30 years",
      specialization: "Pashmina Shawls",
      story:
        "Master Pashmina weaver from Srinagar. Known for intricate paisley patterns and working with rare cashmere wool from Changthangi goats. Preserves 500-year-old weaving traditions.",
      familyMembers: 5,
      looms: 4,
      productsPerMonth: 15,
      dailyHours: 10,
      earningsIncrease: "60%",
      image:
        "https://tse2.mm.bing.net/th/id/OIP.ePMgQhVoDornw0fJoBk6eAHaJo?w=1080&h=1404&rs=1&pid=ImgDetMain&o=7&rm=3",
      skills: [
        "Pashmina Weaving",
        "Embroidery",
        "Quality Control",
        "Wool Processing",
      ],
      achievements: [
        "Kashmir Heritage Award",
        "Export Excellence",
        "Master Craftsman",
      ],
      quote:
        "Each shawl tells a story of the mountains, the cold winters, and the warmth of our traditions.",
    },
    {
      id: 4,
      name: "Lakshmi Amma",
      location: "Kanchipuram, Tamil Nadu",
      experience: "40 years",
      specialization: "Kanjeevaram Silk",
      story:
        "Legendary weaver who has woven sarees for three generations of brides. Known for temple border designs and pure gold zari work. Trained over 100 young weavers in traditional techniques.",
      familyMembers: 6,
      looms: 5,
      productsPerMonth: 10,
      dailyHours: 8,
      earningsIncrease: "70%",
      image:
        "https://tse3.mm.bing.net/th/id/OIP.fCcsvulLTS5OoAgZ_qz_cgHaLH?pid=ImgDet&w=474&h=711&rs=1&o=7&rm=3",
      skills: [
        "Kanjeevaram Weaving",
        "Gold Zari",
        "Complex Borders",
        "Silk Processing",
      ],
      achievements: [
        "Padma Shri Nominee",
        "Living Heritage Award",
        "Golden Loom Award",
      ],
      quote:
        "A saree is not just cloth, it's a woman's armor, her identity, and her connection to tradition.",
    },
    {
      id: 5,
      name: "Mohammad Ali",
      location: "Bhuj, Gujarat",
      experience: "22 years",
      specialization: "Kutch Embroidery",
      story:
        "Revolutionizing traditional Kutch embroidery by blending it with contemporary designs. Works with 15 women artisans in his village, creating sustainable livelihoods through craft.",
      familyMembers: 4,
      looms: 3,
      productsPerMonth: 40,
      dailyHours: 7,
      earningsIncrease: "55%",
      image:
        "https://www.datocms-assets.com/46272/1633188562-1633188561920.jpg?auto=format&fit=max&w=1200",
      skills: [
        "Mirror Work",
        "Embroidery",
        "Color Theory",
        "Contemporary Design",
      ],
      achievements: [
        "Design Innovation Award",
        "Community Leader",
        "Craft Revitalization",
      ],
      quote:
        "Every mirror reflects our culture, every stitch preserves our identity for future generations.",
    },
    {
      id: 6,
      name: "Sarojini Nair",
      location: "Kerala",
      experience: "15 years",
      specialization: "Kasavu Weaving",
      story:
        "Specializes in traditional Kerala kasavu sarees with gold borders. Uses hand-spun cotton and natural dyes from her garden. Runs a training center for young weavers.",
      familyMembers: 3,
      looms: 2,
      productsPerMonth: 25,
      dailyHours: 6,
      earningsIncrease: "45%",
      image:
        "https://tse1.mm.bing.net/th/id/OIP._4OEw8pL_ed7Z8w4M6ODpAHaLH?w=800&h=1200&rs=1&pid=ImgDetMain&o=7&rm=3",
      skills: [
        "Kasavu Weaving",
        "Natural Dye Extraction",
        "Loom Maintenance",
        "Organic Farming",
      ],
      achievements: [
        "Green Weaver Award",
        "Sustainable Practices",
        "Eco Artisan",
      ],
      quote:
        "My colors come from nature's palette, my patterns from tradition, and my joy from creating beauty.",
    },
  ];

  const WeaverDetailModal = () => {
    if (!activeWeaver) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Weaver Profile</h2>
            <button
              onClick={() => setShowWeaverDetail(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="bg-gray-100 rounded-xl overflow-hidden mb-6">
                  <img
                    src={activeWeaver.image}
                    alt={activeWeaver.name}
                    className="w-full h-64 object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-gray-800">
                      {activeWeaver.location}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-gray-800">
                      {activeWeaver.experience} experience
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Scissors className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-gray-800">
                      {activeWeaver.specialization}
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center mb-2">
                    <Coins className="w-5 h-5 text-amber-600 mr-2" />
                    <span className="font-semibold text-amber-800">
                      Earnings Impact
                    </span>
                  </div>
                  <p className="text-amber-700 text-sm">
                    Since joining Graphura, {activeWeaver.name}'s earnings have
                    increased by{" "}
                    <span className="font-bold">
                      {activeWeaver.earningsIncrease}
                    </span>
                  </p>
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {activeWeaver.name}
                </h3>
                <p className="text-gray-600 mb-6 italic">
                  "{activeWeaver.quote}"
                </p>

                <div className="prose max-w-none mb-8">
                  <p className="text-gray-800 mb-6">{activeWeaver.story}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <Home className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                    <div className="text-xl font-bold text-gray-900">
                      {activeWeaver.familyMembers}
                    </div>
                    <div className="text-sm text-gray-600">Family Members</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <Factory className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                    <div className="text-xl font-bold text-gray-900">
                      {activeWeaver.looms}
                    </div>
                    <div className="text-sm text-gray-600">Looms</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <Briefcase className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                    <div className="text-xl font-bold text-gray-900">
                      {activeWeaver.productsPerMonth}
                    </div>
                    <div className="text-sm text-gray-600">Products/Month</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <Clock className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                    <div className="text-xl font-bold text-gray-900">
                      {activeWeaver.dailyHours}h
                    </div>
                    <div className="text-sm text-gray-600">Daily Work</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Skills & Specializations
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeWeaver.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Star className="w-5 h-5 mr-2" />
                      Achievements & Awards
                    </h4>
                    <ul className="space-y-2">
                      {activeWeaver.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <HeartHandshake className="w-5 h-5 mr-2" />
                      Impact Through Graphura
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <GraduationCap className="w-5 h-5 text-amber-600 mr-2" />
                        <span className="text-sm text-gray-700">
                          Skill development workshops
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-5 h-5 text-amber-600 mr-2" />
                        <span className="text-sm text-gray-700">
                          Healthcare benefits
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-amber-600 mr-2" />
                        <span className="text-sm text-gray-700">
                          Fair trade certification
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 text-amber-600 mr-2" />
                        <span className="text-sm text-gray-700">
                          Global market access
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="bg-white overflow-hidden">
      {/* HERO BANNER */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-white">
        {/* Background pattern */}
        <div className="absolute inset-0 w-full">
          <div className="absolute top-1/4 left-10 w-[40%] h-96 bg-[#ECD1A8]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-[40%] h-96 bg-[#ECD1A8]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ECD1A8] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ECD1A8] to-transparent"></div>
        </div>

        <div className="relative z-10 w-full px-4 md:px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8 w-full"
          >
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-2xl border-4 border-[#D4B483]">
                <Users className="w-16 h-16 text-gray-900" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900 tracking-tight px-4">
              Meet Our <span className="text-[#B89A67]">Weavers</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            The skilled artisans who bring Graphura's vision to life with their
            hands, preserving centuries-old traditions while creating modern
            masterpieces.
          </motion.p>
        </div>
      </section>

      {/* STATISTICS SECTION */}
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
            className="w-full bg-[#ECD1A8] p-8 md:p-12 rounded-2xl shadow-xl border border-[#D4B483] mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Artisan Community Impact
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Artisan Families",
                  value: "200+",
                  description: "Across 8 states in India",
                  color: "bg-blue-100 text-blue-800",
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "Earnings Increase",
                  value: "40%",
                  description: "Above industry standards",
                  color: "bg-emerald-100 text-emerald-800",
                },
                {
                  icon: <GraduationCap className="w-8 h-8" />,
                  title: "Training Programs",
                  value: "500+",
                  description: "Apprentices trained",
                  color: "bg-amber-100 text-amber-800",
                },
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: "Women Artisans",
                  value: "85%",
                  description: "Of our artisan community",
                  color: "bg-pink-100 text-pink-800",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg"
                >
                  <div
                    className={`inline-flex p-4 rounded-xl ${stat.color} mb-4`}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {stat.title}
                  </h3>
                  <p className="text-gray-600 text-sm text-center">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* WEAVERS GRID */}
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
              Our Master Weavers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Each artisan brings generations of expertise and unique regional
              traditions to create pieces that tell stories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {weavers.map((weaver) => (
              <motion.div
                key={weaver.id}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
                onClick={() => {
                  setActiveWeaver(weaver);
                  setShowWeaverDetail(true);
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={weaver.image}
                    alt={weaver.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x400?text=Weaver+Image";
                    }}
                  />

                  <div className="absolute top-4 left-4 bg-[#B89A67] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {weaver.specialization}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {weaver.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{weaver.location}</span>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-2 text-sm">
                    {weaver.story.substring(0, 120)}...
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {weaver.experience}
                      </div>
                      <div className="text-xs text-gray-600">Experience</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {weaver.productsPerMonth}
                      </div>
                      <div className="text-xs text-gray-600">
                        Products/Month
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {weaver.skills.slice(0, 2).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[#ECD1A8] text-gray-900 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {weaver.skills.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{weaver.skills.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* OUR IMPACT SECTION */}
      <section className="py-16 w-full px-4 md:px-8 lg:px-16 bg-gray-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="w-full"
        >
          <motion.div
            variants={itemVariants}
            className="w-full bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Impact on Weaver Communities
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                Through fair trade practices and community development
                initiatives, we're creating sustainable livelihoods while
                preserving traditional crafts.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Coins className="w-8 h-8" />,
                  value: "₹2.5Cr+",
                  title: "Annual Income Generated",
                  description: "Distributed among 200+ artisan families",
                  color: "bg-emerald-100 text-emerald-800",
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  value: "85%",
                  title: "Women Artisans",
                  description: "Empowering women through economic independence",
                  color: "bg-pink-100 text-pink-800",
                },
                {
                  icon: <Factory className="w-8 h-8" />,
                  value: "15",
                  title: "Weaving Clusters",
                  description: "Across traditional textile hubs of India",
                  color: "bg-blue-100 text-blue-800",
                },
                {
                  icon: <GraduationCap className="w-8 h-8" />,
                  value: "500+",
                  title: "Apprentices Trained",
                  description:
                    "Ensuring craft preservation for future generations",
                  color: "bg-purple-100 text-purple-800",
                },
              ].map((impact, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`inline-flex p-4 rounded-xl ${impact.color} mb-4`}
                  >
                    {impact.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {impact.value}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {impact.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{impact.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SUSTAINABILITY SECTION */}
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
            className="w-full bg-gradient-to-br from-[#ECD1A8] to-[#D4B483] p-8 md:p-12 rounded-2xl shadow-xl border-4 border-white"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Sustainable Craft Preservation
                </h2>
                <p className="text-gray-900 mb-6">
                  We're committed to preserving traditional textile arts while
                  ensuring artisans receive fair compensation, healthcare
                  benefits, and opportunities for skill development.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gray-900" />
                    <span className="font-semibold text-gray-900">
                      Fair Trade Certified Partnerships
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gray-900" />
                    <span className="font-semibold text-gray-900">
                      Healthcare & Education Support
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gray-900" />
                    <span className="font-semibold text-gray-900">
                      Eco-Friendly Production Methods
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gray-900" />
                    <span className="font-semibold text-gray-900">
                      Inter-Generational Skill Transfer
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Join Our Mission
                </h3>
                <p className="text-gray-700 mb-6">
                  Every purchase supports artisan livelihoods and helps preserve
                  India's rich textile heritage for future generations.
                </p>
                <a href="/collections" className="inline-block w-full cursor-pointer">
                  <button className="w-full py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-colors cursor-pointer">
                    Support Artisan Livelihoods
                  </button>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 w-full px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <div className="w-full bg-gradient-to-br from-gray-900 to-[#2C1810] p-12 rounded-2xl shadow-2xl text-white text-center">
            <div className="max-w-3xl mx-auto">
              <Heart className="w-16 h-16 text-[#ECD1A8] mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">
                Support Artisan Livelihoods
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Every purchase from Graphura directly supports our weavers and
                their families, while helping preserve India's rich textile
                heritage.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="/collections"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#ECD1A8] text-gray-900 font-bold rounded-full hover:bg-[#D4B483] transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Shop Artisan Collection
                </a>

                {/* <a
                  href="/about/partnerships"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Handshake className="w-5 h-5" />
                  Become a Partner
                </a> */}
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-gray-400">
                  Join{" "}
                  <span className="text-[#ECD1A8] font-bold">
                    5000+ customers
                  </span>{" "}
                  who support ethical fashion and artisan empowerment
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Weaver Detail Modal */}
      {showWeaverDetail && <WeaverDetailModal />}
    </main>
  );
};

export default WeaversPage;

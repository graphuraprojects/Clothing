import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  User,
  Mail,
  Phone,
  Globe,
  Database,
  Server,
  Key,
  Bell,
  Trash2,
  ClipboardCheck,
  AlertCircle,
  ChevronRight,
  Search,
  Download,
  BookOpen,
  Share2,
  Building,
  GraduationCap,
  Award,
  Check,
  Users as UsersIcon,
  Cpu,
  Clock,
} from "lucide-react";

const PrivacyPolicy = () => {
  const refs = useRef([]);
  const isInView = useInView(refs.current, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

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
      {/* HERO BANNER - FULL WIDTH */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-white">
        {/* Full width background pattern */}
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
                <Shield className="w-16 h-16 text-gray-900" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900 tracking-tight px-4">
              Privacy <span className="text-[#B89A67]">Policy</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="w-full"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-[#8b6f47] text-white rounded-full text-lg font-semibold shadow-2xl">
              <AlertCircle className="w-6 h-6" />
              Last Updated: January 25, 2026
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT - FULL WIDTH */}
      <section className="py-16 w-full">
        {/* Introduction - Full Width */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="w-full px-4 md:px-8 lg:px-16 mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="w-full bg-gradient-to-br from-white to-gray-50 p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200 mb-8"
          >
            <p className="text-gray-700 text-xl leading-relaxed max-w-6xl mx-auto">
              Graphura India Private Limited values individuals' privacy and
              actively seeks to preserve the privacy rights of those who share
              information with us. The following information explains the
              Internet privacy policy and practices our company has adopted.
              Graphura India Private Limited reserves the right to amend it at
              any time without notice.
            </p>
          </motion.div>

          {/* Quick Navigation - Full Width */}
          <motion.div
            variants={itemVariants}
            className="w-full bg-[#ECD1A8] p-8 md:p-12 rounded-2xl shadow-xl border border-[#D4B483]"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <FileText className="w-6 h-6" />
                  Quick Navigation
                </h3>
                <p className="text-gray-700">
                  Jump directly to any section of our Privacy Policy
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search in policy..."
                    className="pl-12 pr-4 py-3 bg-white rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B89A67] w-64"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {/* <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-black transition-colors">
                  <Download className="w-5 h-5" />
                  Download PDF
                </button> */}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  num: "1",
                  title: "Personal Information",
                  icon: <User className="w-5 h-5" />,
                  color: "bg-blue-100 text-blue-800",
                },
                {
                  num: "2",
                  title: "Technical Information",
                  icon: <Database className="w-5 h-5" />,
                  color: "bg-emerald-100 text-emerald-800",
                },
                {
                  num: "3",
                  title: "Why We Collect",
                  icon: <Eye className="w-5 h-5" />,
                  color: "bg-amber-100 text-amber-800",
                },
                {
                  num: "4",
                  title: "Information Sharing",
                  icon: <Share2 className="w-5 h-5" />,
                  color: "bg-purple-100 text-purple-800",
                },
                {
                  num: "5",
                  title: "Security Measures",
                  icon: <Lock className="w-5 h-5" />,
                  color: "bg-red-100 text-red-800",
                },
                {
                  num: "6",
                  title: "Data Retention",
                  icon: <Server className="w-5 h-5" />,
                  color: "bg-cyan-100 text-cyan-800",
                },
                {
                  num: "7",
                  title: "Your Rights",
                  icon: <Key className="w-5 h-5" />,
                  color: "bg-indigo-100 text-indigo-800",
                },
                {
                  num: "8",
                  title: "Contact Us",
                  icon: <Mail className="w-5 h-5" />,
                  color: "bg-gray-100 text-gray-800",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={`#section-${item.num}`}
                  className="flex items-center gap-4 p-6 bg-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                >
                  <span
                    className={`flex items-center justify-center w-12 h-12 ${item.color} rounded-xl text-lg font-bold group-hover:scale-110 transition-transform`}
                  >
                    {item.num}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {item.icon}
                      <span className="font-bold text-gray-900 group-hover:text-[#B89A67] transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">Click to jump</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 ml-auto group-hover:translate-x-2 transition-transform" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Privacy Policy Sections - Full Width */}
        <div className="w-full px-4 md:px-8 lg:px-16 space-y-12">
          {/* Section 1 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            id="section-1"
            className="scroll-mt-24 w-full"
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-4xl font-bold text-gray-900">1</span>
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                    What personal information do we collect?
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Understanding the data we gather from our users
                  </p>
                </div>
              </div>

              <div className="w-full bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
                <p className="text-gray-700 text-lg mb-8 max-w-6xl mx-auto">
                  We collect no personal information except when you
                  deliberately send it to us, for example, by sending us an
                  email or applying to our program. When submitting an
                  application for our program you are asked to submit:
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    {
                      icon: <User className="w-8 h-8" />,
                      title: "Your Name",
                      desc: "so we know what to call you",
                      color: "bg-blue-50",
                    },
                    {
                      icon: <Mail className="w-8 h-8" />,
                      title: "Email & Phone",
                      desc: "so we know how to reach you",
                      color: "bg-emerald-50",
                    },
                    {
                      icon: <Globe className="w-8 h-8" />,
                      title: "Your Nationality",
                      desc: "for visa rules determination",
                      color: "bg-amber-50",
                    },
                    {
                      icon: <FileText className="w-8 h-8" />,
                      title: "CV/Resume",
                      desc: "for suitable internship placement",
                      color: "bg-purple-50",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-4 p-6 ${item.color} rounded-2xl border border-gray-200`}
                    >
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-1">
                          {item.title}
                        </h4>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full p-8 bg-gradient-to-r from-[#ECD1A8]/20 to-[#D4B483]/20 rounded-2xl border-2 border-[#D4B483]/30">
                  <div className="flex items-start gap-4">
                    <BookOpen className="w-8 h-8 text-[#B89A67] flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-xl mb-2">
                        Additional Information
                      </h4>
                      <p className="text-gray-700">
                        When you interview with us, and if you choose to
                        participate in our program, we collect additional
                        information from you in order to provide benefits to you
                        during and after the program. We may ask you about any
                        medical conditions, dietary requirements, or religious
                        needs to ensure that we can best accommodate your needs
                        while you are in our program.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Section 2 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            id="section-2"
            className="scroll-mt-24 w-full"
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-4xl font-bold text-gray-900">2</span>
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                    What technical information do we collect?
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Understanding our technical data collection methods
                  </p>
                </div>
              </div>

              <div className="w-full space-y-8">
                {[
                  {
                    number: "2.1",
                    icon: <Database className="w-10 h-10" />,
                    title: "Automatic Collection",
                    content:
                      "When you access our web pages, certain technical information is automatically collected. We analyze aggregate traffic/access information for resource management and site planning purposes. We reserve the right to use log detail to investigate resource management or security concerns.",
                    color: "bg-blue-50",
                  },
                  {
                    number: "2.2",
                    icon: <Eye className="w-10 h-10" />,
                    title: "Cookies",
                    content:
                      "Some of our web pages use 'cookies.' Usually a cookie enables a website to tailor what you see according to the way you entered the site (for example, if you entered via a certain link, or if you are using a mobile device).",
                    color: "bg-emerald-50",
                  },
                  {
                    number: "2.3",
                    icon: <ClipboardCheck className="w-10 h-10" />,
                    title: "Aggregate Information",
                    content:
                      "We also use non-identifying and aggregate information to better design our website. For example, we may determine that the average visitor typically views our website for a certain number of minutes, or that a certain percentage of men vs. women applied to our program. But we do not gather or disclose information that could identify those specific individuals.",
                    color: "bg-amber-50",
                  },
                  {
                    number: "2.4",
                    icon: <Globe className="w-10 h-10" />,
                    title: "Analytics Services",
                    content:
                      "Our web pages may use Google Analytics or other similar services to analyze web traffic for design purposes. In such cases, the information described above may be shared with the vendor(s) providing the analytical service. We do not control the privacy policies of these vendors.",
                    color: "bg-purple-50",
                  },
                  {
                    number: "2.5",
                    icon: <Key className="w-10 h-10" />,
                    title: "Cookie Control",
                    content:
                      "You are able to visit our site without having information collected in this way, by setting your browser to decline cookies.",
                    color: "bg-indigo-50",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`w-full ${item.color} p-8 rounded-2xl shadow-lg border border-gray-200`}
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
                            <span className="text-xl font-bold text-gray-900">
                              {item.number}
                            </span>
                          </div>
                          <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
                            {item.icon}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {item.title}
                        </h3>
                        <p className="text-gray-700 text-lg">{item.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Section 3 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            id="section-3"
            className="scroll-mt-24 w-full"
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-4xl font-bold text-gray-900">3</span>
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                    Why do we collect information?
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Understanding our purpose behind data collection
                  </p>
                </div>
              </div>

              <div className="w-full bg-gradient-to-r from-[#ECD1A8]/10 to-[#D4B483]/10 p-12 rounded-2xl border-2 border-[#D4B483]/30">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto mb-8">
                    <Eye className="w-12 h-12 text-[#B89A67]" />
                  </div>
                  <p className="text-2xl font-medium text-gray-900">
                    We collect only such personal information as we need in
                    order to confirm that you are eligible for the internship
                    program in which you have expressed interest, and then to
                    place you in that program and deliver the program to you.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Section 4 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            id="section-4"
            className="scroll-mt-24 w-full"
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-4xl font-bold text-gray-900">4</span>
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                    Who do we share your information with?
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Understanding our information sharing practices
                  </p>
                </div>
              </div>

              <div className="w-full space-y-8">
                {[
                  {
                    number: "4.1",
                    content:
                      "When you choose to provide information, we use it to fulfill or respond to your request. We also use this information in aggregate to better understand your interests.",
                    icon: <Share2 className="w-10 h-10" />,
                    color: "bg-blue-50",
                  },
                  {
                    number: "4.2",
                    content:
                      "In order to confirm your internship placement with one of our host company partners, we will actively share your contact information with them at the point when the match is confirmed by both parties.",
                    icon: <Building className="w-10 h-10" />,
                    color: "bg-emerald-50",
                  },
                  {
                    number: "4.3",
                    content:
                      "If you are currently or recently enrolled in an institution of higher education, such as a university or college, we may contact that institution in order to ensure that your program is suitably monitored and supported with respect to academic credit, reporting, insurance, institutional policy, and/or any financial aid or discounts which we, or the institution, may agree to apply towards your program or the programs of other students from the same institution (e.g. a group discount.)",
                    icon: <GraduationCap className="w-10 h-10" />,
                    color: "bg-amber-50",
                  },
                  {
                    number: "4.4",
                    content:
                      "We do not share your personal information with any other party, for any purpose, unless: such sharing is required by law, or you have given your permission to share it.",
                    icon: <Lock className="w-10 h-10" />,
                    color: "bg-purple-50",
                  },
                  {
                    number: "4.5",
                    content:
                      "Non-personally identifiable visitor information may be provided to other parties for marketing.",
                    icon: <Globe className="w-10 h-10" />,
                    color: "bg-indigo-50",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`w-full ${item.color} p-8 rounded-2xl shadow-lg border border-gray-200`}
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
                            <span className="text-xl font-bold text-gray-900">
                              {item.number}
                            </span>
                          </div>
                          <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
                            {item.icon}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 text-lg">{item.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Section 5 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            id="section-5"
            className="scroll-mt-24 w-full"
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-4xl font-bold text-gray-900">5</span>
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                    How do we protect your information?
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Our commitment to data security and protection
                  </p>
                </div>
              </div>

              <div className="w-full grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg border border-blue-200">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md">
                      <Lock className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        5.1 Data Protection
                      </h3>
                      <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg">
                    We are dedicated to preventing unauthorized data access,
                    maintaining data accuracy, and ensuring the appropriate use
                    of information. We strive to put in place appropriate
                    safeguards to secure the information we collect from you.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl shadow-lg border border-emerald-200">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md">
                      <Cpu className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        5.2 Security Measures
                      </h3>
                      <div className="w-12 h-1 bg-emerald-600 rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg">
                    In our principal software systems, your information is
                    encrypted both at-rest and in-transit. Administrative access
                    to these systems is secured by two-factor authentication.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Section 6 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            id="section-6"
            className="scroll-mt-24 w-full"
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-4xl font-bold text-gray-900">6</span>
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                    How long do we keep your information?
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Our data retention policies and practices
                  </p>
                </div>
              </div>

              <div className="w-full bg-gradient-to-br from-amber-50 to-amber-100 p-12 rounded-2xl shadow-xl border border-amber-200">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                      <Clock className="w-16 h-16 text-amber-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="p-6 bg-white rounded-xl shadow-sm mb-6">
                      <p className="text-gray-700 text-xl leading-relaxed">
                        As part of the program, participants receive lifetime
                        membership to our Alumni Network. For this reason we do
                        not delete participant information after a fixed period
                        of time. When someone applies to our program, we retain
                        their application until they request we remove it.
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-amber-700 font-semibold">
                      <UsersIcon className="w-6 h-6" />
                      <span>Lifetime Alumni Network Membership</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Section 7 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            id="section-7"
            className="scroll-mt-24 w-full"
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-4xl font-bold text-gray-900">7</span>
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                    What rights do you have regarding the information we hold
                    about you?
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Your data protection rights and how to exercise them
                  </p>
                </div>
              </div>

              <div className="w-full bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl shadow-xl border border-indigo-200">
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <Mail className="w-8 h-8 text-indigo-600" />
                    <p className="text-gray-700 text-lg">
                      Please contact us at{" "}
                      <span className="text-[#B89A67] font-bold">
                        official@graphura.in
                      </span>{" "}
                      if you would like to exercise the following rights:
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      icon: <Eye className="w-6 h-6" />,
                      text: "To be informed about how your personal information is being used",
                      bg: "bg-white",
                    },
                    {
                      icon: <Key className="w-6 h-6" />,
                      text: "To access the information we hold about you",
                      bg: "bg-white",
                    },
                    {
                      icon: <ClipboardCheck className="w-6 h-6" />,
                      text: "To amend the information we hold about you",
                      bg: "bg-white",
                    },
                    {
                      icon: <Trash2 className="w-6 h-6" />,
                      text: "To be erased",
                      bg: "bg-white",
                    },
                    {
                      icon: <Bell className="w-6 h-6" />,
                      text: "To stop receiving marketing messages",
                      bg: "bg-white",
                    },
                    {
                      icon: <Lock className="w-6 h-6" />,
                      text: "To restrict the way we're processing your data",
                      bg: "bg-white",
                    },
                  ].map((right, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-4 p-6 ${right.bg} rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all`}
                    >
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="text-indigo-600">{right.icon}</div>
                      </div>
                      <p className="text-gray-700 font-medium">{right.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Section 8 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            id="section-8"
            className="scroll-mt-24 w-full"
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-4xl font-bold text-gray-900">8</span>
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                    Your Consent & Contact Us
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Final information about consent and how to reach us
                  </p>
                </div>
              </div>

              <div className="w-full grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#ECD1A8] rounded-xl flex items-center justify-center shadow-md">
                      <Check className="w-8 h-8 text-gray-900" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Your Consent
                    </h3>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-[#ECD1A8]/20 to-[#D4B483]/20 rounded-xl border-2 border-[#D4B483]/30">
                    <p className="text-gray-900 text-xl font-semibold text-center">
                      By using our website, you consent to this Privacy Policy.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-[#2C1810] p-8 rounded-2xl shadow-xl text-white">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#ECD1A8] rounded-xl flex items-center justify-center shadow-md">
                      <Mail className="w-8 h-8 text-gray-900" />
                    </div>
                    <h3 className="text-2xl font-bold">Contact Us</h3>
                  </div>
                  <p className="text-gray-300 mb-8">
                    Should you have any questions or requests regarding these
                    privacy policies and practices, please contact us via email:
                  </p>
                  <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                    <div className="flex items-center justify-center gap-4">
                      <Mail className="w-8 h-8 text-[#ECD1A8]" />
                      <a
                        href="mailto:Official@graphura.in"
                        className="text-[#ECD1A8] font-bold text-2xl hover:underline text-center cursor-pointer"
                      >
                        Official@graphura.in
                      </a>
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/20 text-center">
                      <p className="text-gray-400 text-sm">
                        We aim to respond to all inquiries within 24-48 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Back to Top - Full Width */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="w-full mt-16 pt-8 border-t border-gray-200 text-center"
          >
            <a
              href="#top"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#8b6f47] text-white font-bold text-lg rounded-full hover:shadow-2xl transition-all hover:scale-105 hover:bg-[#7a6140] cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 rotate-90" />
              <span>Back to Top</span>
              <ChevronRight className="w-6 h-6 -rotate-90" />
            </a>

            <div className="mt-8 text-gray-600">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#B89A67]" />
                  <span className="font-semibold">GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#B89A67]" />
                  <span className="font-semibold">
                    Data Protection Certified
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#B89A67]" />
                  <span className="font-semibold">
                    Encrypted Communications
                  </span>
                </div>
              </div>
              <p>© 2026 Graphura India Private Limited. All rights reserved.</p>
              <p className="mt-1">
                This Privacy Policy was last updated on January 25, 2026
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
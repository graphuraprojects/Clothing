import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  User,
  Send,
  CheckCircle,
  AlertCircle,
  Building,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle,
} from "lucide-react";

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsLoading(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  // Social media links with actual URLs
  const socialLinks = [
    {
      icon: <Facebook className="w-6 h-6" />,
      name: "Facebook",
      color: "bg-blue-600 hover:bg-blue-700",
      link: "https://www.facebook.com/Graphura.in?rdid=hedOFTwsGowyIObi&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19nKAMTopZ%2F#",
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      name: "X (Twitter)",
      color: "bg-black hover:bg-gray-900",
      link: "https://x.com/Graphura",
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      name: "Instagram",
      color:
        "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
      link: "https://www.instagram.com/graphura.in?igsh=MXNqNmtidzljNDJlag%3D%3D",
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      name: "LinkedIn",
      color: "bg-blue-700 hover:bg-blue-800",
      link: "https://www.linkedin.com/company/graphura-india-private-limited/",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      name: "Email",
      color: "bg-red-600 hover:bg-red-700",
      link: "mailto:official@graphura.in",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      name: "Phone",
      color: "bg-green-600 hover:bg-green-700",
      link: "tel:+917378021327",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      name: "Website",
      color: "bg-indigo-600 hover:bg-indigo-700",
      link: "https://graphura.in",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      name: "Location",
      color: "bg-amber-600 hover:bg-amber-700",
      link: "https://maps.google.com",
    },
  ];

  return (
    <main className="bg-white overflow-hidden">
      {/* HERO BANNER - FULL WIDTH */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-white">
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
                <MessageSquare className="w-16 h-16 text-gray-900" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900 tracking-tight px-4">
              Contact <span className="text-[#B89A67]">Us</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            We're here to help you. Reach out to us for inquiries, support, or
            partnership opportunities.
          </motion.p>
        </div>
      </section>

      {/* CONTACT INFORMATION - FULL WIDTH */}
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
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Mail className="w-8 h-8" />,
                  title: "Email",
                  details: "Official@graphura.in",
                  subdetails: "Support: support@graphura.in",
                  color: "bg-blue-100 text-blue-800",
                  action: "mailto:official@graphura.in",
                },
                {
                  icon: <Phone className="w-8 h-8" />,
                  title: "Phone",
                  details: "+91 7378021327",
                  subdetails: "Mon-Fri, 9AM-6PM IST",
                  color: "bg-emerald-100 text-emerald-800",
                  action: "tel:+917378021327",
                },
                {
                  icon: <MapPin className="w-8 h-8" />,
                  title: "Location",
                  details: "Gurgaon, Haryana",
                  subdetails: "Registered Office",
                  color: "bg-amber-100 text-amber-800",
                  action: "https://maps.google.com",
                },
                {
                  icon: <Clock className="w-8 h-8" />,
                  title: "Business Hours",
                  details: "Monday - Friday",
                  subdetails: "9:00 AM - 6:00 PM IST",
                  color: "bg-purple-100 text-purple-800",
                  action: null,
                },
              ].map((contact, index) => (
                <a
                  key={index}
                  href={contact.action}
                  target={
                    contact.action?.startsWith("http") ? "_blank" : "_self"
                  }
                  rel={
                    contact.action?.startsWith("http")
                      ? "noopener noreferrer"
                      : ""
                  }
                  className={`cursor-pointer ${`flex flex-col items-center p-6 bg-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${!contact.action && "cursor-default"}`}`}
                >
                  <div
                    className={`inline-flex p-4 rounded-xl ${contact.color} mb-4`}
                  >
                    {contact.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {contact.title}
                  </h3>
                  <p className="text-gray-900 font-semibold text-center mb-1">
                    {contact.details}
                  </p>
                  <p className="text-gray-600 text-sm text-center">
                    {contact.subdetails}
                  </p>
                </a>
              ))}
            </div>
          </motion.div>

          {/* CONTACT FORM & MAP - FULL WIDTH */}
          <div className="grid gap-8">
            {/* Contact Form - Height Reduced */}
            <motion.div
              variants={itemVariants}
              className="w-full bg-white p-6 rounded-2xl shadow-xl border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#ECD1A8] rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-gray-900" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600 text-sm">
                    We'll get back to you within 24 hours
                  </p>
                </div>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center"
                >
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Thank you for contacting us. We'll respond within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <User className="w-3 h-3" />
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B89A67] focus:border-transparent transition-all text-sm"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <Mail className="w-3 h-3" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B89A67] focus:border-transparent transition-all text-sm"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <Phone className="w-3 h-3" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B89A67] focus:border-transparent transition-all text-sm"
                        placeholder="+91 1234567890"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <MessageSquare className="w-3 h-3" />
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B89A67] focus:border-transparent transition-all text-sm"
                      >
                        <option value="">Select a subject</option>
                        <option value="internship">Internship Inquiry</option>
                        <option value="partnership">
                          Partnership Opportunity
                        </option>
                        <option value="support">Technical Support</option>
                        <option value="billing">Billing Inquiry</option>
                        <option value="feedback">Feedback & Suggestions</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <MessageSquare className="w-3 h-3" />
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B89A67] focus:border-transparent transition-all text-sm"
                      placeholder="Please describe your inquiry in detail..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-40 py-3 bg-[#8b6f47] text-white font-semibold rounded-xl hover:bg-[#7a6140] transition-all hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-sm cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Location & Social Media */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Office Location */}
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#ECD1A8] rounded-xl flex items-center justify-center">
                    <Building className="w-5 h-5 text-gray-900" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Our Office
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Visit us at our headquarters
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#B89A67] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Registered Address
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Graphura India Private Limited
                        <br />
                        near RSF, Pataudi
                        <br />
                        Gurgaon, Haryana 122503
                        <br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Globe className="w-4 h-4 text-[#B89A67] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Service Areas
                      </h4>
                      <p className="text-gray-700 text-sm">
                        • India (Pan-India)
                        <br />
                        • International Placements
                        <br />
                        • Remote Internships
                        <br />• Corporate Training
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 text-center">
                  <div className="w-12 h-12 bg-[#ECD1A8] rounded-xl flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-gray-900" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">
                    Interactive Map
                  </h4>
                  <p className="text-gray-600 text-xs mb-3">
                    Google Maps integration would be here
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#8b6f47] text-white rounded-lg hover:bg-[#7a6140] transition-colors text-sm cursor-pointer"
                  >
                    <Globe className="w-3 h-3" />
                    Open in Google Maps
                  </a>
                </div>
              </div>

              {/* Social Media - Horizontally Expanded */}
              <div className="bg-[#f5f0eb] p-6 rounded-2xl shadow-xl text-gray-800 border border-[#e8e2d9]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#ECD1A8] rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-gray-900" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Connect With Us</h2>
                    <p className="text-gray-500 text-sm">
                      Follow us on social media
                    </p>
                  </div>
                </div>

                {/* Horizontally expanded social links */}
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`cursor-pointer ${`flex flex-row items-center justify-center gap-2 px-4 py-3 ${social.color} rounded-lg hover:scale-105 transition-all duration-300 min-w-[130px]`}`}
                    >
                      {social.icon}
                      <span className="font-medium text-sm">{social.name}</span>
                    </a>
                  ))}
                </div>

                {/* Newsletter */}
                <div className="p-4 bg-white rounded-xl border border-[#e8e2d9]">
                  <h4 className="font-bold text-sm mb-2">
                    Newsletter Subscription
                  </h4>
                  <p className="text-gray-500 text-xs mb-3">
                    Subscribe for updates on internship opportunities and news.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c4a265] text-sm"
                    />
                    <button className="px-4 py-2 bg-[#ECD1A8] text-gray-900 font-semibold rounded-lg hover:bg-[#D4B483] transition-colors text-sm cursor-pointer">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FAQ & SUPPORT - FULL WIDTH */}
      <section className="py-12 w-full px-4 md:px-8 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="w-full"
        >
          <motion.div
            variants={itemVariants}
            className="w-full bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-200"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                Find quick answers to common questions about our programs and
                services
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  question:
                    "How long does the internship application process take?",
                  answer:
                    "The complete process typically takes 4-6 weeks from application to placement confirmation.",
                  icon: <Clock className="w-5 h-5" />,
                  color: "bg-blue-100 text-blue-800",
                },
                {
                  question: "Do I need a visa for international internships?",
                  answer:
                    "Yes, we assist with visa documentation but final approval depends on the destination country.",
                  icon: <Globe className="w-5 h-5" />,
                  color: "bg-emerald-100 text-emerald-800",
                },
                {
                  question: "What are the payment terms?",
                  answer:
                    "Payments are typically split into three installments as outlined in our Terms of Service.",
                  icon: <MessageSquare className="w-5 h-5" />,
                  color: "bg-amber-100 text-amber-800",
                },
                {
                  question: "Is there an application fee?",
                  answer:
                    "Some programs have a non-refundable application fee. Check specific program details.",
                  icon: <AlertCircle className="w-5 h-5" />,
                  color: "bg-purple-100 text-purple-800",
                },
                {
                  question: "What support is provided during the internship?",
                  answer:
                    "We provide 24/7 emergency support, regular check-ins, and program coordination.",
                  icon: <CheckCircle className="w-5 h-5" />,
                  color: "bg-green-100 text-green-800",
                },
                {
                  question: "Can I get academic credit for my internship?",
                  answer:
                    "We work with your institution to help secure academic credit where applicable.",
                  icon: <Building className="w-5 h-5" />,
                  color: "bg-red-100 text-red-800",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`inline-flex p-2.5 rounded-lg ${faq.color} mb-3`}
                  >
                    {faq.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-base md:text-lg mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <a
                href="/faq"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ECD1A8] text-gray-900 font-semibold rounded-full hover:bg-[#D4B483] transition-colors text-sm cursor-pointer"
              >
                View All FAQs
                <MessageSquare className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA SECTION - FULL WIDTH */}
      <section className="py-12 w-full px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full"
        >
            <div className="w-full bg-[#f5f0eb] p-8 rounded-2xl shadow-2xl text-gray-800 text-center border border-[#e8e2d9]">
            <div className="max-w-3xl mx-auto">
              <MessageSquare className="w-12 h-12 text-[#ECD1A8] mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-3">Still Have Questions?</h2>
              <p className="text-gray-500 mb-6 text-sm">
                Our dedicated support team is here to help you with any
                questions or concerns.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+917378021327"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#ECD1A8] text-gray-900 font-bold rounded-full hover:bg-[#D4B483] transition-colors text-sm cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  Call Us Now
                </a>

                <a
                  href="mailto:official@graphura.in"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-colors text-sm cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  Email Us
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-gray-400 text-xs">
                  Average Response Time:{" "}
                  <span className="text-[#ECD1A8] font-bold">
                    Under 24 hours
                  </span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Contactus;

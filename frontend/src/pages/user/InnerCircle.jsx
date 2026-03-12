import { Gift, Tag, Bell, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import API from "../../api/axios";



const InnerCircle = () => {
  const [email, setEmail] = useState("");
const handleSubscribe = async () => {
  if (!email) {
    alert("Please enter email");
    return;
  }

  try {
    const res = await axios.post("/api/subscribe", {
      email,
      phone: "0000000000",
    });

    alert(res.data.message);
    setEmail("");
  } catch (err) {
    alert("Subscription failed ❌");
  }
};

return (
    <section className="inner-circle-editorial section-editorial">
      <div className="max-w-5xl mx-auto">

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

          {/* LEFT — Heading & benefits */}
          <div className="sr-left visible">
            <div className="editorial-label mb-6">
              <span>Members Only</span>
            </div>

            {/* Main Heading */}
            <h2 className="playfair text-3xl sm:text-4xl lg:text-5xl leading-tight mb-2 text-white">
              Join The <span className="gold-shimmer italic">Inner Circle</span>
            </h2>

            <div className="editorial-sep"></div>

            <h3 className="outfit text-[11px] sm:text-xs tracking-[0.35em] text-white/40 uppercase mb-8">
              EXCLUSIVE ACCESS. ELITE BENEFITS.
            </h3>

            {/* Benefits */}
            <div className="flex flex-col gap-0">
              <div className="ic-benefit">
                <div className="ic-benefit-icon">
                  <Gift size={18} strokeWidth={1.5} />
                </div>
                <p className="ic-benefit-text">
                  Early Access to New Collections & Sales
                </p>
              </div>

              <div className="ic-benefit">
                <div className="ic-benefit-icon">
                  <Tag size={18} strokeWidth={1.5} />
                </div>
                <p className="ic-benefit-text">
                  Special Members-Only Offers
                </p>
              </div>

              <div className="ic-benefit">
                <div className="ic-benefit-icon">
                  <Bell size={18} strokeWidth={1.5} />
                </div>
                <p className="ic-benefit-text">
                  Personalized Updates & Style Tips
                </p>
              </div>

              <div className="ic-benefit">
                <div className="ic-benefit-icon">
                  <Truck size={18} strokeWidth={1.5} />
                </div>
                <p className="ic-benefit-text">
                  Free Shipping on Exclusive Member Orders
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Email signup */}
          <div className="flex flex-col justify-center sr-right visible">

            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px]" style={{ background: 'var(--gold)' }}></div>
              <span className="outfit text-[10px] sm:text-xs tracking-[0.3em] uppercase"
                    style={{ color: 'var(--gold)' }}>
                SIGN UP WITH YOUR EMAIL
              </span>
            </div>

            {/* Email Box */}
            <div className="ic-input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="ic-input"
              />
              <button
                onClick={handleSubscribe}
                className="ic-submit cursor-pointer"
              >
                Subscribe
              </button>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] mt-8 mb-6"
                 style={{ background: 'linear-gradient(90deg, rgba(196,162,101,0.2), transparent)' }}></div>

            {/* Bottom Note */}
            <div className="outfit">
              <p className="text-white/30 tracking-wide text-xs sm:text-sm font-light">
                Stay Connected with Exclusive Perks & Insights
              </p>

              <p className="text-white/40 tracking-wider mt-1 text-xs sm:text-sm font-light">
                Unsubscribe Anytime • 100% Privacy Guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnerCircle;


import React, { useState } from "react";

const InnerCircle = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email");
      return;
    }

    setMessage("✨ Welcome to the Inner Circle");
    setEmail("");
  };

  return (
    <section className="relative w-full py-10 bg-white overflow-hidden">

      {/* SILK LIGHT ANIMATION */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] bg-black/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-black/10 rounded-full blur-[140px] animate-pulse delay-300" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div
          className="
            relative
            bg-white/70
            backdrop-blur-2xl
            border border-black/10
            rounded-[3rem]
            px-8 sm:px-14 py-10
            text-center
            shadow-[0_40px_120px_-30px_rgba(0,0,0,0.25)]
            transition-all duration-700
            hover:shadow-[0_60px_160px_-40px_rgba(0,0,0,0.35)]
          "
        >
          {/* TOP LINE */}
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-6">
            Invitation Only
          </p>

          {/* TITLE */}
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-gray-900">
            The Inner Circle
          </h2>

          {/* DIVIDER */}
          <div className="mx-auto mt-6 mb-8 h-px w-24 bg-black/20" />

          {/* DESCRIPTION */}
          <p className="max-w-xl mx-auto text-gray-600 text-sm sm:text-base leading-relaxed">
            Private access to limited drops, early releases and stories reserved
            for those who appreciate modern heritage and quiet luxury.
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubscribe}
            className="mt-14 flex flex-col items-center gap-6"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="
                w-full max-w-md
                px-7 py-4
                rounded-full
                bg-white
                border border-black/20
                text-sm
                outline-none
                focus:border-black
                focus:ring-1 focus:ring-black
                transition
              "
            />

            <button
              type="submit"
              className="
                px-14 py-4
                rounded-full
                bg-black
                text-white
                text-xs
                tracking-[0.25em]
                uppercase
                hover:scale-105
                active:scale-95
                transition-all duration-300
               cursor-pointer"
            >
              Request Access
            </button>

            {message && (

              <p className="text-sm text-gray-700 animate-fade-in">{message}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default InnerCircle;

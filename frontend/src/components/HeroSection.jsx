import React from 'react';

const HeroSection = ({
  backgroundImage,
  heading,
  subtitle,
  buttonText = "SHOP COLLECTION",
  onButtonClick
}) => {
  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: "cover",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Centered content */}
      <div className="relative z-10 text-center text-white px-4 py-20 flex flex-col items-center justify-center max-w-4xl">
        {/* Main heading */}
        <h1 className="permanent-marker-regular text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg uppercase tracking-wider mb-4">
          {heading}
        </h1>

        {/* Subtitle */}
        <p className="cinzel text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide text-gray-100 drop-shadow-md max-w-2xl leading-relaxed mb-8">
          {subtitle}
        </p>

        {/* Button */}
        <button
          onClick={onButtonClick}
          className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 uppercase tracking-wide"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
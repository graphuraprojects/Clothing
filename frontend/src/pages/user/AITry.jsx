import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaMagic, FaArrowLeft, FaCheckCircle } from "react-icons/fa";

const AITryOn = () => {
  const navigate = useNavigate();

  const [originalImage, setOriginalImage] = useState(null);
  const [aiImage, setAiImage] = useState(null);
  const [size, setSize] = useState("M");
  const [fit, setFit] = useState("Regular");
  const [loading, setLoading] = useState(false);
  const [slider, setSlider] = useState(50);

  //  UPLOAD HANDLER
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setOriginalImage(url);
      setAiImage(null); // reset AI result
    }
  };

  // TRY ON (AI DEMO)
  const handleTryOn = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      //  DEMO PURPOSE
      // real AI me yahan API se image aayegi
      setAiImage(originalImage);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6] p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-black cursor-pointer"
          >
            <FaArrowLeft />
            <span className="hidden sm:block">Back to Product</span>
          </button>

          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold">Try Clothes </h1>
            <p className="text-gray-500 mt-1">
              Upload your photo & preview outfits instantly
            </p>
          </div>

          <div className="w-16"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* LEFT SIDE */}
          <div>
            {/* Product */}
            <div className="flex gap-4 mb-6">
              <img
                src="https://tearbird.com/wp-content/uploads/2024/10/Black.png"
                className="w-16 h-16 rounded-lg object-cover"
                alt="product"
              />
              <div>
                <h3 className="font-semibold text-lg">Classic Black Hoodie</h3>
                <p className="text-gray-600">₹1,999</p>
              </div>
            </div>

            {/* Upload */}
            <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center cursor-pointer hover:border-black transition">
              <FaCamera className="text-3xl text-gray-400 mb-2" />
              <p className="font-medium">Upload full body photo</p>
              <p className="text-sm text-gray-500">JPG / PNG · Max 5MB</p>
              <p className="text-xs text-gray-400 mt-2">
                Tip: Straight pose & good lighting
              </p>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleUpload}
              />
            </label>

            {originalImage && (
              <div className="flex items-center gap-2 text-green-600 mt-3">
                <FaCheckCircle />
                Photo uploaded successfully
              </div>
            )}

            {/* Size */}
            <div className="mt-6">
              <p className="font-medium mb-2 ">Select Size</p>
              <div className="flex gap-2 ">
                {["S", "M", "L", "XL"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 rounded-lg border ${
                      size === s
                        ? "bg-[#8b6f47] text-white"
                        : "bg-white cursor-pointer"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Fit */}
            <div className="mt-4">
              <p className="font-medium mb-2">Fit Type</p>
              <div className="flex gap-2 ">
                {["Slim", "Regular", "Oversized"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFit(f)}
                    className={`px-4 py-2 rounded-lg border ${
                      fit === f
                        ? "bg-[#8b6f47] text-white"
                        : "bg-white cursor-pointer"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleTryOn}
              disabled={!originalImage}
              className="mt-8 w-full bg-[#8b6f47] text-white py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-[#7a6140] transition-all duration-300"
            >
              <FaMagic />
              {loading ? "Generating your look..." : "Try Your Selected Outfit"}
            </button>

            <p className="text-xs text-gray-400 text-center mt-3">
              Your photo is only used for preview and never stored
            </p>
          </div>

          {/* RIGHT SIDE – REAL BEFORE / AFTER SLIDER */}
          <div className="flex flex-col items-center">
            <p className="font-semibold mb-3"> Preview</p>

            <div className="relative w-full max-w-sm h-[420px] rounded-xl overflow-hidden shadow bg-gray-200">
              {/* AI IMAGE */}
              {aiImage && (
                <img
                  src={aiImage}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="ai"
                />
              )}

              {/* ORIGINAL IMAGE */}
              {originalImage && (
                <div
                  className="absolute inset-0 overflow-hidden "
                  style={{ width: `${slider}%` }}
                >
                  <img
                    src={originalImage}
                    className="w-full h-full object-cover grayscale"
                    alt="original"
                  />
                </div>
              )}

              {/* Divider */}
              {aiImage && (
                <div
                  className="absolute top-0 bottom-0 w-[3px] bg-white z-10"
                  style={{ left: `${slider}%` }}
                />
              )}

              {/* Slider */}
              {aiImage && (
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={slider}
                  onChange={(e) => setSlider(e.target.value)}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] z-20 cursor-pointer"
                />
              )}

              {!originalImage && (
                <div className="h-full flex items-center justify-center text-gray-400">
                  Upload photo to preview
                </div>
              )}

              {/* Labels */}
              {originalImage && (
                <>
                  <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Original
                  </div>
                  <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    After Try-Own Clothes
                  </div>
                </>
              )}
            </div>

            {aiImage && !loading && (
              <div className="text-center mt-4">
                <p className="font-medium text-lg">
                  Looks great on you &#128525;
                </p>
                <p className="text-sm text-gray-500 ">
                  92% users buy after try Own Clothes
                </p>
                <button className="mt-3 px-6 py-2 bg-green-600 text-white rounded-lg cursor-pointer">
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITryOn;

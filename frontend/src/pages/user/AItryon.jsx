import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios  from "axios";
import { FaCamera, FaMagic, FaArrowLeft, FaCheckCircle } from "react-icons/fa";

const API = axios.create({
  baseURL: "/api",
});

const AITryOn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Product ID from ProductDetails
  const productId = location.state?.productId;

  // redirect if opened directly
  useEffect(() => {
  if (location.state === null) {
    navigate("/");
  }
}, []);
console.log("RECEIVED PRODUCT:", productId);


  // STATES
  const [product, setProduct] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [file, setFile] = useState(null);
  const [aiImage, setAiImage] = useState(null);
  const [size, setSize] = useState("M");
  const [fit, setFit] = useState("Regular");
  const [loading, setLoading] = useState(false);
  const [slider, setSlider] = useState(50);

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  // ================= UPLOAD =================
  const handleUpload = (e) => {
    const img = e.target.files[0];
    if (!img) return;

    setFile(img);
    setOriginalImage(URL.createObjectURL(img));
    setAiImage(null);
  };

  const productImage =
  product?.colors?.[0]?.images?.[0];

  // ================= AI TRY ON =================
const handleTryOn = async () => {

  if (!file || !productImage) {
    alert("Missing image");
    return;
  }

  setLoading(true);

  try {
    const form = new FormData();

    // MUST MATCH multer
    form.append("user", file);

    // product image
    form.append("cloth", productImage);

    const res = await fetch("/api/tryon", {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    console.log("TRYON RESPONSE:", data);

    setAiImage(data.image);

  } catch (err) {
    console.error(err);
    alert("Try-On Failed");
  } finally {
    setLoading(false);
  }
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
            <h1 className="text-3xl font-bold">Try Clothes on you</h1>
            <p className="text-gray-500 mt-1">
              Upload your photo & preview outfits instantly
            </p>
          </div>

          <div className="w-16"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT */}
          <div>

            {/* PRODUCT */}
            {product && (
              <div className="flex gap-4 mb-6">
                <img
                  src={product.colors[0].images[0]}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600">₹{product.discountPrice}</p>
                </div>
              </div>
            )}

            {/* UPLOAD */}
            <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center cursor-pointer hover:border-black transition">
              <FaCamera className="text-3xl text-gray-400 mb-2" />
              <p className="font-medium">Upload full body photo</p>
              <p className="text-sm text-gray-500">JPG / PNG · Max 5MB</p>
              <p className="text-xs text-gray-400 mt-2">
                Tip: Straight pose & good lighting
              </p>

              <input hidden type="file" accept="image/*" onChange={handleUpload} />
            </label>

            {originalImage && (
              <div className="flex items-center gap-2 text-green-600 mt-3">
                <FaCheckCircle /> Photo uploaded successfully
              </div>
            )}

            {/* SIZE */}
            <div className="mt-6">
              <p className="font-medium mb-2">Select Size</p>
              <div className="flex gap-2">
                {product?.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`cursor-pointer ${`px-4 py-2 rounded-lg border ${
                      size === s ? "bg-[#8b6f47] text-white" : "bg-white"
                    }`}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* FIT */}
            <div className="mt-4">
              <p className="font-medium mb-2">Fit Type</p>
              <div className="flex gap-2">
                {["Slim", "Regular", "Oversized"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFit(f)}
                    className={`cursor-pointer ${`px-4 py-2 rounded-lg border ${
                      fit === f ? "bg-[#8b6f47] text-white" : "bg-white"
                    }`}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            

            <button
  onClick={() => {
    console.log("🔥 BUTTON CLICKED");
    handleTryOn();
  }}
  disabled={!file}
  className="mt-8 w-full bg-[#8b6f47] text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#7a6140] transition-all duration-300 cursor-pointer"
>
  <FaMagic />
  {loading ? "Generating your look..." : "Try Outfit with AI"}
</button>
            <p className="text-xs text-gray-400 text-center mt-3">
              Your photo is only used for preview and never stored
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-center">

            <p className="font-semibold mb-3">AI Preview</p>

            <div className="relative w-full max-w-sm h-[420px] rounded-xl overflow-hidden shadow bg-gray-200">

              {aiImage && (
                <img src={aiImage} className="absolute inset-0 w-full h-full object-cover" />
              )}

              {originalImage && (
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${slider}%` }}>
                  <img src={originalImage} className="w-full h-full object-cover grayscale" />
                </div>
              )}

              {aiImage && (
                <>
                  <div className="absolute top-0 bottom-0 w-[3px] bg-white z-10" style={{ left: `${slider}%` }} />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={slider}
                    onChange={(e) => setSlider(e.target.value)}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] z-20"
                  />
                </>
              )}

              {!originalImage && (
                <div className="h-full flex items-center justify-center text-gray-400">
                  Upload photo to preview
                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AITryOn;

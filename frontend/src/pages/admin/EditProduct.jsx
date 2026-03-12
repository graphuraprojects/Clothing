import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";

const EditProduct = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    discountPrice: "",
    sku: "",
    description: "",
    fabric: "",
    material: "",
    care: "",
    weight: "",
    dimensions: "",
    origin: "",

    isTrending: false,
    isCarousel: false,
    isPremium: false,
    isLimited: false,

    // ✅ carousel fields
    carouselTitle: "",
    carouselSubtitle: "",
    carouselPriceText: ""
  });

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  /* LOAD CATEGORIES */
  useEffect(() => {
    API.get("/categories").then(res => setCategories(res.data));
  }, []);

  /* LOAD PRODUCT */
 useEffect(() => {
  API.get(`/products/${id}`).then(res => {
    const p = res.data;

    setFormData({
      ...p,
      category: p.category?._id,

      // booleans
      isTrending: Boolean(p.isTrending),
      isCarousel: Boolean(p.isCarousel),
      isPremium: Boolean(p.isPremium),
      isLimited: Boolean(p.isLimited),

      // carousel fields
      carouselTitle: p.carouselTitle || "",
      carouselSubtitle: p.carouselSubtitle || "",
      carouselPriceText: p.carouselPriceText || "",

      // details flatten
      fabric: p.details?.fabric || "",
      material: p.details?.material || "",
      care: p.details?.care || "",
      weight: p.details?.weight || "",
      dimensions: p.details?.dimensions || "",
      origin: p.details?.origin || "",
    });
  });
}, [id]);


  /* HANDLERS */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleCheckbox = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach(k => {
        data.append(k, formData[k]);
      });

      images.forEach(img => data.append("images", img));

      await API.put(`/products/${id}`, data);

      alert("✅ Product Updated");
      navigate("/admin/products");

    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (

    <div className="bg-gray-100 py-16">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 p-8
      shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">

        <h1 className="text-3xl font-bold mb-6 text-center">Update Product</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="input"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="input"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="input"
            />

            <input
              name="discountPrice"
              value={formData.discountPrice || ""}
              onChange={handleChange}
              placeholder="Discount Price"
              className="input"
            />
          </div>

          {/* FLAGS – SAME UI */}
          <div className="flex flex-wrap gap-6">
            {["isTrending", "isCarousel", "isPremium", "isLimited"].map(f => (
              <label key={f} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={f}
                  checked={formData[f]}
                  onChange={handleCheckbox}
                />
                {f.replace("is", "")}
              </label>
            ))}
          </div>

          {/* ✅ CAROUSEL FIELDS – SAME FLOW, NO UI CHANGE */}
          {formData.isCarousel && (
            <>
              <input
                name="carouselTitle"
                value={formData.carouselTitle}
                onChange={handleChange}
                placeholder="BUY 2"
                className="input"
              />

              <input
                name="carouselSubtitle"
                value={formData.carouselSubtitle}
                onChange={handleChange}
                placeholder="OVERSIZED T-SHIRTS"
                className="input"
              />

              <input
                name="carouselPriceText"
                value={formData.carouselPriceText}
                onChange={handleChange}
                placeholder="AT ₹1099"
                className="input"
              />
            </>
          )}

          <div>
            <label className="block font-medium mb-1">Product Images</label>
            <input type="file" multiple onChange={handleImageChange} />
          </div>

          <button
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition cursor-pointer"
          >
            Update Product
          </button>

        </form>
      </div>
    </div>

  );
};

export default EditProduct;

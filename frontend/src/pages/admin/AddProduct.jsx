import { useState, useEffect } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    discountPercent: "",
    discountPrice: "",
    description: "",
    fabric: "",
    material: "",
    care: "",
    weight: "",
    dimensions: "",
    origin: "",
    sizes: "",
    collections: [],
    gender: "",
    isTrending: false,
    isCarousel: false,
    isPremium: false,
    isLimited: false,

    // ✅ carousel fields
    carouselTitle: "",
    carouselSubtitle: "",
    carouselPriceText: ""
  });

  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
const [sizeInput, setSizeInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [collectionsList, setCollectionsList] = useState([]);
  const [selectedCollectionName, setSelectedCollectionName] = useState("");
  const navigate = useNavigate();

 useEffect(() => {
  const loadData = async () => {
    const catRes = await API.get("/categories");
    const colRes = await API.get("/collections");

    setCategories(catRes.data);
    setCollectionsList(colRes.data);
  };

  loadData();
}, []);


  useEffect(() => {
    if (formData.collections.length) {
      setFilteredCategories(
        categories.filter(c => c.collection === formData.collections[0])
      );
    }
  }, [formData.collections, categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedCollectionName === "kids" && !formData.gender) {
      alert("Please select gender for kids product");
      return;
    }

    const data = new FormData();

    const price = Number(formData.price || 0);
    const percent = Number(formData.discountPercent || 0);
    const discountPrice = Math.round(price - (price * percent) / 100);

    Object.keys(formData).forEach(k => {
      if (k === "sizes") {
data.append("sizes", JSON.stringify(sizes));
      } else if (k === "collections") {
        data.append("collections", JSON.stringify(formData.collections));
      } else if (k === "discountPrice") {
        data.append("discountPrice", discountPrice);
      } else if (k === "gender") {
        return;
      } else {
        data.append(k, formData[k]);
      }
    });

    if (selectedCollectionName === "kids") {
      data.append("gender", formData.gender);
    }

    data.append("details", JSON.stringify({
      fabric: formData.fabric,
      material: formData.material,
      care: formData.care,
      weight: formData.weight,
      dimensions: formData.dimensions,
      origin: formData.origin,
    }));

    data.append("colors", JSON.stringify(
      colors.map(c => ({ name: c.name, hex: c.hex }))
    ));

    colors.forEach((color, i) => {
      color.images.forEach(img => {
        data.append(`colorImages_${i}`, img);
      });
    });

    await API.post("/products", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`
      }
    });

    alert("✅ Product Added Successfully");
    navigate("/admin/products");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let updated = {
      ...formData,
      [name]: type === "checkbox" ? checked : value
    };

    if (name === "price" || name === "discountPercent") {
      const price = Number(name === "price" ? value : updated.price);
      const percent = Number(name === "discountPercent" ? value : updated.discountPercent);
      updated.discountPrice = Math.round(price - (price * percent) / 100);
    }

    setFormData(updated);
  };

  const addColor = () =>
    setColors([...colors, { name: "", hex: "", images: [] }]);

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-200 p-8 shadow-md">

        <h1 className="text-3xl font-bold mb-8 text-center">Add Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* collection */}
          <select
            className="input"
            onChange={(e) => {
              const selected = collectionsList.find(c => c._id === e.target.value);
              setFormData({ ...formData, collections: [e.target.value], gender: "" });
              setSelectedCollectionName(selected?.name?.toLowerCase());
            }}
          >
            <option value="">Select Collection</option>
            {collectionsList.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>

          {selectedCollectionName === "kids" && (
            <select
              className="input"
              value={formData.gender}
              onChange={e => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="boys">Boys</option>
              <option value="girls">Girls</option>
            </select>
          )}

          <select name="category" onChange={handleChange} className="input">
            <option value="">Select Category</option>
            {filteredCategories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>

          <input name="name" placeholder="Product Name" onChange={handleChange} className="input" />
          <textarea name="description" placeholder="Description" onChange={handleChange} className="input" />

          <div className="grid grid-cols-4 gap-4">
            <input name="price" placeholder="Price" onChange={handleChange} className="input" />
            <input name="discountPercent" placeholder="Discount %" onChange={handleChange} className="input" />
            <input value={formData.discountPrice} readOnly className="input bg-gray-100" />
            {/* <input name="sizes" placeholder="Sizes S,M,L" onChange={handleChange} className="input" /> */}
            <div>
  <div className="flex gap-2 mb-2">
    <input
      value={sizeInput}
      onChange={e => setSizeInput(e.target.value)}
      placeholder="Add size (e.g. XL)"
      className="input"
    />

    <button
      type="button"
      onClick={() => {
        if (!sizeInput) return;
        setSizes([...sizes, sizeInput]);
        setSizeInput("");
      }}
      className="bg-gray-200 px-3 rounded cursor-pointer"
    >
      Add
    </button>
  </div>

  <div className="flex gap-2 flex-wrap">
    {sizes.map((s, i) => (
      <span
        key={i}
        className="bg-black text-white px-3 py-1 rounded cursor-pointer"
        onClick={() => setSizes(sizes.filter((_, idx) => idx !== i))}
      >
        {s} ✕
      </span>
    ))}
  </div>
</div>

          </div>

          <div className="grid grid-cols-2 gap-4">
            {["fabric","material","care","weight","dimensions","origin"].map(f => (
              <input key={f} name={f} placeholder={f} onChange={handleChange} className="input" />
            ))}
          </div>

          {/* FLAGS – SAME UI */}
          <div className="flex gap-6">
            {["isTrending","isCarousel","isPremium","isLimited"].map(f => (
              <label key={f} className="flex gap-2 items-center">
                <input type="checkbox" name={f} onChange={handleChange} />
                {f.replace("is","")}
              </label>
            ))}
          </div>

          {/* ✅ CAROUSEL FIELDS – NO UI CHANGE */}
          {formData.isCarousel && (
            <>
              <input
                name="carouselTitle"
                placeholder="BUY 2"
                onChange={handleChange}
                className="input"
              />
              <input
                name="carouselSubtitle"
                placeholder="OVERSIZED T-SHIRTS"
                onChange={handleChange}
                className="input"
              />
              <input
                name="carouselPriceText"
                placeholder="AT ₹1099"
                onChange={handleChange}
                className="input"
              />
            </>
          )}

          <h2 className="text-xl font-semibold">Colors & Images</h2>

          {colors.map((c, i) => (
            <div key={i} className="border p-4 rounded-xl bg-gray-50">
              <input
                placeholder="Color Name"
                className="input mb-2"
                onChange={e => {
                  const u = [...colors];
                  u[i].name = e.target.value;
                  setColors(u);
                }}
              />

              <input
                type="color"
                onChange={e => {
                  const u = [...colors];
                  u[i].hex = e.target.value;
                  setColors(u);
                }}
              />

              <div className="mt-3 border-dashed border-2 p-4 rounded text-center">
                <input
                  hidden
                  id={`img-${i}`}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={e => {
                    const u = [...colors];
                    u[i].images = Array.from(e.target.files);
                    setColors(u);
                  }}
                />
                <label htmlFor={`img-${i}`} className="cursor-pointer block">
                  Upload Images
                </label>
                <p className="text-sm mt-2 text-gray-600">
                  {c.images.length} images selected
                </p>
              </div>
            </div>
          ))}

          <button type="button" onClick={addColor} className="bg-gray-200 px-4 py-2 rounded-xl cursor-pointer">
            + Add Color
          </button>

          <button type="submit" className="w-full bg-black text-white py-3 rounded-xl cursor-pointer">
            Save Product
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;

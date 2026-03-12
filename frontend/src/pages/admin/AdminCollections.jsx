import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Grid, List, Search, Trash2, Edit } from "lucide-react";
import API from "../../api/axios";
import Navbar from "../../components/Home/Navbar";

const AdminCollections = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await API.get("/products");
    const data = res.data.products || [];

    setProducts(data);

    const uniqueCategories = [
      "All",
      ...new Set(data.map(p => p.category?.name).filter(Boolean))
    ];

    setCategories(uniqueCategories);
  };

 const deleteProduct = async (id) => {
  if (!window.confirm("Delete this product?")) return;

  try {
    await API.delete(`/products/${id}`);
    alert("Product deleted");
    loadProducts();
  } catch (err) {
    console.error(err);
    alert("Delete failed");
  }
};


  const filteredProducts = products.filter(p => {
    const search =
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const category =
      selectedCategory === "All" || p.category?.name === selectedCategory;

    return search && category;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-10">

        <div className="flex gap-4 mb-6">
          <Search size={20} />
          <input
            placeholder="Search products..."
            className="border p-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-4 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer ${`px-4 py-1 border rounded ${
                selectedCategory === cat ? "bg-black text-white" : ""
              }`}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {filteredProducts.map(product => (
            <div key={product._id} className="bg-white shadow rounded">

              <img
                src={product.images?.[0]}
                className="w-full h-60 object-cover"
              />

              <div className="p-4">

                <p className="text-xs text-gray-500">{product.category?.name}</p>

                <h3 className="font-bold">{product.name}</h3>

                <p>₹{product.price}</p>

                <div className="flex gap-2 mt-4">

                  <button
                    onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                    className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    <Edit size={16} /> Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    <Trash2 size={16} /> Delete
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default AdminCollections;

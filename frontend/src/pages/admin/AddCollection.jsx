import { useState } from "react";
import API from "../../api/axios";

export default function AddCollection() {

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

const makeSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")     // multiple spaces → single dash
    .replace(/[^\w-]/g, "")  // remove special chars


  const submit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return alert("Enter collection name");

    try {
      setLoading(true);

      const slug = makeSlug(name);

      await API.post(
        "/collections",
        {
          name: name.trim(),
          slug
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("✅ Collection Added");

      setName("");

    } catch (err) {
      console.log("ADD COLLECTION ERROR:", err.response?.data || err);
      alert(err.response?.data?.message || "Collection creation failed");
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="bg-gray-100  flex justify-center pt-16">

    <div className="inline-block bg-white rounded-2xl border border-gray-200 p-6 max-w-md
shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">

      <h2 className="text-3xl font-bold mb-8 text-center">Add Collection</h2>

      <form onSubmit={submit} className="space-y-4">

        <input
          value={name}
          placeholder="Collection Name"
          className="border border-gray-300 bg-white p-3 rounded-xl w-full
          transition focus:outline-none focus:ring-2 focus:ring-black hover:border-black"
          onChange={e => setName(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-xl w-full
          transition transform hover:-translate-y-0.5 hover:bg-gray-900
          disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Saving..." : "Save Collection"}
        </button>

      </form>

    </div>

  </div>
);


}

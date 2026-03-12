import { useState, useEffect } from "react";
import axios from "axios";

import { MdMoreVert } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";

import {
  Plus,
  Home,
  Building2,
  Phone,
  MapPin,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

export default function Address() {
  const emptyForm = {
    _id: null,
    type: "Home",
    name: "",
    address: "",
    phone: "",
    default: false,
  };

  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const token = localStorage.getItem("token");

  // ================= FETCH =================
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get("/api/user/dashboard/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAddresses(res.data.addresses || []);
    } catch (err) {
      console.error(err);
      setAddresses([]);
    }
  };

  // ================= OPEN =================
  const openAdd = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setForm(item);
    setIsEdit(true);
    setShowModal(true);
  };

  // ================= SAVE =================
  const saveAddress = async () => {
    if (!form.name || !form.address || !form.phone) return;

    const url = isEdit
      ? `/api/user/dashboard/addresses/${form._id}`
      : "/api/user/dashboard/addresses";

    const method = isEdit ? "put" : "post";

    await axios[method](url, form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchAddresses();
    setShowModal(false);
  };

  // ================= DELETE =================
  const deleteAddress = async (id) => {
    if (!window.confirm("Delete this address?")) return;

    await axios.delete(`/api/user/dashboard/addresses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchAddresses();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Saved Addresses</h2>
          <p className="text-[1rem] text-gray-500 mt-1">
            Manage your saved delivery addresses
          </p>
        </div>
      </div>
      <div
        onClick={openAdd}
        className="border border-gray-300 rounded-lg px-6 py-4 flex items-center gap-3 text-blue-600 font-semibold cursor-pointer hover:bg-gray-50 transition"
      >
        <Plus size={20} />
        ADD A NEW ADDRESS
      </div>

      <div className="space-y-8">
        {addresses.map((item) => {
          const Icon = item.type === "Office" ? Building2 : Home;

          return (
            <div
              key={item._id}
              // className="border border-gray-300 rounded-lg p-5 flex justify-between items-start hover:bg-gray-50 transition"
              className="relative border border-gray-300 rounded-lg p-5 flex justify-between items-start hover:bg-gray-50 transition"
            >
              <div className="flex flex-col">
                <div className="mb-2">
                  {item.default && (
                    <span className="absolute top-8 left-30 bg-green-300 text-black text-xs px-3 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>

                <div className="max-w-3xl">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-white
                  ${
                    item.type === "Office"
                      ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                      : "bg-gradient-to-br from-emerald-500 to-green-600"
                  }`}
                    >
                      <Icon size={20} />
                    </div>

                    {/* Type Badge */}
                    <span className="text-xs font-semibold bg-gray-100 text-gray-800 px-2 py-1 ml-2 rounded">
                      {item.type.toUpperCase()}
                    </span>
                  </div>

                  {/* Name + Phone */}
                  <div className="mt-2 text-sm font-semibold text-gray-900 flex gap-6">
                    <span className="text-lg font-bold text-gray-700/90">
                      {item.name
                        ?.split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ")}
                    </span>
                  </div>

                  {/* Contact */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="bg-gray-200 p-2 rounded-lg">
                      <Phone size={14} className="text-gray-700 text-lg" />
                    </div>
                    <span className="text-[15px] font-semibold text-gray-700/90">
                      {item.phone}
                    </span>
                  </div>

                  {/* Address */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="bg-gray-200 p-2 rounded-lg">
                      <MapPin size={14} className="text-gray-700 text-lg" />
                    </div>
                    <span className="text-[15px] font-semibold text-gray-700/90">
                      {item.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}

              <div className="relative group">
                {/* Three dots button */}
                <button className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <MdMoreVert size={18} />
                </button>

                {/* Dropdown menu */}
                <div
                  className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg
                    opacity-0 invisible group-hover:visible group-hover:opacity-100
                    transition-all duration-200 z-10"
                >
                  <button
                    onClick={() => openEdit(item)}
                    className="flex items-center gap-3 w-full px-3 py-2 hover:bg-gray-100 transition cursor-pointer"
                  >
                    <FiEdit size={16} />
                    <span>Edit</span>
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => deleteAddress(item._id)}
                    className="flex items-center gap-3 w-full px-3 py-2 text-red-600 hover:bg-gray-100 transition cursor-pointer"
                  >
                    <FiTrash size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 relative shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-semibold mb-5">
              {isEdit ? "Edit Address" : "Add New Address"}
            </h3>

            <div className="space-y-4">
              <select
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option>Home</option>
                <option>Office</option>
              </select>

              <input
                placeholder="Full Name"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <textarea
                rows={3}
                placeholder="Complete Address"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />

              <input
                placeholder="Phone Number"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.default}
                  onChange={(e) =>
                    setForm({ ...form, default: e.target.checked })
                  }
                />
                Set as default address
              </label>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={saveAddress}
                  className="flex-1 bg-black text-white py-3 rounded-xl text-sm cursor-pointer"
                >
                  {isEdit ? "Update Address" : "Save Address"}
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 border rounded-xl py-3 text-sm cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

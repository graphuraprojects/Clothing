import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import API from "../../api/axios";

import {
  FiEdit,
  FiPlus,
  FiX,
  FiLock,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiPackage,
  FiCheckCircle,
  FiTruck,
  FiXCircle,
} from "react-icons/fi";

export default function Profile() {

  const [editOpen, setEditOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const outlet = useOutletContext() || {};
  const user = outlet.user || null;
  const orders = outlet.orders || [];

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    gender: "",
    isTwoFactorEnabled: true,
    role: "user",
    createdAt: ""
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const [cards, setCards] = useState([
    { number: "**** **** **** 4589", expiry: "08/27" },
  ]);

  const [newCard, setNewCard] = useState({ number: "", expiry: "" });

  useEffect(() => {
    if (user) {
      const data = {
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        gender: user.gender || "",
        isTwoFactorEnabled: user.isTwoFactorEnabled ?? true,
        role: user.role || "user",
        createdAt: user.createdAt || ""
      };

      setProfile(data);
      setTempProfile(data);
    }
  }, [user]);

  const totalOrders = orders.length;

  const delivered = orders.filter(o => o?.status === "Delivered").length;

  const inTransit = orders.filter(
    o => o?.status === "Processing" || o?.status === "Shipped"
  ).length;

  const cancelled = orders.filter(o => o?.status === "Cancelled").length;

  const saveProfile = async () => {
    try {
      const res = await API.put("/user/dashboard/profile", tempProfile);

      setProfile({
        name: res.data.user.name || "",
        email: res.data.user.email || "",
        phone: res.data.user.phone || "",
        location: res.data.user.location || "",
        gender: res.data.user.gender || "",
        isTwoFactorEnabled: res.data.user.isTwoFactorEnabled ?? true
      });

      setTempProfile({
        name: res.data.user.name || "",
        email: res.data.user.email || "",
        phone: res.data.user.phone || "",
        location: res.data.user.location || "",
        gender: res.data.user.gender || "",
        isTwoFactorEnabled: res.data.user.isTwoFactorEnabled ?? true
      });

      setEditOpen(false);
    } catch (err) {
      console.log("SAVE ERROR:", err.response?.data || err.message);
    }
  };

  const addCard = () => {
    if (!newCard.number || !newCard.expiry) return;

    setCards([
      ...cards,
      {
        number: "**** **** **** " + newCard.number.slice(-4),
        expiry: newCard.expiry,
      },
    ]);

    setNewCard({ number: "", expiry: "" });
    setCardOpen(false);
  };

  return (

    <div className="max-w-7xl mx-auto space-y-8 px-4 pb-10">

      {/* Hero */}

      <div className="rounded-3xl p-8 bg-gradient-to-r from-[#9E5B08] via-[#C9A749] to-[#E6C878] shadow-lg">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

          <div className="flex items-center gap-5">

            <div className="h-16 w-16 rounded-full bg-black text-white flex justify-center items-center text-2xl font-bold shadow">
              {profile.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Welcome, {profile.name}
              </h2>

              <p className="text-sm text-white/80 font-medium">
                Manage your account & orders
              </p>
            </div>

          </div>

          <button
            onClick={() => {
              setTempProfile(profile);
              setEditOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 bg-black text-white font-semibold hover:bg-gray-800 transition cursor-pointer"

          >

            <FiEdit />
            Edit Profile
          </button>

        </div>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        {[
          {
            label: "Total Orders",
            value: totalOrders,
            icon: FiPackage,
            bg: "bg-blue-50",
            text: "text-blue-600",
          },
          {
            label: "Delivered",
            value: delivered,
            icon: FiCheckCircle,
            bg: "bg-green-50",
            text: "text-green-600",
          },
          {
            label: "In Transit",
            value: inTransit,
            icon: FiTruck,
            bg: "bg-yellow-50",
            text: "text-yellow-600",
          },
          {
            label: "Cancelled",
            value: cancelled,
            icon: FiXCircle,
            bg: "bg-red-50",
            text: "text-red-600",
          },
        ].map((item, i) => (

          <div
            key={i}
            className={`${item.bg} rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300`}
          >

            <div className="flex items-center justify-between mb-4">

              <div className="p-3 bg-white rounded-xl shadow-sm">
                <item.icon className={`${item.text} text-xl`} />
              </div>

              <p className="font-semibold text-gray-700">
                {item.label}
              </p>

            </div>

            <p className={`text-4xl font-bold ${item.text} text-center`}>
              {item.value}
            </p>

          </div>

        ))}

      </div>

      {/* Info + Security */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Personal Information">
          <hr className="text-black" />
          <InfoRow icon={FiUser} label="Full Name" value={profile.name || "Not provided"} />
          <hr className="text-black/20" />
          <InfoRow icon={FiMail} label="Email Address" value={profile.email || "Not provided"} />
          <hr className="text-black/20" />
          <InfoRow icon={FiPhone} label="Phone Number" value={profile.phone || "Not provided"} />
          <hr className="text-black/20" />
          <InfoRow icon={FiMapPin} label="Default Address" value={profile.location || "No address added yet"} />
          <hr className="text-black/20" />
          <InfoRow icon={FiUser} label="Gender" value={profile.gender || "Not specified"} />
          <hr className="text-black/20" />
          <InfoRow icon={FiCheckCircle} label="Account Role" value={profile.role?.toUpperCase() || "USER"} />
          <hr className="text-black/20" />
          <InfoRow icon={FiPackage} label="Member Since" value={profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Recently"} />
          <hr className="text-black/20" />
        </Card>

        <Card title="Account Security">
          <hr className="text-black/20" />
          <button
            onClick={() => setPasswordOpen(true)}
            className="flex items-center gap-2 m-3 px-4 py-2 rounded-lg text-sm font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 transition cursor-pointer"
          >
            <FiLock className="text-base" />
            Change Password
          </button>

          <hr className="text-black/20" />

          <p className={`m-3 flex items-center gap-2 text-sm font-medium ${profile.isTwoFactorEnabled ? "text-green-600" : "text-amber-600"}`}>
            {profile.isTwoFactorEnabled ? (
              <>
                <FiCheckCircle className="text-green-500" />
                Two-Step Verification Enabled
              </>
            ) : (
              <>
                <FiXCircle className="text-amber-500" />
                Two-Step Verification Disabled
              </>
            )}
          </p>
          <hr className="text-black/20" />
        </Card>
      </div>


      <Card title="Saved Payment Methods">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {cards.map((card, i) => (

            <div
              key={i}
              className="relative rounded-2xl p-5 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition duration-300 overflow-hidden"
            >

              {/* Card Chip */}
              <div className="w-10 h-7 bg-yellow-400 rounded-md mb-6 shadow-inner"></div>

              {/* Card Number */}
              <p className="text-lg font-semibold tracking-[0.3em]">
                {card.number}
              </p>

              {/* Bottom Section */}
              <div className="flex justify-between items-end mt-8">

                <div className="text-xs opacity-80 ml-2">
                  <p>Card Holder</p>
                  <p className="text-sm font-medium tracking-wide pl-3">
                    {profile.name || "USER"}
                  </p>
                </div>

                <div className="text-xs opacity-70 mr-2">
                  <p>Expires</p>
                  <p className="text-sm font-medium">
                    {card.expiry}
                  </p>
                </div>

              </div>

              {/* Decorative Gradient */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

            </div>

          ))}

          {/* Add Card */}

          <button
            onClick={() => setCardOpen(true)}
            className="rounded-2xl p-6 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition duration-200 cursor-pointer"
          >

            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
              <FiPlus className="text-lg" />
            </div>

            <span className="text-sm font-medium">
              Add New Card
            </span>

          </button>

        </div>

      </Card>

      {/* Edit Modal */}

      {editOpen && (

        <Modal title="Edit Profile" onClose={() => setEditOpen(false)}>

          <Input
            label="Name"
            value={tempProfile.name}
            onChange={(e) =>
              setTempProfile({ ...tempProfile, name: e.target.value })
            }
          />

          <Input
            label="Email"
            value={tempProfile.email}
            onChange={(e) =>
              setTempProfile({ ...tempProfile, email: e.target.value })
            }
          />

          <Input
            label="Phone"
            value={tempProfile.phone}
            onChange={(e) =>
              setTempProfile({ ...tempProfile, phone: e.target.value })
            }
          />

          <Input
            label="Location"
            value={tempProfile.location}
            onChange={(e) =>
              setTempProfile({ ...tempProfile, location: e.target.value })
            }
          />

          <div className="flex flex-col gap-1">
             <label className="text-sm text-gray-600">Gender</label>
             <select 
               value={tempProfile.gender}
               onChange={(e) => setTempProfile({ ...tempProfile, gender: e.target.value })}
               className="w-full rounded-xl px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-black outline-none text-sm bg-white"
             >
               <option value="">Select Gender</option>
               <option value="Male">Male</option>
               <option value="Female">Female</option>
               <option value="Other">Other</option>
               <option value="Prefer not to say">Prefer not to say</option>
             </select>
          </div>

          <ModalFooter
            onCancel={() => setEditOpen(false)}
            onSave={saveProfile}
          />

        </Modal>

      )}

      {/* Card Modal */}

      {cardOpen && (

        <Modal title="Add New Card" onClose={() => setCardOpen(false)}>

          <Input
            label="Card Number"
            value={newCard.number}
            onChange={(e) =>
              setNewCard({ ...newCard, number: e.target.value })
            }
          />

          <Input
            label="Expiry"
            value={newCard.expiry}
            onChange={(e) =>
              setNewCard({ ...newCard, expiry: e.target.value })
            }
          />

          <ModalFooter
            onCancel={() => setCardOpen(false)}
            onSave={addCard}
          />

        </Modal>

      )}

      {/* Password */}

      {passwordOpen && (

        <Modal title="Change Password" onClose={() => setPasswordOpen(false)}>

          <Input label="Current Password" type="password" />
          <Input label="New Password" type="password" />
          <Input label="Confirm Password" type="password" />

          <ModalFooter
            onCancel={() => setPasswordOpen(false)}
            onSave={() => setPasswordOpen(false)}
          />

        </Modal>

      )}

    </div>
  );
}

/* Card */

const Card = ({ title, children }) => (

  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition duration-300">

    <h3 className="font-bold text-xl text-center underline text-gray-800 mb-5">
      {title}
    </h3>

    {children}

  </div>

);

/* Info Row */
const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition">

    <div className="bg-gray-100 p-2 rounded-lg">
      <Icon className="text-gray-600 text-lg" />
    </div>

    <div className="flex flex-col">
       <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">{label}</span>
       <span className="text-gray-700 text-sm font-medium">
         {value}
       </span>
    </div>

  </div>

);

/* Modal */

const Modal = ({ title, children, onClose }) => (

  <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

    <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl">

      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"

      >

        <FiX />
      </button>

      <h3 className="text-lg font-semibold mb-4">
        {title}
      </h3>

      <div className="space-y-4">
        {children}
      </div>

    </div>

  </div>

);

/* Input */

const Input = ({ label, ...props }) => (

  <div>

    <label className="text-sm text-gray-600">
      {label}
    </label>

    <input
      {...props}
      className="w-full rounded-xl px-3 py-2 mt-1 border border-gray-300 focus:ring-2 focus:ring-black outline-none text-sm"
    />

  </div>

);

/* Modal Footer */

const ModalFooter = ({ onCancel, onSave }) => (

  <div className="flex justify-end gap-3 pt-4">

    <button
      onClick={onCancel}
      className="px-5 py-2 rounded-xl border hover:bg-gray-100 transition cursor-pointer"

    >

      Cancel </button>

    <button
      onClick={onSave}
      className="px-5 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition cursor-pointer"

    >

      Save </button>

  </div>

);
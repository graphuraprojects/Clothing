import Sidebar from "../../components/admin/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import Header from "../../components/admin/Header";
import {
  User,
  Mail,
  Lock,
  Camera,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  Upload,
  Shield,
  Bell,
  Globe,
  Moon,
  Sun,
  Loader2,
} from "lucide-react";

export default function Settings() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState({
    email: false,
    password: false,
    avatar: false,
  });
  const [activeTab, setActiveTab] = useState("profile");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  /* LOAD PROFILE */
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/profile");
      setEmail(res.data.email);
      setAvatar(res.data.avatar);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  /* UPDATE EMAIL */
  const saveEmail = async () => {
    if (!email) {
      alert("Email cannot be empty");
      return;
    }

    try {
      setLoading(true);
      await API.put("/admin/email", { email });
      setSaveSuccess({ ...saveSuccess, email: true });
      setTimeout(() => setSaveSuccess({ ...saveSuccess, email: false }), 3000);
    } catch (err) {
      alert("Email update failed");
    } finally {
      setLoading(false);
    }
  };

  /* UPDATE PASSWORD */
  const savePassword = async () => {
    if (!password) {
      alert("Enter new password");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);
      await API.put("/admin/password", { password });
      setPassword("");
      setConfirmPassword("");
      setSaveSuccess({ ...saveSuccess, password: true });
      setTimeout(
        () => setSaveSuccess({ ...saveSuccess, password: false }),
        3000,
      );
    } catch (err) {
      alert("Password update failed");
    } finally {
      setLoading(false);
    }
  };

  /* UPLOAD AVATAR */
  const uploadAvatar = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    try {
      setLoading(true);
      const form = new FormData();
      form.append("avatar", file);
      const res = await API.put("/admin/avatar", form);
      setAvatar(res.data.avatar);
      setSaveSuccess({ ...saveSuccess, avatar: true });
      setTimeout(() => setSaveSuccess({ ...saveSuccess, avatar: false }), 3000);
    } catch (err) {
      alert("Avatar upload failed");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: Globe },
  ];

  return (
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"
      }`}
    >
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`flex-1 px-4 py-8 max-w-[600px] mx-auto w-full transition-colors duration-300 ${
            darkMode ? "text-white" : ""
          }`}
        >
          {/* Centered Card */}
          <div
            className={`rounded-2xl p-6 md:p-8 ${
              darkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200 shadow-xl"
            }`}
          >
            {/* HEADER WITH DARK MODE TOGGLE */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  Settings
                </p>
                <h1
                  className={`text-2xl font-bold mt-1 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Account Settings
                </h1>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className={`cursor-pointer ${`p-2 rounded-lg transition-all ${
                  darkMode
                    ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}`}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
            </div>

            {/* TABS - Forcefully ek line mein with fixed width buttons */}
            <div className="flex flex-nowrap gap-1 mb-8 overflow-x-auto pb-1">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer ${`flex-shrink-0 px-3 py-2 rounded-lg font-medium transition-all flex items-center gap-1 text-xs sm:text-sm
                    ${
                      activeTab === tab.id
                        ? "bg-black text-white shadow-md"
                        : darkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}`}
                >
                  <tab.icon size={14} />
                  <span className="hidden xs:inline">{tab.label}</span>
                  <span className="xs:hidden">{tab.label.slice(0, 4)}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* IDENTITY CARD */}
                  <div className="text-center">
                    <div className="relative group inline-block">
                      <img
                        src={avatar || "https://i.pravatar.cc/120?u=admin"}
                        className="w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover mx-auto"
                      />
                      <label className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                        <Camera size={24} className="text-white" />
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => uploadAvatar(e.target.files[0])}
                          disabled={loading}
                        />
                      </label>
                    </div>
                    <p
                      className={`text-xs mt-2 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Click to change photo (max 2MB)
                    </p>
                    {saveSuccess.avatar && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-green-500 text-sm flex items-center justify-center gap-1 mt-2"
                      >
                        <CheckCircle size={16} />
                        Photo updated!
                      </motion.div>
                    )}
                  </div>

                  {/* EMAIL FIELD */}
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all
                          focus:outline-none focus:ring-2 focus:ring-black
                          ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300"
                          }`}
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={saveEmail}
                        disabled={loading}
                        className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-900 
                          disabled:opacity-50 transition-all flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <Save size={14} />
                        Save Email
                      </motion.button>

                      {saveSuccess.email && (
                        <span className="text-green-500 text-sm flex items-center gap-1">
                          <CheckCircle size={14} />
                          Saved!
                        </span>
                      )}
                    </div>
                  </div>

                  {/* PASSWORD FIELDS */}
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Change Password
                    </label>

                    {/* New Password */}
                    <div className="relative mb-3">
                      <Lock
                        size={18}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="New password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full pl-10 pr-12 py-3 rounded-xl border transition-all
                          focus:outline-none focus:ring-2 focus:ring-black
                          ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300"
                          }`}
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative mb-3">
                      <Lock
                        size={18}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full pl-10 pr-12 py-3 rounded-xl border transition-all
                          focus:outline-none focus:ring-2 focus:ring-black
                          ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300"
                          }`}
                      />
                      <button
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {password && (
                      <div className="space-y-2 mb-3">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`h-1 flex-1 rounded-full transition-all ${
                                password.length >= level * 2
                                  ? password.length > 6
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                                  : "bg-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p
                          className={`text-xs ${
                            password.length < 8
                              ? "text-red-500"
                              : password.length < 12
                              ? "text-yellow-500"
                              : "text-green-500"
                          }`}
                        >
                          {password.length < 8
                            ? "Weak password (min 8 characters)"
                            : password.length < 12
                            ? "Medium password"
                            : "Strong password"}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={savePassword}
                        disabled={loading}
                        className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-900 
                          disabled:opacity-50 transition-all flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <Lock size={14} />
                        Update Password
                      </motion.button>

                      {saveSuccess.password && (
                        <span className="text-green-500 text-sm flex items-center gap-1">
                          <CheckCircle size={14} />
                          Updated!
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SECURITY TAB */}
              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div
                    className={`p-5 rounded-xl ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <h3
                      className={`font-semibold mb-3 flex items-center gap-2 ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      <Shield size={18} />
                      Two-Factor Authentication
                    </h3>
                    <p
                      className={`text-sm mb-3 ${
                        darkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Add an extra layer of security
                    </p>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={twoFactor}
                        onChange={() => setTwoFactor(!twoFactor)}
                        className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                      />
                      <span
                        className={darkMode ? "text-white" : "text-gray-700"}
                      >
                        Enable 2FA
                      </span>
                    </label>
                  </div>

                  <div
                    className={`p-5 rounded-xl ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <h3
                      className={`font-semibold mb-3 flex items-center gap-2 ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      <Lock size={18} />
                      Active Sessions
                    </h3>
                    <p
                      className={`text-sm mb-3 ${
                        darkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      You're logged in on this device
                    </p>
                    <button className="text-red-500 text-sm hover:text-red-600 cursor-pointer">
                      Log out other devices
                    </button>
                  </div>
                </motion.div>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === "notifications" && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <label
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <div>
                      <p
                        className={`font-medium ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Email Notifications
                      </p>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Receive updates via email
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications}
                      onChange={() => setNotifications(!notifications)}
                      className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                    />
                  </label>

                  <label
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <div>
                      <p
                        className={`font-medium ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Order Updates
                      </p>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Get notified about new orders
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                    />
                  </label>

                  <label
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <div>
                      <p
                        className={`font-medium ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Low Stock Alerts
                      </p>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        When products are running low
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                    />
                  </label>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* LOADING OVERLAY */}
          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-2xl">
                <Loader2 size={20} className="animate-spin text-black" />
                <span className="text-gray-700 text-sm">Saving...</span>
              </div>
            </div>
          )}
        </motion.main>
      </div>
    </div>
  );
}

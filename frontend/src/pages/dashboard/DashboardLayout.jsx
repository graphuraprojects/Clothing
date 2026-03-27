import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import graphura from "../../assets/logo/logoWhite.webp";
import API, { logoutUser } from "../../api/axios";

import {
  FaBars,
  FaTimes,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaUser,
  FaBox,
  FaTruck,
  FaMapMarkerAlt,
  FaFileInvoice,
  FaHome,
} from "react-icons/fa";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const closeSidebar = () => setSidebarOpen(false);


  
  useEffect(() => {
    if (!token) return navigate("/login");

    API.get("/user/dashboard/me")
      .then((res) => {
        console.log("DASHBOARD USER:", res.data);
        setUser(res.data.user);
      })
      .catch((err) => console.log("ME ERROR:", err.response?.data || err));

    //  API.get("/user/dashboard/notifications")
    //   .then(res => setNotifications(res.data.notifications))
    //   .catch(() => setNotifications([]));

    API.get("/user/dashboard/orders/my").then((res) => {
      console.log("ORDERS:", res.data);
      setOrders(res.data);
    });
  }, []);

  const logout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* Overlay (mobile) */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 z-30 md:hidden cursor-pointer"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
         fixed top-0 left-0 z-40
         w-64 h-screen min-h-screen

         bg-[#6B4423] border-r border-[#5A3920] text-white

         transform transition-transform duration-300 ease-in-out

         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

         md:translate-x-0 md:static md:block
        `}
      >
        <div className="flex flex-col h-full overflow-y-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">My Account</h2>

            {/* Close button mobile */}
            <button
              onClick={closeSidebar}
              className="md:hidden text-xl p-2 hover:bg-[#8B5E34] rounded-lg transition cursor-pointer"
            >
              <FaTimes />
            </button>
          </div>

          {/* Links */}

          <nav className="space-y-2 flex-1">
            <SidebarLink
              icon={<FaUser />}
              to="/dashboard/profile"
              title="My Profile"
              close={closeSidebar}
            />

            <SidebarLink
              icon={<FaBox />}
              to="/dashboard/orders"
              title="Orders"
              close={closeSidebar}
            />

            <SidebarLink
              icon={<FaTruck />}
              to="/dashboard/track-order"
              title="Track Order"
              close={closeSidebar}
            />

            <SidebarLink
              icon={<FaMapMarkerAlt />}
              to="/dashboard/address"
              title="Addresses"
              close={closeSidebar}
            />

            <SidebarLink
              icon={<FaFileInvoice />}
              to="/dashboard/invoices"
              title="Invoices"
              close={closeSidebar}
            />
          </nav>

          {/* Logout */}

          <button onClick={logout} className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#5A3920] text-white hover:bg-red-500 hover:text-white transition cursor-pointer">
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}

        {/* Navbar */}

        <header className="bg-[#6B4423] shadow-sm sticky top-0 z-20 px-3 sm:px-4 md:px-6 py-4 md:py-5 text-white">
          <div className="flex items-center justify-between gap-2">
            {/* Left */}

            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              {/* Menu button */}

              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-xl p-2 hover:bg-[#5A3A1F] rounded-lg transition flex-shrink-0 cursor-pointer"
              >
                <FaBars />
              </button>

              {/* Logo */}

              <a href="/" className="flex-shrink-0 ml-1 sm:ml-2 cursor-pointer">
                <img
                  src={graphura}
                  className="h-7 sm:h-8 md:h-10 object-contain cursor-pointer"
                  alt="logo"
                />
              </a>

              {/* Home button */}

              <a
                href="/"
                className="
        hidden sm:flex
        bg-black text-white
        px-3 sm:px-4
        py-1 sm:py-1.5
        rounded-full
        items-center gap-2
        hover:bg-[#3E2723]
        transition
        text-xs sm:text-sm
        whitespace-nowrap
         cursor-pointer"
              >
                <FaHome className="text-xs" />
                Home
              </a>
            </div>

            {/* Right */}

            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              {/* Notification */}

              <div className="relative">
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="flex items-center justify-center hover:bg-[#5A3A1F] p-2 rounded-lg transition relative cursor-pointer"
                >
                  <FaBell className="text-sm sm:text-base" />

                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                    2
                  </span>
                </button>

                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-black rounded-xl shadow-lg">
                    <p className="p-3 border-b font-semibold">Notifications</p>

                    <p className="p-3 text-sm cursor-pointer hover:bg-[#222]">
                      Order shipped
                    </p>

                    <p className="p-3 text-sm border-t cursor-pointer hover:bg-[#222]">
                      Payment successful
                    </p>
                  </div>
                )}
              </div>

              {/* Profile */}

              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 hover:bg-[#5A3A1F] p-1.5 sm:px-2 rounded-lg transition cursor-pointer"
                >
                  <span className="hidden md:block text-sm whitespace-nowrap">
                    Hello, <strong>{user?.name}</strong>
                  </span>

                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-black text-white rounded-full flex items-center justify-center font-semibold cursor-pointer text-sm">
                    A
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white rounded-xl shadow-lg overflow-hidden">
                    <button 
                     onClick={logout}
                      className="w-full px-4 py-3 flex items-center gap-2 text-red-500 hover:bg-red-500 hover:text-white transition cursor-pointer text-sm">
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet context={{ user, orders }} />
        </main>
      </div>
    </div>
  );
};

/* Sidebar Link */

const SidebarLink = ({ to, title, icon, close }) => (
  <NavLink
    to={to}
    onClick={close}
    className={`cursor-pointer ${({ isActive }) =>
      `
      flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition

      ${
        isActive
          ? "bg-black text-white shadow"
          : "text-white hover:bg-[#8B5E34] hover:text-white"
      }
      `}`}
  >
    {icon}
    {title}
  </NavLink>
);

export default DashboardLayout;
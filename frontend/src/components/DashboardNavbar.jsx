import { useState } from "react";
import { Bell, ShoppingBag, User, Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="w-full bg-white border-b sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button className="md:hidden cursor-pointer" onClick={() => setOpenMenu(!openMenu)}>
            <Menu size={22} />
          </button>

          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative">
          {/* ORDERS ICON */}
          <button
            onClick={() => navigate("/dashboard/orders")}
            className="relative hover:text-black text-gray-600 cursor-pointer"
          >
            <ShoppingBag size={20} />
          </button>

          {/* NOTIFICATION */}
          <button className="relative hover:text-black text-gray-600 cursor-pointer">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
              3
            </span>
          </button>

          {/* USER */}
          <div className="relative">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="hidden md:block text-sm">
                Hello, <b>Ashirwad</b>
              </span>
              <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center">
                A
              </div>
            </button>

            {/* DROPDOWN */}
            {openMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg overflow-hidden">
                <button
                  onClick={() => navigate("/dashboard/")}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-sm cursor-pointer"
                >
                  <User size={16} /> My Profile
                </button>

                <button
                  onClick={() => navigate("/dashboard/orders")}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-sm cursor-pointer"
                >
                  <ShoppingBag size={16} /> Orders
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 w-full text-sm cursor-pointer"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;

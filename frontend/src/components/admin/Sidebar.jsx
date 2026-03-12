import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  BarChart2,
  Settings,
  X,
} from "lucide-react";
import graphuraLogo from "../../assets/graphuralogo/graphura.webp";
import { useState,useEffect } from "react";
import API from "../../api/axios";
export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState({});

   useEffect(() => {
    fetchAdmin();
  }, []);

useEffect(() => {
  document.body.style.overflow = open ? "hidden" : "auto";

  return () => {
    document.body.style.overflow = "auto";
  };
}, [open]);




const fetchAdmin = async () => {
  try {
    const token = localStorage.getItem("admin_token");
    console.log("ADMIN TOKEN:", token);

    const res = await API.get("/admin/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setAdmin(res.data);
  } catch (err) {
    console.log("ADMIN ERROR:", err.response?.data);
  }
};


  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Products", icon: Package, path: "/admin/products" },
    { name: "Orders", icon: ShoppingBag, path: "/admin/orders" },
    { name: "Customers", icon: Users, path: "/admin/customers" },
    { name: "Analytics", icon: BarChart2, path: "/admin/analytics" },
    { name: "Inventory", icon: Package, path: "/admin/inventory" },
    { name: "Payments", icon: ShoppingBag, path: "/admin/payments" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="
          lg:hidden
          fixed top-3 left-3 sm:top-4 sm:left-4
          z-50
          bg-white
          p-2 sm:p-2.5
          rounded-xl
          shadow-md
         cursor-pointer"
      >
        ☰
      </button>

      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden cursor-pointer"
        />
      )}

      <aside
        className={`
          fixed lg:sticky
          top-0 left-0
          z-50
          h-screen
          w-64 sm:w-60
          bg-white
          shadow-[4px_0_14px_rgba(0,0,0,0.12)]
          flex flex-col
          px-4 sm:px-6
          py-4 sm:py-6
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <img
            src={graphuraLogo}
            alt="Graphura"
            className="h-9 sm:h-10 cursor-pointer"
            onClick={() => {
              navigate("/admin/dashboard");
              setOpen(false);
            }}
          />
          <X
            className="cursor-pointer"
            size={20}
            onClick={() => setOpen(false)}
          />
        </div>

        {/* Desktop Logo */}
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="hidden lg:flex justify-center mb-6 cursor-pointer"
        >
          <img
            src={graphuraLogo}
            alt="Graphura"
            className="h-14 object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 sm:gap-2 flex-1 mt-2">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`cursor-pointer ${({ isActive }) =>
                  `
                    flex items-center gap-3
                    px-3 sm:px-4
                    py-2.5 sm:py-3
                    rounded-xl
                    font-semibold
                    text-sm sm:text-base
                    transition-all
                    ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                    }
                  `}`}
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="border-t my-4" />

        {/* Settings */}
        <NavLink
          to="/admin/settings"
          onClick={() => setOpen(false)}
          className={`cursor-pointer ${({ isActive }) =>
            `
              flex items-center gap-3
              px-3 sm:px-4
              py-2.5 sm:py-3
              rounded-xl
              font-semibold
              text-sm sm:text-base
              transition-all
              ${
                isActive
                  ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }
            `}`}
        >
          <Settings size={18} />
          Settings
        </NavLink>
      </aside>

      {/* ================= MEDIA QUERY ================= */}
      <style>
        {`
       @media (max-width: 640px) {

  aside {
    width: 230px !important;
    height: 100vh !important;
    min-height: 100vh !important;
    top: 0 !important;
    bottom: 0 !important;
    padding: 16px !important;
  }

  aside nav {
    overflow-y: auto !important;
  }

  aside nav a {
    font-size: 14px !important;
    padding: 10px 12px !important;
  }

  aside img {
    height: 36px !important;
  }

  button {
    top: 12px !important;
    left: 12px !important;
  }
}

        /* TABLET */
        @media (min-width: 641px) and (max-width: 1024px) {
          aside {
            width: 220px !important;
            padding: 20px !important;
          }

          aside nav a {
            font-size: 15px !important;
            padding: 12px 14px !important;
          }

          aside img {
            height: 48px !important;
          }
        }
        `}
      </style>
    </>
  );
}
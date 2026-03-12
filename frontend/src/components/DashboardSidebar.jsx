import { NavLink } from "react-router-dom";

const links = [
  { name: "My Profile", to: "/dashboard" },
  { name: "Orders", to: "/dashboard/orders" },
  { name: "Track Order", to: "/dashboard/track-order" },
  { name: "Addresses", to: "/dashboard/address" },
  { name: "Invoices", to: "/dashboard/invoices" },
];

const DashboardSidebar = () => {
  return (
    <aside className="w-[260px] bg-white border-r min-h-screen px-6 py-8">
      <h2 className="text-2xl font-semibold mb-10">My Account</h2>

      <nav className="space-y-3">
        {links.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            end
            className={`cursor-pointer ${({ isActive }) =>
              `block px-4 py-3 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}`}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* <button className="mt-12 text-red-500 text-sm hover:bg-red-50 px-4 py-2 rounded-lg w-full text-left">
        Logout
      </button> */}
    </aside>
  );
};

export default DashboardSidebar;

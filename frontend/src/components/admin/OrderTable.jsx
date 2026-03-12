
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import API from "../../api/axios";

export default function OrderTable({ orders = [] }) {
  const [search, setSearch] = useState("");

  const safeOrders = Array.isArray(orders) ? orders : [];

  /* ================= STATUS UPDATE ================= */
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/admin/${id}/status`, { status });
      const order = safeOrders.find(o => o._id === id);
      if (order) order.status = status;
    } catch {
      alert("Failed to update status");
    }
  };

  /* ================= SEARCH ================= */
  const filteredOrders = useMemo(() => {
    return safeOrders.filter(
      o =>
        o?._id?.toLowerCase().includes(search.toLowerCase()) ||
        o?.user?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [safeOrders, search]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-gray-200
      p-4 sm:p-6 shadow-md transition-all hover:shadow-xl"
    >
      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Order ID or Customer..."
        className="w-full mb-4 px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl
        transition focus:outline-none focus:ring-2 focus:ring-black hover:border-black text-sm"
      />

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="pb-3">Order ID</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Payment</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order, i) => (
              <motion.tr
                key={order._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="cursor-pointer transition hover:bg-gray-50 border-b last:border-b-0"
              >
                <td className="py-3 font-medium text-blue-600">
                  #{order._id.slice(-6)}
                </td>

                <td>{order.user?.name || "Guest"}</td>

                <td>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "-"}
                </td>

                <td>
                  <PaymentBadge text={order.payment || "PAID"} />
                </td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="border border-gray-300 rounded-xl px-3 py-1 text-sm
                    transition focus:outline-none focus:ring-2 focus:ring-black hover:border-black"
                  >
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Returned</option>
                    <option>Cancelled</option>
                  </select>
                </td>

                <td>₹{order.total}</td>

                <td>
                  <Link
                    to={`/admin/orders/${order._id}`}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    View Order
                  </Link>
                </td>
              </motion.tr>
            ))}

            {filteredOrders.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-400"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-3">
        {filteredOrders.map((order, i) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="border rounded-xl p-4 transition hover:bg-gray-50"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-blue-600 text-sm">
                  #{order._id.slice(-6)}
                </p>
                <p className="text-xs text-gray-500">
                  {order.user?.name || "Guest"}
                </p>
              </div>

              <PaymentBadge text={order.payment || "PAID"} />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-3">
              <span>
                Date:{" "}
                <b className="text-gray-900">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "-"}
                </b>
              </span>

              <span>
                Amount:{" "}
                <b className="text-gray-900">₹{order.total}</b>
              </span>
            </div>

            <div className="flex justify-between items-center mt-3">
              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
                className="border border-gray-300 rounded-xl px-3 py-1 text-xs
                transition focus:outline-none focus:ring-2 focus:ring-black hover:border-black"
              >
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Returned</option>
                <option>Cancelled</option>
              </select>

              <Link
                to={`/admin/orders/${order._id}`}
                className="text-blue-600 text-xs hover:underline cursor-pointer"
              >
                View Order
              </Link>
            </div>
          </motion.div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-6 text-gray-400 text-sm">
            No orders found
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ================= BADGES ================= */


function PaymentBadge({ text }) {
  const color =
    text === "PAID"
      ? "bg-green-100 text-green-700"
      : text === "COD"

      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>

      {text}
    </span>
  );
}


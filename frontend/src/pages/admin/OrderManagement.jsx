import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import { Download, Plus, Package, Clock, Truck, CheckCircle } from "lucide-react";
import OrderTable from "../../components/admin/OrderTable";
import StatsCard from "../../components/admin/StatsCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= FETCH ================= */

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/admin/all");
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("ORDER ERROR:", err);
      setOrders([]);
    }
  };

  /* ================= CSV ================= */

  const safeOrders = Array.isArray(orders) ? orders.filter(Boolean) : [];

  const exportCSV = () => {
    const csv = Papa.unparse(safeOrders);
    const blob = new Blob([csv]);
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
  };

  /* ================= FILTER ================= */

 const filteredOrders = safeOrders.filter(o => {
  const matchesSearch =
    o._id?.toString().toLowerCase().includes(search.toLowerCase()) ||
    o.user?.name?.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    status === "All" || o.status === status;

  return matchesSearch && matchesStatus;
});


const today = new Date().toDateString();
  /* ================= STATS ================= */
const stats = {
    newOrders: safeOrders.filter(o =>
    new Date(o.createdAt).toDateString() === today
  ).length,

  awaiting: safeOrders.filter(o => o?.status === "Processing").length,

  shipped: safeOrders.filter(o => o?.status === "Shipped").length,

  delivered: safeOrders.filter(o => o?.status === "Delivered").length,
};


  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="
            flex-1
            px-3 sm:px-6 lg:px-8
            py-4 sm:py-8
            max-w-[1400px]
            mx-auto
            w-full
          "
        >
          {/* Header */}
          <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-black mb-1">
                Order Management
              </h1>
              <p className="text-gray-500 text-xs sm:text-base">
                Track & manage customer orders
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={() => exportToCSV(ordersData, "orders.csv")}
                className="
                  flex items-center justify-center gap-2
                  bg-white border
                  px-4 sm:px-5 py-2.5 sm:py-3
                  rounded-xl
                  hover:shadow transition
                  w-full sm:w-auto
                  text-sm sm:text-base
                 cursor-pointer"
              >
                <Download size={18} />
                Export CSV
              </button>

              <button
                onClick={() => navigate("/admin/orders/create")}
                className="
                  flex items-center justify-center gap-2
                  bg-black text-white
                  px-4 sm:px-5 py-2.5 sm:py-3
                  rounded-xl
                  hover:opacity-90 transition
                  w-full sm:w-auto
                  text-sm sm:text-base
                 cursor-pointer"
              >
                <Plus size={18} />
                Create Order
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <StatsCard
              title="New orders"
              value="12"
              badge="-2.6%"
              badgeType="down"
              accent="blue"
              icon={<Package size={16} />}
            />

            <StatsCard
              title="Await accepting"
              value={stats.awaiting}
              accent="orange"
              icon={<Clock size={16} />}
            />

            <StatsCard
              title="On way"
              value={stats.shipped}
              accent="yellow"
              icon={<Truck size={16} />}
            />

            <StatsCard
              title="Delivered"
              value={stats.delivered}
              accent="green"
              icon={<CheckCircle size={16} />}
            />
          </div>

          {/* TABLE */}
          <OrderTable orders={filteredOrders} />
          {/* Orders Table */}
          <div className="overflow-x-auto -mx-3 sm:mx-0">
            <div className="min-h-screen flex overflow-x-hidden">
              <OrderTable />
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  );
}

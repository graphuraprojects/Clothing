import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import Sidebar from "../../components/admin/Sidebar";
import ProductTable from "../../components/admin/ProductTable";
import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";
import AddCollection from "./AddCollection";
import DeleteCollection from "./DeleteCollection";
import DeleteCategory from "./DeleteCategory";
import StatsCard from "../../components/admin/StatsCard";
import Header from "../../components/admin/Header";

import API from "../../api/axios";


import {
  IndianRupee,
  PackageX,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function ProductManagement() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [activeTab, setActiveTab] = useState("MANAGE");

  const [products, setProducts] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [categorySales, setCategorySales] = useState([]);

  const [stats, setStats] = useState({
    totalSales: 0,
    outOfStock: 0,
    newArrivals: 0,
    livePercent: 0,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDashboard();
  }, []);

  /* ================= DASHBOARD ================= */

  const fetchDashboard = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const [productsRes, statsRes, revenueRes, categoryRes] =
        await Promise.all([
          API.get("/products", config),
          API.get("/admin/dashboard/stats", config),
          API.get("/admin/dashboard/revenue", config),
          API.get("/admin/dashboard/category-sales", config),
        ]);

      setProducts(productsRes.data?.products || productsRes.data || []);

      setRevenueData(
        revenueRes.data.map((m) => ({
          month:
            [
              "Jan","Feb","Mar","Apr","May","Jun",
              "Jul","Aug","Sep","Oct","Nov","Dec"
            ][m._id - 1],
          revenue: m.revenue,
        }))
      );

      setCategorySales(
        categoryRes.data.map((c) => ({
          category: c._id,
          sales: c.sales,
        }))
      );

      setStats({
        totalSales: statsRes.data.revenue || 0,
        outOfStock: statsRes.data.outOfStock || 0,
        newArrivals: statsRes.data.orders || 0,
        livePercent:
          statsRes.data.liveProducts && statsRes.data.products
            ? Math.round(
                (statsRes.data.liveProducts / statsRes.data.products) * 100
              )
            : 0,
      });
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= CARDS ================= */

  const cards = [
    { title: "TOTAL SALES", value: `₹${stats.totalSales}`, icon: IndianRupee, filter: "ALL" },
    { title: "OUT OF STOCK", value: stats.outOfStock, icon: PackageX, filter: "OUT_OF_STOCK" },
    { title: "NEW ARRIVALS", value: stats.newArrivals, icon: Sparkles, filter: "NEW" },
    { title: "LIVE PRODUCTS", value: `${stats.livePercent}%`, icon: CheckCircle2, filter: "LIVE" },
  ];

  const tabs = [
    "MANAGE",
    "ADD_PRODUCT",
    "ADD_CATEGORY",
    "ADD_COLLECTION",
    "DELETE_COLLECTION",
    "DELETE_CATEGORY",
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-[1500px] mx-auto w-full"
        >
          {/* HEADER */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-black">
              Product Management
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-1">
              Manage your clothing brand products & inventory
            </p>
          </div>

          {/* TABS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex gap-3 mb-8">
  {tabs.map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`cursor-pointer ${`px-4 py-2 rounded-xl border border-gray-200 font-semibold
      text-xs sm:text-sm transition
      ${
        activeTab === tab
          ? "bg-black text-white"
          : "bg-white hover:bg-gray-100"
      }`}`}
    >
      {tab.replace("_", " ")}
    </button>
  ))}
</div>


          {activeTab === "MANAGE" && (
            <>
              {/* STATS */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-10">
                {cards.map((card, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveFilter(card.filter)}
                    className="cursor-pointer"
                  >
                    <StatsCard
                      title={card.title}
                      value={card.value}
                      icon={<card.icon size={16} />}
                    />
                  </div>
                ))}
              </div>

              {/* REVENUE */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 mb-8 sm:mb-10">
                <h2 className="font-bold mb-4 text-sm sm:text-base">
                  Monthly Revenue
                </h2>

                <div className="h-[220px] sm:h-[260px]">
                  <ResponsiveContainer>
                    <LineChart data={revenueData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        dataKey="revenue"
                        stroke="#22c55e"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* CATEGORY SALES */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 mb-8 sm:mb-10">
                <h2 className="font-bold mb-4 text-sm sm:text-base">
                  Category-wise Sales
                </h2>

                <div className="h-[220px] sm:h-[260px]">
                  <ResponsiveContainer>
                    <BarChart data={categorySales}>
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />

                      <defs>
                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#60a5fa" />
                          <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                      </defs>

                      <Bar dataKey="sales" fill="url(#blueGradient)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <ProductTable filter={activeFilter} products={products} />
            </>
          )}

          {activeTab === "ADD_PRODUCT" && <AddProduct refresh={fetchDashboard} />}
          {activeTab === "ADD_CATEGORY" && <AddCategory />}
          {activeTab === "ADD_COLLECTION" && <AddCollection />}
          {activeTab === "DELETE_COLLECTION" && <DeleteCollection />}
          {activeTab === "DELETE_CATEGORY" && <DeleteCategory />}
        </motion.main>
      </div>
    </div>
  );
}

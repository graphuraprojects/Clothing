import { useMemo, useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import { motion, AnimatePresence } from "framer-motion";
import { Download, IndianRupee, RotateCcw, Wallet, Eye, X } from "lucide-react";

import StatsCard from "../../components/admin/StatsCard";
import LineChartBox from "../../components/charts/LineChartBox";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import API from "../../api/axios";
import { exportToCSV } from "../../utils/exportCSV";

/* ===================== HELPERS ===================== */

const pieColors = ["#6366f1", "#22c55e", "#f97316"];

function filterByDate(date, range) {
  if (range === "all") return true;
  const today = new Date();
  const target = new Date(date);
  const diff = (today - target) / (1000 * 60 * 60 * 24);
  return range === "7" ? diff <= 7 : diff <= 30;
}

function getPaymentMethodData(data) {
  if (!data.length) return [];
  const map = {};
  data.forEach((p) => {
    map[p.method] = (map[p.method] || 0) + 1;
  });
  return Object.keys(map).map((k) => ({ name: k, value: map[k] }));
}

/* ===================== PAGE ===================== */

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    netEarnings: 0,
    refundRate: 0,
  });
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [method, setMethod] = useState("all");
  const [status, setStatus] = useState("all");
  const [range, setRange] = useState("7");
  const [activePayment, setActivePayment] = useState(null);

  const monthMap = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    const fetchAdminPayments = async () => {
      try {
        setLoading(true);

        const [paymentsRes, statsRes, chartRes] = await Promise.all([
          API.get("/admin/dashboard/payments"),
          API.get("/admin/dashboard/payments/stats"),
          API.get("/admin/dashboard/payments/revenue-chart"),
        ]);

        setPayments(
          paymentsRes.data.payments.map((p) => ({
            id: p.paymentId,
            customer: p.userName,
            amount: p.amount,
            method: p.method.toUpperCase(),
            status: p.status.charAt(0).toUpperCase() + p.status.slice(1),
            date: p.createdAt,
          })),
        );

        setStats({
          totalRevenue: statsRes.data.totalRevenue,
          netEarnings: Math.round(statsRes.data.totalRevenue * 0.95),
          refundRate: 2.1,
        });

        setRevenueData(
          chartRes.data.map((d) => ({
            month: monthMap[d._id - 1],
            revenue: d.revenue,
          })),
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminPayments();
  }, []);

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchSearch =
        p.customer.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase());
      return (
        matchSearch &&
        (method === "all" || p.method === method) &&
        (status === "all" || p.status === status) &&
        filterByDate(p.date, range)
      );
    });
  }, [payments, search, method, status, range]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        Loading payments...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-y-auto">
        <Header />

        <main className="px-4 sm:px-6 lg:px-10 py-6 space-y-6 max-w-[1400px] mx-auto w-full min-h-0">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold">
                Payments & Revenue
              </h1>
              <p className="text-gray-500">Track transactions & earnings</p>
            </div>

            <button
              onClick={() => exportToCSV(filteredPayments, "payments-report")}
              className="flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-xl w-full sm:w-auto cursor-pointer"
            >
              <Download size={18} /> Export CSV
            </button>
          </div>

          {/* FILTERS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-3">
            <input
              className="border rounded-xl px-4 py-2"
              placeholder="Search payment / customer"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="border rounded-xl px-4 py-2 w-full sm:w-auto"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="all">All Methods</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
              <option value="COD">COD</option>
            </select>

            <select
              className="border rounded-xl px-4 py-2 w-full sm:w-auto"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>

            <select
              className="border rounded-xl px-4 py-2 w-full sm:w-auto"
              value={range}
              onChange={(e) => setRange(e.target.value)}
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <StatsCard
              title="Total Revenue"
              value={`₹${stats.totalRevenue.toLocaleString()}`}
              icon={<IndianRupee size={16} />}
              accent="blue"
            />

            <StatsCard
              title="Refund Rate"
              value={`${stats.refundRate}%`}
              icon={<RotateCcw size={16} />}
              accent="orange"
              badge="2.1%"
              badgeType="down"
            />

            <StatsCard
              title="Net Earnings"
              value={`₹${stats.netEarnings.toLocaleString()}`}
              icon={<Wallet size={16} />}
              accent="green"
              badge="95%"
            />
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <LineChartBox
                title="Revenue Trend"
                data={revenueData}
                xKey="month"
                yKey="revenue"
                height={260}
              />
            </div>

            <div className="bg-white border rounded-2xl p-6">
              <h3 className="font-bold mb-4">Payment Methods</h3>
              <ResponsiveContainer height={220}>
                <PieChart>
                  <Pie
                    data={getPaymentMethodData(filteredPayments)}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                  >
                    {pieColors.map((c, i) => (
                      <Cell key={i} fill={c} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden md:block bg-white rounded-2xl border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left">Payment ID</th>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-center">Amount</th>
                  <th className="p-4 text-center">Method</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-semibold">{p.id}</td>
                    <td className="p-4">{p.customer}</td>
                    <td className="p-4 text-center font-bold">₹{p.amount}</td>
                    <td className="p-4 text-center">{p.method}</td>
                    <td className="p-4 text-center">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setActivePayment(p)}
                        className="inline-flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <Eye size={16} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="md:hidden space-y-3">
            {filteredPayments.map((p) => (
              <div key={p.id} className="bg-white border rounded-xl p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">{p.customer}</p>
                    <p className="text-xs text-gray-500">{p.id}</p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
                <div className="flex justify-between mt-3 text-sm">
                  <span>{p.method}</span>
                  <span className="font-bold">₹{p.amount}</span>
                </div>
                <button
                  onClick={() => setActivePayment(p)}
                  className="mt-3 text-sm font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Eye size={14} /> View Details
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activePayment && (
          <PaymentModal
            payment={activePayment}
            onClose={() => setActivePayment(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ===================== COMPONENTS ===================== */

function StatusBadge({ status }) {
  const map = {
    Success: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Failed: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${map[status]}`}>
      {status}
    </span>
  );
}

function PaymentModal({ payment, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-2xl w-full max-w-md p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Payment Details</h3>
          <button className="cursor-pointer" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <Detail label="Payment ID" value={payment.id} />
          <Detail label="Customer" value={payment.customer} />
          <Detail label="Amount" value={`₹${payment.amount}`} />
          <Detail label="Method" value={payment.method} />
          <Detail label="Status" value={payment.status} />
          <Detail
            label="Date"
            value={new Date(payment.date).toLocaleString()}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

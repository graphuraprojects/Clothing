import { useState, useMemo, useEffect } from "react";
import { Plus, TicketPercent, Filter, ArrowUpDown } from "lucide-react";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";
import CreateCouponModal from "../../components/admin/CreateCouponModal";
import StatsCard from "../../components/admin/StatsCard";
import API from "../../api/axios";

export default function Coupans() {
  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    try {
      const res = await API.get("/coupons");
      setCoupons(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredCoupons = useMemo(() => {
    let data = [...coupons];

    if (statusFilter !== "All") {
      data = data.filter((c) => c.status === statusFilter);
    }

    if (sortBy === "az") data.sort((a, b) => a.code.localeCompare(b.code));
    if (sortBy === "za") data.sort((a, b) => b.code.localeCompare(a.code));
    if (sortBy === "status")
      data.sort((a, b) => a.status.localeCompare(b.status));

    return data;
  }, [coupons, statusFilter, sortBy]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-y-auto">

        <Header />

        <main className="px-4 sm:px-6 lg:px-10 py-6 space-y-6 max-w-[1500px] mx-auto w-full">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Coupons</h1>
              <p className="text-sm text-gray-500">
                Manage and monitor discount campaigns
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl text-sm w-full sm:w-auto cursor-pointer"
            >
              <Plus size={18} />
              Create Coupon
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            <StatsCard title="Total Coupons" value={coupons.length} />
            <StatsCard
              title="Active Coupons"
              value={coupons.filter((c) => c.status === "Active").length}
            />
            <StatsCard
              title="Expired Coupons"
              value={coupons.filter((c) => c.status !== "Active").length}
            />
          </div>

          {/* FILTERS */}
          <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center sm:justify-between">
            <div className="grid grid-cols-2 gap-3 sm:flex">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg text-sm bg-white"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-lg text-sm bg-white"
              >
                <option value="">Sort By</option>
                <option value="az">Code A–Z</option>
                <option value="za">Code Z–A</option>
                <option value="status">Status</option>
              </select>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-gray-500 text-sm">
              <Filter size={16} />
              <ArrowUpDown size={16} />
            </div>
          </div>

          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block bg-white border rounded-2xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left">Coupon Code</th>
                  <th className="px-6 py-4 text-left">Type</th>
                  <th className="px-6 py-4 text-left">Validity</th>
                  <th className="px-6 py-4 text-left">Usage</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredCoupons.map((c) => (
                  <tr key={c._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center gap-3 font-medium">
                      <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <TicketPercent size={16} />
                      </span>
                      {c.code}
                    </td>
                    <td className="px-6 py-4">{c.type}</td>
                    <td className="px-6 py-4 text-gray-500">{c.validity}</td>
                    <td className="px-6 py-4">{c.usage}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          c.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={async () => {
                          const val = prompt(
                            "Enter new discount value",
                            c.discountValue
                          );
                          if (!val) return;
                          await API.put(`/coupons/${c._id}`, {
                            discountValue: Number(val),
                          });
                          loadCoupons();
                        }}
                        className="px-3 py-1.5 border rounded-lg cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        onClick={async () => {
                          await API.put(`/coupons/disable/${c._id}`);
                          loadCoupons();
                        }}
                        className="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg cursor-pointer"
                      >
                        Disable
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE CARDS ================= */}
          <div className="md:hidden space-y-3">
            {filteredCoupons.map((c) => (
              <div
                key={c._id}
                className="bg-white border rounded-xl p-4 transition active:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold flex items-center gap-2">
                      <TicketPercent size={14} className="text-blue-600" />
                      {c.code}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {c.type} • {c.validity}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      c.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-3">
                  Usage: <b>{c.usage}</b>
                </p>

                <div className="flex justify-end gap-3 mt-4 text-sm">
                  <button
                    onClick={async () => {
                      const val = prompt(
                        "Enter new discount value",
                        c.discountValue
                      );
                      if (!val) return;
                      await API.put(`/coupons/${c._id}`, {
                        discountValue: Number(val),
                      });
                      loadCoupons();
                    }}
                    className="px-3 py-1.5 border rounded-lg cursor-pointer"
                  >
                    Edit
                  </button>

                  <button
                    onClick={async () => {
                      await API.put(`/coupons/disable/${c._id}`);
                      loadCoupons();
                    }}
                    className="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg cursor-pointer"
                  >
                    Disable
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <CreateCouponModal
        open={open}
        onClose={() => setOpen(false)}
        refresh={loadCoupons}
      />
    </div>
  );
}

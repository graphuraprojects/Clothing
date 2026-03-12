import { useEffect, useState } from "react";
import { FaDownload, FaFileInvoice } from "react-icons/fa";
import API from "../../api/axios";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const token = localStorage.getItem("token");

  // ================= FETCH INVOICES =================
  const fetchInvoices = async () => {
    try {
      const res = await API.get(
        "/api/user/dashboard/invoices",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("INVOICES:", res.data);

      setInvoices(res.data.invoices || []);
    } catch (err) {
      console.error("INVOICE ERROR:", err.response?.data || err);
      setInvoices([]);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // ================= DOWNLOAD PDF =================
  const handleDownload = async (id) => {
    try {
      const res = await API.get(
        `/user/dashboard/invoices/${id}/download`,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([res.data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Invoice download failed");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <p className="text-sm text-gray-600">
          Download your GST invoices for completed orders
        </p>
      </div>

      {/* Invoices List */}
      <div className="grid gap-5">
        {invoices.map((invoice) => (
          <div
            key={invoice._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center">
                <FaFileInvoice />
              </div>

              <div>
                <p className="font-semibold text-gray-900">{invoice.id}</p>
                <p className="text-xs text-gray-500">
                  Order: {invoice.orderId}
                </p>
                <p className="text-xs text-gray-500">Date: {invoice.date}</p>
              </div>
            </div>

            {/* Amount */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                {invoice.status}
              </span>
              <p className="text-lg font-bold text-gray-900">
                ₹{invoice.amount}
              </p>
            </div>

            {/* DOWNLOAD BUTTON */}
            <button
              onClick={() => handleDownload(invoice.file, invoice.id)}
              className="
    group inline-flex items-center justify-center gap-2
    px-5 py-2.5 rounded-xl text-sm font-semibold
    bg-gradient-to-r from-black to-gray-800 text-white
    shadow-md
    transition-all duration-300 ease-out

    hover:from-gray-800 hover:to-black
    hover:shadow-xl hover:scale-[1.05]
    active:scale-[0.97]
    focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
   cursor-pointer"
            >
              <FaDownload
                className="
      transition-transform duration-300
      group-hover:translate-y-[2px]
    "
              />
              Download
            </button>
          </div>
        ))}

        {invoices.length === 0 && (
          <p className="text-center text-gray-400">No invoices found</p>
        )}
      </div>
    </div>
  );
};

export default Invoices;

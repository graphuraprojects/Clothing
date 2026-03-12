import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import Sidebar from "../../components/admin/Sidebar";
import { motion } from "framer-motion";
import { FaArrowLeft, FaLock } from "react-icons/fa";

const AdminOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  const statusStyle = {
    Delivered: "bg-green-100 text-green-700",
    Shipped: "bg-blue-100 text-blue-700",
    Cancelled: "bg-red-100 text-red-600",
    Returned: "bg-orange-100 text-orange-600",
    Processing: "bg-yellow-100 text-yellow-700",
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await API.get(`/orders/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });

      setOrder(res.data.order);
      setStatus(res.data.order.status);
    } catch (err) {
      console.error("Admin order fetch error:", err);
    }
  };

  if (!order) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 px-4 py-8"
      >
        <div className="max-w-lg mx-auto space-y-5">

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
            bg-white border shadow-sm text-sm font-semibold text-gray-700
            hover:bg-black hover:text-white transition cursor-pointer"
          >
            <FaArrowLeft /> Back to Orders
     
          </button>
        </div>
          {/* CARD */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

            {/* Header */}
            <div className="p-5 border-b flex justify-between items-start">
              <div>
                <p className="text-base font-bold text-gray-900">
                  Order #{order._id.slice(-6)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  statusStyle[status]
                }`}
              >
                {status}
              </span>
            </div>

            {/* ITEMS */}
            <div className="p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800">
                Item Details
              </h3>

              {order.items.map((item) => (
                <div key={item._id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-xl border object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Size: {item.size} • Color: {item.color} • Qty:{" "}
                      {item.quantity}
                    </p>
                    <p className="text-lg font-bold mt-2">
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* PRICE */}
            <div className="px-5 py-4 border-t text-sm space-y-2 bg-gray-50">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{order.shippingCost}</span>
              </div>
              <div className="flex justify-between">
                <span>GST</span>
                <span>₹{order.gst}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="p-5 border-t">
              <h3 className="text-sm font-semibold mb-2">
                Delivery Address
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {order.shipping.fullName}
                <br />
                {order.shipping.address}
                <br />
                {order.shipping.city}, {order.shipping.state} –{" "}
                {order.shipping.zip}
                <br />
                India
              </p>
            </div>

            {/* PAYMENT */}
            <div className="p-5 border-t bg-gray-50">
              <div className="flex items-start gap-3">
                <FaLock className="text-gray-500 mt-1" />
                <div>
                  <h3 className="text-sm font-semibold">
                    Payment Method
                  </h3>
                  <p className="text-xs text-gray-600">
                    {order.paymentMethod.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6 min-w-0">
              <div className="bg-white rounded-xl border p-4 md:p-6">
                <h3 className="font-semibold mb-4">Order Timeline</h3>

                <div className="space-y-4 text-sm">
                  {[
                    { label: "Order Placed", Icon: CheckCircle },
                    { label: "Payment Confirmed", Icon: CheckCircle },
                    { label: "Packed", Icon: Package },
                    { label: "Dispatched", Icon: Truck },
                  ].map(({ label, Icon }, index) => (
                    <div key={index} className="flex gap-3">
                      <Icon size={18} className="text-blue-600" />
                      <div>
                        <p className="font-semibold">{label}</p>
                        <p className="text-xs text-slate-400">Dec 24, 2025</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border p-4 md:p-6">
                <h3 className="font-semibold mb-4">Internal Admin Notes</h3>

                <textarea
                  className="w-full h-24 border rounded-lg p-3 text-sm"
                  placeholder="Add a private note..."
                />

                <button className="mt-3 w-full h-9 bg-black text-white rounded-lg text-sm cursor-pointer">
                  Post Note
                </button>
              </div>
            </div>
          </div>
        </motion.main>
      </div>
    
  );
}
 export default AdminOrderDetail; 
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import {
  FaCheckCircle,
  FaBox,
  FaTruck,
  FaMapMarkerAlt,
  FaHome,
  FaPhoneAlt,
  FaUser,
  FaMoneyBillWave,
  FaMapMarkedAlt,
} from "react-icons/fa";

export default function TrackOrder() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (orderId) fetchSingleOrder();
    else fetchAllOrders();
  }, [orderId]);

  const fetchAllOrders = async () => {
    try {
      const res = await API.get("/user/dashboard/orders/my");
      setOrders(Array.isArray(res.data) ? res.data : []);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleOrder = async () => {
    try {
      const res = await API.get(`/user/dashboard/orders/${orderId}`);
      setOrder(res.data.order || res.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  /* ================= LIST MODE ================= */

  if (!orderId) {
  return (
  <div className="bg-white rounded-3xl shadow-xl p-8 space-y-8">

    {/* HEADER */}
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-md">
        <FaTruck />
      </div>

      <h2 className="text-2xl font-bold text-gray-900">
        Track Your Orders
      </h2>
    </div>

    {/* ORDERS */}
    <div className="space-y-6">

      {orders.map((o) => (
        <div
          key={o._id}
          className="bg-gray-50 rounded-2xl p-6 border border-gray-200
          transition-all duration-300 hover:shadow-lg hover:bg-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">

            {/* LEFT */}
            <div>
              <p className="text-lg font-semibold text-gray-900">
                Order #{o._id.slice(-6)}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {new Date(o.createdAt).toLocaleDateString()}
              </p>

              <p className="font-bold mt-2">₹{o.total}</p>
            </div>

            {/* CENTER */}
            <div className="text-sm text-gray-600 space-y-1">

              {/* <p>
                <span className="font-medium text-gray-800">Product:</span>{" "}
                {o.items?.map((item, i) => (
                  <span key={i} className="block">
                    {item.name}
                  </span>
                ))}
              </p> */}

              <p>
                <span className="font-medium text-gray-800">Items:</span>{" "}
                {o.items?.length || 0}
              </p>

              <p>
                <span className="font-medium text-gray-800">Payment:</span>{" "}
                {o.paymentMethod || "Online"}
              </p>

              <p>
                <span className="font-medium text-gray-800">Deliver to:</span>{" "}
                {o.shipping?.city || o.shipping?.address || "—"}
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex lg:justify-end">
              <button
                onClick={() =>
                  navigate(`/user/dashboard/track-order/${o._id}`)
                }
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white
                bg-black transition-all duration-300
                hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                Track →
              </button>
            </div>

          </div>
        </div>
      ))}

    </div>
  </div>
);

}


  if (!order) return <p>Order not found.</p>;

  const steps = [
    { label: "Order Confirmed", done: true, icon: <FaCheckCircle /> },
    { label: "Packed", done: order.status !== "Pending", icon: <FaBox /> },
    {
      label: "Shipped",
      done: ["Shipped", "OutForDelivery", "Delivered"].includes(order.status),
      icon: <FaTruck />,
    },
    {
      label: "Out for Delivery",
      current: order.status === "OutForDelivery",
      icon: <FaMapMarkerAlt />,
    },
    {
      label: "Delivered",
      done: order.status === "Delivered",
      icon: <FaHome />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <h2 className="text-2xl font-bold">Track Your Order</h2>
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
          <span>
            Order ID: <b>#{order._id.slice(-6)}</b>
          </span>
          <span>
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

     <div
  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200
  transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
>
  <div className="text-sm text-gray-600 space-y-2">

    <p>
      <span className="font-medium text-gray-800">Items:</span>{" "}
      {order.items?.length || 0}
    </p>

    <p>
      <span className="font-medium text-gray-800">Payment:</span>{" "}
      {order.paymentMethod || "Online"}
    </p>

    <p>
      <span className="font-medium text-gray-800">Deliver to:</span>{" "}
      {order.shipping?.city || order.shipping?.address || "—"}
    </p>

  </div>
</div>


      {/* Order Status */}
      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
        <h3 className="font-semibold text-lg mb-6">Order Status</h3>

        <div className="relative">
          <div className="absolute left-[28px] top-0 bottom-0 w-[2px] bg-gray-200" />

          <div className="space-y-10">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-5 group">
                {/* Icon */}
                <div
                  className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center
                  transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl
                  ${
                    step.current
                      ? "bg-blue-600 text-white ring-4 ring-blue-200"
                      : step.done
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {step.icon}
                </div>

                {/* Text */}
                <div className="pt-1">
                  <p
                    className={`font-semibold ${step.current ? "text-blue-600" : "text-gray-900"}`}
                  >
                    {step.label}
                  </p>
                  <p className="text-sm text-gray-500">{step.date}</p>

                  {step.current && (
                    <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full shadow-sm">
                      Current Status
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Address */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <FaMapMarkedAlt className="text-blue-600" /> Delivery Address
          </h4>

          <div className="space-y-2 text-sm text-gray-700">
            <p className="font-medium flex items-center gap-2">
              <FaUser /> {order.shipping?.fullName}
            </p>
            <p>{order.shipping?.address}</p>
            <p>
              {order.shipping?.city}, {order.shipping?.state}
            </p>
            <p>{order.shipping?.zip}</p>
            <p>{order.shipping?.phone}</p>
          </div>
        </div>

        {/* Courier */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <h4 className="font-semibold mb-1">Courier Partner</h4>
          <p className="font-medium">{order.courier}</p>
          <p className="text-xs text-gray-500">
            Tracking ID: {order.trackingId}
          </p>

          <div className="mt-4 pt-4 border-t text-sm flex items-center gap-2">
            <FaMoneyBillWave className="text-green-600" />
            Payment: <b>{order.payment}</b>
          </div>
        </div>

        {/* Contact/Help */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-700 text-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer">
          <div>
            <h4 className="font-semibold text-lg">Need Help?</h4>
            <p className="text-sm opacity-90 mt-1">
              Contact our support team for delivery issues
            </p>
          </div>

          <button
            className="mt-5 bg-white text-green-700 font-semibold px-5 py-3 rounded-full
            flex items-center justify-center gap-2
            hover:scale-105 hover:shadow-lg transition cursor-pointer"
          >
            <FaPhoneAlt /> Contact Support
          </button>
        </div>
      </div>

      {/* Ordered Items */}
      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
        <h3 className="font-semibold text-lg mb-4">Ordered Items</h3>

        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-5 p-4 rounded-xl bg-gray-50
            hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded-xl object-cover shadow-md"
            />

            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                Qty: {item.qty} • Status:{" "}
                <span className="text-blue-600 font-medium">{item.status}</span>
              </p>
            </div>

            <div className="text-right space-y-2">
              <p className="font-bold text-lg">₹{item.price}</p>
              <button
                onClick={() => navigate(`/order-details/${order.id}`)}
                className="px-5 py-2 text-sm rounded-lg border border-black text-black
                hover:bg-black hover:text-white hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

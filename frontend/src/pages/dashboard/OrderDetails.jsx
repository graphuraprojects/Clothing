import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaArrowLeft,
  FaLock,
  FaUndo,
  FaTimesCircle,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id: orderId } = useParams();
  const token = localStorage.getItem("token");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const statusStyle = {
    Delivered: "bg-green-100 text-green-700",
    Shipped: "bg-blue-100 text-blue-700",
    Cancelled: "bg-red-100 text-red-600",
    Returned: "bg-orange-100 text-orange-600",
    Refunded: "bg-gray-200 text-gray-600",
    Processing: "bg-yellow-100 text-yellow-700",
  };

  /* ================= FETCH ORDER ================= */

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `/api/user/dashboard/orders/${orderId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setOrder(res.data.order || res.data);
      } catch (error) {
        console.error("Fetch order error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!order) return <div className="text-center py-10">Order not found</div>;

  /* ================= ACTION HANDLERS ================= */

  const handleCancel = async () => {
    try {
      if (order.paymentMethod === "cod") {
        await axios.put(
          `/api/orders/${order._id}/cancel`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setOrder({ ...order, status: "Cancelled" });
      } else {
        navigate(
          `/user/dashboard/refund-request/${order._id}?type=cancel`
        );
      }
    } catch (error) {
      console.error("Cancel error:", error);
      alert("Unable to cancel order");
    }
  };

  const handleReturn = async () => {
    try {
      if (order.paymentMethod === "cod") {
        await axios.put(
          `/api/orders/${order._id}/return`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setOrder({ ...order, status: "Returned" });
      } else {
        navigate(
          `/user/dashboard/refund-request/${order._id}?type=return`
        );
      }
    } catch (error) {
      console.error("Return error:", error);
      alert("Unable to return order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-lg mx-auto space-y-5">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
          bg-white border shadow-sm text-sm font-semibold text-gray-700
          hover:bg-black hover:text-white transition cursor-pointer"
        >
          <FaArrowLeft />
          Back to Orders
        </button>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* HEADER */}
          <div className="p-5 border-b flex justify-between items-start">
            <div>
              <p className="text-base font-bold text-gray-900">
                Order #{order._id}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>

            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                statusStyle[order.status] || ""
              }`}
            >
              {order.status}
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
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="w-24 h-24 rounded-xl border object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {item.name}
                  </p>

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

          {/* PRICE DETAILS */}
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

            {order.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{order.discount}</span>
              </div>
            )}

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
              {order.shipping.fullName} <br />
              {order.shipping.address} <br />
              {order.shipping.city}, {order.shipping.state} –{" "}
              {order.shipping.zip} <br />
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
                  {order.paymentMethod?.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="p-5 border-t space-y-3">

            {order.status === "Processing" && (
              <button
                onClick={handleCancel}
                className="w-full py-3 rounded-xl border border-red-500 text-red-600 font-semibold hover:bg-red-50 transition cursor-pointer"
              >
                <FaTimesCircle className="inline mr-2" />
                Cancel Order
              </button>
            )}

            {order.status === "Delivered" && (
              <button
                onClick={handleReturn}
                className="w-full py-3 rounded-xl border border-orange-500 text-orange-600 font-semibold hover:bg-orange-50 transition cursor-pointer"
              >
                <FaUndo className="inline mr-2" />
                Return Order
              </button>
            )}

            {(order.status === "Returned" ||
              order.status === "Cancelled") && (
              <button
                disabled
                className="w-full py-3 rounded-xl bg-gray-100 text-gray-400 font-semibold cursor-pointer"
              >
                Action Completed
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

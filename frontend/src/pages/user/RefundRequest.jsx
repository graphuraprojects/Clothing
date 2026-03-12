import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";

const RefundRequest = () => {
  const { orderId } = useParams();
  const [params] = useSearchParams();
  const type = params.get("type"); // cancel | return
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    ifsc: "",
    upi: "",
  });

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await API.get(`/user/dashboard/orders/${orderId}`);
      setOrder(res.data.order || res.data);
    } catch (error) {
      console.error("Fetch order error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setBankDetails({
      ...bankDetails,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post(`/refunds/${orderId}`, {
        type,
        bankDetails,
      });

      alert("Refund request submitted successfully");
      navigate("/user/dashboard/orders/my");
    } catch (error) {
      console.error("Refund request error:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-500">Loading...</p>;
  }

  if (!order) {
    return <p className="p-6 text-red-500">Order not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          {type === "cancel" ? "Cancel Order" : "Return Order"} – Refund Details
        </h2>

        {/* Order Info */}
        <div className="mb-4 text-sm text-gray-700 space-y-1">
          <p><b>Order ID:</b> {order._id}</p>
          <p><b>Name:</b> {order.shipping?.fullName}</p>
          <p><b>Phone:</b> {order.shipping?.phone}</p>
          <p><b>Payment:</b> {order.paymentMethod.toUpperCase()}</p>
        </div>

        {/* Items */}
        <div className="mb-4">
          <p className="font-semibold mb-2">Items</p>
          <ul className="text-sm text-gray-600 list-disc ml-5">
            {order.items.map((item) => (
              <li key={item._id}>
                {item.name} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>

        {/* Bank Details Form */}
        <form onSubmit={submitHandler} className="space-y-3">

          <input
            name="bankName"
            placeholder="Bank Name"
            required
            value={bankDetails.bankName}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="accountHolder"
            placeholder="Account Holder Name"
            required
            value={bankDetails.accountHolder}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="accountNumber"
            placeholder="Account Number"
            required
            value={bankDetails.accountNumber}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="ifsc"
            placeholder="IFSC Code"
            required
            value={bankDetails.ifsc}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="upi"
            placeholder="UPI ID (optional)"
            value={bankDetails.upi}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          <button
            type="submit"
            className="w-full bg-[#8b6f47] text-white py-3 rounded-xl font-semibold hover:bg-[#7a6140] transition cursor-pointer"
          >
            Submit Refund Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RefundRequest;

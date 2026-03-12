import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { address, div } from "framer-motion/client";

export default function OrderHistory() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!token) return navigate("/user/login");

    const fetchOrders = () => {
      axios
        .get("/api/user/dashboard/orders/my", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setOrders(res.data || []))
        .catch(() => setOrders([]));
    };

    fetchOrders();

    const interval = setInterval(fetchOrders, 5000); // refresh every 5 sec

    return () => clearInterval(interval);
  }, []);


  const statusStyle = {
    Delivered: "bg-green-500/20 text-green-400",
    Shipped: "bg-blue-500/20 text-blue-400",
    Cancelled: "bg-red-500/20 text-red-400",
    Processing: "bg-yellow-500/20 text-yellow-400",
  };

  return (
    <div className="min-h-screen bg-white p-10 text-black">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-sm text-gray-500">Return or view your order history</p>
      </div>

      {/* ORDER */}
      <div className=" grid md:grid-cols-2 gap-8">

        {orders.map((order) => (

          <motion.div
            key={order._id}

            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}

            whileHover={{
              rotateX: 6,
              rotateY: -6,
              scale: 1.03,
            }}

            transition={{ type: "spring", stiffness: 120 }}

            className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800
            border border-gray-700 shadow-xl cursor-pointer"
          >

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl"></div>

            <div className="relative z-10">

              {/* HEADER */}
              <div className="flex justify-between items-center">

                <div className="flex items-center gap-3">

                  <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600">
                    <Package size={18} />
                  </div>

                  <div>
                    <p className="font-bold text-xl text-white/90">
                      Order #{order._id.slice(-6)}
                    </p>

                    <p className="text-xs font-bold text-gray-300">
                      Placed on:
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </p>
                  </div>

                </div>

                <span
                  className={`text-sm px-4 py-2 rounded-full font-semibold
                  ${statusStyle[order.status] ||
                    'bg-gray-100 text-gray-600 border'
                    }`}
                >
                  {order.status}
                </span>

              </div>


              {/* PRODUCT DETAILS */}
              <div className="flex flex-col md:flex-row gap-3 mt-6 text-white/80 text-sm font-bold">

                <p>
                  <span>
                    Items:
                  </span>
                  {order.items?.length || 0}
                </p>

                <p>
                  <span>Payment:</span>
                  {order.paymentMethod || 'Online'}
                </p>

                <p>
                  <span>Deliver to:</span> {' '}
                  {order.shipping?.city || order.shipping?.address || '-'}
                </p>

              </div>


              {/* DELIVERY PROGRESS */}
              <div className="mt-6">

                <div className="flex justify-between text-xs mb-2 text-gray-400">
                  <span>Order Progress</span>
                  <span>{order.progress}%</span>
                </div>

                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${order.progress}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  />

                </div>

              </div>


              {/* FOOTER */}
              <div className="flex justify-between items-center mt-6">

                <p className="text-xl font-bold">
                  ₹{order.total}
                </p>

                <motion.button
                  onClick={() =>
                    navigate(`/user/dashboard/orders/${order._id}`)
                  }
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-sm font-semibold cursor-pointer"
                >
                  View Details →
                </motion.button>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

      {
        orders.length === 0 && (
          <div className="flex flex-col mt-5">
            <div className="text-center text-2xl font-semibold text-gray-500">No Orders Found</div>
            <button className="cursor-pointer"
            onClick={() => 
              navigate('/')
            }
            >
              Shop Here
            </button>
          </div>
        )
      }

    </div>
  );
};
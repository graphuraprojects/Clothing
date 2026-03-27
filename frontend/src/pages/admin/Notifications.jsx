import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";
// import { Rss } from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      console.log("Notifications - Fetching notifications...");
      const res = await API.get("/admin/notifications");
      console.log("Notifications - Fetch Success:", res.data);
      setNotifications(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Notifications - Error fetching notifications:", error.response?.data || error);
    }
  };

  const openNotification = async (notification) => {
    try {
      console.log("Notifications - Opening notification ID:", notification._id);
      // mark notification as read
      await API.put(`/admin/notifications/${notification._id}/read`);

      // optional: update UI immediately
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notification._id ? { ...n, read: true } : n
        )
      );

      console.log("Notifications - Marked as read successfully");
      // navigate to refund requests page
      navigate("/admin/refund-requests");
    } catch (error) {
      console.error("Notifications - Error opening notification:", error.response?.data || error);
    }
  };

return (
  <div className="flex bg-gray-50 min-h-screen">
    {/* Sidebar */}
    <Sidebar />

    {/* Main */}
    <div className="flex-1">
      <Header />

      <main className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold">Notifications</h1>

          {notifications.length > 0 && (
            <span className="text-sm text-gray-500">
              {notifications.filter(n => !n.read).length} unread
            </span>
          )}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="text-5xl mb-3">🔔</div>
            <p className="font-semibold">You’re all caught up</p>
            <p className="text-sm">No new notifications</p>
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n._id}
              onClick={() => openNotification(n)}
              className={`group relative p-5 rounded-2xl border cursor-pointer transition-all
                ${
                  n.read
                    ? "bg-gray-50 border-gray-200"
                    : "bg-white border-gray-200 shadow-md hover:shadow-lg"
                }`}
            >
              {/* Unread dot */}
              {!n.read && (
                <span className="absolute top-4 right-4 h-2.5 w-2.5 rounded-full bg-indigo-500" />
              )}

              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`flex items-center justify-center h-10 w-10 rounded-full
                    ${
                      n.read
                        ? "bg-gray-200 text-gray-500"
                        : "bg-indigo-100 text-indigo-600"
                    }`}
                >
                  🔔
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    {n.title}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {n.message}
                  </p>

                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                    <span>
                      {new Date(n.createdAt).toLocaleString()}
                    </span>

                    {!n.read && (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600 font-medium">
                        New
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  </div>
);


};

export default Notifications;

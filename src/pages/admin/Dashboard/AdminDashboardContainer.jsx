import { useState, useEffect } from "react";
import AdminDashboardView from "./AdminDashboardView";
import axiosInstance from "../../../services/axiosInstance";

// ============ MOCK DATA ============
const mockStats = {
  totalUsers: { value: 12847, growth: 12.5 },
  totalBooks: { value: 45231, active: 42300, pending: 2931 },
  activeReaders: { value: 1247 },
  totalRevenue: { value: 847239 },
};

// const userTrendData = [
//   { day: "Day 1", users: 120 },
//   { day: "Day 5", users: 145 },
//   { day: "Day 10", users: 180 },
//   { day: "Day 15", users: 220 },
//   { day: "Day 20", users: 280 },
//   { day: "Day 25", users: 340 },
//   { day: "Day 30", users: 420 },
// ];

const genreData = [
  { name: "Fiction", value: 35 },
  { name: "Technology", value: 25 },
  { name: "Sci-Fi", value: 20 },
  { name: "Business", value: 12 },
  { name: "History", value: 8 },
];

const salesData = [
  { day: "Mon", revenue: 2400 },
  { day: "Tue", revenue: 3200 },
  { day: "Wed", revenue: 2800 },
  { day: "Thu", revenue: 4100 },
  { day: "Fri", revenue: 3800 },
  { day: "Sat", revenue: 5200 },
  { day: "Sun", revenue: 4600 },
];

const topReadBooks = [
  { title: "Atomic Habits", reads: 4520 },
  { title: "The Psychology of Money", reads: 3890 },
  { title: "Deep Work", reads: 3240 },
  { title: "Sapiens", reads: 2980 },
  { title: "Thinking, Fast and Slow", reads: 2650 },
];

const topEarningBooks = [
  { title: "Atomic Habits", revenue: 45200 },
  { title: "The 48 Laws of Power", revenue: 38400 },
  { title: "Rich Dad Poor Dad", revenue: 32100 },
  { title: "Clean Code", revenue: 28900 },
  { title: "Zero to One", revenue: 24500 },
];

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ec4899", "#3b82f6"];
const CHART_THEME = {
  primary: "#6366f1",
  secondary: "#10b981",
  accent: "#f59e0b",
  grid: "#e2e8f0",
  text: "#64748b",
};

const AdminDashboardContainer = () => {
  const [loading, setLoading] = useState(true);
  // const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(mockStats);
  const [userTrend, setUserTrend] = useState([]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/user");
      const users = res.data.data || [];

      const totalUsers = users.length;
      const activeUsers = users.filter((user) => user.isActive).length;

      // ✅ stats update
      setStats((prev) => ({
        ...prev,
        totalUsers: {
          value: totalUsers,
          growth: 12.5,
        },
        activeReaders: {
          value: activeUsers,
        },
      }));

      // ✅ chart data (NEW)
      const last7Users = users.slice(-7);

      const trend = last7Users.map((user, index) => ({
        day: `Day ${index + 1}`,
        users: (index + 1) * 20,
      }));

      setUserTrend(trend);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await axiosInstance.get("/books/all");

      const booksList = res.data.data?.books || [];

      const totalBooks = booksList.length;

      // ✅ Only update totalBooks number
      setStats((prev) => ({
        ...prev,
        totalBooks: {
          ...prev.totalBooks,
          value: totalBooks,
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchUsers(); // ✅ call API
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const dashboardData = {
    stats: stats,
    userTrendData: userTrend,
    genreData,
    salesData,
    topReadBooks,
    topEarningBooks,
    COLORS,
    CHART_THEME,
    conversionRate: 68,
  };

  return <AdminDashboardView loading={loading} data={dashboardData} />;
};

export default AdminDashboardContainer;

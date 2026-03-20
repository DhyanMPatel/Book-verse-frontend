import { BarChart3, BookOpen, ShoppingCart, Users } from "lucide-react";
import AdminDashboardView from "./AdminDashboardView";

const AdminDashboardContainer = () => {
    const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Total Books",
      value: "5,678",
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      title: "Total Orders",
      value: "890",
      icon: ShoppingCart,
      color: "text-purple-600",
    },
    {
      title: "Revenue",
      value: "$12,345",
      icon: BarChart3,
      color: "text-orange-600",
    },
  ];
  return <AdminDashboardView stats={stats} />;
};

export default AdminDashboardContainer;

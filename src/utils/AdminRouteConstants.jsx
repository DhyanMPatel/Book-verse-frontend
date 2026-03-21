import { BookOpen, LayoutDashboard, Settings, ShoppingCart, Users } from "lucide-react";
import RouteConstants from "./routeConstants";

export const adminNavItems = [
    {
      href: RouteConstants.adminDashboard,
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: RouteConstants.adminUsers,
      label: "Users",
      icon: Users,
    },
    {
      href: RouteConstants.adminBooks,
      label: "Books",
      icon: BookOpen,
    },
    {
      href: RouteConstants.adminOrders,
      label: "Orders",
      icon: ShoppingCart,
    },
    {
      href: RouteConstants.adminSettings,
      label: "Settings",
      icon: Settings,
    },
  ];
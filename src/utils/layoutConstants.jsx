import {
  Home,
  Library,
  Search,
  ShoppingCart,
  User,
  Book,
  Settings,
  LayoutDashboard,

} from "lucide-react";
import RouteConstants from "./routeConstants";

// Bottom navigation items - displayed on tablet & mobile
// Combines main items for compact bottom nav
export const navItems = [
  { href: RouteConstants.home, icon: Home, label: "Home" },
  { href: RouteConstants.search, icon: Search, label: "Search" },
  { href: RouteConstants.library, icon: Library, label: "Library" },
  { href: RouteConstants.cart, icon: ShoppingCart, label: "Cart" },
];

// Desktop Navbar Item
export const mainDesktopNavItems = [
    { href: RouteConstants.home, icon: Home, label: "Home" },
    { href: RouteConstants.search, icon: Search, label: "Search" },
    { href: RouteConstants.cart, icon: ShoppingCart, label: "Cart" },
    { href: RouteConstants.library, icon: Library, label: "Library" },
  ];

  

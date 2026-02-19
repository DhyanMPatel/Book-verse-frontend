import {
  Home,
  Search,
  Library,
  ShoppingCart,
  Heart,
  User,
  Settings,
} from "lucide-react";

// Main navigation items - displayed on sidebar
export const mainNavItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/search", icon: Search, label: "Browse" },
  { href: "/library", icon: Library, label: "My Library" },
];

// User account navigation items - displayed on sidebar
export const userNavItems = [
  { href: "/cart", icon: ShoppingCart, label: "Cart" },
  { href: "/wishlist", icon: Heart, label: "Wishlist" },
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

// Bottom navigation items - displayed on tablet & mobile
// Combines main items for compact bottom nav
export const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/search", icon: Search, label: "Search" },
  { href: "/library", icon: Library, label: "Library" },
  { href: "/cart", icon: ShoppingCart, label: "Cart" },
  { href: "/profile", icon: User, label: "Profile" },
];

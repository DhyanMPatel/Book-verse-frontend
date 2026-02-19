import React from "react";
import { Link } from "react-router-dom";
import { mainNavItems, userNavItems } from "../../utils/layoutConstants";
import { motion } from "framer-motion";
import "./sidebarStyle.css";

const SidebarView = (props) => {
  const { isActive, user, isAuthenticated, logout, onNavigate } = props;

  const handleNavigate = () => {
    onNavigate?.();
  };
  return (
    <aside className="sidebar-nav">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={handleNavigate}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              {/* <BookOpen className="w-6 h-6 text-white" /> */}
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              BookVerse
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4">
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Discover
            </p>
            {mainNavItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={handleNavigate}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="sidebarActiveIndicator"
                      className="ml-auto w-1.5 h-1.5 bg-primary-500 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-8 space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Account
            </p>
            {userNavItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={handleNavigate}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          {isAuthenticated && user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                  {/* <User className="w-4 h-4 text-primary-600" /> */}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  handleNavigate();
                }}
                className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                {/* <LogOut className="w-5 h-5" /> */}
                Sign Out
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-3">Not logged in</p>
              <Link
                to="/login"
                onClick={handleNavigate}
                className="block w-full px-3 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors text-center"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default SidebarView;

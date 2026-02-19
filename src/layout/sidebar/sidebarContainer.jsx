import React from "react";
import SidebarView from "./sidebarView";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";

const SidebarContainer = ({ onNavigate }) => {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;
  const isActive = (href) =>
    pathname === href || pathname.startsWith(`${href}/`);

  if (isLoading) {
    return (
      <aside className="sidebar-nav">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
          <div className="flex-1 px-4 py-4">
            <div className="space-y-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 bg-gray-200 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    );
  }
  return (
    <SidebarView
      isActive={isActive}
      user={user}
      isAuthenticated={isAuthenticated}
      logout={logout}
      onNavigate={onNavigate}
    />
  );
};

export default SidebarContainer;

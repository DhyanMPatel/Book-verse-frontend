import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { adminNavItems } from "../utils/AdminRouteConstants";
import "./AdminSidebar.css";

const AdminSidebar = ({ isOpen, onClose, mobile = false }) => {
  return (
    <>
      {/* Overlay - only for desktop */}
      {!mobile && isOpen && (
        <div className="admin-sidebar-overlay" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div
        className={`admin-sidebar ${isOpen ? "open" : ""} ${mobile ? "mobile" : ""}`}
      >
        {/* Header */}
        <div className="admin-sidebar-header">
          <h2 className="admin-sidebar-title">Admin Panel</h2>
          <button
            onClick={onClose}
            className="admin-sidebar-close-btn"
            aria-label="Close admin sidebar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="admin-sidebar-nav">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `admin-nav-link ${isActive ? "active" : ""}`
                }
                onClick={onClose}
              >
                <Icon className="admin-nav-icon" size={20} />
                <span className="admin-nav-label">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;

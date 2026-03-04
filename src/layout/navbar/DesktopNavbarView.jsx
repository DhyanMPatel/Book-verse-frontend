import { motion } from "framer-motion";
import { ChevronDown, LogOut, Settings, User, BookOpen } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { buttonVariants, formThemes } from "../../common/Table/formVariants";
import { useAuth } from "../../hooks/useAuth";
import { mainDesktopNavItems } from "../../utils/layoutConstants";
import RouteConstants from "../../utils/routeConstants";
import "./DesktopNavbarStyle.css";

const DesktopNavbarView = (props) => {
  const {
    handleLogout,
    profileDropdownOpen,
    isActive,
    onToggleAdminSidebar,
    dropdownRef,
    setProfileDropdownOpen,
  } = props;

  const { user, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.pathname, "path Name");

  return (
    <header className="desktop-navbar">
      <div className="navbar-container">
        {/* Left: Company Logo */}
        <div className="navbar-brand">
          <NavLink to="/" className="brand-link">
            <div className="brand-logo">
              <BookOpen className="logo-icon" size={32} />
            </div>
            <span className="brand-text">BookVerse</span>
          </NavLink>
        </div>

        {/* Center/Right: Navigation Links */}
        <nav
          className="navbar-nav"
          role="navigation"
          aria-label="Main navigation"
        >
          {mainDesktopNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                <Icon className="nav-icon" size={18} aria-hidden="true" />
                <span className="nav-label">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Far Right: Profile Dropdown and Admin Settings */}
        <div className="navbar-actions">
          {/* Admin Settings Icon - Only shown for admin users */}
          {isAuthenticated && isAdmin() && (
            <button
              onClick={onToggleAdminSidebar}
              className="admin-settings-btn"
              title="Admin Settings"
              aria-label="Open admin settings panel"
              tabIndex={0}
            >
              <Settings size={20} aria-hidden="true" />
            </button>
          )}

          {/* Profile Dropdown */}
          {isAuthenticated && user ? (
            <div className="profile-dropdown" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="profile-dropdown-btn"
                aria-expanded={profileDropdownOpen}
                aria-haspopup="true"
                aria-label="User profile menu"
                tabIndex={0}
              >
                <div className="navbar-profile-avatar">
                  <div className="navbar-avatar-placeholder">
                    <User size={18} className="navbar-avatar-icon" />
                  </div>
                </div>
                <div className="navbar-profile-info">
                  <span className="navbar-profile-name">{user.name}</span>
                  <span className="navbar-profile-email">{user.email}</span>
                </div>
                <ChevronDown
                  className={`dropdown-arrow ${profileDropdownOpen ? "open" : ""}`}
                  size={16}
                  aria-hidden="true"
                />
              </button>

              {profileDropdownOpen && (
                <div className="dropdown-menu" role="menu">
                  <div className="navbar-dropdown-header">
                    <div className="navbar-header-avatar">
                      <div className="navbar-avatar-placeholder">
                        <User size={20} className="navbar-avatar-icon" />
                      </div>
                    </div>
                    <div className="navbar-header-info">
                      <p className="navbar-header-name">{user.name}</p>
                      <p className="navbar-header-email">{user.email}</p>
                    </div>
                  </div>

                  <div className="dropdown-divider"></div>

                  <NavLink
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setProfileDropdownOpen(false)}
                    role="menuitem"
                    tabIndex={0}
                  >
                    <User size={16} aria-hidden="true" />
                    <div className="item-content">
                      <span className="item-label">My Profile</span>
                      <span className="item-description">
                        View and edit your profile
                      </span>
                    </div>
                  </NavLink>

                  <NavLink
                    to="/settings"
                    className="dropdown-item"
                    onClick={() => setProfileDropdownOpen(false)}
                    role="menuitem"
                    tabIndex={0}
                  >
                    <Settings size={16} aria-hidden="true" />
                    <div className="item-content">
                      <span className="item-label">Settings</span>
                      <span className="item-description">
                        Manage your preferences
                      </span>
                    </div>
                  </NavLink>

                  <div className="dropdown-divider"></div>

                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout-item"
                    role="menuitem"
                    tabIndex={0}
                  >
                    <LogOut size={16} aria-hidden="true" />
                    <div className="item-content">
                      <span className="item-label">Logout</span>
                      <span className="item-description">
                        Sign out of your account
                      </span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          ) : location.pathname === "/login" ? (
            <motion.button
              onClick={() => navigate(RouteConstants.register)}
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-2 px-1 bg-linear-to-r ${formThemes.register.buttonGradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:border-0`}
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              onClick={() => navigate(RouteConstants.login)}
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-3 px-4 bg-linear-to-r ${formThemes.register.buttonGradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:border-0`}
            >
              Sign In
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
};

export default DesktopNavbarView;

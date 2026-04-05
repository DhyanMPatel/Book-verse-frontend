import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import { useAuth } from "../../hooks/useAuth";
import { FooterContainer } from "../layoutIndex";
import DesktopNavbarContainer from "../navbar/DesktopNavbarContainer";
import "./mainLayoutStyle.css";

const MainLayoutView = ({ isLaptop }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminSidebarOpen, setAdminSidebarOpen] = useState(false);
  const { isAuthenticated, isAdmin } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleAdminSidebar = () => {
    setAdminSidebarOpen(!adminSidebarOpen);
  };

  return (
    <div className="layout-wrapper">
      {/* Desktop Navbar - Only shown on 1024px+ */}
      <DesktopNavbarContainer onToggleAdminSidebar={toggleAdminSidebar} />

      {/* Admin Sidebar */}
      {isAdmin() && (
        <AdminSidebar isOpen={adminSidebarOpen} onClose={toggleAdminSidebar} />
      )}

      {/* Laptop: Sidebar (250px fixed) + Main Content */}
      {isLaptop ? (
        <>
          {/* Main Content */}
          <main className="main-content-laptop">
            <Outlet />
          </main>
        </>
      ) : (
        <>
          {/* Mobile/Tablet: Main Content + Bottom Navigation (Footer) */}
          <main className="main-content-mobile">
            <Outlet />
          </main>

          {/* Bottom Navigation */}
          <nav className="bottom-nav">
            <FooterContainer />
          </nav>

          {/* Floating Menu Toggle Button */}
          {/* {isAdmin() && (
            <button
              onClick={toggleSidebar}
              className="floating-menu-btn"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )} */}

          {/* Sidebar Drawer Overlay */}
          {sidebarOpen && (
            <div className="sidebar-drawer" onClick={closeSidebar} />
          )}

          {/* Sidebar Drawer Content */}
          <div
            className={`sidebar-drawer-content ${sidebarOpen ? "open" : ""}`}
          >
            {isAuthenticated && isAdmin() && (
              <AdminSidebar
                isOpen={true}
                onClose={closeSidebar}
                mobile={true}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MainLayoutView;

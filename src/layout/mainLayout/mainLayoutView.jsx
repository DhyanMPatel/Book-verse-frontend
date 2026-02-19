import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FooterContainer, SidebarContainer } from "../layoutIndex";
import "./mainLayoutStyle.css";

const MainLayoutView = ({ isLaptop }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="layout-wrapper">
      {/* Laptop: Sidebar (250px fixed) + Main Content */}
      {isLaptop ? (
        <>
          {/* Sidebar */}
          <aside className="sidebar-section">
            <SidebarContainer />
          </aside>

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

          {/* Sidebar Drawer Overlay */}
          {sidebarOpen && (
            <div className="sidebar-drawer" onClick={closeSidebar} />
          )}

          {/* Sidebar Drawer Content */}
          <div
            className={`sidebar-drawer-content ${sidebarOpen ? "open" : ""}`}
          >
            <button
              onClick={closeSidebar}
              className="close-drawer-btn p-2 absolute top-4 right-4"
              aria-label="Close sidebar"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="pt-12">
              <SidebarContainer onNavigate={closeSidebar} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MainLayoutView;

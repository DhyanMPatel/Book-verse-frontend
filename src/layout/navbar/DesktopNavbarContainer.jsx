import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import DesktopNavbarView from "./DesktopNavbarView";

const DesktopNavbarContainer = ({ onToggleAdminSidebar }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
  };
  return (
    <>
      <DesktopNavbarView
        handleLogout={handleLogout}
        profileDropdownOpen={profileDropdownOpen}
        isActive={isActive}
        onToggleAdminSidebar={onToggleAdminSidebar}
        dropdownRef={dropdownRef}
        setProfileDropdownOpen={setProfileDropdownOpen}
      />
    </>
  );
};

export default DesktopNavbarContainer;

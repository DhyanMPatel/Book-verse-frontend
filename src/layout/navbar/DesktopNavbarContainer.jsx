import { useEffect, useRef, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import DesktopNavbarView from "./DesktopNavbarView";
import JoyrideTutorial from "../../components/JoyrideTutorial";
import { getNavbarTutorialSteps } from "../../utils/tutorialSteps";

const DesktopNavbarContainer = ({ onToggleAdminSidebar }) => {
  const { logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  // Generate tutorial steps based on auth state
  const tutorialSteps = useMemo(
    () => getNavbarTutorialSteps(isAuthenticated),
    [isAuthenticated]
  );

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

  const handleStartTour = () => {
    setShowTour(true);
  };

  const handleTourFinish = () => {
    setShowTour(false);
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
        onStartTour={handleStartTour}
      />
      <JoyrideTutorial
        steps={tutorialSteps}
        run={showTour ? true : undefined}
        onFinish={handleTourFinish}
      />
    </>
  );
};

export default DesktopNavbarContainer;

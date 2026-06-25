// React-Joyride tutorial steps for the Navbar
// Steps are designed to guide users through the main navbar features

// Base steps that are always shown (brand, nav links)
export const baseNavbarSteps = [
  {
    target: ".brand-link",
    content: "Welcome to BookVerse! Click the logo to return to the homepage anytime.",
    title: "📚 BookVerse Brand",
    placement: "bottom",
    disableBeacon: true,
  },
  {
    target: ".navbar-nav",
    content: "Use these navigation links to explore the app. Browse books, search for titles, manage your library, or view your cart.",
    title: "🔍 Main Navigation",
    placement: "bottom",
    spotlightClicks: false,
  },
];

// Steps for authenticated users (show profile dropdown)
export const authNavbarSteps = [
  {
    target: ".profile-dropdown-btn",
    content: "Click here to access your profile settings, view account details, or sign out.",
    title: "👤 User Profile",
    placement: "bottom-end",
    spotlightClicks: true,
  },
];

// Steps for unauthenticated users (show auth buttons)
export const guestNavbarSteps = [
  {
    target: ".navbar-actions",
    content: "Sign in to your account or create a new one to get started with BookVerse.",
    title: "🔐 Get Started",
    placement: "bottom-end",
    spotlightClicks: true,
  },
];

// Helper to get complete step list based on auth state
export const getNavbarTutorialSteps = (isAuthenticated) => {
  const additionalSteps = isAuthenticated ? authNavbarSteps : guestNavbarSteps;
  return [...baseNavbarSteps, ...additionalSteps];
};
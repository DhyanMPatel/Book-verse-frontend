import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { navItems } from "../../utils/layoutConstants";
import "./footerStyle.css";
import { useAuth } from "../../hooks/useAuth";
import RouteConstants from "../../utils/routeConstants";
import { LogIn, User } from "lucide-react";

const FooterView = (props) => {
  const { pathname } = props;
  const { isAuthenticated } = useAuth();

  const updatedNav = [...navItems, isAuthenticated ? { href: RouteConstants.profile, icon: User, label: "Profile" } : { href: RouteConstants.login, icon: LogIn, label: "Login" }]

  return (
    <nav className="bottom-nav thumb-nav">
      <div className="flex items-center justify-around h-full w-full">
        {updatedNav.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`thumb-nav-item ${isActive ? "thumb-nav-item-active" : ""}`}
            >
              <Motion.div whileTap={{ scale: 0.9 }} className="relative">
                {Icon && (
                  <Icon
                    className="w-5 h-5 mb-1"
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                )}
                {isActive && (
                  <Motion.div
                    layoutId="mobileActiveIndicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Motion.div>
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default FooterView;

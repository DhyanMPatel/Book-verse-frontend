import { useState, useEffect } from "react";
import MainLayoutView from "./mainLayoutView";

const MainLayoutContainer = () => {
  const [isLaptop, setIsLaptop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLaptop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <MainLayoutView isLaptop={isLaptop} />;
};

export default MainLayoutContainer;

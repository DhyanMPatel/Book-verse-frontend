import React from "react";
import { motion } from "framer-motion";
import ThreeBackground from "../../../components/ThreeBackground";
import LoginCard from "../../../components/LoginCard";

const LoginView = (props) => {
  const { pageVariants } = props;
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="relative min-h-screen w-full overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-purple-900 to-slate-900" />

      <ThreeBackground />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <LoginCard />
        </div>
      </div>

      <div className="absolute bottom-4 left-4 text-white/60 text-xs">
        © 2024 Book Verse. All rights reserved.
      </div>

      <div className="absolute top-4 right-4 text-white/60 text-xs">
        College Project
      </div>
    </motion.div>
  );
};

export default LoginView;

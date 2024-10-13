"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

const SideMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
    console.log("ok");
  };

  return (
    <div className="relative w-screen z-10">
      {isMenuOpen ? (
        <div className="absolute h-screen w-1/3 z-20 bg-slate-400">
          <motion.div
            onClick={handleMenuToggle}
            className="absolute top-0 right-2 cursor-pointer"
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.8, rotate: -90 }}
          >
            X
          </motion.div>
        </div>
      ) : (
        <div
          onClick={handleMenuToggle}
          className="h-10 w-10 cursor-pointer items-center text-center"
        >
          menu
        </div>
      )}
    </div>
  );
};

export default SideMenu;

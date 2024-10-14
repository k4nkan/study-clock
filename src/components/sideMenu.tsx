"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";

const SideMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative w-screen z-10">
      <motion.div
        className="absolute h-screen w-1/3 z-20 bg-slate-100"
        initial={{ x: "-100%" }}
        animate={{ x: isMenuOpen ? "0%" : "-100%" }}
        transition={{ type: "keyframes" }}
      >
        <motion.div
          onClick={handleMenuToggle}
          className="absolute top-1 right-1 cursor-pointer"
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.8 }}
        >
          <IoMdClose size={"2rem"} />
        </motion.div>
      </motion.div>

      {!isMenuOpen && (
        <div onClick={handleMenuToggle}>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ transformOrigin: "left" }}
            className="cursor-pointer"
          >
            <IoMdMenu size={"2rem"} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SideMenu;

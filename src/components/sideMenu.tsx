"use client";

import React, { useState } from "react";

const SideMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
    console.log("ok");
  };

  return (
    <div className="w-16 h-10 z-50 text-center content-center cursor-pointer">
      {isMenuOpen ? (
        <div>
          <div onClick={handleMenuToggle}>close</div>
        </div>
      ) : (
        <div onClick={handleMenuToggle}>menu</div>
      )}
    </div>
  );
};

export default SideMenu;

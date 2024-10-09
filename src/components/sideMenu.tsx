"use client";

import React, { useState } from "react";

const SideMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
    console.log("ok");
  };

  return (
    <div
      onClick={handleMenuToggle}
      className="w-16 h-10 z-50 text-center content-center cursor-pointer"
    >
      {isMenuOpen ? <div>open</div> : <div>menu</div>}
    </div>
  );
};

export default SideMenu;

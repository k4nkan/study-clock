"use client";

import { useEffect, useState, useRef } from "react";
import { getRundomPosition } from "@/component/getRundomPosition";
import { motion } from "framer-motion";

export default function Main() {
  const [time, setTime] = useState(new Date());
  const [showColon, setShowColon] = useState(false);
  const [fontIndex, setFontIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const movementTimeout = useRef<number | null>(null); // useRefを使用してリファレンスを保持

  const font_data = [
    "Pacifico",
    "Cute Font",
    "Dancing Script",
    "Shadows Into Light",
    "Caveat",
  ];

  const color_data = ["black", "blue", "red", "cyan", "green"];

  const handleFontClick = () => {
    setFontIndex((prevIndex) =>
      prevIndex < font_data.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleColorClick = () => {
    setColorIndex((prevIndex) =>
      prevIndex < color_data.length - 1 ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date());
    };

    const timer = setInterval(updateTime, 1000);
    const blinkTimer = setInterval(() => {
      setShowColon((prev) => !prev);
    }, 1000);

    // マウスが動いた時の処理
    const handleMouseMove = () => {
      setIsMouseMoving(true);

      // マウスが動いている間、タイマーをリセット
      if (movementTimeout.current) {
        clearTimeout(movementTimeout.current);
      }

      // 2秒間マウスが動かない場合、`isMouseMoving`をfalseに
      movementTimeout.current = window.setTimeout(() => {
        setIsMouseMoving(false);
        const { x, y } = getRundomPosition();
        setPosition({ x, y });
      }, 1000);
    };

    // マウスムーブのリスナーを追加
    window.addEventListener("mousemove", handleMouseMove);

    // クリーンアップ処理
    return () => {
      clearInterval(timer);
      clearInterval(blinkTimer);
      if (movementTimeout.current) {
        clearTimeout(movementTimeout.current); // クリーンアップ
      }
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    console.log(position);
  }, [position]);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  return (
    <div className="relative" style={{ fontFamily: font_data[fontIndex] }}>
      <div className="absolute flex flex-col">
        {!isMouseMoving && (
          <div
            style={{
              position: "absolute",
              top: `${position.y}px`,
              left: `${position.x}px`,
            }}
            className="bg-teal-300 w-16 h-16 rounded-full opacity-50"
          ></div>
        )}

        <div className="absolute flex items-center text-center justify-center text-5xl h-screen w-screen" style={{color: color_data[colorIndex]}}>
          <motion.div onClick={handleColorClick} className="w-16" whileHover={{ scale: 2, x: -25, y: -8 }}>
            {hours}
          </motion.div>
          <div className="w-2 flex justify-center">
            {showColon && <div>:</div>}
          </div>
          <motion.div
            onClick={handleFontClick}
            className="w-16"
            whileHover={{ scale: 2, x: 25, y: -8 }}
          >
            {minutes}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

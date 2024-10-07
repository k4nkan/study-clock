"use client";

import { useEffect, useState, useRef } from "react";
import { getRundomPosition } from "@/component/getRundomPosition";
import { motion } from "framer-motion";

export default function Main() {
  const [time, setTime] = useState(new Date());
  const [showColon, setShowColon] = useState(false);

  // 対応する番号の色やフォントに変更するための関数
  const [fontIndex, setFontIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);

  // マウスが止まっていればtrueとする関数
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  // 配置するボールの座標を保存する配列
  const [position, setPosition] = useState([{ x: -100, y: -100 }]);

  const movementTimeout = useRef<number | null>(null); // useRefを使用してリファレンスを保持

  const font_data = [
    "Pacifico",
    "Protest Strike",
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

  // 乱数を生成、配列に追加する関数
  useEffect(() => {
    const addNewBall = () => {
      const newPosition = getRundomPosition();
      setPosition((prevPositions) => [...prevPositions, newPosition]);
    };

    const balltimer = setInterval(addNewBall, 2000);

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
      setPosition([{ x: -100, y: -100 }]);

      // マウスが動いている間、タイマーをリセット
      if (movementTimeout.current) {
        clearTimeout(movementTimeout.current);
      }

      // 2秒間マウスが動かない場合、`isMouseMoving`をfalseに
      movementTimeout.current = window.setTimeout(() => {
        setIsMouseMoving(false);
      }, 1000);
    };

    // マウスムーブのリスナーを追加
    window.addEventListener("mousemove", handleMouseMove);

    // クリーンアップ処理
    return () => {
      clearInterval(timer);
      clearInterval(blinkTimer);
      clearInterval(balltimer);
      if (movementTimeout.current) {
        clearTimeout(movementTimeout.current);
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
        {!isMouseMoving &&
          position.map((position, index) => (
            <motion.div
              style={{
                position: "absolute",
                top: `${position.y}px`,
                left: `${position.x}px`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2, scale: 4 }}
              transition={{ duration: 2 }}
              className="bg-teal-300 w-16 h-16 rounded-full opacity-50"
            ></motion.div>
          ))}

        <div
          className="absolute flex items-center text-center justify-center text-5xl h-screen w-screen"
          style={{ color: color_data[colorIndex] }}
        >
          <motion.div
            onClick={handleColorClick}
            className="w-16"
            whileHover={{ scale: 1.5, x: -8, y: -3 }}
          >
            {hours}
          </motion.div>
          <div className="w-2 flex justify-center">
            {showColon && <div>:</div>}
          </div>
          <motion.div
            onClick={handleFontClick}
            className="w-16"
            whileHover={{ scale: 1.5, x: 8, y: -3 }}
          >
            {minutes}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

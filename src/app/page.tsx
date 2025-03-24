"use client";

import { useEffect, useState, useRef } from "react";
import { getRundomPosition } from "@/components/getRundomPosition";
import { AnimatePresence, motion } from "framer-motion";

export default function Main() {
  const [time, setTime] = useState(new Date());
  const [showColon, setShowColon] = useState(false);

  // マウスが止まっていればtrueとする関数
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  // 配置するボールの座標を保存する配列
  const [position, setPosition] = useState([{ x: -1000, y: -1000 }]);

  const movementTimeout = useRef<number | null>(null); // useRefを使用してリファレンスを保持

  // 乱数を生成、配列に追加する関数
  useEffect(() => {
    const addNewBall = () => {
      const newPosition = getRundomPosition();
      setPosition((prevPositions) => [...prevPositions, newPosition]);
    };

    const balltimer = setInterval(addNewBall, 5000);

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

      // 5秒間マウスが動かない場合、`isMouseMoving`をfalseに
      movementTimeout.current = window.setTimeout(() => {
        setIsMouseMoving(false);
      }, 5000);

      setPosition([{ x: -1000, y: -1000 }]);
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
    <div className="relative">
      <div className="absolute flex flex-col">
        <AnimatePresence>
          {!isMouseMoving &&
            position.map((position, index) => (
              <motion.div
                key={index}
                style={{
                  position: "absolute",
                  top: `${position.y}px`,
                  left: `${position.x}px`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2, scale: 4 }}
                exit={{ opacity: 0, scale: 8 }}
                transition={{ duration: 2 }}
                className="bg-teal-300 w-16 h-16 rounded-full opacity-50"
              ></motion.div>
            ))}
        </AnimatePresence>

        <div className="absolute flex items-center text-center justify-center text-8xl h-screen w-screen">
          <motion.div
            className="w-32"
            whileHover={{ scale: 1.2, x: -8, y: -3 }}
          >
            {hours}
          </motion.div>
          <div className="w-2 flex justify-center">
            {showColon && <div>:</div>}
          </div>
          <motion.div className="w-32" whileHover={{ scale: 1.2, x: 8, y: -3 }}>
            {minutes}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

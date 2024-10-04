"use client";

import { useEffect, useState, useRef } from "react";

export default function Main() {
  const [time, setTime] = useState(new Date());
  const [showColon, setShowColon] = useState(false);
  const [fontIndex, setFontIndex] = useState(0);
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  const movementTimeout = useRef<number | null>(null); // useRefを使用してリファレンスを保持

  const font_data = [
    "Pacifico",
    "Cute Font",
    "Dancing Script",
    "Shadows Into Light",
    "Caveat",
  ];

  const handleClick = () => {
    setFontIndex((prevIndex) =>
      prevIndex < font_data.length - 1 ? prevIndex + 1 : 0
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
      }, 2000);
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

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  return (
    <div className="relative" onClick={handleClick} style={{ fontFamily: font_data[fontIndex] }}>
      <div className="absolute flex flex-col">{isMouseMoving && <div>test</div>}
      <div className="absolute flex items-center text-center justify-center text-5xl h-screen w-screen">
        <div className="w-16">{hours}</div>
        <div className="w-2 flex justify-center">
          {showColon && <div>:</div>}
        </div>
        <div className="w-16">{minutes}</div>
      </div>
      </div>
    </div>
  );
}

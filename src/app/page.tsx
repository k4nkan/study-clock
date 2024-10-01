"use client";

import { useEffect, useState } from "react";

export default function Main() {
  const [time, setTime] = useState(new Date());
  const [showColon, setShowColon] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date());
    };

    // タイマーを1秒ごとに実行
    const timer = setInterval(updateTime, 1000);

    // 点滅タイマーを設定
    const blinkTimer = setInterval(() => {
      setShowColon((prev) => !prev); // 値を * -1 する
    }, 1000); // 点滅の間隔

    // クリーンアップ
    return () => {
      clearInterval(timer);
      clearInterval(blinkTimer);
    };
  }, []);

  // 時間と分をフォーマット
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  return (
    <div className="flex items-center text-center justify-center text-5xl Helvetica h-screen">
      <div className="w-16">{hours}</div>
      <div className="w-1.5">
        {showColon && (
          <div>
            <div className="h-1.5 w-1.5 bg-black rounded-full"></div>
            <div className="h-2"></div>
            <div className="h-1.5 w-1.5 bg-black rounded-full"></div>
          </div>
        )}
      </div>
      <div className="w-16">{minutes}</div>
    </div>
  );
}

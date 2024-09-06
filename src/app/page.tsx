"use client";

import { useEffect, useState } from "react";

export default function Main() {
  const [time, setTime] = useState(new Date());
  const [showColon, setShowColon] = useState(1); // 初期値を 1 に設定

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date());
    };

    // タイマーを1秒ごとに実行
    const timer = setInterval(updateTime, 1000);

    // 点滅タイマーを設定
    const blinkTimer = setInterval(() => {
      setShowColon((prev) => prev * -1); // 値を * -1 する
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
    <div className="flex items-center justify-center h-screen">
      <p className="text-5xl Helvetica">
        {hours}
        {showColon === 1 ? ":" : " "}
        {minutes}
      </p>
    </div>
  );
}

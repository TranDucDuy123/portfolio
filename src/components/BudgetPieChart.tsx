import React, { useState } from "react";

interface DataItem {
  id: number;
  title: string;
  price: number;
  color: string;
}

interface BudgetPieChartProps {
  data: DataItem[];
  total: number;
}

export default function BudgetPieChart({ data, total }: BudgetPieChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const radius = 70;
  const strokeWidth = 26;
  const center = 100;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      <div className="relative w-56 h-56 flex items-center justify-center">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full transform -rotate-90 drop-shadow-sm"
        >
          {data.map((item, index) => {
            const percent = item.price / (total || 1);
            const strokeDasharray = `${percent * circumference} ${circumference}`;
            const strokeDashoffset = -cumulativePercent * circumference;
            cumulativePercent += percent;

            const isHovered = hoveredIdx === index;

            return (
              <circle
                key={item.id}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  opacity: hoveredIdx === null || isHovered ? 1 : 0.65,
                }}
              />
            );
          })}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
          {hoveredIdx !== null ? (
            <div className="animate-fade-in">
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-500 block truncate max-w-[120px]">
                {data[hoveredIdx].title}
              </span>
              <span className="text-sm font-bold text-brand-dark font-mono block">
                {data[hoveredIdx].price.toLocaleString("vi-VN")} đ
              </span>
              <span className="text-[10px] font-bold text-brand-primary block">
                {((data[hoveredIdx].price / total) * 100).toFixed(1)}%
              </span>
            </div>
          ) : (
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">
                Tổng 9 Module
              </span>
              <span className="text-sm font-black text-brand-dark font-mono block">
                {total.toLocaleString("vi-VN")}
              </span>
              <span className="text-[10px] font-bold text-gray-500 block">VNĐ</span>
            </div>
          )}
        </div>
      </div>

      <div className="text-[11px] text-gray-400 text-center mt-3">
        Rê chuột vào các mảng màu để xem tỷ trọng chi tiết
      </div>
    </div>
  );
}

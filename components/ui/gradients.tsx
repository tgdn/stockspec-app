import React from "react";

export default function Gradients() {
  return (
    <svg
      style={{
        position: "absolute",
        height: "1px",
        width: "1px",
      }}
    >
      <defs>
        <linearGradient id="gradient-red" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#db2828" stopOpacity={0.2} />
          <stop offset="100%" stopColor="#db2828" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="gradient-green" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#34d060" stopOpacity={0.2} />
          <stop offset="100%" stopColor="#34d060" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}

import React from "react";
export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
}: {
  children: React.ReactNode;
  // onClick?: () => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl border border-slate-200 hover:shadow transition active:scale-[.98] ${className}`}
    >
      {children}
    </button>
  );
}

import React from "react";

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  className = "",
}) => {
  return <aside className={`space-y-6 ${className}`}>{children}</aside>;
};

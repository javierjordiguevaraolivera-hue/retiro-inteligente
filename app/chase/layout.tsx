import type { ReactNode } from "react";
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#2550aa",
  colorScheme: "light",
};

type ChaseLayoutProps = {
  children: ReactNode;
};

export default function ChaseLayout({ children }: ChaseLayoutProps) {
  return children;
}

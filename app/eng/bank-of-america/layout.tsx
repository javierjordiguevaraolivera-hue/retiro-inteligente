import type { ReactNode } from "react";
import type { Viewport } from "next";
import BankOfAmericaChromeSync from "./chrome-sync";

export const viewport: Viewport = {
  themeColor: "#2550aa",
  colorScheme: "light",
};

type BankOfAmericaLayoutProps = {
  children: ReactNode;
};

export default function BankOfAmericaLayout({ children }: BankOfAmericaLayoutProps) {
  return (
    <>
      <BankOfAmericaChromeSync />
      {children}
    </>
  );
}

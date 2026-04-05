"use client";

import { useEffect } from "react";

const TOP_COLOR = "#2550aa";
const CONTENT_COLOR = "#f8f8f8";

function setThemeColor(color: string) {
  let meta = document.querySelector('meta[name="theme-color"]');

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", color);
}

export default function ChaseChromeSync() {
  useEffect(() => {
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    const previousThemeColor = themeMeta?.getAttribute("content") ?? null;
    const previousHtmlBackground = document.documentElement.style.backgroundColor;
    const previousBodyBackground = document.body.style.backgroundColor;
    let currentColor = "";
    let rafId = 0;

    document.documentElement.classList.add("chase-shell");
    document.body.classList.add("chase-shell");

    const updateChrome = () => {
      const contentStart = document.querySelector<HTMLElement>("[data-chase-content-start]");
      const nextColor =
        contentStart && contentStart.getBoundingClientRect().top <= 10
          ? CONTENT_COLOR
          : TOP_COLOR;

      if (nextColor === currentColor) {
        return;
      }

      currentColor = nextColor;
      setThemeColor(nextColor);
      document.documentElement.style.backgroundColor = nextColor;
      document.documentElement.style.setProperty("--chase-top-chrome", nextColor);
      document.body.style.backgroundColor = nextColor;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateChrome);
    };

    updateChrome();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);

      if (previousThemeColor) {
        setThemeColor(previousThemeColor);
      } else {
        document.querySelector('meta[name="theme-color"]')?.remove();
      }

      document.documentElement.style.backgroundColor = previousHtmlBackground;
      document.documentElement.style.removeProperty("--chase-top-chrome");
      document.body.style.backgroundColor = previousBodyBackground;
      document.documentElement.classList.remove("chase-shell");
      document.body.classList.remove("chase-shell");
    };
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";

const DEFAULT_TOP_COLOR = "#2550aa";
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
    let hiddenAt = 0;

    const updateChrome = () => {
      const contentStart = document.querySelector<HTMLElement>("[data-chase-content-start]");
      const screen = document.querySelector<HTMLElement>("[data-chase-top-color]");
      const topColor = screen?.dataset.chaseTopColor || DEFAULT_TOP_COLOR;
      const nextColor =
        contentStart && contentStart.getBoundingClientRect().top <= 10
          ? CONTENT_COLOR
          : topColor;

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

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        hiddenAt = Date.now();
        return;
      }

      if (document.visibilityState === "visible" && hiddenAt > 0) {
        const hiddenFor = Date.now() - hiddenAt;
        hiddenAt = 0;

        if (hiddenFor > 8000) {
          window.location.reload();
        }
      }
    };

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    updateChrome();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cancelAnimationFrame(rafId);

      if (previousThemeColor) {
        setThemeColor(previousThemeColor);
      } else {
        document.querySelector('meta[name="theme-color"]')?.remove();
      }

      document.documentElement.style.backgroundColor = previousHtmlBackground;
      document.documentElement.style.removeProperty("--chase-top-chrome");
      document.body.style.backgroundColor = previousBodyBackground;
    };
  }, []);

  return null;
}

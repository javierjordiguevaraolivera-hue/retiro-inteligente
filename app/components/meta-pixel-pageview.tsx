"use client";

import { useEffect } from "react";

type TrackingWindow = Window &
  typeof globalThis & {
    fbq?: (...args: unknown[]) => void;
  };

export function MetaPixelPageView() {
  useEffect(() => {
    (window as TrackingWindow).fbq?.("track", "PageView");
  }, []);

  return null;
}

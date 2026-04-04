"use client";

import { useEffect } from "react";

type TrackingWindow = Window &
  typeof globalThis & {
    fbq?: (...args: unknown[]) => void;
  };

export function MetaPixelViewContent() {
  useEffect(() => {
    (window as TrackingWindow).fbq?.("track", "ViewContent");
  }, []);

  return null;
}

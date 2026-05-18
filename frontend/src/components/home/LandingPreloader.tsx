"use client";

import { useCallback, useEffect, useState } from "react";
import { CalligraphyReveal } from "@/components/home/CalligraphyReveal";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "nabeel-landing-preloader-seen";
const PAUSE_AFTER_MS = 650;
const EXIT_MS = 550;

export function LandingPreloader() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;

    setVisible(true);
    document.body.style.overflow = "hidden";
  }, []);

  const finish = useCallback(() => {
    setExiting(true);
    window.setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setVisible(false);
      document.body.style.overflow = "";
    }, EXIT_MS);
  }, []);

  const handleRevealDone = useCallback(() => {
    window.setTimeout(finish, PAUSE_AFTER_MS);
  }, [finish]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center bg-background transition-opacity duration-500 ease-out",
        exiting && "pointer-events-none opacity-0"
      )}
      aria-live="polite"
      aria-label="نبيل الجابري"
    >
      <CalligraphyReveal onComplete={handleRevealDone} />
    </div>
  );
}

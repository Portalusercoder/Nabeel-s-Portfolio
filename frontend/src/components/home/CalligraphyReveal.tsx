"use client";

import { useEffect, useId, useRef, useState } from "react";
import { publicAsset } from "@/lib/assets";
import { cn } from "@/lib/utils";

const LOGO_SRC = publicAsset("/images/logo.png");
const LOGO_W = 512;
const LOGO_H = 161;
const VIEW_BOX = `0 0 ${LOGO_W} ${LOGO_H}`;

/** Wide pen sweep (right → left) covering full logo height including flourishes. */
const INK_PATH =
  "M 498 72 C 472 28, 400 22, 340 48 C 280 74, 250 118, 190 108 C 130 98, 95 42, 48 52 C 28 58, 14 78, 8 98";

const DRAW_MS = 2800;
const PAUSE_MS = 450;
const STROKE_WIDTH = 105;
const FILL_START = 0.82;

type Props = {
  onComplete: () => void;
  className?: string;
};

export function CalligraphyReveal({ onComplete, className }: Props) {
  const maskId = useId().replace(/:/g, "");
  const pathRef = useRef<SVGPathElement>(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pen, setPen] = useState({ x: 498, y: 72 });
  const [pathLen, setPathLen] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.src = LOGO_SRC;
    img.onload = () => {
      requestAnimationFrame(() => {
        const len = pathRef.current?.getTotalLength() ?? 0;
        setPathLen(len);
        setReady(true);
      });
    };
    img.onerror = () => onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (!ready || !pathLen) return;

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DRAW_MS);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setProgress(eased);

      const el = pathRef.current;
      if (el) {
        const point = el.getPointAtLength(pathLen * eased);
        setPen({ x: point.x, y: point.y });
      }

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(onComplete, PAUSE_MS);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, pathLen, onComplete]);

  const offset = pathLen * (1 - progress);
  const fillOpacity = progress > FILL_START ? (progress - FILL_START) / (1 - FILL_START) : 0;

  return (
    <svg
      viewBox={VIEW_BOX}
      className={cn(
        "h-auto w-[min(92vw,480px)] max-h-[140px] opacity-0 transition-opacity duration-300",
        ready && "opacity-100",
        className
      )}
      role="img"
      aria-label="نبيل الجابري"
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id={`${maskId}-soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
        </filter>
        <mask id={maskId}>
          <rect width={LOGO_W} height={LOGO_H} fill="black" />
          <path
            ref={pathRef}
            d={INK_PATH}
            fill="none"
            stroke="white"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={pathLen || undefined}
            strokeDashoffset={pathLen ? offset : undefined}
            filter={`url(#${maskId}-soft)`}
          />
          {fillOpacity > 0 && (
            <rect width={LOGO_W} height={LOGO_H} fill="white" opacity={fillOpacity} />
          )}
        </mask>
      </defs>

      <image
        href={LOGO_SRC}
        width={LOGO_W}
        height={LOGO_H}
        mask={`url(#${maskId})`}
        preserveAspectRatio="xMidYMid meet"
      />

      {progress > 0.01 && progress < 0.99 && (
        <circle
          cx={pen.x}
          cy={pen.y}
          r={3}
          className="fill-online shadow-[0_0_14px_var(--online)]"
        />
      )}
    </svg>
  );
}

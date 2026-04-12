"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import logoImg from "@/assets/android-chrome-512x512.png";

const YEAR = "2026";
const NOISE_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")";

const BrandCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const seminarRef = useRef<HTMLSpanElement>(null);
  const yearRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dateRef = useRef<HTMLDivElement>(null);
  const venueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let killed = false;

    import("gsap").then(({ gsap }) => {
      if (killed) return;

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      tl.set(logoWrapRef.current, {
        autoAlpha: 0,
        y: 10,
        scale: 0.97,
        filter: "blur(10px)",
      })
        .set([brandRef.current, seminarRef.current, dateRef.current, venueRef.current], {
          autoAlpha: 0,
          y: 10,
        })
        .set(yearRefs.current, { autoAlpha: 0, y: 12, filter: "blur(8px)" })
        .set(sheenRef.current, { x: "-55%", opacity: 0 })

        .fromTo(
          cardRef.current,
          { autoAlpha: 0, y: 10, scale: 0.99 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "power2.out" },
          0,
        )

        .to(
          logoWrapRef.current,
          { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.8 },
          0.12,
        )

        .to(
          sheenRef.current,
          { opacity: 1, x: "110%", duration: 1.1, ease: "power2.inOut" },
          0.1,
        )
        .to(sheenRef.current, { opacity: 0, duration: 0.25 }, 0.95)

        .to(brandRef.current, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.42)
        .to(seminarRef.current, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.52)

        .to(
          yearRefs.current,
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.42,
            stagger: 0.06,
          },
          0.7,
        )
        .to(dateRef.current, { autoAlpha: 1, y: 0, duration: 0.45 }, 1.1)
        .to(venueRef.current, { autoAlpha: 1, y: 0, duration: 0.45 }, 1.1);

      return () => {
        tl.kill();
      };
    });

    return () => {
      killed = true;
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="tw:relative tw:w-2xs tw:overflow-hidden tw:rounded-3xl tw:border tw:border-white/[0.28] tw:bg-gradient-to-b tw:from-white/[0.16] tw:to-white/10 tw:p-7 tw:opacity-0 tw:shadow-[0_18px_50px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.35)] tw:backdrop-blur-lg tw:tablet:w-sm"
    >
      {/* Sheen overlay */}
      <div
        ref={sheenRef}
        aria-hidden
        className="tw:pointer-events-none tw:absolute tw:opacity-0 tw:mix-blend-screen"
        style={{
          inset: "-40% -40%",
          background:
            "linear-gradient(115deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.22) 46%, rgba(255,255,255,0) 62%)",
        }}
      />

      {/* Noise texture */}
      <div
        aria-hidden
        className="tw:pointer-events-none tw:absolute tw:inset-0 tw:opacity-[0.06]"
        style={{
          backgroundImage: NOISE_SVG,
          backgroundSize: "220px 220px",
        }}
      />

      {/* Card content */}
      <div className="tw:relative tw:flex tw:flex-col tw:items-center tw:gap-6 tw:px-1.5 tw:py-1.5 tw:text-center">
        <div ref={logoWrapRef}>
          <Image
            src={logoImg}
            alt="sciwork logo"
            width={168}
            height={168}
            className="tw:block tw:size-36 tw:object-contain"
          />
        </div>

        <div className="tw:font-yk tw:leading-none">
          <div
            ref={brandRef}
            className="tw:text-4xl tw:font-semibold tw:tracking-normal tw:lowercase"
          >
            sciwork
          </div>
          <div className="tw:flex tw:flex-wrap tw:items-baseline tw:justify-center tw:gap-3.5">
            <span
              ref={seminarRef}
              className="tw:text-[clamp(34px,4.2vw,56px)] tw:font-semibold tw:tracking-tight"
            >
              seminar
            </span>
            <span className="tw:inline-flex tw:gap-1 tw:text-[clamp(30px,3.6vw,48px)] tw:font-black tw:tracking-wider tw:text-rose-500 tw:[text-shadow:0_0_18px_rgba(255,75,110,0.16)]">
              {YEAR.split("").map((char, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    yearRefs.current[i] = el;
                  }}
                  className="tw:inline-block"
                >
                  {char}
                </span>
              ))}
            </span>
          </div>
          <div
            ref={dateRef}
            className="tw:mt-4 tw:block tw:text-2xl tw:font-medium tw:tracking-tight"
          >
            June 13
          </div>
          <div
            ref={venueRef}
            className="tw:mt-2 tw:block tw:text-xl tw:font-medium tw:tracking-tight"
          >
            National Yang Ming Chiao Tung University
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCard;

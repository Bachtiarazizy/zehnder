// components/TextReveal.jsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal() {
  const sectionRef = useRef(null);
  const block1Ref = useRef(null);
  const block2Ref = useRef(null);
  const block3Ref = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    // Set initial state: blocks menutupi penuh (y: 0%)
    gsap.set([block1Ref.current, block2Ref.current, block3Ref.current], {
      y: "0%",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
        markers: false,
      },
    });

    // Animasi slide DOWN (ke bawah) dengan stagger 0.3s
    tl.to(
      block1Ref.current,
      {
        y: "100%", // Slide ke bawah hingga hilang
        duration: 1.2,
        ease: "power1.Out",
      },
      0,
    )
      .to(
        block2Ref.current,
        {
          y: "100%",
          duration: 1.2,
          ease: "power1.Out",
        },
        0.1,
      ) // Mulai 0.3s setelah block 1 mulai
      .to(
        block3Ref.current,
        {
          y: "100%",
          duration: 1.2,
          ease: "power1.Out",
        },
        0.2,
      ); // Mulai 0.3s setelah block 2 mulai (total 0.6s dari awal)

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
        <div className="text-center text-white px-8">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">Text Reveal Animation</h1>
          <p className="text-2xl md:text-3xl opacity-90">Scroll untuk melihat blocks slide down 👇</p>
        </div>
      </div>

      {/* Main Reveal Section */}
      <section ref={sectionRef} className="relative bg-black h-[70vh] xl:h-[120vh] w-full flex select-none overflow-hidden z-20">
        {/* Background Image Layer */}
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80" alt="Background" className="object-cover w-full h-full opacity-90" />
        </div>

        {/* Sliding White Blocks - Overlay (Initial: menutupi penuh) */}
        <div className="absolute top-0 left-0 flex items-start z-30 overflow-hidden w-full">
          {/* Block 1 - Kiri */}
          <div ref={block1Ref} className="movable-block w-[34vw] h-[70vh] md:h-[120vh] bg-white m will-change-transform -mr-1" />

          {/* Block 2 - Tengah */}
          <div ref={block2Ref} className="movable-block w-[34vw] h-[70vh] md:h-[120vh] bg-white  will-change-transform -mr-1" />

          {/* Block 3 - Kanan */}
          <div ref={block3Ref} className="movable-block w-[34vw] h-[70vh] md:h-[120vh] bg-white will-change-transform -mr-1" />
        </div>

        {/* Content Layer */}
        <div className="relative size-full flex flex-col justify-between overflow-hidden py-6 md:py-10">
          <div className="relative w-full flex flex-col gap-4 container mx-auto px-4">
            {/* Main Title */}
            <div className="flex flex-col w-full z-20 mix-blend-plus-lighter overflow-hidden">
              <p className="font-bold text-[15vw] md:text-[15vw] lg:text-[16vw] text-center text-slate-500 uppercase leading-none">AWARENESS</p>
              <div className="w-full h-[2px] bg-slate-500 mt-3" />
            </div>

            {/* Top Links */}
            <div className="flex items-start justify-between z-40 w-full text-white">
              <div className="flex items-center gap-4 md:gap-16 text-base md:text-lg">
                <a href="#" className="group flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="bg-white h-2 w-3" />
                  Apply To Sponsor
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="transition-transform group-hover:translate-x-1">
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  See Tiers
                </a>
              </div>

              <p className="font-medium text-gray-50 self-end max-w-xs text-sm">Trusted by a global community of innovators, advocates, and industry leaders</p>
            </div>
          </div>

          {/* Bottom Description */}
          <div className="container mx-auto px-4 flex w-full">
            <p className="font-bold text-gray-50 text-xl sm:text-3xl md:text-5xl xl:text-[3.5rem] leading-tight">We help mission-aligned organizations accelerate growth, build awareness, and share stories that matter</p>
          </div>
        </div>
      </section>

      {/* Next Section */}
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Content Revealed! ✨</h2>
          <p className="text-2xl text-gray-600">White blocks slid down sequentially</p>
        </div>
      </div>
    </div>
  );
}

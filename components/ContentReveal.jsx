// components/ContentReveal.jsx
"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContentReveal() {
  const sectionRef = useRef(null);
  const part1Ref = useRef(null); // Bagian KIRI
  const part2Ref = useRef(null); // Bagian TENGAH
  const part3Ref = useRef(null); // Bagian KANAN
  const contentRef = useRef(null); // Content text

  useEffect(() => {
    const section = sectionRef.current;
    const part1 = part1Ref.current;
    const part2 = part2Ref.current;
    const part3 = part3Ref.current;
    const content = contentRef.current;

    // Set initial state: gradient tersembunyi dari atas
    gsap.set([part1, part2, part3], {
      clipPath: "inset(0% 0% 100% 0%)", // Tersembunyi dari atas
    });

    // Set initial state: content fade out
    gsap.set(content, {
      opacity: 0,
      y: 50,
    });

    // Timeline dengan ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
        markers: false,
      },
    });

    // Animasi gradient reveal dari ATAS ke BAWAH
    tl.to(part1, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1,
      ease: "power2.inOut",
    })
      .to(
        part2,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.6",
      )
      .to(
        part3,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.6",
      )
      // Setelah gradient selesai, content fade in
      .to(
        content,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4",
      );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900">
        <div className="text-center text-white px-8">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">Gradient Reveal Animation</h1>
          <p className="text-2xl md:text-3xl opacity-90">Gradient reveal dengan content text 👇</p>
        </div>
      </div>

      {/* Section dengan Gradient Background + Content */}
      <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient - Dibagi 3 Bagian */}
        <div className="absolute inset-0 w-full h-full">
          {/* Bagian 1 - KIRI */}
          <div ref={part1Ref} className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-purple-600 via-pink-500 to-rose-400" />

          {/* Bagian 2 - TENGAH */}
          <div ref={part2Ref} className="absolute top-0 left-1/3 w-1/3 h-full bg-gradient-to-br from-pink-500 via-rose-400 to-orange-400" />

          {/* Bagian 3 - KANAN */}
          <div ref={part3Ref} className="absolute top-0 left-2/3 w-1/3 h-full bg-gradient-to-br from-rose-400 via-orange-400 to-amber-400" />
        </div>

        {/* Content Text di Atas Gradient */}
        <div ref={contentRef} className="relative z-10 text-center px-8 max-w-5xl">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 drop-shadow-2xl">Beautiful Gradient</h2>
          <p className="text-2xl md:text-3xl text-white/90 mb-12 drop-shadow-lg leading-relaxed">Gradient background yang reveal dari atas ke bawah dengan animasi smooth menggunakan GSAP dan Lenis</p>

          {/* Cards atau Content Tambahan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-white mb-2">Design</h3>
              <p className="text-white/80">Beautiful gradient colors</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Performance</h3>
              <p className="text-white/80">Smooth animations</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-white mb-2">Effect</h3>
              <p className="text-white/80">Stunning reveal</p>
            </div>
          </div>

          {/* CTA Button */}
          <button className="mt-12 px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:bg-white/90 transition-all hover:scale-105 shadow-2xl">Get Started</button>
        </div>
      </section>

      {/* Section Berikutnya */}
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Gradient Fully Revealed! ✅</h2>
          <p className="text-2xl text-gray-600">Dengan content text yang muncul setelahnya</p>
        </div>
      </div>
    </div>
  );
}

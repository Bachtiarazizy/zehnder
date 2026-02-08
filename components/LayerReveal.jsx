// components/LayerReveal.jsx
"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LayerReveal() {
  const sectionRef = useRef(null);
  const layer1Ref = useRef(null); // Layer KIRI - buka duluan
  const layer2Ref = useRef(null); // Layer TENGAH - buka kedua
  const layer3Ref = useRef(null); // Layer KANAN - buka terakhir

  // useLenis hook (optional)
  const lenis = useLenis(({ scroll, limit, velocity, progress }) => {
    // console.log({ scroll, limit, velocity, progress });
  });

  useEffect(() => {
    const section = sectionRef.current;
    const layer1 = layer1Ref.current;
    const layer2 = layer2Ref.current;
    const layer3 = layer3Ref.current;

    // Timeline dengan ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 50%",
        end: "top 0%",
        scrub: 1,
        markers: false, // Set true untuk debug
      },
    });

    // Animasi dari KIRI ke KANAN
    // Setiap layer buka dari BAWAH ke ATAS (translateY dari 0 ke -100%)

    // Layer 1 (KIRI) - buka duluan dari bawah ke atas
    tl.to(layer1, {
      y: "-100%", // Geser ke atas keluar layar
      duration: 1,
      ease: "power2.inOut",
    })
      // Layer 2 (TENGAH) - buka kedua dari bawah ke atas
      .to(
        layer2,
        {
          y: "-100%",
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.6",
      ) // Overlap sedikit
      // Layer 3 (KANAN) - buka terakhir dari bawah ke atas
      .to(
        layer3,
        {
          y: "-100%",
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.6",
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
          <h1 className="text-6xl md:text-7xl font-bold mb-6">Vertical Layer Reveal</h1>
          <p className="text-2xl md:text-3xl opacity-90">3 Layer Vertikal - Buka dari Bawah ke Atas 👇</p>
        </div>
      </div>

      {/* Section dengan 3 Layer VERTIKAL */}
      <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        {/* Konten yang di-reveal */}
        <div className="z-0 text-center px-8">
          <h2 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">🎨 Revealed!</h2>
          <p className="text-2xl md:text-4xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            3 Layer vertikal membuka dari <span className="font-bold text-purple-600">BAWAH ke ATAS</span>
            <br />
            Dimulai dari layer <span className="font-bold text-blue-600">KIRI</span>!
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <div className="px-6 py-3 bg-purple-600 text-white rounded-full">← Kiri</div>
            <div className="px-6 py-3 bg-blue-600 text-white rounded-full">Tengah</div>
            <div className="px-6 py-3 bg-indigo-600 text-white rounded-full">Kanan →</div>
          </div>
        </div>

        {/* Layer 1 - KIRI (Buka DULUAN dari bawah ke atas) */}
        <div ref={layer1Ref} className="absolute top-0 left-0 w-1/3 h-full bg-purple-600 z-30 flex items-center justify-center">
          <span className="text-white text-4xl font-bold opacity-20 -rotate-90">Layer 1 - Kiri</span>
        </div>

        {/* Layer 2 - TENGAH (Buka KEDUA dari bawah ke atas) */}
        <div ref={layer2Ref} className="absolute top-0 left-1/3 w-1/3 h-full bg-blue-600 z-20 flex items-center justify-center">
          <span className="text-white text-4xl font-bold opacity-20 -rotate-90">Layer 2 - Tengah</span>
        </div>

        {/* Layer 3 - KANAN (Buka TERAKHIR dari bawah ke atas) */}
        <div ref={layer3Ref} className="absolute top-0 left-2/3 w-1/3 h-full bg-indigo-600 z-10 flex items-center justify-center">
          <span className="text-white text-4xl font-bold opacity-20 -rotate-90">Layer 3 - Kanan</span>
        </div>
      </section>

      {/* Section Berikutnya */}
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Animasi Selesai! ✅</h2>
          <p className="text-2xl text-gray-600">Layer vertikal buka dari bawah ke atas</p>
        </div>
      </div>

      {/* Extra Section */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Keep Scrolling... 🚀</h2>
          <p className="text-xl text-gray-600">Smooth scroll dengan Lenis!</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

gsap.registerPlugin(Observer, SplitText);

// RulerTimeline Component
const RulerTimeline = ({ chapters, activeChapter, isDarkBg, timelineRef, onChapterClick }) => {
  const indicatorRef = useRef(null);
  const yearDisplayRef = useRef(null);
  const currentBg = chapters[activeChapter]?.bgColor || chapters[0].bgColor;
  const isDark = isDarkBg(currentBg);

  // Calculate position for the indicator
  const indicatorPosition = activeChapter >= 0 ? (activeChapter / (chapters.length - 1)) * 100 : 0;

  // Animate indicator position with GSAP
  useEffect(() => {
    if (indicatorRef.current && activeChapter >= 0) {
      gsap.to(indicatorRef.current, {
        top: `${indicatorPosition}%`,
        duration: 0.7,
        ease: "power2.out",
      });
    }
  }, [activeChapter, indicatorPosition]);

  // Animate year display
  useEffect(() => {
    if (yearDisplayRef.current && activeChapter >= 0) {
      gsap.fromTo(
        yearDisplayRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
      );
    }
  }, [activeChapter]);

  return (
    <div ref={timelineRef} className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20">
      <div className="relative flex items-center gap-6">
        {/* Active Year Display in the Middle with Background */}
        <div
          ref={yearDisplayRef}
          className="relative px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-300"
          style={{
            backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
            boxShadow: isDark ? "0 4px 20px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)" : "0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.2)",
          }}
        >
          <span className={`text-md font-light tracking-wider transition-colors duration-300 ${isDark ? "text-white" : "text-black"}`}>{chapters[activeChapter]?.year || ""}</span>

          {/* Decorative corner accents */}
          <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-colors duration-300 ${isDark ? "border-white/40" : "border-black/40"}`} />
          <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 transition-colors duration-300 ${isDark ? "border-white/40" : "border-black/40"}`} />
          <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 transition-colors duration-300 ${isDark ? "border-white/40" : "border-black/40"}`} />
          <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-colors duration-300 ${isDark ? "border-white/40" : "border-black/40"}`} />
        </div>

        {/* Vertical ruler */}
        <div className="relative" style={{ height: `${(chapters.length - 1) * 8}rem` }}>
          {/* Main vertical line */}
          <div className={`absolute left-0 top-0 w-0.5 h-full transition-colors duration-300 ${isDark ? "bg-white/30" : "bg-black/30"}`} />

          {/* Tick marks */}
          {chapters.map((chapter, index) => {
            const isActive = index === activeChapter;
            const position = (index / (chapters.length - 1)) * 100;

            return (
              <div
                key={index}
                className={`absolute left-0 transition-all duration-300 cursor-pointer ${isDark ? "bg-white" : "bg-black"}`}
                onClick={() => onChapterClick && onChapterClick(index)}
                style={{
                  top: `${position}%`,
                  transform: "translateY(-50%)",
                  width: isActive ? "20px" : "12px",
                  height: isActive ? "3px" : "1.5px",
                  opacity: isActive ? 1 : 0.4,
                  boxShadow: isActive ? (isDark ? "0 0 16px rgba(255,255,255,0.8)" : "0 0 16px rgba(0,0,0,0.8)") : "none",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function AboutUsPage() {
  const sectionsRef = useRef([]);
  const imagesRef = useRef([]);
  const contentRef = useRef([]);
  const outerWrappersRef = useRef([]);
  const innerWrappersRef = useRef([]);
  const currentIndexRef = useRef(-1);
  const animatingRef = useRef(false);
  const splitTextRef = useRef([]);
  const timelineRef = useRef(null);
  const observerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(-1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const chapters = [
    {
      year: "1331",
      title: "Origins",
      subtitle: "The Beginning in Switzerland",
      description: "Early beginnings in Switzerland's tithe system, marking the family's introduction to finance and land stewardship.",
      logo: "/images/family_crest.webp",
      logoPosition: "center",
      bgColor: "bg-stone-900",
      textColor: "text-stone-100",
    },
    {
      year: "1800s",
      title: "Frankfurt's Early Development",
      subtitle: "Financial Center Influence",
      description: "Influence in Frankfurt's financial center and directorship of local mills.",
      media: [{ src: "/images/paul_kramer.webp", position: "top-right" }],
      logo: "/images/hafenmuhle_1.webp",
      logoPosition: "center",
      bgColor: "bg-stone-100",
      textColor: "text-stone-900",
    },
    {
      year: "1920s",
      title: "Zehnder Mechanik, Junghofstraße",
      subtitle: "Industrial Foundation",
      description: "Founding of Zehnder Mechanik in central Frankfurt.",
      media: [{ src: "/images/friedrich_zehnder.webp", position: "top" }],
      logo: "/images/zehnder_mechanik.webp",
      logoPosition: "top",
      bgColor: "bg-amber-50",
      textColor: "text-stone-900",
    },
    {
      year: "1945-1960",
      title: "Post-War Industrial Reconstruction",
      subtitle: "Frankfurt's Recovery",
      description: "Establishment of Zehnder Pumpen after WWII, contributing to Frankfurt's industrial recovery.",
      media: [
        { src: "/images/zehnder_pumps_1.webp", position: "top-left" },
        { src: "/images/zehnder_pumps_2.webp", position: "top-right" },
      ],
      logo: "/images/chapter_4_logo.webp",
      logoPosition: "center",
      bgColor: "bg-slate-800",
      textColor: "text-slate-100",
    },
    {
      year: "1990s",
      title: "Germany's Reunification",
      subtitle: "Rebuilding Saxony's Industrial Sector",
      description: "Acquisition of factories and support in rebuilding East-Germany's industrial sector, including Electric Motor, Pump and Cable Production.",
      media: [
        { src: "/images/Zehnder_pumps_3.webp", position: "center" },
        { src: "/images/Zehnder_pumps_4.webp", position: "bottom-left" },
      ],
      logo: "/images/chapter_5_logo.png",
      logoPosition: "center",
      bgColor: "bg-neutral-100",
      textColor: "text-neutral-900",
    },
    {
      year: "Today",
      title: "Today's Responsibility",
      subtitle: "Heritage & Stewardship",
      description: "The family now carries its heritage forward into a dynamic real-estate market, guided by the principles of stewardship and continuity.",
      media: [{ src: "/images/lennart_zehnder.webp", position: "top-left" }],
      logo: "/images/ZEHNDER__ICON_GOLD.svg",
      logoPosition: "center",
      bgColor: "bg-stone-900",
      textColor: "text-stone-100",
    },
  ];

  // Helper function to get object position classes
  const getObjectPosition = (position) => {
    const positions = {
      center: "object-center",
      top: "object-top",
      bottom: "object-bottom",
      left: "object-left",
      right: "object-right",
      "top-left": "object-left-top",
      "top-right": "object-right-top",
      "bottom-left": "object-left-bottom",
      "bottom-right": "object-right-bottom",
      "center-left": "object-left",
      "center-right": "object-right",
    };
    return positions[position] || "object-center";
  };

  // Helper function to get logo alignment classes
  const getLogoAlignment = (position) => {
    const alignments = {
      center: "items-center",
      top: "items-start pt-20",
      bottom: "items-end pb-20",
    };
    return alignments[position] || "items-center";
  };

  // Helper function to determine if background is dark
  const isDarkBg = (bgColor) => {
    return bgColor.includes("900") || bgColor.includes("800");
  };

  // Handle chapter click from timeline
  const handleChapterClick = (index) => {
    if (!animatingRef.current && index !== currentIndexRef.current) {
      const direction = index > currentIndexRef.current ? 1 : -1;
      gotoSection(index, direction);
    }
  };

  useEffect(() => {
    // Initialize SplitText for titles
    splitTextRef.current = contentRef.current.map((content) => {
      const title = content?.querySelector(".chapter-title");
      return title ? new SplitText(title, { type: "chars,words" }) : null;
    });

    // Set initial positions
    gsap.set(outerWrappersRef.current, { yPercent: 100 });
    gsap.set(innerWrappersRef.current, { yPercent: -100 });

    const wrap = gsap.utils.wrap(0, chapters.length);

    function gotoSection(index, direction) {
      index = wrap(index);
      animatingRef.current = true;
      setActiveChapter(index);

      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;
      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => (animatingRef.current = false),
      });

      if (currentIndexRef.current >= 0) {
        gsap.set(sectionsRef.current[currentIndexRef.current], { zIndex: 0 });
        tl.to(imagesRef.current[currentIndexRef.current], {
          yPercent: -15 * dFactor,
        }).set(sectionsRef.current[currentIndexRef.current], { autoAlpha: 0 });
      }

      gsap.set(sectionsRef.current[index], { autoAlpha: 1, zIndex: 1 });

      tl.fromTo(
        [outerWrappersRef.current[index], innerWrappersRef.current[index]],
        {
          yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
        },
        {
          yPercent: 0,
        },
        0,
      ).fromTo(imagesRef.current[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);

      // Animate content
      if (splitTextRef.current[index]) {
        tl.fromTo(
          splitTextRef.current[index].chars,
          {
            autoAlpha: 0,
            yPercent: 150 * dFactor,
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2",
            stagger: {
              each: 0.02,
              from: "random",
            },
          },
          0.2,
        );
      }

      // Animate other content elements
      const contentElements = contentRef.current[index]?.querySelectorAll(".animate-content");
      if (contentElements) {
        tl.fromTo(contentElements, { autoAlpha: 0, y: 50 * dFactor }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0.4);
      }

      currentIndexRef.current = index;
    }

    // Expose gotoSection to parent scope
    window.gotoSection = gotoSection;

    // Create Observer
    observerRef.current = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => !animatingRef.current && gotoSection(currentIndexRef.current - 1, -1),
      onUp: () => !animatingRef.current && gotoSection(currentIndexRef.current + 1, 1),
      tolerance: 10,
      preventDefault: true,
    });

    // Initialize first section
    gotoSection(0, 1);

    // Cleanup
    return () => {
      splitTextRef.current.forEach((split) => split?.revert());
      if (observerRef.current) {
        observerRef.current.kill();
      }
    };
  });

  return (
    <div className="fixed inset-0 overflow-hidden select-none bg-stone-900">
      {/* Header - Only show on first chapter (chapter 1 / index 0) */}
      {activeChapter === 0 && <Navbar />}

      {/* Ruler Timeline */}
      <RulerTimeline chapters={chapters} activeChapter={activeChapter} isDarkBg={isDarkBg} timelineRef={timelineRef} onChapterClick={handleChapterClick} />

      {/* Sections */}
      {chapters.map((chapter, index) => (
        <section key={index} ref={(el) => (sectionsRef.current[index] = el)} className="fixed top-0 left-0 w-full h-full invisible">
          <div ref={(el) => (outerWrappersRef.current[index] = el)} className="w-full h-full overflow-hidden">
            <div ref={(el) => (innerWrappersRef.current[index] = el)} className="w-full h-full overflow-hidden">
              <div ref={(el) => (imagesRef.current[index] = el)} className={`absolute top-0 left-0 w-full h-full ${chapter.bgColor}`}>
                <div className="container mx-auto h-full px-8 lg:px-16 flex items-center">
                  {/* Grid: 35% left, 65% right */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full">
                    {/* Left Side - Logo (35%) - FIXED: Using Next.js Image */}
                    <div className={`lg:col-span-4 flex ${getLogoAlignment(chapter.logoPosition)} justify-start`}>
                      <div className="w-48 h-48 lg:w-80 lg:h-80 relative flex items-center justify-center">
                        {chapter.logo.endsWith(".svg") ? (
                          // For SVG, use regular img tag
                          <img src={chapter.logo} alt={`${chapter.title} logo`} className="max-w-full max-h-full object-contain shadow-md" />
                        ) : (
                          // For other images, use Next.js Image with fill
                          <Image src={chapter.logo} alt={`${chapter.title} logo`} fill className="object-contain shadow-md" sizes="(max-width: 768px) 192px, 320px" priority={index === 0} />
                        )}
                      </div>
                    </div>

                    {/* Right Side - Content (65%) */}
                    <div ref={(el) => (contentRef.current[index] = el)} className={`lg:col-span-8 flex flex-col justify-center ${chapter.textColor}`}>
                      <div className="animate-content mb-3 text-sm lg:text-base font-light tracking-widest opacity-70">{chapter.year}</div>
                      <h2 className="chapter-title text-2xl font-semibold lg:text-4xl  mb-4 leading-tight">{chapter.title}</h2>
                      <p className="animate-content text-base lg:text-lg font-light leading-relaxed mb-8 opacity-90 max-w-xl">{chapter.description}</p>
                      {/* Media Preview with Custom Positioning */}
                      {chapter.media && chapter.media.length > 0 && (
                        <div className="animate-content mt-8">
                          {/* Single Image or Two Images - Same Layout */}
                          {chapter.media.length <= 2 && (
                            <div className="grid grid-cols-2 gap-4 max-w-3xl">
                              {chapter.media.map((media, idx) => (
                                <div key={idx} className="aspect-square bg-black/10 rounded overflow-hidden relative">
                                  <Image
                                    src={media.src}
                                    alt={`${chapter.title} media ${idx + 1}`}
                                    fill
                                    className={`object-cover opacity-80 hover:opacity-100 transition-opacity ${getObjectPosition(media.position)}`}
                                    sizes="(max-width: 768px) 50vw, 384px"
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Three or More Images */}
                          {chapter.media.length >= 3 && (
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
                              {chapter.media.map((media, idx) => (
                                <div key={idx} className="aspect-square bg-black/10 rounded overflow-hidden relative">
                                  <Image
                                    src={media.src}
                                    alt={`${chapter.title} media ${idx + 1}`}
                                    fill
                                    className={`object-cover opacity-80 hover:opacity-100 transition-opacity ${getObjectPosition(media.position)}`}
                                    sizes="(max-width: 1024px) 50vw, 33vw"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <style jsx global>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400;500;600&display=swap");

          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            padding: 0;
            font-family: "Source Code Pro", monospace;
          }
        `}
      </style>
    </div>
  );
}

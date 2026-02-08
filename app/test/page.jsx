"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(Observer, SplitText);

export default function AnimatedSections() {
  const sectionsRef = useRef([]);
  const imagesRef = useRef([]);
  const headingsRef = useRef([]);
  const outerWrappersRef = useRef([]);
  const innerWrappersRef = useRef([]);
  const currentIndexRef = useRef(-1);
  const animatingRef = useRef(false);
  const splitHeadingsRef = useRef([]);

  const sections = [
    {
      title: "Scroll down",
      image: "https://assets.codepen.io/16327/site-landscape-1.jpg",
    },
    {
      title: "Animated with GSAP",
      image: "https://assets.codepen.io/16327/site-landscape-2.jpg",
    },
    {
      title: "GreenSock",
      image: "https://assets.codepen.io/16327/site-landscape-3.jpg",
    },
    {
      title: "Animation platform",
      image: "https://assets.codepen.io/16327/site-landscape-4.jpg",
    },
    {
      title: "Keep scrolling",
      image: "https://assets.codepen.io/16327/site-landscape-5.jpg",
    },
  ];

  useEffect(() => {
    // Initialize SplitText
    splitHeadingsRef.current = headingsRef.current.map(
      (heading) =>
        new SplitText(heading, {
          type: "chars,words,lines",
          linesClass: "clip-text",
        }),
    );

    // Set initial positions
    gsap.set(outerWrappersRef.current, { yPercent: 100 });
    gsap.set(innerWrappersRef.current, { yPercent: -100 });

    const wrap = gsap.utils.wrap(0, sections.length);

    function gotoSection(index, direction) {
      index = wrap(index);
      animatingRef.current = true;

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
      )
        .fromTo(imagesRef.current[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
        .fromTo(
          splitHeadingsRef.current[index].chars,
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

      currentIndexRef.current = index;
    }

    // Create Observer
    Observer.create({
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
      splitHeadingsRef.current.forEach((split) => split.revert());
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden select-none">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-[5%] h-28 text-white uppercase tracking-[0.5em] text-[clamp(0.66rem,2vw,1rem)]">
        <div>Animated Sections</div>
        <div>
          <a href="https://codepen.io/BrianCross/pen/PoWapLP" className="text-white no-underline">
            Original Inspiration
          </a>
        </div>
      </header>

      {/* Sections */}
      {sections.map((section, index) => (
        <section key={index} ref={(el) => (sectionsRef.current[index] = el)} className="fixed top-0 left-0 w-full h-full invisible">
          <div ref={(el) => (outerWrappersRef.current[index] = el)} className="w-full h-full overflow-y-hidden">
            <div ref={(el) => (innerWrappersRef.current[index] = el)} className="w-full h-full overflow-y-hidden">
              <div
                ref={(el) => (imagesRef.current[index] = el)}
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%), url(${section.image})`,
                  backgroundPosition: index === 4 ? "50% 45%" : "center",
                }}
              >
                <h2 ref={(el) => (headingsRef.current[index] = el)} className="z-[999] text-[clamp(1rem,6vw,10rem)] font-semibold leading-tight text-center -mr-[0.5em] w-[90vw] max-w-[1200px] normal-case text-white">
                  {section.title}
                </h2>
              </div>
            </div>
          </div>
        </section>
      ))}

      <style jsx global>{`
        .clip-text {
          overflow: hidden;
        }
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          padding: 0;
          height: 100vh;
        }
      `}</style>
    </div>
  );
}

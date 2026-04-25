import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Instantly move the dot
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    // Smoothly interpolate the outer ring
    gsap.ticker.add(() => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      gsap.set(cursor, { x: cursorX, y: cursorY });
    });

    const onMouseDown = () => {
      gsap.to(cursor, { scale: 0.8, duration: 0.2 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Hover effect for links
    const handleHover = () => gsap.to(cursor, { scale: 2.5, backgroundColor: "rgba(255,255,255,0.1)", border: "none", duration: 0.3 });
    const handleLeave = () => gsap.to(cursor, { scale: 1, backgroundColor: "transparent", border: "1px solid rgba(255, 255, 255, 0.4)", duration: 0.3 });

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: -16,
          left: -16,
          width: 32,
          height: 32,
          border: "1px solid rgba(255, 255, 255, 0.4)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: -3,
          left: -3,
          width: 6,
          height: 6,
          backgroundColor: "#fff",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
    </>
  );
};

export const MagneticWrapper = ({ children, className = "" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: "power3.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
};

export const InfiniteMarquee = () => {
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        <span>High Performance</span>
        <span className="dot">•</span>
        <span>SEO Optimized</span>
        <span className="dot">•</span>
        <span>Premium UI/UX</span>
        <span className="dot">•</span>
        <span>Custom 3D Experiences</span>
        <span className="dot">•</span>
        <span>Robust Architecture</span>
        <span className="dot">•</span>
      </div>
      <div className="marquee-content" aria-hidden="true">
        <span>High Performance</span>
        <span className="dot">•</span>
        <span>SEO Optimized</span>
        <span className="dot">•</span>
        <span>Premium UI/UX</span>
        <span className="dot">•</span>
        <span>Custom 3D Experiences</span>
        <span className="dot">•</span>
        <span>Robust Architecture</span>
        <span className="dot">•</span>
      </div>
    </div>
  );
};

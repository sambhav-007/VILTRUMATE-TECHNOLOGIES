import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { Timer } from "three/src/core/Timer.js";

// 3D Phone Component that follows cursor
const Phone3D = ({ cursorX, cursorY }) => {
  const phoneRef = useRef(null);
  const timer = useMemo(() => new Timer(), []);

  // Create canvas texture for phone screen - Static mobile landing page
  const createScreenTexture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 2340;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return new THREE.CanvasTexture(canvas);
    }

    const roundedRect = (x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    roundedRect(18, 18, canvas.width - 36, canvas.height - 36, 96);
    ctx.clip();

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#f8f9fc");
    gradient.addColorStop(1, "#eef1f6");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Status bar
    ctx.fillStyle = "#111623";
    ctx.font = "600 30px Montserrat";
    ctx.fillText("9:41", 80, 92);
    ctx.fillStyle = "#566074";
    ctx.font = "500 24px Montserrat";
    ctx.fillText("5G", 910, 92);
    ctx.fillText("100%", 955, 92);

    // Header
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(56, 122, 968, 110);
    ctx.strokeStyle = "rgba(19, 26, 39, 0.08)";
    ctx.lineWidth = 2;
    ctx.strokeRect(56, 122, 968, 110);
    ctx.fillStyle = "#111a2b";
    ctx.font = "700 44px Montserrat";
    ctx.fillText("VILTRUMATE", 90, 193);
    ctx.fillStyle = "#697287";
    ctx.font = "600 27px Montserrat";
    ctx.fillText("Menu", 902, 193);

    // Hero block
    const hero = ctx.createLinearGradient(72, 276, 1008, 830);
    hero.addColorStop(0, "#151d2b");
    hero.addColorStop(1, "#223149");
    ctx.fillStyle = hero;
    ctx.fillRect(72, 276, 936, 520);

    ctx.fillStyle = "#d6deec";
    ctx.font = "600 26px Montserrat";
    ctx.fillText("PREMIUM DIGITAL STUDIO", 110, 346);
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 72px Montserrat";
    ctx.fillText("Build a", 110, 454);
    ctx.fillText("Brand People", 110, 548);
    ctx.fillText("Trust", 110, 640);
    ctx.fillStyle = "rgba(236, 241, 249, 0.84)";
    ctx.font = "500 34px Montserrat";
    ctx.fillText("Design, speed, conversion - all in one.", 110, 720);

    ctx.fillStyle = "#edf2fa";
    ctx.fillRect(110, 736, 410, 88);
    ctx.fillStyle = "#172136";
    ctx.font = "700 31px Montserrat";
    ctx.fillText("Get Started", 205, 792);

    // Service cards (cleaner and larger for readability)
    const cardY = [886, 1148];
    const cardTitle = ["Static & Dynamic Sites", "SEO + Analytics Setup"];
    const cardCopy = ["Fast and reliable builds", "Track every visitor"];

    cardY.forEach((y, i) => {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(72, y, 936, 230);
      ctx.strokeStyle = "rgba(17, 24, 39, 0.1)";
      ctx.lineWidth = 2;
      ctx.strokeRect(72, y, 936, 230);
      ctx.fillStyle = "#121b2b";
      ctx.font = "700 50px Montserrat";
      ctx.fillText(cardTitle[i], 112, y + 94);
      ctx.fillStyle = "#5e687c";
      ctx.font = "500 33px Montserrat";
      ctx.fillText(cardCopy[i], 112, y + 160);
    });

    // Consultancy block + CTA
    ctx.fillStyle = "#111b2d";
    ctx.fillRect(72, 1428, 936, 360);
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 66px Montserrat";
    ctx.fillText("Get Free", 112, 1538);
    ctx.fillText("Consultancy", 112, 1622);
    ctx.fillStyle = "#c8d4e9";
    ctx.font = "500 31px Montserrat";
    ctx.fillText("Let's build your next high-converting site.", 112, 1684);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(112, 1698, 856, 96);
    ctx.fillStyle = "#121c2e";
    ctx.font = "700 36px Montserrat";
    ctx.fillText("Call Us", 474, 1760);

    // Footer
    ctx.fillStyle = "#6b7488";
    ctx.font = "500 25px Montserrat";
    ctx.fillText("Services  •  Portfolio  •  Contact", 198, 1888);
    ctx.fillText("viltrumate-technologies.com", 280, 1934);

    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  };

  const screenTexture = useMemo(() => createScreenTexture(), []);

  useFrame(() => {
    if (phoneRef.current) {
      timer.update();
      const isDesktop = typeof window !== "undefined" && window.innerWidth >= 900;
      const centeredX = THREE.MathUtils.clamp((cursorX - 0.5) * 2, -1, 1);
      const centeredY = THREE.MathUtils.clamp((cursorY - 0.5) * 2, -1, 1);

      // Keep desktop tilt expressive but slightly more controlled than before.
      const targetRotationX = centeredY * (isDesktop ? 0.58 : 0.5);
      const targetRotationY = centeredX * (isDesktop ? 0.69 : 0.6);
      const targetRotationZ = centeredX * (isDesktop ? 0.11 : 0.08);
      const smoothFactor = isDesktop ? 0.1 : 0.08;

      phoneRef.current.rotation.x +=
        (targetRotationX - phoneRef.current.rotation.x) * smoothFactor;
      phoneRef.current.rotation.y +=
        (targetRotationY - phoneRef.current.rotation.y) * smoothFactor;
      phoneRef.current.rotation.z +=
        (targetRotationZ - phoneRef.current.rotation.z) * smoothFactor;

      // Subtle floating animation
      phoneRef.current.position.y =
        Math.sin(timer.getElapsed() * 0.5) * 0.09;
    }
  });

  return (
    <group ref={phoneRef}>
      {/* Phone body */}
      <RoundedBox args={[0.86, 1.68, 0.12]} radius={0.088} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#0a0a0a"
          metalness={0.8}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>

      {/* Screen */}
      <mesh position={[0, 0, 0.0655]}>
        <planeGeometry args={[0.776, 1.575]} />
        <meshBasicMaterial map={screenTexture} transparent toneMapped={false} />
      </mesh>

      {/* Glossy overlay */}
      <RoundedBox args={[0.8, 1.62, 0.016]} radius={0.074} position={[0, 0, 0.0185]}>
        <meshPhysicalMaterial
          transparent
          opacity={0.15}
          metalness={0.5}
          roughness={0.3}
          clearcoat={1}
          clearcoatRoughness={0.2}
        />
      </RoundedBox>

      {/* Dynamic island */}
      <RoundedBox args={[0.232, 0.053, 0.02]} radius={0.024} position={[0, 0.712, 0.08]}>
        <meshPhysicalMaterial
          color="#050505"
          metalness={0.35}
          roughness={0.42}
          clearcoat={0.15}
        />
      </RoundedBox>
      <mesh position={[0.053, 0.712, 0.091]}>
        <circleGeometry args={[0.009, 24]} />
        <meshPhysicalMaterial color="#111820" metalness={0.6} roughness={0.25} />
      </mesh>
      <mesh position={[-0.041, 0.712, 0.091]}>
        <circleGeometry args={[0.0058, 20]} />
        <meshStandardMaterial color="#0b0b0b" metalness={0.2} roughness={0.6} />
      </mesh>

      {/* Side button (sleek power key) */}
      <RoundedBox args={[0.014, 0.165, 0.028]} radius={0.0065} position={[-0.432, 0.31, 0.053]}>
        <meshPhysicalMaterial
          color="#9aa0a8"
          metalness={1}
          roughness={0.16}
          clearcoat={0.85}
          clearcoatRoughness={0.12}
        />
      </RoundedBox>
      <RoundedBox args={[0.005, 0.14, 0.014]} radius={0.002} position={[-0.4285, 0.31, 0.067]}>
        <meshPhysicalMaterial color="#f2f4f7" metalness={1} roughness={0.1} />
      </RoundedBox>

      {/* Volume buttons (sleek split keys) */}
      <RoundedBox args={[0.013, 0.104, 0.026]} radius={0.006} position={[-0.432, 0.094, 0.053]}>
        <meshPhysicalMaterial
          color="#959ca5"
          metalness={1}
          roughness={0.18}
          clearcoat={0.8}
          clearcoatRoughness={0.14}
        />
      </RoundedBox>
      <RoundedBox args={[0.013, 0.104, 0.026]} radius={0.006} position={[-0.432, -0.074, 0.053]}>
        <meshPhysicalMaterial
          color="#959ca5"
          metalness={1}
          roughness={0.18}
          clearcoat={0.8}
          clearcoatRoughness={0.14}
        />
      </RoundedBox>
    </group>
  );
};

// Canvas wrapper with cursor tracking
const Phone3DCanvas = () => {
  const [cursorX, setCursorX] = useState(0.5);
  const [cursorY, setCursorY] = useState(0.5);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorX(e.clientX / window.innerWidth);
      setCursorY(e.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, 5, 5]} intensity={0.6} color="#8888ff" />
      <Phone3D cursorX={cursorX} cursorY={cursorY} />
    </Canvas>
  );
};

export default Phone3DCanvas;

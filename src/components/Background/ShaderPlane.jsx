// A shader plane component that renders dynamic background effects
// Handles touch and mouse interactions for trail rendering and color transitions
// Personal website and portfolio 
// Mark Lisanti - 2026

import { useMemo, useRef, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { mouse } from "@/utils/mouse.util";

//shaders
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

const ShaderPlane = ({ color1, color2, bgIntensity }) => {
  const matRef = useRef();
  const trailRef = useRef([]);
  const lastRef = useRef(null);
  const { viewport, size } = useThree();

  // TOUCH TEXTURE
  const touchTexture = useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    return { size, canvas, ctx, texture, maxAge: 64, radius: size * 0.3, speed: 1 / 64 };
  }, []);


  // HELPERS
  const clearTexture = useCallback(() => {
    const { ctx, size } = touchTexture;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, size, size);
  }, [touchTexture]);

  const addTouch = useCallback((point) => {
    let force = 0;
    let vx = 0;
    let vy = 0;

    const last = lastRef.current;

    if (last) {
      const dx = point.x - last.x;
      const dy = point.y - last.y;
      if (dx === 0 && dy === 0) return;

      const dd = dx * dx + dy * dy;
      const d = Math.sqrt(dd);

      vx = dx / d;
      vy = dy / d;

      force = Math.min(dd * 20000, 2);
    }

    lastRef.current = { x: point.x, y: point.y };
    trailRef.current.push({ x: point.x, y: point.y, age: 0, force, vx, vy });
  }, []);

  const drawPoint = useCallback((point) => {
    const { ctx, size, radius, maxAge } = touchTexture;
    const pos = { x: point.x * size, y: (1 - point.y) * size };

    let intensity = 1;

    if (point.age < maxAge * 0.3) {
      intensity = Math.sin((point.age / (maxAge * 0.3)) * (Math.PI / 2));
    } else {
      const t = 1 - (point.age - maxAge * 0.3) / (maxAge * 0.7);
      intensity = -t * (t - 2);
    }

    intensity *= point.force;
    const offset = size * 5;

    ctx.shadowOffsetX = offset;
    ctx.shadowOffsetY = offset;
    ctx.shadowBlur = radius;
    ctx.shadowColor = `rgba(255, 255, 255, ${0.2 * intensity})`;
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
    ctx.fill();
  },
    [touchTexture]
  );

  const updateTouchTexture = useCallback(() => {
    clearTexture();
    const trail = trailRef.current;

    for (let i = trail.length - 1; i >= 0; i--) {
      const point = trail[i];
      const f = point.force * touchTexture.speed * (1 - point.age / touchTexture.maxAge);

      point.x += point.vx * f;
      point.y += point.vy * f;
      point.age++;

      if (point.age > touchTexture.maxAge) {
        trail.splice(i, 1);
      } else {
        drawPoint(point);
      }
    }

    touchTexture.texture.needsUpdate = true;
  }, [clearTexture, drawPoint, touchTexture]);

  // GLOBAL POINTER
  useEffect(() => {
    const interval = setInterval(() => { addTouch({ x: (mouse.x + 1) * 0.5, y: (mouse.y + 1) * 0.5 }) }, 16);

    return () =>
      clearInterval(interval);
  }, [addTouch]);

  useGSAP(
    () => {
      if (!matRef.current) return;

      const shader = matRef.current;

      const c1 = new THREE.Color(color1);
      const c2 = new THREE.Color(color2);

      gsap.to(shader.uniforms.uColor1.value, { r: c1.r, g: c1.g, b: c1.b, duration: 1, ease: "power2.inOut" });
      gsap.to(shader.uniforms.uColor2.value, { r: c2.r, g: c2.g, b: c2.b, duration: 1, ease: "power2.inOut" });
    },
    {
      dependencies: [color1, color2],
    }
  );

  useEffect(() => {
    if (!matRef.current) return;
    
    matRef.current.uniforms.uBgIntensity.value = bgIntensity;
  }, [bgIntensity]);

  // FRAME LOOP
  useFrame(({ clock }) => {
    if (!matRef.current) return;
    updateTouchTexture();
    matRef.current.uniforms.iTime.value = clock.elapsedTime;
    matRef.current.uniforms.iResolution.value.set(size.width, size.height);
    matRef.current.uniforms.uTouchTexture.value = touchTexture.texture;
  });

  // RENDER

  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      uTouchTexture: { value: touchTexture.texture },
      uColor1: { value: new THREE.Color(color1) },
      uColor2: { value: new THREE.Color(color2) },
      uBgIntensity: { value: bgIntensity },
    }),
    []);

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial ref={matRef} transparent vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
    </mesh>
  );
};

export default ShaderPlane;
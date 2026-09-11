// Wraps the React Three Fiber canvas for the portrait scene, setting up refs and performance settings
// https://github.com/maybeitsmark 
// 2026

import { createRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
// components
import Composition from "@/components/Portrait/Composition";
import { useAppLayout } from "@/hooks/app_layout.hook";
import { useIsMobile } from "@/hooks/is_mobile.hook";
// css
import "./composition_canvas.css";

const CompositionCanvas = () => {
  const { layout } = useAppLayout();
  const { isMobile } = useIsMobile();
  const sceneRefs = useMemo(() => ({
    container: createRef<HTMLDivElement>(),
    neutralCenter: { current: new THREE.Vector3() },
    light: createRef<THREE.Light>(),
    model: createRef<THREE.Group>(),
    morphs: { current: null as any },
  }), []);

  return (
    <div ref={sceneRefs.container} className="portrait-canvas">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 55 }} shadows dpr={[1, 2]} gl={{ antialias: true, powerPreference: "high-performance" }} style={{ pointerEvents: "none" }}>
        <Composition sceneRefs={sceneRefs} layout={layout} isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default CompositionCanvas; 


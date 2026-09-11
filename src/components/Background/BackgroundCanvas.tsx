// Reactive WebGL background canvas for specific project - dynamically applies theme colors and intensity from project data or defaults via ShaderPlane component
// Personal website and portfolio 
// Mark Lisanti - 2026

import { Canvas } from "@react-three/fiber";
import ShaderPlane from "./ShaderPlane";
import { useAppLayout } from "@/hooks/app_layout.hook";
import { projects } from "@/data/projects";
import { DEFAULT_PROJECT_THEME } from "@/utils/default_theme.util";

const BackgroundCanvas = () => {
  const { projectSlug } = useAppLayout();

  const project = projectSlug ? projects[projectSlug as keyof typeof projects] : undefined;
  const background = project?.theme?.background ?? DEFAULT_PROJECT_THEME.background;
  
  return (
    <Canvas frameloop="always" dpr={[1, 1.5]} gl={{ alpha: true, antialias: false,  powerPreference: "high-performance" }} style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}>
      <ShaderPlane color1={background.color1} color2={background.color2} bgIntensity={background.intensity}/>
    </Canvas>
  );
};

export default BackgroundCanvas;
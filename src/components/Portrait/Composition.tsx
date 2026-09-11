// Manages React Three Fiber scene composition, integrating scroll based morphs, rig animations, and lighting effects
// https://github.com/maybeitsmark 
// 2026

// hooks
import { useCallback, useState } from "react";
import { useSceneRigAnimation } from "@/hooks/rig_animation.hook";
import { useMorphAnimation } from "@/hooks/morph_animation.hook";
import { useScrollMorph } from "@/hooks/scroll_morph.hook";
// assets
import Model from "./Model";
import KeyLight from "./Keylight";

const Composition = ({ sceneRefs, layout, isMobile }: any) => {
  const [modelReady, setModelReady] = useState(false);
  const handleModelReady = useCallback(() => setModelReady(true), []);
  const isProjectsRoute = isMobile || layout === "projects" || layout === "project-detail";

  useScrollMorph({ morphsRef: sceneRefs.morphs, isProjectsRoute });
  useSceneRigAnimation({ sceneRefs, layout, isMobile, ready: modelReady });
  useMorphAnimation({ morphsRef: sceneRefs.morphs, layout, isMobile });

  return (
    <>
      <KeyLight brightness={3.4} color={"#ffecec"} ref={sceneRefs.light} />
      <Model ref={sceneRefs.model} morphsRef={sceneRefs.morphs} neutralCenter={sceneRefs.neutralCenter} trackPointer={!isMobile} limitToView={!isMobile && layout !== "project-detail"} onReady={handleModelReady} visible={false} />
    </>
  );
};

export default Composition;

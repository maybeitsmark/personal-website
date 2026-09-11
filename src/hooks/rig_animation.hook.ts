import { useLayoutEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import { joinHorizontalTransition, TRANSITION_DURATION } from "@/utils/transition_lock.util";
import { limitPortraitBaseYaw } from "@/utils/portrait_rotation.util";

interface RigAnimationProps {
  sceneRefs: any;
  layout: string;
  isMobile?: boolean;
  ready: boolean;
}

export const useSceneRigAnimation = ({ sceneRefs, layout, isMobile = false, ready }: RigAnimationProps) => {
  const previous = useRef<{ layout: string; isMobile: boolean } | null>(null);
  const bounds = useRef<THREE.Box3 | null>(null);
  const { width, height } = useThree((state) => state.size);
  const cam = useThree((state) => state.camera);

  useLayoutEffect(() => {
    const light = sceneRefs.light.current;
    const model = sceneRefs.model.current;
    if (!ready || !(cam instanceof THREE.PerspectiveCamera) || !light || !model || width <= 0 || height <= 0) return;
    // Use the measured canvas aspect before first reveal, including when the
    // mobile viewport changes while the GLTF is still loading.
    cam.aspect = width / height;
    cam.updateProjectionMatrix();

    // Measure neutral vertices in model-local space. GLTF bounding boxes include
    // the full morph extents, which otherwise skew both centering and scaling.
    if (!bounds.current) {
      model.updateWorldMatrix(true, true);
      const inverse = model.matrixWorld.clone().invert();
      const box = new THREE.Box3();
      const point = new THREE.Vector3();
      model.traverse((child: THREE.Object3D) => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;
        const positions = mesh.geometry.attributes.position;
        const matrix = new THREE.Matrix4().multiplyMatrices(inverse, mesh.matrixWorld);
        for (let i = 0; i < positions.count; i++) {
          point.fromBufferAttribute(positions, i).applyMatrix4(matrix);
          box.expandByPoint(point);
        }
      });
      bounds.current = box;
      box.getCenter(sceneRefs.neutralCenter.current);
    }

    const small = isMobile || layout === "project-detail";
    const cameraZ = 4.5;
    const worldHeight = 2 * cameraZ * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
    const pixelsPerUnit = height / worldHeight;
    const worldWidth = width / pixelsPerUnit;
    const navbarHeight = document.querySelector(".navbar")?.getBoundingClientRect().height ?? 50;
    const cameraX = small ? 0 : (layout === "home" ? -1 : 1) * worldWidth / 4;
    const viewYaw = Math.atan2(cameraX, cameraZ);
    // Preserve the existing three-quarter pose while centering at 25% / 75%
    // of the canvas at every aspect ratio.
    const rotation = new THREE.Euler(
      small ? 0.25 : 0,
      small ? 0.75 : limitPortraitBaseYaw(Math.atan2(layout === "home" ? -2.125 : 2.125, cameraZ) * 1.25, viewYaw),
      0,
    );
    const posedBounds = bounds.current!.clone().applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(rotation));
    const size = posedBounds.getSize(new THREE.Vector3());
    const center = posedBounds.getCenter(new THREE.Vector3());
    const scale = small
      ? 75 / (size.y * pixelsPerUnit)
      : Math.min(1, (height - navbarHeight) * 0.82 / (size.y * pixelsPerUnit), width * 0.4 / (size.x * pixelsPerUnit));
    const cameraY = small ? 0 : navbarHeight / (2 * pixelsPerUnit);
    const modelX = -center.x * scale + (small ? -worldWidth / 2 + 8 / pixelsPerUnit + size.x * scale / 2 : 0);
    const modelY = -center.y * scale + (small ? worldHeight / 2 - 8 / pixelsPerUnit - size.y * scale / 2 : 0);
    const modelZ = -center.z * scale;

    const targets = [
      [cam.position, { x: cameraX, y: cameraY, z: cameraZ }],
      [light.position, { x: small ? 0 : cameraX, y: small ? 3 : 2, z: small ? 3 : 2 }],
      [model.position, { x: modelX, y: modelY, z: modelZ }],
      [model.rotation, { x: rotation.x, y: rotation.y, z: rotation.z }],
      [model.scale, { x: scale, y: scale, z: scale }],
    ] as const;

    const complete = joinHorizontalTransition();
    // Initial placement and ordinary resizing are immediate. In particular,
    // Strict Mode must never replay a tween from an unpositioned camera/model.
    const animate = previous.current !== null &&
      (previous.current.layout !== layout || previous.current.isMobile !== isMobile);
    const timeline = gsap.timeline({ onComplete: complete });
    targets.forEach(([target, values]) => {
      gsap.killTweensOf(target);
      if (!animate) gsap.set(target, values);
      else timeline.to(target, { ...values, duration: TRANSITION_DURATION, ease: "power2.inOut" }, 0);
    });
    model.visible = true;
    cam.updateMatrixWorld();
    model.updateWorldMatrix(true, true);
    const reveal = gsap.to(sceneRefs.container.current, {
      opacity: 1,
      duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.4,
      ease: "power2.out",
      overwrite: true,
    });
    if (!animate) complete();
    previous.current = { layout, isMobile };
    return () => {
      reveal.kill();
      timeline.kill();
      targets.forEach(([target]) => gsap.killTweensOf(target));
      complete();
    };
  }, [sceneRefs, cam, layout, isMobile, ready, width, height]);
};

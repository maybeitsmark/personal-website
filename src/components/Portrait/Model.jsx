// Loads and animates portfolio model scene, handling eye tracking and morph target management
// https://github.com/maybeitsmark 
// 2026

import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
// utils
import { createMorphTarget } from "./createMorphTarget";
import { mousePointer } from "@/utils/mouse.util";
import { PORTRAIT_ROTATION as limits } from "@/utils/portrait_rotation.util";
import { Euler, MathUtils, Quaternion, Vector2, Vector3 } from "three";
//assets
import modelUrl from "@/assets/portfolio_model.glb";

useGLTF.preload(modelUrl);

// Keep the neutral gaze near the portrait, but shift it 25% toward screen center.
const PORTRAIT_GAZE_WEIGHT = 0.75;

const Model = ({ morphsRef, neutralCenter, trackPointer = true, limitToView = false, onReady, ...props }) => {
  const { scene, parser } = useGLTF(modelUrl);
  const headPivot = useRef(null);
  const eyes = useRef([]);
  const eyeBaseRotations = useRef([]);
  const initialized = useRef(false);
  const projectedCenter = useRef(new Vector3());
  const cameraDirection = useRef(new Vector3());
  const pointer = useRef({ started: false, weight: 0, target: new Vector2(), position: new Vector2() });
  const eyeEuler = useRef(new Euler());
  const eyeOffset = useRef(new Quaternion());

  useEffect(() => {
    if (!scene) return;

    if (initialized.current) return;
    initialized.current = true;

    eyes.current = [];
    eyeBaseRotations.current = [];

    const registry = { hair: null, head: null, jewelry: [] };

    scene.traverse((child) => {
      if (!child.isMesh) return;

      if (child.morphTargetInfluences) {
        child.morphTargetInfluences.fill(0);

        if (child.name === "Hair") registry.hair = child;
        if (child.name === "Head_animated") registry.head = child;
        if (child.name.startsWith("Jewelry")) registry.jewelry.push(child);
      }

      if (child.name === "Left_eye" || child.name === "Right_eye") {
        eyes.current.push(child);

        // useGLTF caches a mutable scene. Read the authored rest pose instead
        // of accidentally baking a previous tracking offset into a new mount.
        const node = parser.json.nodes.find((node) => node.name === child.name);
        const rest = new Quaternion().fromArray(node?.rotation ?? [0, 0, 0, 1]);
        eyeBaseRotations.current.push(rest);
        child.quaternion.copy(rest);
      }
    });

    // attach morph targets once
    morphsRef.current = {
      hairLeft: createMorphTarget(registry.hair, "left"),
      hairRight: createMorphTarget(registry.hair, "right"),
      hairDown: createMorphTarget(registry.hair, "down"),

      headLeft: createMorphTarget(registry.head, "melt_left"),
      headRight: createMorphTarget(registry.head, "melt_right"),
      headDown: createMorphTarget(registry.head, "melt_down"),

      jewelryLeft: registry.jewelry.map((mesh) => createMorphTarget(mesh, "left")),
      jewelryRight: registry.jewelry.map((mesh) => createMorphTarget(mesh, "right")),
      jewelryDown: registry.jewelry.map((mesh) => createMorphTarget(mesh, "down")),
    };
    onReady?.();
  }, [scene, parser, morphsRef, onReady]);

  useEffect(() => {
    if (trackPointer || !headPivot.current) return;
    pointer.current.started = false;
    pointer.current.weight = 0;
    headPivot.current.rotation.set(0, 0, 0);
    eyes.current.forEach((eye, i) => {
      const base = eyeBaseRotations.current[i];
      if (base) eye.quaternion.copy(base);
    });
  }, [trackPointer]);

  useFrame(({ camera, gl }, delta) => {
    if (!headPivot.current || !trackPointer) return;

    // Project the neutral center using only the outer rig, so head tracking
    // cannot move its own target and create a feedback loop.
    const rig = headPivot.current.parent;
    rig.updateWorldMatrix(true, false);
    camera.updateMatrixWorld();
    projectedCenter.current.copy(neutralCenter.current).applyMatrix4(rig.matrixWorld);
    cameraDirection.current.copy(camera.position).sub(projectedCenter.current);
    projectedCenter.current.project(camera);
    const rect = gl.domElement.getBoundingClientRect();
    const centerX = projectedCenter.current.x * PORTRAIT_GAZE_WEIGHT;
    const centerY = projectedCenter.current.y * PORTRAIT_GAZE_WEIGHT;

    // Smooth the pointer in screen space, then subtract the CURRENT animated
    // portrait center. Smoothing that center too would add a second correction
    // after the horizontal slide. Tracking stays continuous through navigation.
    const dt = Math.min(delta, 1 / 30);
    const tracking = pointer.current;
    if (!tracking.started) {
      tracking.target.set(centerX, centerY);
      tracking.position.copy(tracking.target);
      tracking.started = mousePointer.active;
    }
    const x = mousePointer.active ? ((mousePointer.clientX - rect.left) / rect.width) * 2 - 1 : centerX;
    const y = mousePointer.active ? 1 - ((mousePointer.clientY - rect.top) / rect.height) * 2 : centerY;
    tracking.target.x = MathUtils.damp(tracking.target.x, x, 6, dt);
    tracking.target.y = MathUtils.damp(tracking.target.y, y, 6, dt);
    tracking.position.x = MathUtils.damp(tracking.position.x, tracking.target.x, 6, dt);
    tracking.position.y = MathUtils.damp(tracking.position.y, tracking.target.y, 6, dt);
    tracking.weight = MathUtils.damp(tracking.weight, mousePointer.active ? 1 : 0, 6, dt);
    const gazeX = MathUtils.clamp(tracking.position.x - centerX, -1, 1) * tracking.weight;
    const gazeY = MathUtils.clamp(tracking.position.y - centerY, -1, 1) * tracking.weight;
    let pitch = -gazeY * limits.headPitch;
    let yaw = gazeX * limits.headYaw;
    if (limitToView) {
      const direction = cameraDirection.current;
      const viewYaw = Math.atan2(direction.x, direction.z);
      const viewPitch = -Math.atan2(direction.y, Math.hypot(direction.x, direction.z));
      // Include the animated base pose, not just the pointer contribution.
      yaw = MathUtils.clamp(yaw, viewYaw - limits.viewYaw - rig.rotation.y, viewYaw + limits.viewYaw - rig.rotation.y);
      pitch = MathUtils.clamp(pitch, viewPitch - limits.viewPitch - rig.rotation.x, viewPitch + limits.viewPitch - rig.rotation.x);
    }
    headPivot.current.rotation.set(pitch, yaw, 0, "YXZ");

    // Apply yaw/pitch in head space; modifying the eyes' authored Euler Z
    // angles mixes yaw with roll because their mesh axes are tilted.
    eyeEuler.current.set(-gazeY * limits.eyePitch, gazeX * limits.eyeYaw, 0);
    eyeOffset.current.setFromEuler(eyeEuler.current);

    eyes.current.forEach((eye, i) => {
      const base = eyeBaseRotations.current[i];
      if (!base) return;

      eye.quaternion.copy(base).premultiply(eyeOffset.current);
    });
  });

  return (
    <group {...props}>
      <group ref={headPivot}>
        <primitive object={scene} />
      </group>
    </group>
  );
};

export default Model;

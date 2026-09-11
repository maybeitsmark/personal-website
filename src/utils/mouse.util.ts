// Maintains normalized (-1 to 1) x/y coordinates for Three.js camera look-at behavior during pointer event
// https://github.com/maybeitsmark 
// 2026

import * as THREE from "three";

export const mouse = new THREE.Vector2(0, 0);
export const mousePointer = { active: false, clientX: 0, clientY: 0 };
export const resetMouse = () => {
  mouse.set(0, 0);
  mousePointer.active = false;
};

const updateMouse = (e: PointerEvent) => {
  if (e.pointerType !== "mouse") return;
  mousePointer.active = true;
  mousePointer.clientX = e.clientX;
  mousePointer.clientY = e.clientY;
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
};

window.addEventListener("pointermove", updateMouse, { passive: true });
window.addEventListener("blur", resetMouse);
document.addEventListener("pointerout", (event) => {
  if (event.relatedTarget === null) resetMouse();
}, { passive: true });

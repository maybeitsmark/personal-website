import { MathUtils } from "three";

// Degrees, kept in one place for tuning. View limits include the base pose
// AND pointer tracking, measured relative to the camera-to-portrait direction.
export const PORTRAIT_ROTATION_DEGREES = {
  viewYaw: 45,
  viewPitch: 25,
  headYaw: 16,
  headPitch: 12,
  eyeYaw: 14,
  eyePitch: 9,
} as const;

export const PORTRAIT_ROTATION = {
  viewYaw: MathUtils.degToRad(PORTRAIT_ROTATION_DEGREES.viewYaw),
  viewPitch: MathUtils.degToRad(PORTRAIT_ROTATION_DEGREES.viewPitch),
  headYaw: MathUtils.degToRad(PORTRAIT_ROTATION_DEGREES.headYaw),
  headPitch: MathUtils.degToRad(PORTRAIT_ROTATION_DEGREES.headPitch),
  eyeYaw: MathUtils.degToRad(PORTRAIT_ROTATION_DEGREES.eyeYaw),
  eyePitch: MathUtils.degToRad(PORTRAIT_ROTATION_DEGREES.eyePitch),
};

export const limitPortraitBaseYaw = (preferredYaw: number, viewYaw: number) => {
  const room = PORTRAIT_ROTATION.viewYaw - PORTRAIT_ROTATION.headYaw;
  return viewYaw + MathUtils.clamp(preferredYaw - viewYaw, -room, room);
};

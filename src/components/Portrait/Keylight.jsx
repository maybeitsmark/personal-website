// Renders an adjustable directional light source for scene key lighting
// https://github.com/maybeitsmark 
// 2026

import { useRef, forwardRef } from 'react';

const KeyLight = forwardRef((/** @type {{ brightness?: number, color?: string }} */ { brightness = 3.4, color = "#ffecec" }, ref) => {
  const keyLightRef = useRef();

  return (
    <directionalLight castShadow  width={5} height={5} color={color} intensity={brightness} ref={(light) => { keyLightRef.current = light; if (ref) { ref.current = light; }}} />
  );
});

export default KeyLight;


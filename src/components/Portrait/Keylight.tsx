// Renders an adjustable directional light source for scene key lighting

import { forwardRef } from 'react';
import type { DirectionalLight } from 'three';

interface Props {
  brightness?: number;
  color?: string;
};

const KeyLight = forwardRef<DirectionalLight, Props>(({ brightness = 3.4, color = "#ffecec" }, ref) => {
  return (
    <directionalLight castShadow color={color} intensity={brightness} ref={ref} />
  );
});

export default KeyLight;
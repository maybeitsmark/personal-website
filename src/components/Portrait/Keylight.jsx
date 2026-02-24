import { useRef, useEffect, useState, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';

const KeyLight = forwardRef(({ brightness, color }, ref) => {
  const keyLightRef = useRef();
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const normalizedScrollX = window.scrollX / (document.body.scrollWidth - window.innerWidth);
      setScrollX(normalizedScrollX);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    keyLightRef.current.position.set(-3, 0, 5);
  }, []);

  useFrame(() => {
    keyLightRef.current.position.x = -3 + scrollX * 6;
  });

  return (
    <directionalLight
      castShadow  
      width={5}
      height={5}
      color={color}
      intensity={brightness}
      ref={(light) => {
        keyLightRef.current = light;
        if (ref) { ref.current = light; }
      }}
    />
  );
});

export default KeyLight;


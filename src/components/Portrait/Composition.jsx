// Personal website and portfolio  //
// 2026                            //
// Built by Mark Lisanti           //
// https://github.com/maybeitsmark //

// 3d model composition
import { useState, useEffect } from 'react';
import { Suspense, useRef } from 'react';
import Model from './Model';
import KeyLight from './Keylight';
import { Canvas } from '@react-three/fiber';

const Composition = ({ animation }) => {
  const keyLightRef = useRef();
  const [playMorph, setPlayMorph] = useState(null);

  useEffect(() => {
    // Example: Trigger morph animation based on some condition or prop
    // Here we just trigger it when the component mounts for demonstration
    setPlayMorph(animation); // Start with the animation value passed in props
  }, [animation]); // You can change this dependency to trigger on different conditions

  return (
    <div className="container">
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas camera={{ position: [0, 0, 4], fov: 60 }} shadows>
          <KeyLight brightness={3.4} color={"#efffff"} ref={keyLightRef} />
          <Model playMorph={playMorph} />
        </Canvas>
      </Suspense>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => setPlayMorph(0)}>Animation 1</button>
        <button onClick={() => setPlayMorph(1)}>Animation 2</button>
        <button onClick={() => setPlayMorph(2)}>Animation 3</button>
      </div>
    </div>
  );
}

export default Composition;

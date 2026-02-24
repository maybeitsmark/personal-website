// Personal website and portfolio //
// 2026                           //
// Built by Mark Lisanti          //
// https://github.com/marklasagne //

// 3d model composition

import { Suspense, useRef } from 'react';
import Model from './Model';
import KeyLight from './Keylight';
import { Canvas } from '@react-three/fiber';
import './portrait.css';

const Composition = () => {
  const keyLightRef = useRef();

  return (
    <div className="container">
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas camera={{ position: [0, 0, 4], fov: 60 }} shadows>
          <KeyLight brightness={3.4} color={"#efffff"} ref={keyLightRef} />
          <Model keyLightData={keyLightRef}   />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default Composition;

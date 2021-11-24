import React, { useRef } from 'react';
import { Physics } from '@react-three/cannon';
import { OrbitControls, Sky, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import './App.scss';
import { Player } from './Player';
import Block from './Block';
import Plane from './Plane';
import TestProvider from './context/SelectContext';
import TransformControls2 from './TransformControls2';

function App() {
  const orbitControlsRef = useRef<any>();

  return (
    <>
      <Canvas camera={{ position: [0, 10, -5] }} shadows>
        <TestProvider>
          <OrbitControls ref={orbitControlsRef} />
          <Sky sunPosition={[100, 20, 100]} distance={450000} />
          <Stars depth={100} count={10000} radius={100} />
          <ambientLight />
          <pointLight castShadow intensity={0.7} position={[50, 100, 50]} />
          <TransformControls2 orbitControlsRef={orbitControlsRef} />
          <Physics gravity={[0, -30, 0]} allowSleep={false}>
            <Player />
            <Block position={[0, 0, 0]} />
            <Block position={[0, 0, 2]} />
            <Block position={[0, 0, -2]} />
            <Plane position={[0, -0.5, 0]} receiveShadow />
          </Physics>
        </TestProvider>
      </Canvas>
    </>
  );
}

export default App;

import { usePlane } from '@react-three/cannon';
import React from 'react';

function Plane(props: any) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));

  return (
    <>
      <mesh receiveShadow ref={ref}>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <meshLambertMaterial attach="material" color="orange" />
      </mesh>
    </>
  );
}

export default Plane;

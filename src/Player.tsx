import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { usePlayerControls } from './usePlayerControls';
import { Vector3 } from 'three';

const SPEED = 10;

export function Player(props: any) {
  const { camera } = useThree();
  const { moveForward, moveBackward, moveLeft, moveRight, jump } =
    usePlayerControls();
  const [ref, api] = useSphere(() => ({
    mass: 20,
    type: 'Dynamic',
    position: [0, 2, -7],
    args: [0.5, 40],
    ...props,
  }));

  const velocity: any = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api.velocity]);

  useFrame(() => {
    const direction = new Vector3();

    const frontVector = new Vector3(
      0,
      0,
      Number(moveBackward) - Number(moveForward)
    );
    const sideVector = new Vector3(Number(moveLeft) - Number(moveRight), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, velocity.current[1], direction.z);

    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
      api.velocity.set(velocity.current[0], 10, velocity.current[2]);
    }
  });

  return (
    <>
      <mesh ref={ref} castShadow>
        <sphereBufferGeometry attach="geometry" args={[0.5, 30]} />
        <meshLambertMaterial attach="material" color="red" />
      </mesh>
    </>
  );
}

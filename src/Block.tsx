import { useContext, useState } from 'react';
import { useBox } from '@react-three/cannon';
import { useEffect, useRef } from 'react';
import { Quaternion, Vector3 } from 'three';
import { SelectContext } from './context/SelectContext';

function Block(props: any) {
  const { setMeshRef, setApi, setMeshPosition, setMeshRotation } =
    useContext(SelectContext);
  const meshRef = useRef<any>();
  const meshPosition = new Vector3();
  const meshRotation = new Quaternion();
  const meshSize = new Vector3();

  const [physicsRef, api]: any = useBox(() => ({
    type: 'Static',
    ...props,
  }));

  //sets initial properties of physics object to the mesh properties
  useEffect(() => {
    //set position
    meshRef.current?.getWorldPosition(meshPosition);
    api.position.set(meshPosition.x, meshPosition.y, meshPosition.z);
  }, []);

  const selectBlock = (e: any) => {
    e.stopPropagation();

    //sets the select context values to this block
    setMeshRef(meshRef);
    setApi(api);
    setMeshPosition(meshPosition);
    setMeshRotation(meshRotation);
  };

  return (
    <>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onClick={selectBlock}
        {...props}
      >
        <boxBufferGeometry attach="geometry" {...props} />
        <meshLambertMaterial attach="material" color="grey" {...props} />
      </mesh>
    </>
  );
}

export default Block;

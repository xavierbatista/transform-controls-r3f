import React, { useContext, useEffect, useRef } from 'react';
import { TransformControls } from '@react-three/drei';
import { SelectContext } from './context/SelectContext';

function TransformControls2(props: any) {
  const { meshRef, api, meshPosition, meshRotation } =
    useContext(SelectContext);
  const { orbitControlsRef } = props;
  const transformControls = useRef<any>();

  //update position of block in physics world
  const updatePhysicsPosition = () => {
    console.log('hi');

    //set position
    meshRef.current?.getWorldPosition(meshPosition);
    api.position.set(meshPosition.x, meshPosition.y, meshPosition.z);

    //set rotation
    meshRef.current?.getWorldQuaternion(meshRotation);
    api.quaternion.set(
      meshRotation.x,
      meshRotation.y,
      meshRotation.z,
      meshRotation.w
    );
  };

  const stopCameraMovement = (e: any) => {
    orbitControlsRef.current.enabled = !e.value;
  };

  const handleDragging = (e: any) => {
    updatePhysicsPosition();
    stopCameraMovement(e);
  };

  useEffect(() => {
    if (transformControls.current) {
      const controls = transformControls.current;
      controls.addEventListener('dragging-changed', handleDragging);
      return () =>
        controls.removeEventListener('dragging-changed', handleDragging);
    }
  }, [meshRef]);

  return (
    <>
      {meshRef && api && (
        <TransformControls
          ref={transformControls}
          mode={'translate'}
          object={meshRef}
          translationSnap={1}
          scaleSnap={1}
          rotationSnap={Math.PI / 8}
        >
          <></>
        </TransformControls>
      )}
    </>
  );
}

export default TransformControls2;

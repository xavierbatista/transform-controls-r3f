import React, { createContext, useState } from 'react';

export const SelectContext = createContext();

const SelectProvider = ({ children }) => {
  const [meshRef, setMeshRef] = useState();
  const [api, setApi] = useState();
  const [meshPosition, setMeshPosition] = useState();
  const [meshRotation, setMeshRotation] = useState();

  const contextValues = {
    meshRef,
    setMeshRef,
    api,
    setApi,
    meshPosition,
    setMeshPosition,
    meshRotation,
    setMeshRotation,
  };

  return (
    <SelectContext.Provider value={contextValues}>
      {children}
    </SelectContext.Provider>
  );
};

export default SelectProvider;

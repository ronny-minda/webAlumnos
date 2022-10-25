import { createContext, useContext } from "react";
import React, { useState } from "react";

export const DatosContext = createContext();

export const useDatos = () => {
  const context = useContext(DatosContext);
  return context;
};

export const DatosProvider = ({ children }) => {
  const [datos, setDatos] = useState({
    token: "",
    usuario: {},
  });

  //   const halo = (name) => `hola {name}`;
  //   const loader = () => setLoger(false);

  return (
    <DatosContext.Provider value={{ datos, setDatos }}>
      {children}
    </DatosContext.Provider>
  );
};

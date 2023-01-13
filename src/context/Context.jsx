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

  const entornoDesarrollo = "http://localhost:8080/";
  const entornoProduccion = "https://serveralumnos-production.up.railway.app/"

  const entorno = entornoDesarrollo

  //   const halo = (name) => `hola {name}`;
  //   const loader = () => setLoger(false);

  return (
    <DatosContext.Provider value={{ datos, setDatos, entorno }}>
      {children}
    </DatosContext.Provider>
  );
};

import React, { useState, useEffect } from "react";
import styled from "styled-components";

import fondo1 from "../img/fondoN1.svg";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import Estudiantes from "./estudiantes";
import Tutores from "./tutores";
import Supervisores from "./supervisores";
import { Navigate } from "react-router-dom";
import { useDatos } from "../context/Context";
import CrearSupervisor from "./crearSupervisores";
import EnviarPersonalizado from "./enviarPersonalizado";

const Main = styled(motion.main)`
  /* background-color: red; */
  width: calc(100vw - 200px);
  height: 100vh;
  background-image: url(${fondo1});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;

  h1 {
    /* background-color: red; */
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .elegir {
    /* background-color: #ff000038; */

    span {
      font-weight: bold;
      align-items: center;
      justify-content: center;
      display: inline-flex;
      height: 40px;
      width: 100px;
      background-color: #ffb6b6;
      cursor: pointer;
      margin: 0 20px;
      transition: 0.5s;
      border-radius: 3px;
    }

    span:hover {
      background-color: #fd8a8a;
    }
  }
`;

const Crear = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrar, setMostrar] = useState("estudiantes");

  const { datos, setDatos } = useDatos();

  // console.log("siii");

  useEffect(() => {
    // axios
    //   .post("http://localhost:8080/api/buscarTodasCuenta", {
    //     desde: 0,
    //     limite: 2,
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     setUsuarios(response.data);
    //   })
    //   .catch((err) => {
    //     console.log("algo salio mal en el Usuario!");
    //   });
  }, []);

  //   if (datos.usuario.rol == undefined) {
  //     return (
  //       <>
  //         <Navigate to="/" />
  //       </>
  //     );
  //   }

  //   if (datos.usuario.rol !== "ADMIN_ROLE") {
  //     return (
  //       <>
  //         <Navigate to="/actualizarDatos" />
  //       </>
  //     );
  //   }

  return (
    <Main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h1>USUARIOS</h1>

      <div className="elegir" style={{ position: "relative" }}>
        <span
          style={{
            backgroundColor: mostrar === "estudiantes" ? "#fd8a8a" : null,
          }}
          onClick={() => setMostrar("estudiantes")}
        >
          estudiantes
        </span>
        <span
          style={{
            backgroundColor: mostrar === "tutores" ? "#fd8a8a" : null,
          }}
          onClick={() => setMostrar("tutores")}
        >
          tutores
        </span>
        <span
          style={{
            backgroundColor: mostrar === "supervisores" ? "#fd8a8a" : null,
          }}
          onClick={() => setMostrar("supervisores")}
        >
          supervisores
        </span>
        <div
          style={{
            height: "6px",
            width: "104px",
            backgroundColor: "red",
            position: "absolute",
            bottom: "0",
            left:
              mostrar === "estudiantes"
                ? "4%"
                : null || mostrar === "tutores"
                ? "38%"
                : null || mostrar === "supervisores"
                ? "71%"
                : null,

            transition: "0.5s",
          }}
        ></div>
      </div>

      <AnimatePresence>
        {/* {mostrar === "estudiantes" ? <Estudiantes /> : null} */}
        {/* {mostrar === "tutores" ? <Tutores /> : null} */}
        {mostrar === "supervisores" ? <CrearSupervisor /> : null}
        {/* {mostrar === "supervisores" ? <EnviarPersonalizado /> : null} */}
      </AnimatePresence>

      {/* <div>
        {usuarios.map((i) => {
          return <h1>{i.primerNombre}</h1>;
        })}
      </div> */}
    </Main>
  );
};

export default Crear;

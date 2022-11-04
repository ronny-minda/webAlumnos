import React, { useState } from "react";
import Layout from "./layout";
import styled from "styled-components";
import * as XLSX from "xlsx";
import axios from "axios";

import fondo1 from "../img/fondoN1.svg";
import { motion } from "framer-motion";
import { useDatos } from "../context/Context";
import { Navigate } from "react-router-dom";

const Main = styled(motion.main)`
  /* background-color: red; */
  width: calc(100vw - 200px);
  background-image: url(${fondo1});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  h1 {
    text-align: center;
    /* background-color: red; */
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Home = () => {
  const { datos, setDatos } = useDatos();
  const [dato, setDato] = useState([]);

  // console.log({ datos });

  const carga = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);

    const worksheet = workbook.Sheets[workbook.SheetNames[1]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // console.log(jsonData[0].name);
    console.log(jsonData);
    setDato(jsonData);
  };

  const exportar = () => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(dato);

    XLSX.utils.book_append_sheet(wb, ws, "area");

    XLSX.writeFile(wb, "exportar.xlsx");
  };

  // console.log(datos.usuario.primerNombre);

  if (datos.usuario.rol == undefined) {
    return (
      <>
        <Navigate to="/" />
      </>
    );
  }

  if (datos.usuario.rol !== "ADMIN_ROLE") {
    return (
      <>
        <Navigate to="/actualizarDatos" />
      </>
    );
  }

  return (
    <Main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h1>Bienvenida {datos.usuario.primerNombre}</h1>
      {/* <input type="file" onChange={(e) => carga(e)} />
      <div onClick={() => exportar()}>exportar</div> */}
    </Main>
  );
};

export default Home;

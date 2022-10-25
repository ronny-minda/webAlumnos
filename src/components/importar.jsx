import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import * as XLSX from "xlsx";
import { useDatos } from "../context/Context";

import descarga from "../img/descarga.svg";
import carga from "../img/carga.svg";
import fondo1 from "../img/fondoN1.svg";

const Main = styled(motion.div)`
  background-image: url(${fondo1});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #ffffff29;
  width: 100%;

  h1 {
    text-align: center;
  }

  .contenedor {
    margin-top: 100px;
    /* background-color: red; */
    justify-content: space-evenly;
    display: flex;

    .descargar {
      border-radius: 5px;
      height: 100px;
      width: 120px;
      background-color: #0004ff2c;
      display: inline-block;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;

      background-image: url(${carga});
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      transition: 0.5s;

      &:hover {
        background-color: #1900ff62;

        span {
          color: #d9d9d9;
        }
      }

      span {
        color: #fff;
        font-weight: bold;
        font-size: 20px;
        transition: 0.5s;
      }
    }

    .carga {
      border-radius: 5px;
      height: 100px;
      width: 120px;
      background-color: #ff00002c;
      display: inline-block;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;

      background-image: url(${descarga});
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      transition: 0.5s;

      &:hover {
        background-color: #ff000063;

        span {
          color: #d9d9d9;
        }
      }

      span {
        color: #fff;
        font-weight: bold;
        font-size: 20px;
        transition: 0.5s;
      }

      input {
        display: none;
      }
    }
  }
`;

const Importar = () => {
  const { datos, setDatos } = useDatos();

  const [pedido, setPedido] = useState([]);

  // const data = [
  //   {
  //     _id: "63516448f05531a00df16d12",
  //     primerNombre: "PRUEBA1",
  //     segundoNombre: "DATA",
  //     primerApellido: "DATA",
  //     segundoApellido: "DATA",
  //     cedula: "DATA1",
  //     telefono: "DATA",
  //     correo: "d",
  //     horas: "FALTA EL horas",
  //     fechaInicio: "FALTA EL fechaInicio",
  //     fechaFin: "FALTA EL fechaFin",
  //     tutora: {
  //       _id: "63515e778f3b7a07f6925cf6",
  //       primerNombre: "ANITA",
  //       segundoNombre: "data",
  //       primerApellido: "data",
  //       segundoApellido: "data",
  //       cedula: "123456",
  //       telefono: "data",
  //       correo: "data",
  //       horas: "FALTA EL horas",
  //       fechaInicio: "FALTA EL fechaInicio",
  //       fechaFin: "FALTA EL fechaFin",
  //       institucion: "data",
  //       direccion: "data",
  //       password: "123456",
  //       rol: "ADMIN_ROLE",
  //       __v: 0,
  //     },
  //     supervisora: {
  //       _id: "635163991b4de653dc121a43",
  //       primerNombre: "PRUEBA",
  //       segundoNombre: "DATA",
  //       primerApellido: "DATA",
  //       segundoApellido: "DATA",
  //       cedula: "DATA",
  //       telefono: "DATA",
  //       correo: "DATA",
  //       horas: "FALTA EL horas",
  //       fechaInicio: "FALTA EL fechaInicio",
  //       fechaFin: "FALTA EL fechaFin",
  //       institucion: "DATA",
  //       direccion: "DATA",
  //       password: "123456",
  //       rol: "ALUGNO_ROLE",
  //       __v: 0,
  //     },
  //     institucion: "DATA",
  //     direccion: "DATA",
  //     password: "sa",
  //     rol: "sa",
  //     __v: 0,
  //   },
  //   {
  //     _id: "63516448f05531a00df16d12",
  //     primerNombre: "PRUEBA1",
  //     segundoNombre: "DATA",
  //     primerApellido: "DATA",
  //     segundoApellido: "DATA",
  //     cedula: "DATA1",
  //     telefono: "DATA",
  //     correo: "d",
  //     horas: "FALTA EL horas",
  //     fechaInicio: "FALTA EL fechaInicio",
  //     fechaFin: "FALTA EL fechaFin",
  //     tutora: {
  //       _id: "63515e778f3b7a07f6925cf6",
  //       primerNombre: "ANITA",
  //       segundoNombre: "data",
  //       primerApellido: "data",
  //       segundoApellido: "data",
  //       cedula: "123456",
  //       telefono: "data",
  //       correo: "data",
  //       horas: "FALTA EL horas",
  //       fechaInicio: "FALTA EL fechaInicio",
  //       fechaFin: "FALTA EL fechaFin",
  //       institucion: "data",
  //       direccion: "data",
  //       password: "123456",
  //       rol: "ADMIN_ROLE",
  //       __v: 0,
  //     },
  //     supervisora: {
  //       _id: "635163991b4de653dc121a43",
  //       primerNombre: "PRUEBA",
  //       segundoNombre: "DATA",
  //       primerApellido: "DATA",
  //       segundoApellido: "DATA",
  //       cedula: "DATA",
  //       telefono: "DATA",
  //       correo: "DATA",
  //       horas: "FALTA EL horas",
  //       fechaInicio: "FALTA EL fechaInicio",
  //       fechaFin: "FALTA EL fechaFin",
  //       institucion: "DATA",
  //       direccion: "DATA",
  //       password: "123456",
  //       rol: "ALUGNO_ROLE",
  //       __v: 0,
  //     },
  //     institucion: "DATA",
  //     direccion: "DATA",
  //     password: "sa",
  //     rol: "sa",
  //     __v: 0,
  //   },
  // ];

  // const exportar = () => {
  //   let wb = XLSX.utils.book_new();
  //   let ws = XLSX.utils.json_to_sheet(pedido);
  //   XLSX.utils.book_append_sheet(wb, ws, "area");
  //   XLSX.writeFile(wb, "exportar.xlsx");
  // };

  const carga = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    // console.log(jsonData[0].name);
    console.log({ jsonData });
    console.log("jsonData");
    // jsonData.map(async (i) => {
    //   await console.log(i.Celular);
    // });
  };

  const descargar = () => {
    axios
      .post("http://localhost:8080/api/alumno/buscarTodasAlumno", {
        desde: "0",
        limite: "20",
      })
      .then(({ data }) => {
        // console.log(data);
        // setPedido(data);

        const result = data.map((i) => {
          console.log(i);
          for (const property in i) {
            console.log(`${property}: ${i[property]}`);

            if (property == "tutora") {
              for (const popiedad in i.tutora) {
                console.log(` >>>> ${popiedad}: ${i.tutora[popiedad]}`);
                i[`tutora ${popiedad}`] = i.tutora[popiedad];
              }
            }

            if (property == "supervisora") {
              for (const popiedad in i.supervisora) {
                console.log(` >>>> ${popiedad}: ${i.supervisora[popiedad]}`);
                i[`supervisora ${popiedad}`] = i.supervisora[popiedad];
              }
            }
          }

          return i;
        });
        console.log({ result });
        setPedido(result);

        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(result);
        XLSX.utils.book_append_sheet(wb, ws, "area");
        XLSX.writeFile(wb, "exportar.xlsx");
      })
      .catch((err) => {
        console(err);
      });

    // const result = pedido.map((i) => {
    //   console.log(i);
    //   for (const property in i) {
    //     console.log(`${property}: ${i[property]}`);
    //     // i.primerNombre = "Maikol";
    //     // console.log(typeof i.supervisora);
    //     if (property == "tutora") {
    //       for (const popiedad in i.tutora) {
    //         console.log(` >>>> ${popiedad}: ${i.tutora[popiedad]}`);
    //         i[`tutora ${popiedad}`] = i.tutora[popiedad];
    //       }
    //     }
    //     if (property == "supervisora") {
    //       for (const popiedad in i.supervisora) {
    //         console.log(` >>>> ${popiedad}: ${i.supervisora[popiedad]}`);
    //         i[`supervisora ${popiedad}`] = i.supervisora[popiedad];
    //       }
    //     }
    //     // if (property == "tutora") {
    //     //   for (const popiedad in i.supervisora) {
    //     //     console.log(` >>>> ${popiedad}: ${i.supervisora[popiedad]}`);
    //     //     i;
    //     //     //   console.log("------");
    //     //   }
    //     // }
    //     // if(i) {
    //     // }
    //   }
    //   //   if (condition) {
    //   //   }
    //   return i;
    // });
    // console.log({ result });
    // setDatos(result);
  };

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
      <h1>Importar</h1>

      <div className="contenedor">
        <label className="carga">
          <span>SUBIR</span>
          <input type="file" onChange={(e) => carga(e)} />
        </label>

        <div className="descargar" onClick={() => descargar()}>
          <span>DESCARGAR</span>
        </div>
      </div>

      {/* <div
        onClick={() => exportar()}
        style={{ background: "blue", height: "20px", width: "20px" }}
      ></div> */}
    </Main>
  );
};

export default Importar;

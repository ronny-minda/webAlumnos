import React from "react";
import styled from "styled-components";
import axios from "axios";
import * as XLSX from "xlsx";

import baseDatos from "./datos";

import { useDatos } from "../../context/Context";

const Conte = styled.div`
  display: flex;

  .conteExport {
    h1 {
      margin-top: 30px;
    }

    .Boton {
      height: 100px;
      width: 100px;
      background-color: red;
      border-radius: 50%;
    }
  }

  .conteImport {
    h1 {
      margin-top: 30px;
    }

    .Boton {
      height: 100px;
      width: 100px;
      background-color: #4c00ff;
      border-radius: 50%;
    }
  }
`;

const CrearExel = () => {
  const { datos, setDatos, entorno } = useDatos();

  console.log({ baseDatos });

  const exportarExel = (resoUrl) => {
    axios
      .get(`${entorno}api${resoUrl}`)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console(err);
      });
  };

  const inpootar = (endpoint, data) => {
    // console.log(endpoint);

    data.map((i) => {
      // console.log(i);

      axios
        .post(endpoint, i)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console(err);
        });
    });
  };

  return (
    <Conte>
      <div className="conteExport">
        <h1>EXPORTAR</h1>
        <h1>Alumnos</h1>
        <div
          className="Boton"
          onClick={() => exportarExel("/alumno/buscarTodasAlumno")}
        ></div>

        <h1>Instituciones</h1>
        <div
          className="Boton"
          onClick={() => exportarExel("/institucion/buscarTodos")}
        ></div>

        <h1>Supervisoras</h1>
        <div
          className="Boton"
          onClick={() => exportarExel("/supervisora/pedirTodos")}
        ></div>

        <h1>Tutoras</h1>
        <div
          className="Boton"
          onClick={() => exportarExel("/tutora/pedirTodos")}
        ></div>
      </div>

      <div className="conteImport">
        <h1>IMPORTAR</h1>
        <h1>Admin</h1>
        <div
          className="Boton"
          onClick={() =>
            inpootar(`${entorno}api/prueba/ingresarAdmin`, baseDatos.Admin)
          }
        ></div>

        <h1>Alumnos</h1>
        <div
          className="Boton"
          onClick={() =>
            inpootar(`${entorno}api/prueba/ingresarAlumnos`, baseDatos.Alumnos)
          }
        ></div>

        <h1>Instituciones</h1>
        <div
          className="Boton"
          onClick={() =>
            inpootar(
              `${entorno}api/prueba/ingresarInstituciones`,
              baseDatos.Instituciones
            )
          }
        ></div>

        <h1>Supervisoras</h1>
        <div
          className="Boton"
          onClick={() =>
            inpootar(
              `${entorno}api/prueba/ingresarSupervisoras`,
              baseDatos.Supervisoras
            )
          }
        ></div>

        <h1>Tutoras</h1>
        <div
          className="Boton"
          onClick={() =>
            inpootar(`${entorno}api/prueba/ingresarTutoras`, baseDatos.Tutoras)
          }
        ></div>
      </div>
    </Conte>
  );
};

export default CrearExel;

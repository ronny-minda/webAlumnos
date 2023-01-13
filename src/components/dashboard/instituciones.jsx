import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import logo from "../../img/alumnos.svg";
import lupa2 from "../../img/lupa2.svg";
import axios from "axios";
import { useDatos } from "../../context/Context";

import Institucion from "./instiucion";

const Main = styled(motion.main)`
  width: calc(100vw - 200px);
  background-color: #e6e8ea;
  padding: 20px;

  .conteHead {
    /* background-color: blue; */
    /* padding: 0 10px; */
    /* width: 100%; */
    display: flex;
    justify-content: space-between;
    align-items: center;

    .conte {
      display: flex;
      align-items: center;

      .logo {
        height: 50px;
        width: 50px;
        /* background-color: blue; */
        background-image: url(${logo});
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }
      span {
        margin-left: 20px;
        color: #949599;
        font-size: 30px;
      }
    }
    input {
      height: 40px;
      width: 500px;

      padding-left: 45px;
      background: url(${lupa2}) no-repeat;
      background-size: 30px;
      background-position: left 10px bottom 3px;
      margin: 10px 0;

      background-color: #ff000000;
      border: none;
      border: 2px solid #00073d6f;
      outline: none;
      transition: 0.5s;
      background-color: #fff;
      font-size: 18px;
    }
    input:focus {
      padding-left: 0px;
      background-position: left -30px bottom 3px;
      background-color: #fff;
      border: 2px solid #2faec8;
    }
  }

  .contenedor {
    height: 78vh;
    width: 100%;
    background-color: #ffffff;
    margin-top: 50px;
    overflow-y: scroll;
    overflow-x: hidden;
    border: 1px solid #0000007a;
    position: relative;

    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    ::-webkit-scrollbar-track {
      background-color: #a7a7a7;
      /* -webkit-box-shadow: inset 0 0 6px rgb(0, 0, 0); */
    }
    ::-webkit-scrollbar-thumb {
      background-color: #d1d1d1;
      border: 2px solid #a7a7a7;
      border-radius: 6px;
      /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5); */
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: #e6e6e6;
    }
  }
`;

const Insituciones = () => {
  const [busqueda, setBusqueda] = useState([]);
  const [institucion, setInstitucion] = useState([]);
  const [todasSupervisora, settodasSupervisora] = useState([]);
  const [todasTutoras, settodasTutoras] = useState([]);
  const [spiner, setSpiner] = useState(true);
  const [total, setTotal] = useState(0);
  const { datos, setDatos, entorno } = useDatos();

  let contador = 0;

  useEffect(() => {
    axios
      .post(
        `${entorno}api/institucion/buscarTodos`
      )
      .then(({ data }) => {
        // console.log("data");
        // console.log(data);
        setInstitucion(data);
        setBusqueda(data);

        setSpiner(false);

        let contador = 0;

        data.map((i) => {
          contador++;
        });

        setTotal(contador);
      })
      .catch((err) => {
        console.log("algo salio mal en institucion!");
      });

    axios
      .get(
        `${entorno}api/supervisora/pedirTodos`
      )
      .then(({ data }) => {
        // console.log("data");
        // console.log(data);

        const result = data.map((i) => {
          return { value: i._id, label: i.nombre };
        });

        console.log("result");
        console.log(result);

        settodasSupervisora(result);
      })
      .catch((err) => {
        console.log("algo salio mal en pedido tuotas!");
      });

    axios
      .get(
        `${entorno}api/tutora/pedirTodos`
      )
      .then(({ data }) => {
        console.log("data");
        console.log(data);

        const result = data.map((i) => {
          return { value: i._id, label: i.nombre };
        });

        console.log("result");
        console.log(result);

        settodasTutoras(result);
      })
      .catch((err) => {
        console.log("algo salio mal en pedido tuotas!");
      });
  }, []);

  return (
    <Main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="conteHead">
        <div className="conte">
          <div className="logo"></div>
          <span>INSTITUCIONES</span>
        </div>

        <input
          type="text"
          placeholder="Buscar por nombre"
          onChange={(e) => {
            console.log(e.target.value);

            setBusqueda("sdfgsdf");

            let institucionFiltro = institucion.filter((i) => {
              if (
                i.nombre.toUpperCase().includes(e.target.value.toUpperCase())
              ) {
                return i;
              }
            });

            setBusqueda([]);
            setTimeout(() => {
              setBusqueda(institucionFiltro);
            }, 0.01);
            console.log("institucionFiltro");
            console.log(institucionFiltro);
          }}
        />
      </div>

      <div className="contenedor">
        {busqueda.map((i) => {
          contador++;

          return (
            <Institucion
              todasTutoras={todasTutoras}
              todasSupervisora={todasSupervisora}
              institucion={i}
              contador={contador}
            />
          );
        })}
      </div>
    </Main>
  );
};

export default Insituciones;

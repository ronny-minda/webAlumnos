import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Estudiante from "./estudiante";

const Main = styled(motion.div)`
  /* background-color: red; */
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  .spiner {
    z-index: 10;
    height: 100vh;
    width: 100%;
    background-color: #000000a4;
    /* backdrop-filter: blur(2px); */
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border-radius: 80px 0px 0px 80px; */

    .lds-roller {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }
    .lds-roller div {
      animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      transform-origin: 40px 40px;
    }
    .lds-roller div:after {
      content: " ";
      display: block;
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #fff;
      margin: -4px 0 0 -4px;
    }
    .lds-roller div:nth-child(1) {
      animation-delay: -0.036s;
    }
    .lds-roller div:nth-child(1):after {
      top: 63px;
      left: 63px;
    }
    .lds-roller div:nth-child(2) {
      animation-delay: -0.072s;
    }
    .lds-roller div:nth-child(2):after {
      top: 68px;
      left: 56px;
    }
    .lds-roller div:nth-child(3) {
      animation-delay: -0.108s;
    }
    .lds-roller div:nth-child(3):after {
      top: 71px;
      left: 48px;
    }
    .lds-roller div:nth-child(4) {
      animation-delay: -0.144s;
    }
    .lds-roller div:nth-child(4):after {
      top: 72px;
      left: 40px;
    }
    .lds-roller div:nth-child(5) {
      animation-delay: -0.18s;
    }
    .lds-roller div:nth-child(5):after {
      top: 71px;
      left: 32px;
    }
    .lds-roller div:nth-child(6) {
      animation-delay: -0.216s;
    }
    .lds-roller div:nth-child(6):after {
      top: 68px;
      left: 24px;
    }
    .lds-roller div:nth-child(7) {
      animation-delay: -0.252s;
    }
    .lds-roller div:nth-child(7):after {
      top: 63px;
      left: 17px;
    }
    .lds-roller div:nth-child(8) {
      animation-delay: -0.288s;
    }
    .lds-roller div:nth-child(8):after {
      top: 56px;
      left: 12px;
    }
    @keyframes lds-roller {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

const Estudiantes = () => {
  const [datos, setDatos] = useState([]);
  const [supevisora, setSupevisora] = useState([]);
  const [tutora, setTutora] = useState([]);
  const [spiner, setSpiner] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/alumno/buscarTodasAlumno", {
        desde: 0,
        limite: 20,
      })
      .then(({ data }) => {
        // console.log(response.data);
        setDatos(data);
        setSpiner(false);
        // console.log({ datos });
        let contador = 0;

        data.map((i) => {
          contador++;
        });

        setTotal(contador);
      })
      .catch((err) => {
        console.log("algo salio mal en el login!");
      });
  }, []);

  // const pedido = () => {
  //   console.log("pedido");

  //   axios
  //     .get("http://localhost:8080/api/supervisora/pedirTodos")
  //     .then((response) => {
  //       console.log("supervisoras");
  //       console.log(response.data);
  //       setDatos(response.data);
  //       // console.log({ datos });
  //     })
  //     .catch((err) => {
  //       console.log("algo salio mal en pedido supevisoras!");
  //     });
  // };

  return (
    <Main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <AnimatePresence>
        {spiner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="spiner"
          >
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <h1>Estudiantes</h1>
      <h2>Total de tutores: {total}</h2>

      {datos.map((i) => {
        return (
          <Estudiante
            key={i.cedula}
            supevisora={supevisora}
            tutora={tutora}
            dato={i}
          />
        );
      })}
    </Main>
  );
};

export default Estudiantes;

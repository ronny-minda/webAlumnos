import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../../img/alumnos.svg";
import lupa2 from "../../img/lupa2.svg";
import Alumno from "./alumno";

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

  .todoAlumnos {
    height: 78vh;
    width: 100%;
    background-color: #ffffff;
    margin-top: 50px;
    overflow: scroll;
    border: 1px solid #0000007a;
    position: relative;
    /* padding-top: 50px; */

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

    .todoAlumnosFiltro {
      height: 100%;
      width: 100%;
      background-color: #00000088;
      position: absolute;
      top: 0;
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(1px);

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

    .titulo {
      margin-left: 50px;
      display: flex;
      width: 400%;
      position: sticky;
      top: 0;
      zindex: 9999999999;

      div {
        padding: 5px;
        width: 165px;
        font-weight: bold;
        border: 1px solid black;
        border: 1px solid #0000007a;
        background-color: #00e5ff;
      }
    }
  }
`;

const Alumnos = () => {
  const [alumnado, setAlumnado] = useState([]);
  const [busqueda, setBusqueda] = useState([]);
  const [institucion, setInstitucion] = useState([]);
  const [supervisora, setSupervisora] = useState([]);
  const [tutora, setTutora] = useState([]);
  const [total, setTotal] = useState(0);
  const [scrol, setScrol] = useState(0);
  const [render, setRender] = useState();
  // const [contador, setContador] = useState(0);
  const [spiner, setSpiner] = useState(true);

  let contador = 0;

  useEffect(() => {
    axios
      .post(
        "https://serveralumnos-production.up.railway.app/api/alumno/buscarTodasAlumno",
        {
          desde: 0,
          limite: 20,
        }
      )
      .then(({ data }) => {
        // console.log(data);

        setBusqueda(data);
        setSpiner(false);
        let contador = 0;
        data.map((i) => {
          contador++;
        });
        setTotal(contador);

        console.log(data);

        const result = data.sort((a, b) => {
          if (a.institucion.nombre < b.institucion.nombre) {
            return -1;
          }

          if (a.institucion.nombre > b.institucion.nombre) {
            return 1;
          }

          return 0;
        });

        console.log("result");
        console.log(result);
        setAlumnado(result);
      })
      .catch((err) => {
        console.log("algo salio mal en el login!");
      });

    axios
      .post(
        "https://serveralumnos-production.up.railway.app/api/institucion/buscarTodos"
      )
      .then(({ data }) => {
        // console.log(data);
        setInstitucion(data);
      })
      .catch((err) => {
        console.log("algo salio mal en pedido institucion!");
      });

    axios
      .get(
        "https://serveralumnos-production.up.railway.app/api/tutora/pedirTodos"
      )
      .then(({ data }) => {
        // console.log(data);
        setTutora(data);
      })
      .catch((err) => {
        console.log("algo salio mal en pedido tutoras!");
      });

    axios
      .get(
        "https://serveralumnos-production.up.railway.app/api/supervisora/pedirTodos"
      )
      .then(({ data }) => {
        // console.log(data);
        setSupervisora(data);
      })
      .catch((err) => {
        console.log("algo salio mal en pedido supervisora!");
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
          <span>ALUMNOS</span>
        </div>

        <input
          type="text"
          placeholder="Buscar por primer apellido"
          onChange={(e) => {
            console.log(e.target.value);

            setBusqueda("sdfgsdf");

            let alumno = alumnado.filter((i) => {
              // if (
              //   i.primerApellido
              //     .toUpperCase()
              //     .trim()
              //     .includes(e.target.value.toUpperCase())
              // ) {
              //   return i;
              // }

              if (
                i.primerApellido
                  .toUpperCase()
                  .includes(e.target.value.toUpperCase())
              ) {
                return i;
              }

              // return (
              //   i.primerApellido.toUpperCase().trim() ===
              //   e.target.value.toUpperCase()
              // );
            });

            setBusqueda([]);
            setTimeout(() => {
              setBusqueda(alumno);
            }, 0.01);
            console.log("alumno");
            console.log(alumno);
          }}
        />
      </div>

      <div
        className="todoAlumnos"
        onScroll={(e) => {
          // console.log(e.currentTarget.scrollLeft);
          setScrol(e.currentTarget.scrollLeft);
        }}
      >
        <AnimatePresence>
          {spiner && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="todoAlumnosFiltro"
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

        <div className="titulo">
          <div>primerNombre</div>
          <div>segundoNombre</div>
          <div>primerApellido</div>
          <div>segundoApellido</div>
          <div>cedula</div>
          <div>telefono</div>
          <div>correo</div>
          <div>curso</div>
          <div>horas</div>
          <div>horas</div>
          <div>fechaFin</div>
          <div style={{ width: "658px" }}>institucion</div>
          <div style={{ width: "330px" }}>supervisora</div>
          <div style={{ width: "330px" }}>tutora</div>
        </div>

        {busqueda.map((i) => {
          // setContador(contador);
          // console.log("i");
          // console.log(i);

          // {
          //   console.log("busqueda: " + busqueda);
          // }

          contador++;

          return (
            <Alumno
              institucion={institucion}
              supervisora={supervisora}
              tutora={tutora}
              scrol={scrol}
              alumnado={i}
              contador={contador}
            />
          );
        })}
      </div>
    </Main>
  );
};

export default Alumnos;

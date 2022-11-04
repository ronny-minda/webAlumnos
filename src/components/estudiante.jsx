import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import flecha from "../img/flecha.svg";
import axios from "axios";

const Div = styled.div`
  width: 1000px;
  display: flex;
  justify-content: center;
  position: relative;
  box-shadow: 10px 10px 5px 0px #332b515a;
  border: 2px solid #00000079;
  margin: 30px;

  .usuarios {
    display: inline-block;
    /* height: 50px; */
    width: 95%;
    background-color: #c2d8ff1c;
    border: 2px solid #dde9ff76;
    backdrop-filter: blur(2px);
    margin: 10px 0;
    /* overflow: hidden; */
    transition: 0.5s;
    position: relative;

    .usuario {
      /* background-color: #fffd; */

      .contDatos {
        display: flex;
        justify-content: space-around;
        /* background-color: #4800ff; */
        margin-bottom: 3px;

        span {
          /* background-color: red; */
          font-size: 20px;
          font-weight: bold;
        }

        .primerNombre {
          /* width: min-content; */
          /* background-color: #abf050; */
        }
        .segundoNombre {
        }
        .cedula {
        }
      }

      .allDatos {
        margin-top: 20px;
        /* background-color: #4800ff; */
        height: auto;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        /* clip-path: polygon(0 0, 100% 0, 100% 10%, 0 10%); */

        .conteLabel {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;

          label {
            width: 250px;
            background-color: #b7d6ff32;
            margin: 5px;
            display: flex;
            flex-direction: column;
            padding: 5px;

            select {
              color: #000;
              font-weight: bold;
              background-color: #99a0f479;
              border: none;
              font-size: 14px;
              height: 30px;
              padding: 5px;
              /* width: 250px; */
              outline: none;
            }

            span {
              font-weight: bold;
              font-size: 18px;
            }

            input {
              margin: 5px 0;
              background-color: #ff000000;
              border: none;
              border-bottom: 2px solid #001f3d;
              outline: none;
              transition: 0.5s;
            }
            input:focus {
              border-bottom: 2px solid #2faec8;
            }
          }
        }

        .submit {
          background-color: #003756;
          padding: 15px;
          color: #fff;
          border: none;
          margin-top: 20px;
          border-radius: 6px;
          transition: 0.4s;
          font-weight: bold;
          font-size: 16px;
        }

        .submit:hover {
          color: #fff;
          background-color: #216b95;
        }
        .submit:active {
          color: #6b6a77a9;
          background-color: #ffffff;
        }

        .eliminarEstudiante {
          /* height: 20px;
          width: 20px; */
          background-color: red;
          position: absolute;
          bottom: 10px;
          right: 60px;
          padding: 15px;
          border-radius: 5px;
          transition: 0.5s;
          cursor: pointer;

          span {
            /* background-color: red; */
            font-weight: bold;
            color: #fff;
          }
        }

        .eliminarEstudiante:hover {
          background-color: #ff6868;
        }

        .guardados {
          /* background-color: red; */
          font-size: 30px;
          margin-top: 20px;
          font-weight: bold;
          color: #098c2e;
        }
      }
    }
  }

  .spiner {
    height: 100%;
    width: 100%;
    background-color: #0000005a;
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

  .control {
    background-color: #9aa9ff86;
    height: 30px;
    width: 40px;
    position: absolute;
    bottom: 0;
    left: calc(50% - 25px);

    background-image: url(${flecha});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    /* transform: rotate(180deg); */
    transition: 0.5s;
  }
`;

const Estudiante = ({ dato, supevisora, tutora }) => {
  const [spiner, setSpiner] = useState(false);
  const [altura, setAltura] = useState("50px");
  const [rotate, setRotate] = useState("0");
  const [error, setError] = useState(false);
  const [guardar, setGuardar] = useState(false);
  const [validarContraseña, setValidarContraseña] = useState({
    pass1: "",
    pass2: "",
  });
  const [valores, setValores] = useState({
    primerNombre: dato.primerNombre,
    segundoNombre: dato.segundoNombre,
    primerApellido: dato.primerApellido,
    segundoApellido: dato.segundoApellido,
    cedula: dato.cedula,
    telefono: dato.telefono,
    correo: dato.correo,
    institucion: dato.institucion.nombre,

    fechaInicio: dato.fechaInicio,
    fechaFin: dato.fechaFin,
    horas: dato.horas,

    supervisora: dato.supervisora.nombre,
    curso: dato.curso,
    tutora: dato.tutora.nombre,
    password: "",
  });

  console.log("valores");
  console.log(dato);

  const eliminarCuenta = () => {
    console.log("eliminarCuenta");
    console.log(dato._id);

    axios
      .post(
        "https://serveralumnos-production.up.railway.app/api/alumno/borarAlumno",
        {
          id: dato._id,
        }
      )
      .then(({ data }) => {
        console.log("data");
        console.log(data);
      })
      .catch((err) => {
        console.log("err");
        console.log(err);
      });
  };

  const enviar = (e) => {
    setSpiner(true);
    e.preventDefault();

    // const supervisoraActual = supevisora.find(
    //   (e) => `${e.primerNombre} ${e.primerApellido}` == valores.supervisora
    // );

    // const tutoraActual = tutora.find(
    //   (e) => `${e.primerNombre} ${e.primerApellido}` == valores.tutora
    // );
    // console.log(supervisoraActual, tutoraActual);

    const envio = {
      ...valores,
      id: dato._id,
    };

    // console.log({ envio });

    axios
      .put(
        "https://serveralumnos-production.up.railway.app/api/alumno/actualizarAlumno",
        envio
      )
      .then(({ data }) => {
        // console.log(response.data);

        // const respuesta = response.data;

        // console.log({ respuesta });

        setValores({
          primerNombre: data.primerNombre,
          segundoNombre: data.segundoNombre,
          primerApellido: data.primerApellido,
          segundoApellido: data.segundoApellido,
          cedula: data.cedula,
          telefono: data.telefono,
          correo: data.correo,
          direccion: data.direccion,
          supervisora: data.supervisora,
          tutora: data.tutora,
          password: "",
        });
        setSpiner(false);
        setGuardar(true);
        setTimeout(() => {
          setGuardar(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        console.log("paso algo al actualizar estudiante");
        setSpiner(false);
        setGuardar(true);
        setTimeout(() => {
          setGuardar(false);
        }, 3000);
      });
  };

  return (
    <Div>
      <div className="usuarios">
        <div className="usuario">
          {/* <div className="contDatos">
            <span className="primerNombre">{valores.primerNombre}</span>
            <span className="segundoNombre">{valores.segundoNombre}</span>
            <span className="cedula">{valores.cedula}</span>
          </div> */}

          <form className="allDatos" onSubmit={(e) => enviar(e)}>
            <div className="conteLabel">
              <label>
                <span>Primer Nombre</span>

                <select disabled>
                  <option> {valores.primerNombre} </option>
                </select>
              </label>

              <label>
                <span>Segundo Nombre</span>

                <select disabled>
                  <option> {valores.segundoNombre} </option>
                </select>
              </label>

              <label>
                <span>Primer Apellido</span>

                <select disabled>
                  <option> {valores.primerApellido} </option>
                </select>
              </label>

              <label>
                <span>Segundo Apellido</span>

                <select disabled>
                  <option> {valores.segundoApellido} </option>
                </select>
              </label>

              <label>
                <span>Cedula</span>
                <select disabled>
                  <option> {valores.cedula} </option>
                </select>
              </label>

              <label>
                <span>Telefono</span>

                <select disabled>
                  <option> {valores.telefono} </option>
                </select>
              </label>

              <label>
                <span>Correo</span>

                <select disabled>
                  <option> {valores.correo} </option>
                </select>
              </label>

              <label>
                <span>Supervisora</span>

                <select disabled>
                  <option> {valores.supervisora} </option>
                </select>
              </label>

              <label>
                <span>Curso</span>

                <select disabled>
                  <option> {valores.curso} </option>
                </select>
              </label>

              <label>
                <span>Tutora</span>

                <select disabled>
                  <option> {valores.tutora} </option>
                </select>
              </label>

              <label>
                <span>Institucion</span>

                <select disabled>
                  <option> {valores.institucion} </option>
                </select>
              </label>

              <label>
                <span>Fecha de inicion</span>

                <select disabled>
                  <option> {valores.fechaInicio} </option>
                  {/* {new Date(valores.fechaInicio)} */}
                </select>
              </label>

              <label>
                <span>Fecha fin</span>

                <select disabled>
                  <option> {valores.fechaFin} </option>
                </select>
              </label>

              <label>
                <span>Horas</span>

                <select disabled>
                  <option> {valores.horas} </option>
                </select>
              </label>

              {/* <label>
              <span>USUARIO</span>
              <input
                onChange={(e) => setValores({ ...valores, nombre: e.target.value })}
                type="text"
              />
            </label> */}

              {/* <label>
                <span>CONTRASEÑA</span>
                <input
                  value={valores.password}
                  name="CONTRASEÑA"
                  onChange={(e) => {
                    setValores({ ...valores, password: e.target.value });

                    // setValores({ ...valores, nombre: e.target.value })

                    setValidarContraseña({
                      ...validarContraseña,
                      pass1: e.target.value,
                    });
                  }}
                  type="text"
                />
              </label>
              <label>
                <span>REPETIR CONTRASEÑA</span>
                <input
                  value={valores.password}
                  name="REPETIR CONTRASEÑA"
                  onChange={(e) => {
                    // setValores({ ...valores, nombre: e.target.value })

                    setValidarContraseña({
                      ...validarContraseña,
                      pass2: e.target.value,
                    });
                  }}
                  type="text"
                />
              </label> */}
            </div>

            <AnimatePresence>
              {error && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="msgError"
                >
                  INTENTA DE NUEVO O MAS TARDE
                </motion.span>
              )}
            </AnimatePresence>

            {/* <input className="submit" type="submit" value="ACTUALIZAR DATOS" /> */}

            <div
              onClick={() => eliminarCuenta()}
              className="eliminarEstudiante"
            >
              <span>Elimina Estudiante</span>
            </div>

            <AnimatePresence>
              {guardar && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="guardados"
                >
                  DATOS GUARDADOS DE ESTE USUARIO
                </motion.span>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>

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

      {/* <div
        // className="control"
        // style={{ transform: `rotate(${rotate}deg)` }}
        // onClick={() => {
        //   altura == "50px" ? setAltura("500px") : setAltura("50px");
        //   rotate == "0" ? setRotate("180") : setRotate("0");

        //   // console.log("siii");
        // }}
      ></div> */}
    </Div>
  );
};

export default Estudiante;

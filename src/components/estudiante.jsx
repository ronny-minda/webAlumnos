import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import flecha from "../img/flecha.svg";
import axios from "axios";

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  .usuarios {
    display: inline-block;
    /* height: 50px; */
    width: 95%;
    background-color: #c2d8ff1c;
    border: 2px solid #dde9ff76;
    backdrop-filter: blur(2px);
    margin: 10px 0;
    overflow: hidden;
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
          /* background-image: linear-gradient(
        to right,
        #020024,
        #001f3d,
        #003756,
        #00506d,
        #006b81
      ); */
          color: #fff;
          border: none;
          margin-top: 20px;
          border-radius: 6px;
          transition: 0.4s;
          font-weight: bold;
        }

        .submit:hover {
          color: #fff;
          background-color: #004e7c;
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
          bottom: 60px;
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
    // institucion: dato.institucion,
    direccion: dato.direccion,
    supervisora: dato.supervisora,
    tutora: dato.tutora,
    password: "",
  });

  // console.log(dato);

  const eliminarCuenta = () => {
    console.log("eliminarCuenta");
    console.log(dato._id);

    axios
      .post("http://localhost:8080/api/alumno/borarAlumno", {
        id: dato._id,
      })
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
      .put("http://localhost:8080/api/alumno/actualizarAlumno", envio)
      .then((response) => {
        // console.log(response.data);

        const respuesta = response.data;

        // console.log({ respuesta });

        setValores({
          primerNombre: respuesta.primerNombre,
          segundoNombre: respuesta.segundoNombre,
          primerApellido: respuesta.primerApellido,
          segundoApellido: respuesta.segundoApellido,
          cedula: respuesta.cedula,
          telefono: respuesta.telefono,
          correo: respuesta.correo,
          direccion: respuesta.direccion,
          supervisora: respuesta.supervisora,
          tutora: respuesta.tutora,
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
      <div className="usuarios" style={{ height: altura }}>
        <div className="usuario">
          <div className="contDatos">
            <span className="primerNombre">{valores.primerNombre}</span>
            <span className="segundoNombre">{valores.segundoNombre}</span>
            <span className="cedula">{valores.cedula}</span>
          </div>

          <form className="allDatos" onSubmit={(e) => enviar(e)}>
            <div className="conteLabel">
              <label>
                <span>Primer Nombre</span>
                <input
                  value={valores.primerNombre}
                  name="Primer"
                  onChange={(e) =>
                    setValores({ ...valores, primerNombre: e.target.value })
                  }
                  type="text"
                />
              </label>

              <label>
                <span>Segundo Nombre</span>
                <input
                  value={valores.segundoNombre}
                  name="Segundo"
                  onChange={(e) =>
                    setValores({ ...valores, segundoNombre: e.target.value })
                  }
                  type="text"
                />
              </label>

              <label>
                <span>Primer Apellido</span>
                <input
                  value={valores.primerApellido}
                  name="Primer"
                  onChange={(e) =>
                    setValores({ ...valores, primerApellido: e.target.value })
                  }
                  type="text"
                />
              </label>

              <label>
                <span>Segundo Apellido</span>
                <input
                  value={valores.segundoApellido}
                  name="Segundo"
                  onChange={(e) =>
                    setValores({ ...valores, segundoApellido: e.target.value })
                  }
                  type="text"
                />
              </label>

              <label>
                <span>Cedula</span>
                <input
                  value={valores.cedula}
                  name="Cedula"
                  onChange={(e) =>
                    setValores({ ...valores, cedula: e.target.value })
                  }
                  type="text"
                />
              </label>

              <label>
                <span>Telefono</span>
                <input
                  value={valores.telefono}
                  name="Telefono"
                  onChange={(e) =>
                    setValores({ ...valores, telefono: e.target.value })
                  }
                  type="text"
                />
              </label>

              <label>
                <span>Correo</span>
                <input
                  value={valores.correo}
                  name="Correo"
                  onChange={(e) =>
                    setValores({ ...valores, correo: e.target.value })
                  }
                  type="text"
                />
              </label>

              {/* <label>
                <span>Institucion</span>
                <input
                  value={valores.institucion}
                  name="Institucion"
                  onChange={(e) =>
                    setValores({ ...valores, institucion: e.target.value })
                  }
                  type="text"
                />
              </label> */}

              <label>
                <span>Direccion</span>
                <input
                  value={valores.direccion}
                  name="Direccion"
                  onChange={(e) =>
                    setValores({ ...valores, direccion: e.target.value })
                  }
                  type="text"
                />
              </label>

              <label>
                <span>Supervisora</span>
                {/* <input
                  value={valores.supervisora}
                  name="Supervisora"
                  onChange={(e) =>
                    setValores({ ...valores, Supervisora: e.target.value })
                  }
                  type="text"
                /> */}

                <select
                  onChange={(e) => {
                    setValores({ ...valores, supervisora: e.target.value });
                    // console.log(e.target.value);
                  }}
                >
                  {supevisora.map((e) => {
                    if (e._id === valores.tutora) {
                      return (
                        <option key={e._id} selected value={e._id}>
                          {e.primerNombre} {e.primerApellido}
                        </option>
                      );
                    } else {
                      return (
                        <option key={e._id} value={e._id}>
                          {e.primerNombre} {e.primerApellido}
                        </option>
                      );
                    }
                  })}
                </select>
              </label>

              <label>
                <span>Tutora</span>
                {/* <input
                  value={valores.tutora}
                  name="tutora"
                  onChange={(e) =>
                    setValores({ ...valores, tutora: e.target.value })
                  }
                  type="text"
                /> */}

                <select
                  onChange={(e) => {
                    setValores({ ...valores, tutora: e.target.value });
                  }}
                >
                  {tutora.map((e) => {
                    console.log("dato");
                    console.log(e);
                    // if (valores.tutora === null) {
                    //
                    // }
                    // console.log(valores.tutora._id);

                    if (e._id === valores.tutora) {
                      return (
                        <option key={e._id} selected value={e._id}>
                          {e.primerNombre} {e.primerApellido}
                        </option>
                      );
                    } else {
                      return (
                        <option key={e._id} value={e._id}>
                          {e.primerNombre} {e.primerApellido}
                        </option>
                      );
                    }
                  })}
                </select>
              </label>

              {/* <label>
              <span>USUARIO</span>
              <input
                onChange={(e) => setValores({ ...valores, nombre: e.target.value })}
                type="text"
              />
            </label> */}

              <label>
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
              </label>
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

            <input className="submit" type="submit" value="ACTUALIZAR DATOS" />

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

      <div
        className="control"
        style={{ transform: `rotate(${rotate}deg)` }}
        onClick={() => {
          altura == "50px" ? setAltura("500px") : setAltura("50px");
          rotate == "0" ? setRotate("180") : setRotate("0");

          // console.log("siii");
        }}
      ></div>
    </Div>
  );
};

export default Estudiante;

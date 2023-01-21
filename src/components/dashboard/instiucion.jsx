import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import Select from "react-select";
import { Navigate } from "react-router-dom";

import logo from "../../img/actualizarDatos.svg";
import fondo1 from "../../img/fondoN1.svg";
import axios from "axios";
import { useDatos } from "../../context/Context";

const Main = styled(motion.div)`
  /* background-image: url(${fondo1});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */
  background-color: #e6e8ea;
  display: flex;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */
  position: relative;
  padding: 20px;
  margin: 20px 0;
  border: 1px solid #0000007a;

  width: calc(100vw - 253px);

  .conte {
    margin: 20px 0 0 20px;
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

  h1 {
    /* background-color: red; */
    text-align: center;
    margin-top: 50px;
    color: #393939;
  }

  .conteAllDatos {
    display: flex;
    align-items: center;
    flex-direction: column;

    .allDatos {
      padding: 30px;
      /* box-shadow: 10px 10px 5px 0px #332b515a; */
      /* border: 2px solid #00000079; */
      margin-top: 100px;
      background-color: #ffffff;
      height: auto;
      max-width: 1000px;
      display: flex;
      align-items: center;
      flex-direction: column;
      /* text-align: center; */
      /* clip-path: polygon(0 0, 100% 0, 100% 10%, 0 10%); */

      .conteLabel {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        label {
          width: 250px;
          background-color: #b7d6ff1c;
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
          input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
          }
        }
      }

      .guardados {
        /* background-color: red; */
        font-size: 30px;
        margin-top: 20px;
        font-weight: bold;
        color: #098c2e;
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
      }

      .submit:hover {
        color: #fff;
        background-color: #004e7c;
      }
      .submit:active {
        color: #6b6a77a9;
        background-color: #ffffff;
      }

      .BorrarInstitucion {
        border-radius: 6px;
        position: absolute;
        right: 50px;
        bottom: 50px;
        background-color: #ff4040;
        padding: 15px;
        transition: 0.4s;
        font-weight: bold;
        cursor: pointer;
      }

      .BorrarInstitucion:hover {
        color: #fff;
        background-color: #ff0000;
      }

      .BorrarInstitucion:active {
        color: #6b6a77a9;
        background-color: #ffffff;
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
`;

const Institucion = ({ institucion, todasSupervisora, todasTutoras }) => {
  const [spiner, setSpiner] = useState(false);
  const [guardar, setGuardar] = useState(false);
  const [msg, setMsg] = useState("");
  const [componene, setComponene] = useState(false);
  const { datos, setDatos, entorno } = useDatos();

  const supervisora = institucion.supervisora.map((i) => {
    return { value: i._id, label: i.nombre };
  });

  const tutora = institucion.tutora.map((i) => {
    return { value: i._id, label: i.nombre };
  });

  const arraySupervisora = institucion.supervisora.map((i) => {
    return i._id;
  });

  const arrayTutora = institucion.tutora.map((i) => {
    return i._id;
  });

  const [valores, setValores] = useState({
    id: institucion._id,
    nombre: institucion.nombre,
    direccion: institucion.direccion,
    horasUsadas: institucion.horasUsadas,
    numeroAsignacion: institucion.numeroAsignacion,
    numeroAsignacionBoleano: institucion.numeroAsignacionBoleano,
    supervisora: arraySupervisora,
    tutora: arrayTutora,
    grupo: institucion.grupo,
  });

  const eliminar = () => {
    axios
      .post(`${entorno}api/institucion/borrar`, {
        id: valores.id,
      })
      .then(({ data }) => {
        setMsg("Insitucion Borrada");
        setTimeout(() => {
          setMsg("");
        }, 3000);

        setTimeout(() => {
          setComponene(true);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        console.log("algo paso en actualizar las insitucion");

        setMsg("No se pudo guadar la instiucion");
        setTimeout(() => {
          setMsg("");
        }, 3000);
      });
  };

  const atualizar = (e) => {
    e.preventDefault();

    axios
      .put(`${entorno}api/institucion/actualizarDatos`, valores)
      .then(({ data }) => {
        setMsg("Datos estan guardados");
        setTimeout(() => {
          setMsg("");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        console.log("algo paso en actualizar las insitucion");

        setMsg("No se han guardado los datos");
        setTimeout(() => {
          setMsg("");
        }, 3000);
      });
  };

  if (componene) {
    return null;
  }

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
      <div className="conte">
        <div className="logo"></div>
        <span>{valores.nombre}</span>
      </div>

      <div className="conteAllDatos">
        <form className="allDatos" onSubmit={(e) => atualizar(e)}>
          <div className="conteLabel">
            <label>
              <span>Nombre</span>
              <input
                value={valores.nombre}
                name="Primer"
                onChange={(e) =>
                  setValores({ ...valores, nombre: e.target.value })
                }
                type="text"
              />
            </label>

            <label>
              <span>Direccion</span>
              <input
                value={valores.direccion}
                name="direccion"
                onChange={(e) =>
                  setValores({ ...valores, direccion: e.target.value })
                }
                type="text"
              />
            </label>

            {/* <label>
              <span>Horas Usadas</span>
              <input
                disabled
                value={valores.horasUsadas}
                name="horasUsadas"
                onChange={(e) =>
                  setValores({ ...valores, horasUsadas: e.target.value })
                }
                type="text"
              />
            </label> */}

            {/* <label>
              <span>Numero Asignacion</span>
              <input
                disabled
                value={valores.numeroAsignacion}
                name="numeroAsignacion"
                onChange={(e) =>
                  setValores({ ...valores, numeroAsignacion: e.target.value })
                }
                type="text"
              />
            </label> */}

            <label>
              <span>Canidad de alumnos</span>
              <input
                // disabled
                value={valores.grupo[valores.grupo.length - 1].cantidad}
                name="numeroAsignacion"
                onChange={(e) => {
                  let listoGrupo = valores.grupo;
                  listoGrupo[valores.grupo.length - 1].cantidad =
                    e.target.value;
                  setValores({ ...valores, grupo: listoGrupo });
                }}
                type="number"
              />
            </label>

            <label>
              <span>Fecha</span>
              <input
                // disabled
                value={valores.grupo[valores.grupo.length - 1].fecha}
                name="numeroAsignacion"
                onChange={(e) => {
                  let listoGrupo = valores.grupo;
                  listoGrupo[valores.grupo.length - 1].fecha = e.target.value;
                  setValores({ ...valores, grupo: listoGrupo });
                }}
                type="date"
              />
            </label>

            {/* <label>
              <span>Numero Asignacion Boleano</span>

              <Select
                options={[
                  { value: true, label: "true" },
                  { value: false, label: "false" },
                ]}
                defaultValue={{
                  value: valores.numeroAsignacionBoleano,
                  label: `${valores.numeroAsignacionBoleano}`,
                }}
                onChange={(e) => {
                  console.log(e);

                  setValores({ ...valores, numeroAsignacionBoleano: e.value });
                }}
              />
            </label> */}

            <label className="fromSupevisora" style={{ width: "100%" }}>
              <span style={{ margin: "0 0 20px 0" }}>Tutora</span>

              <Select
                isMulti
                options={todasTutoras}
                defaultValue={tutora}
                onChange={(e) => {
                  // console.log(e);

                  const result = e.map((i) => i.value);

                  setValores({ ...valores, tutora: result });
                }}
              />
            </label>

            <label className="fromSupevisora" style={{ width: "100%" }}>
              <span style={{ margin: "0 0 20px 0" }}>Supervisora</span>

              <Select
                isMulti
                options={todasSupervisora}
                defaultValue={supervisora}
                onChange={(e) => {
                  // console.log(e);

                  const result = e.map((i) => i.value);

                  setValores({ ...valores, supervisora: result });
                }}
              />
            </label>
          </div>

          <span className="guardados">{msg}</span>

          <input className="submit" type="submit" value="ACTUALIZAR DATOS" />
          {/* <div onClick={() => eliminar()} className="BorrarInstitucion">
            Borrar Institucion
          </div> */}
        </form>
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
            DATOS GUARDADOS
          </motion.span>
        )}
      </AnimatePresence>

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
    </Main>
  );
};

export default Institucion;

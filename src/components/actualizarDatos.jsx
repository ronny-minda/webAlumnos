import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDatos } from "../context/Context";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

import logo from "../img/actualizarDatos.svg";
import fondo1 from "../img/fondoN1.svg";

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

  width: calc(100vw - 200px);

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
      max-width: 600px;
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
    }
  }

  .guardados {
    /* background-color: red; */
    font-size: 30px;
    margin-top: 20px;
    font-weight: bold;
    color: #098c2e;
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

const ActualizarDatos = () => {
  const { datos, setDatos } = useDatos();

  if (datos.usuario.rol == undefined) {
    return (
      <>
        <Navigate to="/" />
      </>
    );
  }

  if (datos.usuario.rol == "ADMIN_ROLE") {
    return (
      <>
        <Admin />
      </>
    );
  }

  if (datos.usuario.rol == "ALUGNO_ROLE") {
    return (
      <>
        <Esudiante />
      </>
    );
  }
};

const Esudiante = () => {
  const [spiner, setSpiner] = useState(false);
  const [guardar, setGuardar] = useState(false);
  const { datos, setDatos } = useDatos();
  const [error, setError] = useState(false);
  const [validarContraseña, setValidarContraseña] = useState({
    pass1: "",
    pass2: "",
  });

  const [valores, setValores] = useState({
    id: datos.usuario._id,
    primerNombre: datos.usuario.primerNombre,
    segundoNombre: datos.usuario.segundoNombre,
    primerApellido: datos.usuario.primerApellido,
    segundoApellido: datos.usuario.segundoApellido,
    cedula: datos.usuario.cedula,
    telefono: datos.usuario.telefono,
    correo: datos.usuario.correo,
    direccion: datos.usuario.direccion,
    curso: datos.usuario.curso,
    fechaInicio: datos.usuario.fechaInicio,
    fechaFin: datos.usuario.fechaFin,
    horas: datos.usuario.horas,
    institucion: datos.usuario.institucion.nombre,
    supervisora: datos.usuario.supervisora.nombre,
    tutora: datos.usuario.tutora.nombre,
    password: "",
  });

  // console.log("datos");
  // console.log(datos.rol);

  const enviar = (e) => {
    setSpiner(true);
    e.preventDefault();

    let envio;

    if (valores.password.length == 0) {
      const { supervisora, tutora, institucion, horas, password, ...resto } =
        valores;

      envio = {
        ...resto,
      };
    } else {
      const { supervisora, tutora, institucion, horas, ...resto } = valores;

      envio = {
        ...resto,
      };
    }

    axios
      .put(
        "https://serveralumnos-production.up.railway.app/api/alumno/actualizarAlumno",
        envio
      )
      .then((response) => {
        const respuesta = response.data;

        const usuario = {
          ...datos,
          usuario: {
            ...datos.usuario,
            id: respuesta._id,
            cedula: respuesta.cedula,
            correo: respuesta.correo,
            primerNombre: respuesta.primerNombre,
            segundoNombre: respuesta.segundoNombre,
            primerApellido: respuesta.primerApellido,
            segundoApellido: respuesta.segundoApellido,

            telefono: respuesta.telefono,

            rol: respuesta.rol,

            password: "",
          },
        };

        setDatos({
          ...usuario,
        });

        console.log("datos");
        console.log(datos);
        // setValores({
        //   id: datos.usuario._id,
        //   primerNombre: datos.usuario.primerNombre,
        //   segundoNombre: datos.usuario.segundoNombre,
        //   primerApellido: datos.usuario.primerApellido,
        //   segundoApellido: datos.usuario.segundoApellido,
        //   cedula: datos.usuario.cedula,
        //   telefono: datos.usuario.telefono,
        //   correo: datos.usuario.correo,
        //   direccion: datos.usuario.direccion,
        //   curso: datos.usuario.curso || "",
        //   fechaInicio: datos.usuario.fechaInicio || "",
        //   fechaFin: datos.usuario.fechaFin || "",
        //   horas: datos.usuario.horas || "",
        //   institucion: datos.usuario.institucion.nombre || "",
        //   supervisora: datos.usuario.supervisora.nombre,
        //   tutora: datos.usuario.tutora.nombre,
        //   password: "",
        // });
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
    <Main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h1>Actualizar Datos {datos.usuario.primerNombre}</h1>

      <div className="conteAllDatos">
        <form className="allDatos" onSubmit={(e) => enviar(e)}>
          <div className="conteLabel">
            <label>
              <span>Primer Nombre</span>
              <input
                value={valores.primerNombre}
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
                onChange={(e) =>
                  setValores({ ...valores, segundoApellido: e.target.value })
                }
                type="text"
              />
            </label>

            <label>
              <span>Curso</span>
              <input
                disabled
                value={valores.curso}
                onChange={(e) =>
                  setValores({ ...valores, curso: e.target.value })
                }
                type="text"
              />
            </label>

            <label>
              <span>Fecha Inicio</span>
              <input
                disabled
                value={valores.fechaInicio}
                onChange={(e) =>
                  setValores({ ...valores, fechaInicio: e.target.value })
                }
                type="text"
              />
            </label>

            <label>
              <span>Fecha Fin</span>
              <input
                disabled
                value={valores.fechaFin}
                onChange={(e) =>
                  setValores({ ...valores, fechaFin: e.target.value })
                }
                type="text"
              />
            </label>

            <label>
              <span>Horas</span>
              <input
                disabled
                value={valores.horas}
                onChange={(e) =>
                  setValores({ ...valores, horas: e.target.value })
                }
                type="text"
              />
            </label>

            <label>
              <span>Institucion</span>
              <input
                disabled
                value={valores.institucion}
                onChange={(e) =>
                  setValores({ ...valores, institucion: e.target.value })
                }
                type="text"
              />
            </label>

            <label>
              <span>Cedula</span>
              <input
                value={valores.cedula}
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
                onChange={(e) =>
                  setValores({ ...valores, correo: e.target.value })
                }
                type="text"
              />
            </label>

            <label>
              <span>Supervisora</span>
              <input
                disabled
                value={valores.supervisora}
                onChange={(e) =>
                  setValores({ ...valores, supervisora: e.target.value })
                }
                type="text"
              />
            </label>

            <label>
              <span>Tutora</span>
              <input
                disabled
                value={valores.tutora}
                onChange={(e) =>
                  setValores({ ...valores, tutora: e.target.value })
                }
                type="text"
              />
            </label>

            <label>
              <span>Password</span>
              <input
                value={valores.password}
                onChange={(e) =>
                  setValores({ ...valores, password: e.target.value })
                }
                type="text"
              />
            </label>
          </div>

          <input className="submit" type="submit" value="ACTUALIZAR DATOS" />
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

const Admin = () => {
  const [spiner, setSpiner] = useState(false);
  const [guardar, setGuardar] = useState(false);
  const { datos, setDatos } = useDatos();
  const [error, setError] = useState(false);
  const [validarContraseña, setValidarContraseña] = useState({
    pass1: "",
    pass2: "",
  });

  const [valores, setValores] = useState({
    id: datos.usuario._id,
    cedula: datos.usuario.cedula,
    correo: datos.usuario.correo,
    direccion: datos.usuario.direccion,
    primerNombre: datos.usuario.primerNombre,
    telefono: datos.usuario.telefono,
    password: "",
  });

  // console.log("datos");
  // console.log(datos.rol);

  const enviar = (e) => {
    setSpiner(true);
    e.preventDefault();

    let envio;

    if (valores.password.length == 0) {
      const { password, ...resto } = valores;

      envio = {
        ...resto,
      };
    } else {
      envio = {
        ...valores,
      };
    }

    axios
      .put(
        "https://serveralumnos-production.up.railway.app/api/admin/actualizarDatos",
        envio
      )
      .then((response) => {
        const respuesta = response.data;

        console.log("respuesta");
        console.log(respuesta);

        setDatos({
          ...datos,
          id: respuesta._id,
          cedula: respuesta.cedula,
          correo: respuesta.correo,
          direccion: respuesta.direccion,
          primerNombre: respuesta.primerNombre,
          telefono: respuesta.telefono,
          rol: respuesta.rol,
          password: "",
        });

        console.log("datos");
        console.log(datos);

        // setValores({
        //   id: datos.usuario._id,
        //   primerNombre: datos.usuario.primerNombre,
        //   segundoNombre: datos.usuario.segundoNombre,
        //   primerApellido: datos.usuario.primerApellido,
        //   segundoApellido: datos.usuario.segundoApellido,
        //   cedula: datos.usuario.cedula,
        //   telefono: datos.usuario.telefono,
        //   correo: datos.usuario.correo,
        //   direccion: datos.usuario.direccion,
        //   curso: datos.usuario.curso,
        //   fechaInicio: datos.usuario.fechaInicio,
        //   fechaFin: datos.usuario.fechaFin,
        //   horas: datos.usuario.horas,
        //   institucion: datos.usuario.institucion.nombre,
        //   supervisora: datos.usuario.supervisora.nombre,
        //   tutora: datos.usuario.tutora.nombre,
        //   password: "",
        // });

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
    <Main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="conte">
        <div className="logo"></div>
        <span>Actualizar Datos</span>
      </div>
      <h1>Actualizar Datos {datos.usuario.primerNombre}</h1>

      <div className="conteAllDatos">
        <form className="allDatos" onSubmit={(e) => enviar(e)}>
          <div className="conteLabel">
            <label>
              <span>Nombre</span>
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

export default ActualizarDatos;

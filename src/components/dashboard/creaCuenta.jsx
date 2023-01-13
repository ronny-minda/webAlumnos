import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import logo from "../../img/crearCuenta.svg";
import { useDatos } from "../../context/Context";
import axios from "axios";
import { Navigate } from "react-router-dom";

import Select from "react-select";

const Main = styled(motion.div)`
  /* max-width: calc(100vw - 200px); */
  width: calc(100vw - 200px);
  background-color: #e6e8ea;
  padding: 20px;

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

  .contenedor {
    /* background-color: red; */
    display: flex;
    margin-top: 30px;
    height: 60px;

    .iten {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      width: 120px;
      background-color: #676767;
      margin: 0 10px;
      border-radius: 5px 5px 0 0;
      transition: 0.5s;
      cursor: pointer;

      span {
        font-weight: bold;
        display: inline-block;
        height: auto;
        width: auto;
        cursor: pointer;
      }
    }
    .activo {
      background-color: #ffffff;
    }
    .iten:hover {
      background-color: #ffffff;
    }
  }

  .formulario {
    /* padding: 20px 0; */
    overflow-y: auto;
    height: 76vh;
    width: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

    h1 {
      padding-top: 20px;
      color: #393939;
    }

    form {
      /* border: 2px solid #ffffff63; */
      padding: 25px 0;
      /* background-color: #d9e1ff14; */
      border-radius: 20px;
      /* backdrop-filter: blur(6px); */
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      flex-direction: column;
      /* width: 80%; */

      .conteLabel {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .formTutora {
          width: 100%;
        }

        .fromSupevisora {
          width: 100%;
        }

        label {
          /* background-color: red; */
          display: flex;
          flex-direction: column;
          margin: 15px;
          width: 300px;

          select {
            background-color: #99a0f479;
            border: none;
            font-size: 14px;
            height: 30px;
            padding: 5px;
            /* width: 250px; */
            outline: none;

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

          span {
            color: #393939;
            font-weight: bold;
            font-size: 18px;
          }

          input {
            margin: 10px 0;
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
    }

    .spiner {
      z-index: 10;
      height: 100%;
      width: 100%;
      background-color: #0000005a;
      backdrop-filter: blur(2px);
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

    .msgError {
      /* background-color: red; */
      color: #ff8989;
      font-weight: bold;
      font-size: 20px;
    }

    .submit {
      width: 400px;
      background-color: #4855a4;
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
      background-color: #8f98d1;
    }
    .submit:active {
      color: #6b6a77a9;
      background-color: #ffffff;
    }
  }
`;

const CrearCuenta = () => {
  const { datos, setDatos, entorno } = useDatos();
  const [activo, setActivo] = useState({
    alumno: "iten activo",
    tutor: "iten",
    supervisor: "iten",
    instiucion: "iten",
  });

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
      {/* <h1>CrearCuenta</h1> */}

      <div className="conte">
        <div className="logo"></div>
        <span>CREAR CUENTA</span>
      </div>

      <div className="contenedor">
        <div
          className={activo.alumno}
          onClick={() => {
            setActivo({
              alumno: "iten activo",
              tutor: "iten",
              supervisor: "iten",
              instiucion: "iten",
            });
          }}
        >
          <span>ALUMNO</span>
        </div>
        <div
          className={activo.tutor}
          onClick={() => {
            setActivo({
              alumno: "iten",
              tutor: "iten activo",
              supervisor: "iten",
              instiucion: "iten",
            });
          }}
        >
          <span>TUTOR</span>
        </div>
        <div
          className={activo.supervisor}
          onClick={() => {
            setActivo({
              alumno: "iten",
              tutor: "iten",
              supervisor: "iten activo",
              instiucion: "iten",
            });
          }}
        >
          <span>SUPERVISOR</span>
        </div>
        <div
          className={activo.instiucion}
          onClick={() => {
            setActivo({
              alumno: "iten",
              tutor: "iten",
              supervisor: "iten",
              instiucion: "iten activo",
            });
          }}
        >
          <span>INSTITUCION</span>
        </div>
      </div>

      <div className="formulario">
        {activo.alumno == "iten activo" ? <FormAlumno /> : null}
        {activo.tutor == "iten activo" ? <FormTutor /> : null}
        {activo.supervisor == "iten activo" ? <FormSupervisor /> : null}
        {activo.instiucion == "iten activo" ? <FormInstiucion /> : null}
      </div>
    </Main>
  );
};

const FormAlumno = () => {
  
  const [institucion, setInstitucion] = useState([]);
  const [error, setError] = useState(false);

  const [msgError, setMsgError] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    cedula: "",
    telefono: "",
    correo: "",
    curso: "",
    horas: "",
    institucion: "",
    password: "",
    msgError: "",
  });

  const [login, setLogin] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    cedula: "",
    telefono: "",
    correo: "",
    curso: "",

    fechaInicio: new Date("11/10/2022"),
    fechaFin: new Date("11/10/2022"),
    institucion: "",

    horas: "",
    password: "",
  });
  const [validarContraseña, setValidarContraseña] = useState({
    pass1: "",
    pass2: "",
  });
  const [spiner, setSpiner] = useState(false);

  const { datos, setDatos, entorno } = useDatos();

  useEffect(() => {
    axios
      .post(
        `${entorno}api/institucion/buscarTodos`
      )
      .then(({ data }) => {
        // console.log(data);
        setInstitucion(data);
      })
      .catch((err) => {
        console.log("algo salio mal en pedido institucion!");
      });
  }, []);

  const asignarFecha = (limite) => {
    const dias = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];

    let i = 1;
    let contado = 0;

    while (i <= limite) {
      const nombreDia = dias[login.fechaInicio.getDay() + contado];

      console.log(nombreDia);
      console.log(login.fechaFin.getDay());
      console.log(login.fechaInicio.getDay() + contado);

      if (nombreDia != "sábado" && nombreDia != "domingo") {
        console.log("Nombre de día de la semana: ", nombreDia);

        console.log(login.fechaInicio);

        i++;
      }
      contado++;
      console.log("");
    }

    contado = contado - 1;

    login.fechaFin.setDate(login.fechaInicio.getDate() + contado);

    console.log("login.fechaFin");
    console.log(login.fechaFin);
  };

  const enviar = (e) => {
    e.preventDefault();
    // let fecha = new Date("7/07/2022");

    // login.fechaInicio.setDate(login.fechaInicio.getDate() + 12);

    if (login.horas === "96H") {
      // login.fechaFin.setDate(login.fechaInicio.getDate() + 12);
      asignarFecha(12);
    }
    if (login.horas === "144H") {
      // login.fechaFin.setDate(login.fechaInicio.getDate() + 18);
      asignarFecha(18);
    }
    if (login.horas === "240H") {
      // login.fechaFin.setDate(login.fechaInicio.getDate() + 30);
      asignarFecha(30);
    }
    if (login.horas === "480H") {
      // login.fechaFin.setDate(login.fechaInicio.getDate() + 60);
      // asignarFecha(60);

      // login.fechaFin.setDate(login.fechaInicio.getDate() + 81);
      login.fechaFin.setDate(login.fechaInicio.getDate() + 83);

      // console.log("login");
      // console.log(login);
    }

    // TuFecha.setDate(TuFecha.getDate() + 7)

    if (validarContraseña.pass1 === validarContraseña.pass2) {
      // console.log("login");
      // console.log(login);

      // console.log("login.primerNombre.length");
      // console.log(login);

      if (login.primerNombre.length === 0) {
        return setMsgError({
          primerNombre: "falta completar el primerNombre",
        });
      }
      if (login.segundoNombre.length === 0) {
        return setMsgError({
          segundoNombre: "falta completar el segundoNombre",
        });
      }
      if (login.primerApellido.length === 0) {
        return setMsgError({
          primerApellido: "falta completar el primerApellido",
        });
      }
      if (login.segundoApellido.length === 0) {
        return setMsgError({
          segundoApellido: "falta completar el segundoApellido",
        });
      }
      if (login.cedula.length === 0) {
        return setMsgError({
          cedula: "falta completar el cedula",
        });
      }
      if (login.telefono.length === 0) {
        return setMsgError({
          telefono: "falta completar el telefono",
        });
      }
      if (login.correo.length === 0) {
        return setMsgError({
          correo: "falta completar el correo",
        });
      }
      if (login.curso.length === 0) {
        return setMsgError({
          curso: "falta completar el curso",
        });
      }
      if (login.horas.length === 0) {
        return setMsgError({
          horas: "falta completar el horas",
        });
      }

      if (login.password.length === 0) {
        return setMsgError({
          password: "falta completar el password",
        });
      }

      if (login.institucion.length === 0) {
        return setMsgError({
          institucion: "falta completar elegir la institucion",
        });
      }

      setSpiner(true);

      // console.log({ login });
      console.log("login");
      console.log(login);

      axios
        .post(
          `${entorno}api/alumno/crearAlumno`,
          login
        )
        .then(({ data }) => {
          const { token, alumno } = data;

          setSpiner(false);

          setMsgError({
            nombre: "Alumno creado",
          });
          setTimeout(() => {
            setMsgError({
              nombre: "",
            });
          }, 3000);
        })
        .catch((err) => {
          console.log(err.response.data.msg);

          setMsgError({
            nombre: "Tutor creado",
          });
          setTimeout(() => {
            setMsgError({
              nombre: "No se apodido crea el alumno",
            });
          }, 3000);

          setMsgError({
            msgError: err.response.data.msg,
          });

          console.log(err);

          // setError(true);
          // setTimeout(() => {
          //   setError(false);
          // }, 4000);
          setSpiner(false);
        });

      console.log({ datos });

      console.log("si esta listo");
    } else {
      console.log("no esta listo");

      return setMsgError({
        password: "Las contraseñas no son iguales",
      });
    }
  };

  return (
    <>
      <h1>CREAR ALUMNO</h1>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        style={{ maxWidth: "900px" }}
        onSubmit={(e) => enviar(e)}
      >
        <div className="conteLabel">
          <label>
            <span>Primer Nombre</span>
            <input
              name="Primer"
              onChange={(e) =>
                setLogin({ ...login, primerNombre: e.target.value })
              }
              type="text"
            />
          </label>

          <label>
            <span>Segundo Nombre</span>
            <input
              name="Segundo"
              onChange={(e) =>
                setLogin({ ...login, segundoNombre: e.target.value })
              }
              type="text"
            />
          </label>

          <label>
            <span>Primer Apellido</span>
            <input
              name="Primer"
              onChange={(e) =>
                setLogin({ ...login, primerApellido: e.target.value })
              }
              type="text"
            />
          </label>

          <label>
            <span>Segundo Apellido</span>
            <input
              name="Segundo"
              onChange={(e) =>
                setLogin({ ...login, segundoApellido: e.target.value })
              }
              type="text"
            />
          </label>

          <label>
            <span>Cedula</span>
            <input
              name="Cedula"
              onChange={(e) => setLogin({ ...login, cedula: e.target.value })}
              type="number"
            />
          </label>

          <label>
            <span>Telefono</span>
            <input
              name="Telefono"
              onChange={(e) => setLogin({ ...login, telefono: e.target.value })}
              type="number"
            />
          </label>

          <label>
            <span>Correo</span>
            <input
              name="Correo"
              onChange={(e) => setLogin({ ...login, correo: e.target.value })}
              type="text"
            />
          </label>

          <label>
            <span>Curso</span>
            <select
              onChange={(e) => {
                setLogin({
                  ...login,
                  curso: e.target.value,
                  horas: e.target.value === "6to" ? "96H" : "",
                });
              }}
            >
              <option disabled selected hidden>
                Elija un curso
              </option>
              <option value="6to">6to</option>
              <option value="7mo">7mo</option>
              <option value="8vo">8vo</option>
              <option value="9no">9no</option>
            </select>
          </label>

          <label>
            <span>Horas</span>
            <select
              disabled={
                login.curso === "6to" || login.curso === "" ? true : false
              }
              onChange={(e) => {
                setLogin({ ...login, horas: e.target.value });
              }}
            >
              {login.curso !== "6to" ? (
                <option disabled selected hidden>
                  Elija sus horas
                </option>
              ) : null}

              {login.horas === "" ? (
                <option disabled selected hidden>
                  Elija sus horas
                </option>
              ) : null}

              {login.curso === "" ? (
                <option disabled selected hidden>
                  Elija un curso
                </option>
              ) : null}

              {login.curso === "6to" ? (
                <option disabled selected hidden>
                  96H
                </option>
              ) : null}

              {login.curso === "7mo" ? (
                <>
                  <option value="96H">96H</option>
                  <option value="144H">144H</option>
                  <option value="240H">240H</option>
                </>
              ) : null}

              {login.curso === "8vo" || login.curso === "9no" ? (
                <>
                  <option value="96H">96H</option>
                  <option value="144H">144H</option>
                  <option value="240H">240H</option>
                  <option value="480H">480H</option>
                </>
              ) : null}

              {/* <option value="96H">96H</option>
                  <option value="144H">144H</option>
                  <option value="240H">240H</option>
                  <option value="480H">480H</option> */}
            </select>
          </label>

          <label>
            <span>Institucion</span>
            <select
              onChange={(e) => {
                setLogin({ ...login, institucion: e.target.value });
              }}
            >
              <option disabled selected hidden>
                Elija una institucion
              </option>
              {institucion.map((i) => {
                return (
                  <option key={i._id} value={i._id}>
                    {i.nombre}
                  </option>
                );
              })}
            </select>
          </label>

          <label>
            <span>CONTRASEÑA</span>
            <input
              name="CONTRASEÑA"
              onChange={(e) => {
                setLogin({ ...login, password: e.target.value });

                // setLogin({ ...login, nombre: e.target.value })

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
              name="REPETIR CONTRASEÑA"
              onChange={(e) => {
                // setLogin({ ...login, nombre: e.target.value })

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

        <span className="msgError">{msgError.primerNombre}</span>
        <span className="msgError">{msgError.segundoNombre}</span>
        <span className="msgError">{msgError.primerApellido}</span>
        <span className="msgError">{msgError.segundoApellido}</span>
        <span className="msgError">{msgError.cedula}</span>
        <span className="msgError">{msgError.telefono}</span>
        <span className="msgError">{msgError.correo}</span>
        <span className="msgError">{msgError.curso}</span>
        <span className="msgError">{msgError.horas}</span>

        <span className="msgError">{msgError.password}</span>
        <span className="msgError">{msgError.msgError}</span>
        <span className="msgError">{msgError.institucion}</span>
        <input className="submit" type="submit" value="CREAR ALUMNO" />
      </motion.form>

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
    </>
  );
};

const FormTutor = () => {
  const { datos, setDatos, entorno } = useDatos();
  const [login, setLogin] = useState({
    nombre: "",
  });
  const [error, setError] = useState(false);

  const [msgError, setMsgError] = useState({
    nombre: "",
  });
  const enviar = (e) => {
    e.preventDefault();
    if (login.nombre.length === 0) {
      return setMsgError({
        nombre: "falta completar el nombre",
      });
    }

    axios
      .post(
        `${entorno}api/tutora/crear`,
        login
      )
      .then(({ data }) => {
        console.log(data);
        setMsgError({
          nombre: "Tutor creado",
        });
        setTimeout(() => {
          setMsgError({
            nombre: "",
          });
        }, 3000);
      })
      .catch((err) => {
        console.log("algo ocurrio en Crear supervisora");

        setMsgError({
          nombre: "No se pudo crear el tutor",
        });
        setTimeout(() => {
          setMsgError({
            nombre: "",
          });
        }, 3000);

        console.log(err);
      });
  };

  return (
    <>
      <h1>CREAR TUTOR</h1>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        style={{ maxWidth: "900px" }}
        onSubmit={(e) => enviar(e)}
      >
        <div className="conteLabel">
          <label>
            <span>Nombre</span>
            <input
              name="Primer"
              onChange={(e) => setLogin({ ...login, nombre: e.target.value })}
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
              INTENTA DE NUEVO O MAS TARDEii
            </motion.span>
          )}
        </AnimatePresence>

        <span className="msgError">{msgError.nombre}</span>

        <input className="submit" type="submit" value="CREAR TUTOR" />
      </motion.form>
    </>
  );
};

const FormSupervisor = () => {
  const { datos, setDatos, entorno } = useDatos();
  const [login, setLogin] = useState({
    nombre: "",
    cedula: "",
    correo: "",
    telefono: "",
  });
  const [error, setError] = useState(false);

  const [msgError, setMsgError] = useState({
    nombre: "",
    cedula: "",
    correo: "",
    telefono: "",
  });
  const enviar = (e) => {
    e.preventDefault();

    if (login.nombre.length === 0) {
      return setMsgError({
        nombre: "falta completar el nombre",
      });
    }
    if (login.cedula.length === 0) {
      return setMsgError({
        cedula: "falta completar el cedula",
      });
    }
    if (login.correo.length === 0) {
      return setMsgError({
        correo: "falta completar el correo",
      });
    }
    if (login.telefono.length === 0) {
      return setMsgError({
        telefono: "falta completar el telefono",
      });
    }

    axios
      .post(
        `${entorno}api/supervisora/crear`,
        login
      )
      .then(({ data }) => {
        console.log(data);
        setMsgError({
          nombre: "supervisor creado",
        });
        setTimeout(() => {
          setMsgError({
            nombre: "",
          });
        }, 3000);
      })
      .catch((err) => {
        console.log("algo ocurrio en Crear supervisor");

        setMsgError({
          nombre: "No se pudo crear el supervisor",
        });
        setTimeout(() => {
          setMsgError({
            nombre: "",
          });
        }, 3000);

        console.log(err);
      });
  };

  return (
    <>
      <h1>CREAR SUPERVISOR</h1>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        style={{ maxWidth: "900px" }}
        onSubmit={(e) => enviar(e)}
      >
        <div className="conteLabel">
          <label>
            <span>Nombre</span>
            <input
              name="Primer"
              onChange={(e) => setLogin({ ...login, nombre: e.target.value })}
              type="text"
            />
          </label>

          <label>
            <span>Cedula</span>
            <input
              name="Primer"
              onChange={(e) => setLogin({ ...login, cedula: e.target.value })}
              type="text"
            />
          </label>

          <label>
            <span>Correo</span>
            <input
              name="Primer"
              onChange={(e) => setLogin({ ...login, correo: e.target.value })}
              type="text"
            />
          </label>

          <label>
            <span>Telefono</span>
            <input
              name="Primer"
              onChange={(e) => setLogin({ ...login, telefono: e.target.value })}
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

        <span className="msgError">{msgError.nombre}</span>
        <span className="msgError">{msgError.cedula}</span>
        <span className="msgError">{msgError.correo}</span>
        <span className="msgError">{msgError.telefono}</span>

        <input className="submit" type="submit" value="CREAR SUPERVISOR" />
      </motion.form>
    </>
  );
};

const FormInstiucion = () => {
  const [supervisora, setSupervisora] = useState([]);
  const [tutora, setTutora] = useState([]);
  const { datos, setDatos, entorno } = useDatos();
  const [spiner, setSpiner] = useState(false);
  const [error, setError] = useState(false);
  const [MensajeError, setMensajeError] = useState("");

  const [validarContraseña, setValidarContraseña] = useState({
    pass1: "",
    pass2: "",
  });
  const [msgError, setMsgError] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    cedula: "",
    telefono: "",
    correo: "",
    direccion: "",
    supervisora: "",
    tutora: "",
    password: "",
  });

  const [login, setLogin] = useState({
    nombre: "",
    direccion: "",
    tutora: [],
    // numeroAsignacion: "",
    supervisora: [],
  });

  useEffect(() => {
    axios
      .get(
        `${entorno}api/supervisora/pedirTodos`
      )
      .then(({ data }) => {
        // console.log(data);

        const result = data.map((i) => {
          return { value: i._id, label: i.nombre };
        });

        setSupervisora(result);
      })
      .catch((err) => {
        console.log("algo salio mal en pedido supevisoras!");
      });

    axios
      .get(
        `${entorno}api/tutora/pedirTodos`
      )
      .then(({ data }) => {
        // console.log(data);

        const result = data.map((i) => {
          return { value: i._id, label: i.nombre };
        });

        setTutora(result);
      })
      .catch((err) => {
        console.log("algo salio mal en pedido supevisoras!");
      });
  }, []);

  const enviar = (e) => {
    e.preventDefault();

    // console.log("login");
    // console.log(login);

    setSpiner(true);

    axios
      .post(
        `${entorno}api/institucion/crear`,
        login
      )
      .then(({ data }) => {
        console.log(data);

        setMensajeError("Institucion creada");
        setTimeout(() => {
          setMensajeError("");
        }, 3000);

        setSpiner(false);
      })
      .catch((err) => {
        console.log("algo ocurrio en Crear Cuenta");

        console.log(err);

        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
        setSpiner(false);

        setMensajeError("No se pudo crear la institucion");
        setTimeout(() => {
          setMensajeError("");
        }, 3000);
      });

    //   console.log({ datos });

    //   console.log("si esta listo");
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <>
      <h1>CREAR INSTITUCION</h1>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        onSubmit={(e) => enviar(e)}
      >
        <div className="conteLabel">
          <label>
            <span>Nombre</span>
            <input
              onChange={(e) => setLogin({ ...login, nombre: e.target.value })}
              type="text"
            />
          </label>

          <label>
            <span>Direccion</span>
            <input
              onChange={(e) =>
                setLogin({ ...login, direccion: e.target.value })
              }
              type="text"
            />
          </label>

          <label className="formTutora">
            <span style={{ margin: "0 0 20px 0" }}>Tutora</span>

            <Select
              isMulti
              options={tutora}
              onChange={(e) => {
                const result = e.map((i) => i.value);

                setLogin({ ...login, tutora: result });
              }}
            />
          </label>

          <label className="fromSupevisora">
            <span style={{ margin: "0 0 20px 0" }}>Supervisora</span>

            <Select
              isMulti
              options={supervisora}
              onChange={(e) => {
                // console.log(e);

                const result = e.map((i) => i.value);

                // console.log(result);

                setLogin({ ...login, supervisora: result });
              }}
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

        <span className="msgError">{MensajeError}</span>

        <input className="submit" type="submit" value="CREAR CUENTA" />
      </motion.form>

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
    </>
  );
};

export default CrearCuenta;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";

import img from "../img/login.jpg";
import fondo from "../img/fondoLogion1.svg";

import { useDatos } from "../context/Context";
import { Navigate } from "react-router-dom";

const Main = styled(motion.main)`
  display: flex;
  height: 100vh;
  width: 100vw;

  @media (max-width: 820px) {
    & {
      height: auto;
    }
  }
  /* background-image: url(${img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */

  /* .dice {
    height: 100%;
    width: 50%;
  } */

  .iniciarSecion {
    position: absolute;
    /* height: 100px;
    width: 100px; */
    top: 20px;
    left: 20px;
    z-index: 9;

    background-color: #003756;
    padding: 15px;

    color: #fff;
    border: none;
    margin-top: 20px;
    border-radius: 6px;
    transition: 0.4s;
    font-weight: bold;
    text-decoration: none;
    font-size: 14px;

    &:hover {
      color: #fff;
      background-color: #004e7c;
    }
    &:active {
      color: #6b6a77a9;
      background-color: #ffffff;
    }
  }

  .login {
    padding: 20px 0;
    height: 100vh;
    width: 100%;
    background-color: #d4d4ff;
    /* border-radius: 80px 0px 0px 80px; */
    /* box-shadow: -31px 2px 96px 19px #1c1931bf; */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    background-image: url(${fondo});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;

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
      border-radius: 80px 0px 0px 80px;

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

    form {
      border: 2px solid #ffffff63;
      padding: 25px 0;
      background-color: #d9e1ff14;
      border-radius: 20px;
      backdrop-filter: blur(6px);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      flex-direction: column;
      width: 80%;

      .conteLabel {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

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
          }

          span {
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
        }
      }
    }

    .msgError {
      /* background-color: red; */
      color: red;
      font-weight: bold;
      font-size: 20px;
    }

    .submit {
      width: 400px;
      background-color: #d55050;
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
      background-color: #e66c6c;
    }
    .submit:active {
      color: #6b6a77a9;
      background-color: #ffffff;
    }
  }
`;

const CrearSupervisor = () => {
  const [supevisora, setSupevisora] = useState([]);
  const [tutora, setTutora] = useState([]);
  const { datos, setDatos } = useDatos();
  const [spiner, setSpiner] = useState(false);
  const [error, setError] = useState(false);

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
    cedula: "",
    telefono: "",
    correo: "",
  });

  useEffect(() => {
    // axios
    //   .get("https://serveralumnos-production.up.railway.app/api/supervisora/pedirTodos")
    //   .then((response) => {
    //     const SUPERVISORA_ROLE = response.data.filter(
    //       (dato) => dato.rol == "SUPERVISORA_ROLE"
    //     );
    //     const TUTOR_ROLE = response.data.filter(
    //       (dato) => dato.rol == "TUTOR_ROLE"
    //     );
    //     setSupevisora(SUPERVISORA_ROLE);
    //     setTutora(TUTOR_ROLE);
    //   })
    //   .catch((err) => {
    //     console.log("algo salio mal en pedido supevisoras!");
    //   });
  }, []);

  const enviar = (e) => {
    e.preventDefault();

    if (validarContraseña.pass1 === validarContraseña.pass2) {
      // console.log("login");
      // console.log(login);

      setSpiner(true);

      axios
        .post(
          "https://serveralumnos-production.up.railway.app/api/supervisora/crear",
          login
        )
        .then(({ data }) => {
          console.log(data);

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
        });

      console.log({ datos });

      console.log("si esta listo");
    } else {
      console.log("no esta listo");
    }
  };

  return (
    <>
      <Main
        // onClick={() => console.log(datos)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="dice"></div>
        <div className="login">
          <form onSubmit={(e) => enviar(e)}>
            <div className="conteLabel">
              <label>
                <span>Nombre</span>
                <input
                  name="Primer"
                  onChange={(e) =>
                    setLogin({ ...login, nombre: e.target.value })
                  }
                  type="text"
                />
              </label>

              <label>
                <span>Cedula</span>
                <input
                  name="Segundo"
                  onChange={(e) =>
                    setLogin({ ...login, cedula: e.target.value })
                  }
                  type="text"
                />
              </label>

              <label>
                <span>Telefono</span>
                <input
                  name="Primer"
                  onChange={(e) =>
                    setLogin({ ...login, telefono: e.target.value })
                  }
                  type="text"
                />
              </label>

              <label>
                <span>Correo</span>
                <input
                  name="Segundo"
                  onChange={(e) =>
                    setLogin({ ...login, correo: e.target.value })
                  }
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
            <span className="msgError">{msgError.direccion}</span>
            <span className="msgError">{msgError.supervisora}</span>
            <span className="msgError">{msgError.tutora}</span>
            <span className="msgError">{msgError.password}</span>
            <input className="submit" type="submit" value="CREAR CUENTA" />
          </form>

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
        </div>
      </Main>
    </>
  );
};

export default CrearSupervisor;

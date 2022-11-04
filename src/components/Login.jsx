import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

import { useDatos } from "../context/Context";

import img from "../img/login.jpg";
import fondo from "../img/fondoLogion.svg";

const Main = styled(motion.main)`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-image: url(${img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .dice {
    height: 100%;
    width: 50%;
  }
  .login {
    height: 100vh;
    width: 80%;
    background-color: #d4d4ff;
    border-radius: 80px 0px 0px 80px;
    box-shadow: -31px 2px 96px 19px #1c1931bf;
    display: flex;
    justify-content: center;
    align-items: center;

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
      /* background-color: red; */
      display: flex;
      flex-direction: column;
      width: 300px;

      label {
        display: flex;
        flex-direction: column;
        margin: 15px 0;

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

      .msgError {
        font-weight: bold;
        text-align: center;
        color: red;
      }
    }

    .crearCuenta {
      position: absolute;
      top: 40px;
      right: 40px;
      background-color: #d55050;
      padding: 15px 25px;
      color: #fff;
      border-radius: 6px;
      transition: 0.4s;
      font-weight: bold;
      text-decoration: none;
      font-size: 13px;
    }

    .crearCuenta:hover {
      color: #fff;
      background-color: #e66c6c;
    }
    .crearCuenta:active {
      color: #6b6a77a9;
      background-color: #ffffff;
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
`;

const Login = () => {
  const { datos, setDatos } = useDatos();
  const [error, setError] = useState(false);
  const [login, setLogin] = useState({
    cedula: "",
    contraseña: "",
  });
  const [spiner, setSpiner] = useState(false);
  const [acceso, setAcceso] = useState(false);

  // {
  //   "correo": "uno@gmail.com",
  //   "password": "123456"
  // }

  // ERROR EN EL LOCAL STORAGE => falta la validacion de 4 horas en el backend

  useEffect(() => {
    let data = window.localStorage.getItem("root");

    console.log("data");
    console.log(data);

    if (data == null) {
      const sesion = {
        token: "",
        usuario: {},
      };
      window.localStorage.setItem("root", JSON.stringify(sesion));
    }

    if (data !== null) {
      let sesion = JSON.parse(data);
      console.log("sesion");
      console.log(sesion.token);
      if (sesion.token !== undefined) {
        setDatos(sesion);
        // return <>{/* <Navigate to="/home" /> */}</>;
      }
    }
  }, []);

  console.log({ datos });

  const enviar = (e) => {
    setSpiner(true);
    e.preventDefault();
    // return <Navigate to="/home" />;
    axios
      .post("https://serveralumnos-production.up.railway.app/api/login", {
        cedula: login.cedula,
        password: login.contraseña,
      })
      .then((response) => {
        setSpiner(false);
        const { token, usuario } = response.data;

        const sesion = {
          ...datos,
          token,
          usuario,
        };

        setDatos(sesion);

        window.localStorage.setItem("root", JSON.stringify(sesion));

        console.log(response.data);

        console.log({ datos });
      })
      .catch((err) => {
        setSpiner(false);
        console.log("algo salio mal en el login!");
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
      });
  };

  return (
    <>
      <Main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* {datos.usuario.rol && <Navigate to="/home" />} */}
        {/* {datos.usuario.rol === "ADMIN" ? <Navigate to="/home" /> : null} */}

        {datos.usuario.rol === "ALUGNO_ROLE" ||
        datos.usuario.rol === "ADMIN_ROLE" ? (
          <Navigate to="/home" />
        ) : null}

        <div className="dice"></div>
        <div className="login">
          <form onSubmit={(e) => enviar(e)}>
            <label>
              <span>Usuario</span>
              <input
                onChange={(e) => setLogin({ ...login, cedula: e.target.value })}
                type="text"
              />
            </label>
            <label>
              <span>Contraseña</span>
              <input
                onChange={(e) =>
                  setLogin({ ...login, contraseña: e.target.value })
                }
                type="text"
              />
            </label>
            <AnimatePresence>
              {error && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="msgError"
                >
                  EL USUARIO O LA CONTRASEÑA ESTAN MAL
                </motion.span>
              )}
            </AnimatePresence>

            <input className="submit" type="submit" value="INICIO SESION" />
          </form>
          <Link to="/crearCuenta" className="crearCuenta">
            CREAR CUENTA
          </Link>
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

export default Login;

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, redirect, useLocation } from "react-router-dom";

import logo from "../img/logo.svg";
import fondo from "../img/fondo.svg";
import { useDatos } from "../context/Context";
import LogoAlumno from "../sgvr/alumnos";
import ActualizarDatos from "../sgvr/actualizarDatos";
import Importar from "../sgvr/importar";
import CrearCuenta from "../sgvr/crearCuenta";

const Main = styled(motion.main)`
  /* background-color: red; */
  display: flex;

  aside {
    /* border-radius: 0px 30px 30px 0px; */
    background-color: #c7c1d0;

    height: 100vh;
    width: 200px;
    overflow: hidden;
    box-shadow: 0px 2px 96px 19px #7469b9bd;
    background-color: #1f272d;

    /* background-image: url(${fondo}); */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 140px;
      background-color: #232e33;
      background-image: url(${logo});
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      border-bottom: 10px solid #c3c3ff00;
      border-top: 10px solid #c3c3ff00;
      transition: 0.5s;
    }

    .logo:hover {
      background-color: #cbcbff99;
    }

    nav {
      height: 60vh;
      background-color: #c2c2c200;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      /* margin-left: 15px; */

      li {
        /* padding: 5px; */
        transition: 0.5s;
        background-color: #181b1e00;
        width: 100%;
        list-style: none;

        /* padding: 15px 0; */
        color: #000000;
        /* width: 100%; */
        height: 40px;
        margin: 5px 0;
        display: inline-flex;
        justify-content: center;

        a {
          width: 163px;
          /* width: 100%; */
          font-weight: bold;
          font-size: 15px;
          color: #939598;
          height: 100%;
          /* width: 100%; */
          display: inline-flex;
          justify-content: space-between;
          align-items: center;
          /* margin-left: 10px; */

          /* padding: 10px; */

          text-decoration: none;
          transition: 0.5s;
        }
        svg {
          /* margin-right: 30px; */
          path {
            fill: #939598;
            transition: 0.5s;
          }
        }
        a:active {
          color: #ffffff;
        }
      }

      .activo {
        background-color: #181b1e;
        a {
          color: #39b54a;
        }
        svg {
          path {
            fill: #39b54a;
          }
        }
      }

      li:hover {
        background-color: #181b1e;
        a {
          color: #39b54a;
        }
        svg {
          path {
            fill: #39b54a;
          }
        }
      }

      li:active {
        a {
          color: #fff;
        }
        svg {
          path {
            fill: #fff;
          }
        }
      }
    }

    .cerrar {
      background-color: #ff4040;
      height: 40px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      /* border-radius: 6px; */
      transition: 0.5s;
      cursor: pointer;
    }

    .cerrar:hover {
      background-color: #ff0000;
    }

    .cerrar:active {
      background-color: #ff0000;
    }
  }
`;

const Layout = ({ children }) => {
  const { datos, setDatos } = useDatos();
  const location = useLocation();

  // console.log(location.pathname);

  if (
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/crearCuenta"
  ) {
    return <></>;
  }

  const cerrarSesion = () => {
    console.log("cerrarSesion");
    console.log(datos);

    const sesion = {
      token: "",
      usuario: {},
    };

    setDatos(sesion);

    setDatos({
      token: "",
      usuario: {},
    });

    window.localStorage.setItem("root", JSON.stringify(sesion));
  };

  // console.log(location);

  return (
    <>
      <Main>
        <aside>
          <Link to="/home" className="logo"></Link>

          <nav>
            {datos.usuario.rol == "ADMIN_ROLE" ? (
              <>
                {/* <li>
                  <Link to="/usuarios">usuarios</Link>
                </li> */}
                {/* <li>
                  <Link to="/buscar">buscar</Link>
                </li> */}
                <li
                  className={
                    location.pathname === "/importar" ? "activo" : null
                  }
                >
                  <Link to="/importar">
                    <Importar />
                    IMPORTAR
                  </Link>
                </li>
                <li
                  className={location.pathname === "/alumnos" ? "activo" : null}
                >
                  <Link to="/alumnos">
                    <LogoAlumno />
                    ALUMNOS
                  </Link>
                </li>
                <li
                  className={
                    location.pathname === "/supervisores" ? "activo" : null
                  }
                >
                  <Link to="/supervisores">
                    <LogoAlumno />
                    SUPERVISORES
                  </Link>
                </li>
                <li
                  className={location.pathname === "/tutores" ? "activo" : null}
                >
                  <Link to="/tutores">
                    <LogoAlumno />
                    TUTORES
                  </Link>
                </li>
                <li
                  className={
                    location.pathname === "/insituciones" ? "activo" : null
                  }
                >
                  <Link to="/insituciones">
                    <LogoAlumno />
                    INSTITUCIONES
                  </Link>
                </li>
                <li
                  className={location.pathname === "/crear" ? "activo" : null}
                >
                  <Link to="/crear">
                    <CrearCuenta />
                    CREAR
                  </Link>
                </li>

                {/* <li>
                  <Link to="/crear">crear</Link>
                </li> */}
              </>
            ) : null}

            <li
              className={
                location.pathname === "/actualizarDatos" ? "activo" : null
              }
            >
              <Link to="/actualizarDatos">
                <ActualizarDatos />
                ACTUALIZAR
              </Link>
            </li>
          </nav>

          <div className="cerrar" onClick={() => cerrarSesion()}>
            cerrar sesion
          </div>
        </aside>
        {children}
      </Main>
    </>
  );
};

export default Layout;

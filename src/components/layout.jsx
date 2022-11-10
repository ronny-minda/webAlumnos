import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, redirect, useLocation } from "react-router-dom";

import logo from "../img/logo.svg";
import fondo from "../img/fondo.svg";
import { useDatos } from "../context/Context";

const Main = styled(motion.main)`
  /* background-color: red; */
  display: flex;

  aside {
    border-radius: 0px 30px 30px 0px;
    background-color: #c7c1d0;

    height: 100vh;
    width: 200px;
    overflow: hidden;
    box-shadow: 0px 2px 96px 19px #7469b9bd;

    background-image: url(${fondo});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 140px;
      background-color: #c3c3ff00;
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
      align-items: center;

      li {
        list-style: none;
        /* padding: 15px 0; */
        color: #000000;
        width: 100%;
        height: 40px;
        margin: 5px 0;

        a {
          font-weight: bold;
          font-size: 25px;
          color: #000000;
          height: 100%;
          width: 100%;
          display: inline-flex;
          justify-content: center;
          align-items: center;

          /* padding: 10px; */

          text-decoration: none;
          transition: 0.5s;
        }

        a:hover {
          color: #43b4dd;
        }
        a:active {
          color: #ffffff;
        }
      }
    }

    .cerrar {
      background-color: #ff4040;
      height: 40px;
      width: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      border-radius: 6px;
      transition: 0.5s;
      cursor: pointer;
    }

    .cerrar:hover {
      background-color: #ff1919;
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
                <li>
                  <Link to="/usuarios">usuarios</Link>
                </li>
                <li>
                  <Link to="/buscar">buscar</Link>
                </li>
                <li>
                  <Link to="/importar">importar</Link>
                </li>
                {/* <li>
                  <Link to="/alumnos">alumnos</Link>
                </li> */}
                {/* <li>
                  <Link to="/crear">crear</Link>
                </li> */}
              </>
            ) : null}

            <li>
              <Link to="/actualizarDatos">actualizarDatos</Link>
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

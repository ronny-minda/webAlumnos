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

  /* border: 2px solid #00000079; */
  margin: 30px;

  .usuarios {
    box-shadow: 10px 10px 5px 0px #332b515a;
    display: inline-block;
    /* height: 50px; */
    width: 95%;
    background-color: #ffc2f71c;
    border: 2px solid #ff6ce276;
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
        padding: 30px;
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

const Supervisor = ({ dato }) => {
  const [altura, setAltura] = useState("50px");
  const [rotate, setRotate] = useState("0");
  const [error, setError] = useState(false);
  const [validarContraseña, setValidarContraseña] = useState({
    pass1: "",
    pass2: "",
  });
  const [valores, setValores] = useState({
    nombre: dato.nombre,
    cedula: dato.cedula,
    telefono: dato.telefono,
    correo: dato.correo,
    horasUsadas: dato.horasUsadas,
    numeroAsignacion: dato.numeroAsignacion,
  });

  // console.log(dato);

  const enviar = (e) => {
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

    console.log({ envio });

    axios
      .put(
        "https://serveralumnos-production.up.railway.app/api/supervisora/actualizarDatos",
        envio
      )
      .then((response) => {
        // console.log(response.data);

        const respuesta = response.data;

        console.log({ respuesta });

        setValores({
          nombre: respuesta.nombre,
          cedula: respuesta.cedula,
          telefono: respuesta.telefono,
          correo: respuesta.correo,
          horasUsadas: respuesta.horasUsadas,
          numeroAsignacion: respuesta.numeroAsignacion,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("paso algo al actualizar estudiante");
      });
  };

  return (
    <Div>
      <div className="usuarios">
        <div className="usuario">
          <form className="allDatos" onSubmit={(e) => enviar(e)}>
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
                <span>Cedula</span>
                <input
                  value={valores.cedula}
                  name="Segundo"
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
                  name="Primer"
                  onChange={(e) =>
                    setValores({ ...valores, telefono: e.target.value })
                  }
                  type="text"
                />
              </label>

              <label>
                <span>Horas Usadas</span>
                <input
                  disabled
                  value={valores.horasUsadas}
                  name="Segundo"
                  onChange={(e) =>
                    setValores({ ...valores, horasUsadas: e.target.value })
                  }
                  type="text"
                />
              </label>

              <label>
                <span>Numero Asignacion</span>
                <input
                  disabled
                  value={valores.numeroAsignacion}
                  onChange={(e) =>
                    setValores({ ...valores, numeroAsignacion: e.target.value })
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
            </div>

            <input className="submit" type="submit" value="ACTUALIZAR DATOS" />
          </form>
        </div>
      </div>

      {/* <div
        className="control"
        style={{ transform: `rotate(${rotate}deg)` }}
        onClick={() => {
          altura == "50px" ? setAltura("400px") : setAltura("50px");
          rotate == "0" ? setRotate("180") : setRotate("0");

          // console.log("siii");
        }}
      ></div> */}
    </Div>
  );
};

export default Supervisor;

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
    background-color: #ffbbbb30;
    border: 2px solid #ff8e8e4f;
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
      }
    }
  }

  .control {
    background-color: #ff9a9a85;
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

const Tutor = ({ dato }) => {
  const [altura, setAltura] = useState("50px");
  const [rotate, setRotate] = useState("0");
  const [error, setError] = useState(false);
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
    direccion: dato.direccion,
  });

  console.log(dato);

  const eliminarCuenta = () => {
    console.log("eliminarCuenta");
    console.log(dato._id);

    axios
      .post("http://localhost:8080/api/supervisora/borrar", {
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
      .put("http://localhost:8080/api/supervisora/actualizarDatos", envio)
      .then((response) => {
        // console.log(response.data);

        const respuesta = response.data;

        console.log({ respuesta });

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
      })
      .catch((err) => {
        console.log(err);
        console.log("paso algo al actualizar estudiante");
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
            </div>

            <input className="submit" type="submit" value="ACTUALIZAR DATOS" />

            <div
              onClick={() => eliminarCuenta()}
              className="eliminarEstudiante"
            >
              <span>Elimina Estudiante</span>
            </div>
          </form>
        </div>
      </div>

      <div
        className="control"
        style={{ transform: `rotate(${rotate}deg)` }}
        onClick={() => {
          altura == "50px" ? setAltura("400px") : setAltura("50px");
          rotate == "0" ? setRotate("180") : setRotate("0");

          // console.log("siii");
        }}
      ></div>
    </Div>
  );
};

export default Tutor;

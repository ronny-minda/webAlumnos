import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { useDatos } from "../context/Context";

import fondo1 from "../img/fondoN1.svg";
import lupa from "../img/lupa.svg";

const Main = styled(motion.div)`
  background-image: url(${fondo1});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* background-color: red; */
  width: 100%;

  h1 {
    text-align: center;
  }

  form {
    /* background-color: red; */

    display: flex;
    align-items: center;
    .lupa {
      /* background-color: red; */
      height: 40px;
      width: 40px;
      margin: 0 20px;

      background-image: url(${lupa});
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
    .input {
      font-size: 20px;
      margin: 0 20px;
      margin: 10px 0;
      background-color: #ff000000;
      border: none;
      border-bottom: 2px solid #001f3d;
      outline: none;
      transition: 0.5s;
    }
    .input:focus {
      border-bottom: 2px solid #2faec8;
    }
    .submit {
      font-size: 15px;
      margin: 0 20px;
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
  }
`;

const Buscar = () => {
  const [form, setForm] = useState(false);
  const { datos, setDatos } = useDatos();
  const [cedula, setCedula] = useState("");
  const [error, setError] = useState(false);

  const [validarContraseña, setValidarContraseña] = useState({
    pass1: "",
    pass2: "",
  });

  const [supevisora, setSupevisora] = useState([]);
  const [tutora, setTutora] = useState([]);

  const [valores, setValores] = useState({
    id: "",
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

  const buscarCedula = (e) => {
    e.preventDefault();

    axios
      .get("http://localhost:8080/api/supervisora/pedirTodos")
      .then((response) => {
        const SUPERVISORA_ROLE = response.data.filter(
          (dato) => dato.rol == "SUPERVISORA_ROLE"
        );
        const TUTOR_ROLE = response.data.filter(
          (dato) => dato.rol == "TUTOR_ROLE"
        );

        setSupevisora(SUPERVISORA_ROLE);
        setTutora(TUTOR_ROLE);
      })
      .catch((err) => {
        console.log("algo salio mal en pedido supevisoras!");
      });

    axios
      .post("http://localhost:8080/api/buscar", {
        cedula,
      })
      .then((response) => {
        console.log("response");
        console.log(response.data);

        if (response.data.msg === "El alumno no existe") {
          setError(true);
          return setForm(false);
        }

        setValores({
          id: response.data._id,
          primerNombre: response.data.primerNombre,
          segundoNombre: response.data.segundoNombre,
          primerApellido: response.data.primerApellido,
          segundoApellido: response.data.segundoApellido,
          cedula: response.data.cedula,
          telefono: response.data.telefono,
          correo: response.data.correo,
          direccion: response.data.direccion,
          supervisora: response.data.supervisora,
          tutora: response.data.tutora,
          password: "",
        });

        setForm(true);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const enviar = (e) => {
    e.preventDefault();

    const envio = {
      ...valores,
    };

    console.log({ envio });

    axios
      .put("http://localhost:8080/api/alumno/actualizarAlumno", envio)
      .then((response) => {
        // console.log(response.data);

        const respuesta = response.data;

        console.log({ respuesta });

        setValores({
          id: response.data._id,
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
    <Main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h1>Buscar</h1>
      <form onSubmit={(e) => buscarCedula(e)}>
        <div className="lupa"></div>
        <label>
          <input
            placeholder="Buscar por cedula"
            type="text"
            className="input"
            onChange={(e) => setCedula(e.target.value)}
          />
        </label>

        <input type="submit" className="submit" value="Buscar" />
      </form>

      <AnimatePresence>
        {form && (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="allDatos"
            onSubmit={(e) => enviar(e)}
          >
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

                <select
                  onChange={(e) => {
                    setValores({ ...valores, supervisora: e.target.value });
                    // console.log(e.target.value);
                  }}
                >
                  {supevisora.map((e) => {
                    if (e._id === valores.supervisora) {
                      return (
                        <option selected value={e._id}>
                          {e.primerNombre} {e.primerApellido}
                        </option>
                      );
                    } else {
                      return (
                        <option value={e._id}>
                          {e.primerNombre} {e.primerApellido}
                        </option>
                      );
                    }
                  })}
                </select>
              </label>

              <label>
                <span>Tutora</span>

                <select
                  onChange={(e) => {
                    setValores({ ...valores, tutora: e.target.value });
                  }}
                >
                  {tutora.map((e) => {
                    if (e._id === valores.tutora) {
                      return (
                        <option selected value={e._id}>
                          {e.primerNombre} {e.primerApellido}
                        </option>
                      );
                    } else {
                      return (
                        <option value={e._id}>
                          {e.primerNombre} {e.primerApellido}
                        </option>
                      );
                    }
                  })}
                </select>
              </label>

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

            <input className="submit" type="submit" value="ACTUALIZAR DATOS" />
          </motion.form>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            No exise el alumno
          </motion.h1>
        )}
      </AnimatePresence>
    </Main>
  );
};

export default Buscar;

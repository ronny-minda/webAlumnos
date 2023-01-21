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
  padding: 50px;

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
    box-shadow: 10px 10px 5px 0px #332b515a;
    border: 2px solid #00000079;
    margin: 50px;
    padding: 60px;
    /* background-color: #4800ff; */
    height: auto;
    /* width: 100%; */
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
  const [apellido, setApellido] = useState("");
  const [error, setError] = useState(false);
  const [actualizado, setActualizado] = useState(false);

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
    curso: "",
    fechaInicio: "",
    fechaFin: "",
    horas: "",
    institucion: "",

    cedula: "",
    telefono: "",
    correo: "",

    supervisora: "",
    tutora: "",
    password: "",
  });

  // if (datos.usuario.rol == undefined) {
  //   return (
  //     <>
  //       <Navigate to="/" />
  //     </>
  //   );
  // }

  // if (datos.usuario.rol !== "ADMIN_ROLE") {
  //   return (
  //     <>
  //       <Navigate to="/actualizarDatos" />
  //     </>
  //   );
  // }

  const buscarCedula = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://serveralumnos-production.up.railway.app/api/buscar/buscarApellido",
        {
          apellido,
        }
      )
      .then(({ data }) => {
        console.log("apellido");
        console.log(data);

        if (data.msg === "El alumno no existe") {
          setError(true);
          return setForm(false);
        }

        setValores({
          id: data._id,
          primerNombre: data.primerNombre,
          segundoNombre: data.segundoNombre,
          primerApellido: data.primerApellido,
          segundoApellido: data.segundoApellido,
          curso: data.curso,
          fechaInicio: data.fechaInicio,
          fechaFin: data.fechaFin,
          horas: data.horas,
          institucion: data.institucion.nombre,

          cedula: data.cedula,
          telefono: data.telefono,
          correo: data.correo,

          supervisora: data.supervisora.nombre,
          tutora: data.tutora.nombre,
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

    const { curso, tutora, supervisora, institucion, ...envio } = valores;

    console.log({ envio });

    axios
      .put(
        "https://serveralumnos-production.up.railway.app/api/alumno/actualizarAlumno",
        envio
      )
      .then((response) => {
        // console.log(response.data);

        const respuesta = response.data;

        console.log({ respuesta });

        setActualizado(true);

        setTimeout(() => {
          setActualizado(false);
        }, 3000);

        // setValores({
        //   id: response.data._id,
        //   primerNombre: response.data.primerNombre,
        //   segundoNombre: response.data.segundoNombre,
        //   primerApellido: response.data.primerApellido,
        //   segundoApellido: response.data.segundoApellido,

        //   cedula: response.data.cedula,
        //   telefono: response.data.telefono,
        //   correo: response.data.correo,

        //   password: "",
        // });
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
      <h1>Buscar Alumno</h1>
      <form onSubmit={(e) => buscarCedula(e)}>
        <div className="lupa"></div>
        <label>
          <input
            placeholder="Buscar por Apellido"
            type="text"
            className="input"
            onChange={(e) => setApellido(e.target.value)}
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
          </motion.form>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {actualizado && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Alumno actualizado
          </motion.h1>
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

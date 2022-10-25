import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Estudiante from "./estudiante";

const Main = styled(motion.div)`
  /* background-color: red; */
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Estudiantes = () => {
  const [datos, setDatos] = useState([]);
  const [supevisora, setSupevisora] = useState([]);
  const [tutora, setTutora] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/alumno/buscarTodasAlumno", {
        desde: 0,
        limite: 20,
      })
      .then((response) => {
        // console.log(response.data);
        setDatos(response.data);
        // console.log({ datos });
      })
      .catch((err) => {
        console.log("algo salio mal en el login!");
      });

    axios
      .get("http://localhost:8080/api/supervisora/pedirTodos")
      .then((response) => {
        // console.log("supervisoras");
        // console.log(response.data);
        // setDatos(response.data);

        // const SUPERVISORA_ROLE = response.data.map((e) => {
        //   if (e.rol == "SUPERVISORA_ROLE") {
        //     return e;
        //   }
        // });

        // const TUTOR_ROLE = response.data.map((e) => {
        //   if (e.rol == "TUTOR_ROLE") {
        //     return e;
        //   }
        // });

        const SUPERVISORA_ROLE = response.data.filter(
          (dato) => dato.rol == "SUPERVISORA_ROLE"
        );
        const TUTOR_ROLE = response.data.filter(
          (dato) => dato.rol == "TUTOR_ROLE"
        );

        // console.log({ SUPERVISORA_ROLE });
        // console.log({ TUTOR_ROLE });

        setSupevisora(SUPERVISORA_ROLE);
        setTutora(TUTOR_ROLE);

        // console.log({ datos });
      })
      .catch((err) => {
        console.log("algo salio mal en pedido supevisoras!");
      });
  }, []);

  // const pedido = () => {
  //   console.log("pedido");

  //   axios
  //     .get("http://localhost:8080/api/supervisora/pedirTodos")
  //     .then((response) => {
  //       console.log("supervisoras");
  //       console.log(response.data);
  //       setDatos(response.data);
  //       // console.log({ datos });
  //     })
  //     .catch((err) => {
  //       console.log("algo salio mal en pedido supevisoras!");
  //     });
  // };

  return (
    <Main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h1>Estudiantes</h1>

      {datos.map((i) => {
        return (
          <Estudiante
            key={i.cedula}
            supevisora={supevisora}
            tutora={tutora}
            dato={i}
          />
        );
      })}
    </Main>
  );
};

export default Estudiantes;

import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Tutor from "./tutor";

const Main = styled(motion.div)`
  /* background-color: red; */
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Tutores = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/supervisora/pedirTodos")
      .then((response) => {
        // const SUPERVISORA_ROLE = response.data.filter(
        //   (dato) => dato.rol == "SUPERVISORA_ROLE"
        // );
        const TUTOR_ROLE = response.data.filter(
          (dato) => dato.rol == "TUTOR_ROLE"
        );

        // console.log({ SUPERVISORA_ROLE });
        // console.log({ TUTOR_ROLE });

        // setSupevisora(SUPERVISORA_ROLE);

        setDatos(TUTOR_ROLE);

        // console.log({ datos });
      })
      .catch((err) => {
        console.log("algo salio mal en pedido tuotas!");
      });
  }, []);

  return (
    <Main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h1>Tutores</h1>

      {datos.map((i) => {
        return <Tutor key={i.cedula} dato={i} />;
        // console.log(i);
      })}
    </Main>
  );
};

export default Tutores;

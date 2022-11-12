import React, { useState } from "react";

const Alumno2 = ({ alumnado }) => {
  const [valores, setValores] = useState({
    primerNombre: alumnado.primerNombre,
    segundoNombre: alumnado.segundoNombre,
    primerApellido: alumnado.primerApellido,
    segundoApellido: alumnado.segundoApellido,
    cedula: alumnado.cedula,
    telefono: alumnado.telefono,
    correo: alumnado.correo,
    institucion: alumnado.institucion._id,

    fechaInicio: alumnado.fechaInicio,
    fechaFin: alumnado.fechaFin,
    horas: alumnado.horas,

    supervisora: alumnado.supervisora._id,
    curso: alumnado.curso,
    tutora: alumnado.tutora._id,
    password: "",
  });

  return (
    <>
      <h1>hola alumno: {valores.primerApellido} </h1>
    </>
  );
};

export default Alumno2;

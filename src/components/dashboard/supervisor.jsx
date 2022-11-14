import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDatos } from "../../context/Context";
import { Navigate } from "react-router-dom";

const Contenedor = styled.div`
  /* background-color: red; */
  /* border-bottom: 1px solid #0000007a;
  border-right: 1px solid #0000007a; */
  border: 1px solid #0000007a;
  width: 1260px;
  height: 50px;
  display: flex;
  /* position: relative; */
  z-index: 99;
  transition: 0.5s;
  overflow: hidden;

  .filtro {
    height: 50px;
    width: 1260px;
    background-color: #7878787e;
    position: absolute;
  }

  /* .cancelar {
    position: absolute;
    top: 60px;
    left: 105px;
  } */

  .contador {
    background-color: #ff00007c;
    display: flex;
    width: 50px;
    height: 100%;
    align-items: center;
    justify-content: center;
    font-size: 20px;

    .conte {
      /* background-color: red; */

      height: auto;
      display: block;
    }
  }

  .filtroBorra {
    height: 100%;
    width: 100%;
    background-color: #ff000061;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 9999999;
    backdrop-filter: blur(2px);

    .msg {
      /* background-color: red; */
      display: inline-block;
      position: relative;
      left: 500px;
      top: 30px;
      font-size: 30px;
      font-weight: bold;
    }
  }

  form {
    flex-wrap: wrap;
    width: 1210px;
    display: flex;
    /* background-color: red; */

    input {
      height: 50px;
      padding: 5px;
      width: 200px;
    }

    .conteSelec {
      display: inline-block;
      border: 1px solid #000;
      /* height: 50px; */

      select {
        background-color: #99a0f479;
        border: none;
        font-size: 14px;
        height: 30px;
        padding: 5px;
        /* width: 250px; */
        outline: none;
      }
    }
  }

  .indicadores {
    height: 40px;
    width: 500px;
    margin-left: 20px;
    /* background-color: #6474f3; */
    /* position: absolute; */
    top: 30px;
    /* left: 105px; */
    display: flex;
    justify-content: space-between;
    align-items: center;

    .actualizar {
      cursor: pointer;
      height: 30px;
      width: 100px;
      display: inline-block;
      background-color: #81d7ff;
      border: none;
      font-size: 16px;

      &:hover {
        color: #fff;
        background-color: #2da0d5;
      }
      &:active {
        color: #6b6a77a9;
        background-color: #ffffff;
      }
    }

    .borrar {
      cursor: pointer;
      height: 30px;
      width: 100px;
      display: inline-block;
      background-color: #f94a4a;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        color: #fff;
        background-color: #a31919;
      }
      &:active {
        color: #6b6a77a9;
        background-color: #ffffff;
      }
    }

    .cancelar {
      cursor: pointer;
      height: 30px;
      width: 100px;
      display: inline-block;
      background-color: #ffad1e;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        color: #fff;
        background-color: #a26c0e;
      }
      &:active {
        color: #6b6a77a9;
        background-color: #ffffff;
      }
    }
  }
`;

const Supervisor = ({
  institucion,
  supervisora,
  tutora,

  contador,
  scrol,
}) => {
  const [actualizaar, setActualizaar] = useState("");
  const [filtro, setFiltro] = useState("block");
  const [altura, setAltura] = useState("50px");
  const [indicadores, setIndicadores] = useState(false);
  const { datos, setDatos } = useDatos();

  const [filtroBorra, setFiltroBorra] = useState(false);
  const [componente, setComponente] = useState(false);

  // console.log("alumnado");
  // console.log(alumnado);

  const [valores, setValores] = useState({
    nombre: supervisora.nombre,
    cedula: supervisora.cedula,
    telefono: supervisora.telefono,
    horasUsadas: supervisora.horasUsadas,
    numeroAsignacion: supervisora.numeroAsignacion,
    correo: supervisora.correo,
  });

  if (componente) {
    return null;
  }

  const qutarFiltro = (e) => {
    if (e.detail == 2) {
      // console.log("qutarFiltro");
      // console.log(e.detail);

      setFiltro("none");
      setAltura("150px");
      setIndicadores(true);
    }
  };

  const actualizar = (e) => {
    e.preventDefault();
    console.log("actualizar");

    const envio = {
      ...valores,
      id: supervisora._id,
    };

    // console.log({ envio });

    axios
      .put("http://localhost:8080/api/supervisora/actualizarDatos", envio)
      .then(({ data }) => {
        console.log(data);

        setActualizaar("datos actualizados");
        setTimeout(() => {
          setActualizaar("");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        console.log("paso algo al actualizar estudiante");

        setActualizaar("datos no actualizados (recargar la pagina)");
        setTimeout(() => {
          setActualizaar("");
        }, 3000);
      });
  };

  const borrar = (e) => {
    console.log("borrar");
    console.log(borrar);
    axios
      .post("http://localhost:8080/api/supervisora/borrar", {
        id: supervisora._id,
      })
      .then(({ data }) => {
        console.log("data");
        console.log(data);

        setActualizaar("tutor borrado");
        setTimeout(() => {
          setActualizaar("");
        }, 2000);

        setTimeout(() => {
          setComponente(true);
        }, 3000);
      })
      .catch((err) => {
        console.log("err");
        console.log(err);

        setActualizaar("no se pudo borrar");
        setTimeout(() => {
          setActualizaar("");
        }, 2000);
      });
  };

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

  return (
    <Contenedor style={{ height: altura }}>
      {/* <h1>Alumno: {valores.primerApellido}</h1> */}

      <div
        className="filtro"
        onClick={(e) => qutarFiltro(e)}
        style={{ display: filtro }}
      ></div>

      {/* <div className="cancelar">cancelar</div> */}

      <div className="contador">
        <div className="conte">{contador}</div>
      </div>

      {filtroBorra && (
        <div>
          <div style={{ position: "relative" }}>
            <div className="filtroBorra">
              <div className="msg">tutor borrado</div>
            </div>
          </div>
        </div>
      )}

      <form id={`form${contador}`} onSubmit={(e) => actualizar(e)}>
        <input
          type="text"
          value={valores.nombre}
          onChange={(e) => {
            setValores({ ...valores, nombre: e.target.value });
            console.log(e.target.value);
          }}
        />

        <input
          type="text"
          value={valores.cedula}
          onChange={(e) => {
            setValores({ ...valores, cedula: e.target.value });
            console.log(e.target.value);
          }}
        />

        <input
          type="text"
          value={valores.telefono}
          onChange={(e) => {
            setValores({ ...valores, telefono: e.target.value });
            console.log(e.target.value);
          }}
        />

        <input
          disabled
          type="text"
          value={valores.horasUsadas}
          onChange={(e) => {
            setValores({ ...valores, horasUsadas: e.target.value });
            console.log(e.target.value);
          }}
        />

        <input
          disabled
          type="text"
          value={valores.numeroAsignacion}
          onChange={(e) => {
            setValores({ ...valores, numeroAsignacion: e.target.value });
            console.log(e.target.value);
          }}
        />

        <input
          type="text"
          value={valores.correo}
          onChange={(e) => {
            setValores({ ...valores, correo: e.target.value });
            console.log(e.target.value);
          }}
        />

        {indicadores && (
          <div className="indicadores" style={{ left: 0 }}>
            <input
              className="actualizar"
              type="submit"
              form={`form${contador}`}
              value="actualizar"
            />
            <div
              className="borrar"
              onClick={() => {
                borrar();
              }}
            >
              borrar
            </div>
            <div
              className="cancelar"
              onClick={() => {
                setFiltro("block");
                setAltura("50px");
                setIndicadores(false);
              }}
            >
              cancelar
            </div>
            <div
              style={{
                marginLeft: "0px",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#376d30",
              }}
            >
              {actualizaar}
            </div>
          </div>
        )}
      </form>
    </Contenedor>
  );
};

export default Supervisor;

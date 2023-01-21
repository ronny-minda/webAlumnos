import styled from "styled-components";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/home";
import Usuarios from "./components/usuarios";

import { AnimatePresence, motion } from "framer-motion";
import Layout from "./components/layout";
import CrearCuenta from "./components/crearCuenta";
import CrearCuentas from "./components/dashboard/creaCuenta";
import Buscar from "./components/buscar";
import Grupos from "./components/importar";
import ActualizarDatos from "./components/actualizarDatos";
import Crear from "./components/crear";
import Alumnos from "./components/dashboard/alumnos";
import Tutores from "./components/dashboard/tutores";
import Supervisores from "./components/dashboard/supervisores";
import Insituciones from "./components/dashboard/instituciones";
import CrearExel from "./components/pruebas/crearExel";
// import CompletarDatos from "./components/completarDatos";

const H1 = styled.h1`
  background-color: red;
`;

const App = () => {
  // const location = useLocation();
  // console.log(pathname);

  return (
    <BrowserRouter>
      <AnimatePresence>
        <Routes>
          <Route path="/login" element={<Login />} /> {/*valor sin layout*/}
          <Route path="/" element={<Login />} /> {/*valor sin layout*/}
          <Route path="/crearCuenta" element={<CrearCuenta />} />
        </Routes>
      </AnimatePresence>
      <AnimatePresence>
        <Layout>
          <Routes>
            <Route path="/home" element={<Home />} />
            {/* <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/buscar" element={<Buscar />} /> */}
            <Route path="/grupos" element={<Grupos />} />
            <Route path="/actualizarDatos" element={<ActualizarDatos />} />
            <Route path="/crear" element={<CrearCuentas />} />
            <Route path="/alumnos" element={<Alumnos />} />
            <Route path="/supervisores" element={<Supervisores />} />
            <Route path="/tutores" element={<Tutores />} />
            <Route path="/insituciones" element={<Insituciones />} />
            {/* <Route path="/completarDatos" element={<CompletarDatos />} /> */}

            {/* rutas de puebas */}
            <Route path="/CrearExel" element={<CrearExel />} />
          </Routes>
        </Layout>
      </AnimatePresence>
    </BrowserRouter>
  );
};

export default App;

{
  /* <Routes key={location.pathname} location={location}></Routes> */
}

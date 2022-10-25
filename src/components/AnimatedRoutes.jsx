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

import { AnimatePresence, motion } from "framer-motion";

const AnimatedRoutes = () => {
  return (
    <>
      <AnimatePresence>
        <Routes>
          <Route path="/login" element={<Login />} /> {/*valor sin layout*/}
          <Route path="/" element={<Login />} /> {/*valor sin layout*/}
          <Route path="/crearCuenta" element={<Login />} />
        </Routes>
      </AnimatePresence>
      <AnimatePresence>
        <Layout>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/usuarios" element={<Usuarios />} />
          </Routes>
        </Layout>
      </AnimatePresence>
    </>
  );
};

export default AnimatedRoutes;

//

// const express = require("express"); common js

import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import db from "./config/db.js";

//
// crea la app
const app = express();

//
// habilitar lectura de datos de formulario / middleware
app.use(express.urlencoded({ extended: true }));

//
/// conexion a la bd
async function testConnection() {
  try {
    await db.authenticate();
    db.sync();
    console.log("La conexión ha sido establecida con éxito.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  } finally {
    // await db.close();
  }
}

testConnection();

//
// habilitar pug

app.set("view engine", "pug");
app.set("views", "./views");

// carpeta publica
app.use(express.static("public"));

// routing
app.use("/auth", usuarioRoutes);

// defino puerto

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`servidor funcionando en el puerto ${PORT}`);
});

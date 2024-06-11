import express from "express";
import {
  formularioLogin,
  formularioRegistro,
  formularioOlvido,
  registrar,
} from "../controllers/usuarioController.js";

const router = express.Router();

router.get("/login", formularioLogin);

router.get("/registro", formularioRegistro);

router.post("/registro", registrar);

router.get("/olvido-password", formularioOlvido);

export default router;

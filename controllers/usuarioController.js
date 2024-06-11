// Objetivo: Controlador de las rutas de usuario

import { check, validationResult, body } from "express-validator";
import Usuario from "../models/User.js";
import { generateToken } from "../helpers/tokens.js";

//

const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Ingresar",
  });
};

const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear cuenta",
  });
};

//

const registrar = async (req, res) => {
  // validar los datos
  await check("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .run(req);
  await check("email")
    .isEmail()
    .notEmpty()
    .withMessage("Email no válido")
    .run(req);
  await check("password")
    .isLength({ min: 6 })
    .withMessage("El password debe tener al menos 6 caracteres")
    .run(req);
  await body("repetirPassword")
    .equals(req.body.password)
    .withMessage("Los passwords no son iguales")
    .run(req);

  //
  // verificar si result esta vacio
  let result = validationResult(req);
  if (!result.isEmpty()) {
    return res.render("auth/registro", {
      pagina: "Crear cuenta",
      errores: result.array(),
      // retorno los campos para que no se borren
      nombre: req.body.nombre,
      email: req.body.email,
    });
  }

  // verificar si el email ya esta registrado
  const existeUsuario = await Usuario.findOne({
    where: { email: req.body.email },
  });
  if (existeUsuario) {
    return res.render("auth/registro", {
      pagina: "Crear cuenta",
      errores: [{ msg: "El email ya está registrado" }],
      nombre: req.body.nombre,
      email: req.body.email,
    });
  } else {
    //* crear el usuario
    // const usuario = await Usuario.create(req.body, { token: 123 });
    const { nombre, email, password } = req.body;
    await Usuario.create({ nombre, email, password, token: generateToken() });
    // mostrar mensaje de confirmacion
    res.render("template/mensaje", {
      pagina: "Cuenta creada correctamente",
      mensaje:
        "Hemos enviado un email para confirmar tu cuenta. Revisá tu casilla de correo.",
    });
  }
};

//

const formularioOlvido = (req, res) => {
  res.render("auth/olvido-password", {
    pagina: "Recuperar Password",
  });
};

export { formularioLogin, formularioRegistro, formularioOlvido, registrar };

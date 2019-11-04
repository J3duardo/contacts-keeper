const express = require("express");
const router = express.Router();

//Tomar data de todos los contactos
router.get("/", (req, res) => {
  res.send("Data de todos los contactos")
});

//Agregar contacto
router.post("/", (req, res) => {
  res.send("Agregar contacto")
});

//Editar un contacto
router.put("/:contactId", (req, res) => {
  res.send("Editar contacto")
});

//Borrar un contacto
router.delete("/:contactId", (req, res) => {
  res.send("Borrar un contacto")
});

module.exports = router;
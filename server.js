const express = require("express");
require('dotenv').config();
const auth = require("./routes/auth");
const users = require("./routes/users");
const contacts = require("./routes/contacts");
const connectDB = require("./db");

const app = express();
const port = process.env.PORT || 8000;

//Conectarse a la base de datos
connectDB()

//Definir las rutas
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/contacts", contacts);

app.listen(port, () => {
  console.log(`Servidor inicializado en el puerto ${port}`)
})
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./db/config.db");

//Crear servidor de express
const app = express();

//Db connection
dbConnection();

//Cors
app.use( cors() );

//Lectura y parseo del BODY
app.use( express.json() );

//Rutas
app.use("/services/users", require("./routes/users.routes"));
app.use("/services/login", require("./routes/auth.routes"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} ✅`);
});

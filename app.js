const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./db/config.db");

//Crear servidor de express
const app = express();
const port = process.env.PORT;

//Db connection
dbConnection();

//Cors
app.use(cors);

//Rutas
app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    users: [
      {
        name: "User 01",
        email: "email@email.com",
      },
    ],
  });

  res.end();
});

app.listen(port, () => {
  console.log(`Server running on port ${port} ✅`);
});

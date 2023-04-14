const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

//Conexión a la base de datos
const dbConnection = async () => {
  console.log("connecting to db... 🤔");

  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("db ready! 🚀");
  } catch (err) {
    console.log(err);
    throw new Error(`Error al conectar a la bd`);
  }
};

module.exports = { dbConnection };

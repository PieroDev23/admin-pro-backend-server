const { response, request, json } = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { genJWT } = require("../helpers/jwt.helper");

const getUsers = async (req = request, res = response) => {
  const users = await User.find({}, "name email google role");

  res.status(201).json({
    ok: true,
    users,
  });
};

const createUser = async (req = request, res = response) => {
  console.log(req.body);

  const { email, password, name } = req.body;

  try {
    const emailExists = await User.findOne({ email });

    if (emailExists)
      return res.status(400).json({ ok: false, msg: "Email already exists!" });

    const user = new User(req.body);

    // Ecriptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await genJWT(user.id);

    res.status(201).json({
      ok: true,
      user,
      token,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const updateUser = async (req = request, res = response) => {
  //TODO: validar token y comporbar si el usuario es correcto

  const id = req.params.id;
  try {
    const userDB = await User.findById(id);

    //Updating data...
    const { google, password, email, ...fields } = req.body;

    if (!userDB)
      return res.status(404).json({
        ok: false,
        msg: "User not founded",
      });

    const emailExists = await User.findOne({ email });
    const userDontUpdateEmail = userDB.email === email;

    if (!userDontUpdateEmail && emailExists)
      return res.status(404).json({
        ok: false,
        msg: "Email is already in use, try another one.",
      });

    const updateInformation = { email, ...fields };
    const userUpdated = await User.findByIdAndUpdate(id, updateInformation, {
      new: true,
    });

    res.status(201).json({
      ok: true,
      userUpdated,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error...",
    });
  }
};

const deleteUser = async (req = request, res = response) => {
  const id = req.params.id;

  try {
    const userDB = await User.findById(id);
    if (!userDB)
      return res.status(404).json({
        ok: false,
        msg: "User not founded",
      });

    await User.findByIdAndDelete(id);

    res.status(201).json({
      ok: true,
      msg: "User deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error...",
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};

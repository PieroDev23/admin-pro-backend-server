const { response, request } = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { genJWT } = require("../helpers/jwt.helper");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    //verificar email
    const userDb = await User.findOne({ email });
    if (!userDb)
      return res
        .status(404)
        .json({ ok: false, msg: "password or email not valid" });

    //verificar password
    const validPassword = bcrypt.compareSync(password, userDb.password);
    if (!validPassword)
      return res
        .status(400)
        .json({ ok: false, msg: "password or email not valid" });

    const token = await genJWT(userDb.id);

    res.status(200).json({
      ok: true,
      token,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      ok: false,
      msg: "Internal server Error",
    });
  }
};

module.exports = { login };

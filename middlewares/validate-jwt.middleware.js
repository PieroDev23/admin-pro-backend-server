const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  //Leer Token
  const token = req.header("x-token");

  if (!token)
    return res.status(401).json({ ok: false, msg: "No token provided" });

  try {
    
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req["uid"] = uid;

  } catch (err) {
    return res.status(401).json({
      ok: false,
      msg: "No token provided or Invalid token",
    });
  }

  next();
};

module.exports = {
  validateJWT,
};

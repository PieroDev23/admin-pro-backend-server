const jwt = require("jsonwebtoken");

const genJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject("Cannot generate JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  genJWT,
};

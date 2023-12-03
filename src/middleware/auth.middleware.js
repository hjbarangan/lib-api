const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.header("Authorization");

  if (!token)
    return res.status(401).json({
      message:
        "You do not have the necessary permissions to access this resource. Please contact your administrator for further assistance.",
    });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Invalid Token" });
  }
};

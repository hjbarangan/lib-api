const express = require("express");
const router = express.Router();

const jwtGenerator = require("../utils/token-generator.util");
const checkPassword = require("../utils/password-checker.util");
const { checkUser } = require("../queries");

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExist = await checkUser(username);

    if (!userExist) {
      return res.status(401).json({ message: "User does not exist" });
    }

    const validPassword = checkPassword(password, userExist.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    const token = jwtGenerator(userExist.user_id);

    res.json({ token: token, user: userExist });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

let router = require("express").Router();
let bcrypt = require("bcryptjs");
let User = require("../models/User");
let jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        status: false,
        msg: "Please enter email and password.",
      });
    }
    const user = await User.findOne({ email });
    if(!user) {
      return res.json({
        status: false,
        msg: "email or password incorrect. please try again.",
      });
    }
    const compare = await bcrypt.compare(password, user.password);
    if (user && compare) {
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          email,
        },
        process.env.TOKEN_KEY,
        { expiresIn: "24h" }
      );
      return res.json({ status: true, token });
    }
    res.json({
      status: false,
      msg: "email or password incorrect. please try again.",
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/register", async (req, res) => {
  try {
    let { username, password, email } = req.body;
    if (username && password && email) {
      const checkUser = await User.findOne({ email });
      if (checkUser) {
        return res.json({ status: false, msg: "email is already registered" });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        password: hashPassword,
        email: email.toLowerCase(),
      });

      const token = jwt.sign(
        {
          id: user._id,
          username,
          email,
        },
        process.env.TOKEN_KEY,
        { expiresIn: "24h" }
      );

      return res
        .status(201)
        .json({ status: true, msg: "Account created successfully" });
    }
    res.json({ status: false, msg: "All input is required" });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
});
module.exports = router;

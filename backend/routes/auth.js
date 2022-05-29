const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");


const JWT_SECRET = "Vaavisagood$gamer";

// Route 1 Create a User using: POST "/api/auth/createuser".no login require
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if ther are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // check wheather user with this  email exist already

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      // console.log(jwtDATA);

      // res.json(user)
      res.json({ authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server Error");
    }
  }
);

// Route 2 Authenticate a user using : post "/api/auth/login" Mo login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be wrong").exists(),
  ],
  async (req, res) => {
    // if ther are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal  Error occured");
    }
  }
);


// Route 3 GEt logged in User details using : post "/api/auth/getuser"  login required

router.post(
    "/getuser", fetchuser,
    async (req, res) => {

try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal  Error occured");
  }
    
    })

module.exports = router;

const express = require("express");
const userRouter = express.Router();
const { userModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

userRouter.get("/", (req, res) => {
  res.send("welcome");
});

userRouter.post("/register", async (req, res) => {
  const { name, email, password, userType } = req.body;
  try {
    const emailcheck = await userModel.findOne({ email });
    if (emailcheck) {
      res.status(400).send({ msg: "Email already used" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        const user = new userModel({
          name,
          email,
          password: hash,
          userType
        });
        await user.save();
        res.status(200).send({ msg: "User registered successfully" });
      });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user._id }, process.env.secret_code);
          res.status(200).json({
            msg: "User logged in successfully",
            name: user.name,
            email:email,
            token: token,
          });
        } else {
          res.status(400).json({ msg: "Wrong credentials" });
        }
      });
    } else {
      res.status(400).json({ msg: "No user exists" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});


module.exports = { userRouter };
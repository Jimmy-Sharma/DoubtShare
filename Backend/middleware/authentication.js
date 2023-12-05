const jwt = require('jsonwebtoken');
require("dotenv").config();
const { userModel } = require("../model/user.model");

const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.secret_code);
      const user = await userModel.findById(decoded.userId);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      res.status(400).send("Token Invalid");
    }
  } else {
    res.status(400).send("Token not available");
  }
};

module.exports = {auth};
const express = require("express");
const doubtRouter = express.Router();
const { Doubt } = require("../model/doubt.model");
const { auth } = require("../middleware/authentication");

doubtRouter.post("/create", async (req, res) => {
  const { email, content, doubtType } = req.body;
  try {
    const doubt = new Doubt({
      email,
      content,
      doubtType
    });
    await doubt.save();
    res.status(200).json(doubt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


doubtRouter.get("/", auth, async (req, res) => {

});


module.exports = { doubtRouter };
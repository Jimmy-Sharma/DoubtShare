const express = require("express");
const doubtRouter = express.Router();
const Doubt = require("../model/doubt.model");
const { auth } = require("../middleware/authentication");

doubtRouter.post("/create", async (req, res) => {
  const { email, doubts, doubtType } = req.body;
  try {
    const doubtsss = new Doubt({
      email,
      doubts,
      doubtType
    });
    await doubtsss.save();
    res.status(200).json(doubtsss);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


doubtRouter.get("/history", async (req, res) => {
  try {
    const data = await Doubt.find()
    res.status(200).send(data)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = { doubtRouter };
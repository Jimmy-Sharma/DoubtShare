const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema(
   {
      email: { type: String },
      content: { type: String},
      doubtType: { type: String},
   }
);

const Doubt = mongoose.model("Doubt", doubtSchema);

module.exports = { Doubt };
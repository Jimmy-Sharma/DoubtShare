const express = require("express");
const { connection } = require("./config/db");
const { auth } = require("./middleware/authentication");
const { userRouter } = require("./routes/user.routes");
const { doubtRouter } = require("./routes/dashboard.routes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();

app.use("/users", userRouter);

// app.use(auth);

app.use("/doubts", doubtRouter);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  try {
    await connection;
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running on port ${port}`);
});
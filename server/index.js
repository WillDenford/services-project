const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const connectDb = require("./config/db");
const app = express();
connectDb();
app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));

app.use(express.static(path.join(__dirname, "../client")));
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

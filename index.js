const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

const router = require("./src/router/index");
app.use("/api/v1/", router);

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

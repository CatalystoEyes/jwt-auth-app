import { StringifyOptions } from "querystring";

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
require("dotenv").config();

try {
  mongoose.connect("mongodb://localhost:5000/usersdb", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("Connected MongoDB on localhost:5000");
} catch (error) {
  console.log(error);
}

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", (error as Error).message);
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(userRoutes);

app.listen(process.env.PORT || 8080, () => {
  console.log("Server was started on http://localhost:3000");
});

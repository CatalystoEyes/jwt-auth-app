import { verifyToken } from "../middlewares/authJWT";

const express = require("express");
export const router = express.Router(),
  { signup, signin } = require("../controllers/auth.controller.js");

router.post("/regist", signup, (req, res) => {});

router.post("/login", signin, (req, res) => {});

router.get("/secure", verifyToken, (req, res) => {
  if (!user) {
    res.status(403).send({ message: "Invalid JWT token" });
  }
  if (req.user == "admin") {
    res.status(200).send({ message: "Authorised access" });
  } else {
    res.status(403).send({ message: "Unauthorised access" });
  }
});

module.exports = router;

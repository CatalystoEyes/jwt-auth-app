import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");
const userModels = require("../models/user");

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET,
      (err, decode) => {
        if (err) {
          req.user = undefined;
        }
        userModels.findOne({ _id: decode.id }).exec((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
          } else {
            req.user = user;
            next();
          }
        });
      }
    );
  } else {
    req.user = undefined;
    next();
  }
};

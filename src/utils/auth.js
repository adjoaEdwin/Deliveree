import jwt from "jsonwebtoken";
import { User } from "../models/user.models";
import config from "../config";

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  });
};

export const verifyToken = token => {
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) {
        return reject(err);
      }
      return resolve(payload);
    });
  });
};

export const signup = async (req, res) => {
  if (
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.password ||
    !req.body.email
  ) {
    return res.send(400).send({ message: "All fields are required" });
  }

  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    return res.sendStatus(201).send({ token });
  } catch (e) {
    console.log(e);
    res.sendStatus(500).end();
  }
};

export const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Enter an email and a password" });
  }

  const invalid = { message: "Invalid email or password" };

  try {
    const user = await User.findOne({ email: req.body.email })
      .select("email password")
      .exec();

    if (!user) {
      return res.sendStatus(401).send(invalid);
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(401).send(invalid);
    }

    const token = newToken(user);
    return res.status(200).send({ token });
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
};

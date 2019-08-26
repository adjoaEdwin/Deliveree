import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import morgan from "morgan";
import config from "./config";
import path from "path";

export const app = express();

app.disable("x-powered-by");

// middleware here
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

// static files
app.use(express.static("public"));
// app.use("/css", express.static(path.join(__dirname, "")));
// app.use("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("My little express server...");
});

export const start = () => {
  app.listen(config.port, () => {
    console.log(`Server on "http://localhost:${config.port}"`);
  });
};

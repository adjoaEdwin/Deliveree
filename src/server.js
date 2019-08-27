import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import morgan from "morgan";
import config from "./config";
import path from "path";
import { connect } from "./utils/db";
import { signup, login } from "./utils/auth";
import cropRouter from "./routes/crop.router";
import ticketRouter from "./routes/tickets.router";
import userRouter from "./routes/user.router";
import { User } from "./models/user.models";

export const app = express();

app.disable("x-powered-by");

// middleware here
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan("dev"));

// static files
app.use(express.static(path.join(__dirname, "/public/")));
app.use(
  "/css",
  express.static(path.join(__dirname, "/node_modules/bulma/css"))
);
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/assets", express.static(path.join(__dirname, "public/images")));
app.use("/assets", express.static(path.join(__dirname, "public/js")));
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: "Deliveree" });
});

app.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign Up" });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

//auth routes
app.post("/signup", signup);
app.post("/login", login);

// routes -------------
app.use("/api/crops", cropRouter);
app.use("/api/tickets", ticketRouter);
app.use("/api/users", userRouter);

export const start = async () => {
  try {
    await connect();

    app.listen(config.port, () => {
      console.log(`Server on "http://localhost:${config.port}"`);
    });
  } catch (e) {
    console.log(e);
  }
};

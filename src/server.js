import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import morgan from "morgan";
import config from "./config";
import path from "path";
import { connect } from "./utils/db";
import cropRouter from "./routes/crop.router";
import ticketRouter from "./routes/tickets.router";

export const app = express();

app.disable("x-powered-by");

// middleware here
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
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

app.get("/user/dashboard", (req, res) => {
  res.render("dashboard", { title: "Dashboard" });
});

//auth routes
//app.use;

// routes -------------
app.use("/api/crops", cropRouter);
app.use("/api/tickets", ticketRouter);

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

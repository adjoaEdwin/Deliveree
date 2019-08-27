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

//app.disable("x-powered-by");

// middleware here
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

// static files
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/css",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/jquery/dist"))
);
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { message: "My little express server ..." });
});

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

import express from "express"
import {json, urlencoded} from "body-parser";
import cors from "cors";
import morgan from "morgan";
import config from './config'

export const app = express();

// middleware here
app.use(cors())
app.use(json())
app.use(urlencoded({extended: true}))
app.use(morgan("dev"))

app.get('/', (req, res) => {
    res.send("My little express server...")
})

export const start = () => {
    app.listen(config.port, () => {
        console.log(`Server on "http://localhost:${config.port}"`);
    });
};
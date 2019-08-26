import {merge } from "lodash";
const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || "development"

const baseConfig = {
    env,
    port,
    isDev: env === "development",
    secrets: {
        jwt: process.env.JWT_SECRET,
        jwtExp: "7d"
    }
}

const envConfig = {};

switch (env) {
    case "dev":
    case "development":
        envConfig = require('./dev').config  
        break;
    default:
        envConfig = require('./dev').config
        break;
}

export default merge(baseConfig, envConfig)
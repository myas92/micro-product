"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var typeorm_1 = require("typeorm");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.db = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.PG_HOST || "localhost",
    port: Number(process.env.PG_PORT) || 5432,
    username: process.env.PG_USERNAME || "postgres",
    password: process.env.PG_PASSWORD || "postgres",
    synchronize: true,
    database: process.env.PG_DATABASE || "zehn",
    entities: ["src/entity/*.js", "src/entity/*.ts"],
});

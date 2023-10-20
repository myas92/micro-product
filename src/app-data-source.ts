import { DataSource } from "typeorm"

export const db = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    synchronize: true,
    database: "zehn",
    entities: ["src/entity/*.js", "src/entity/*.ts"],
})
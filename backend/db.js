import { Pool } from "pg";

export const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432,
});
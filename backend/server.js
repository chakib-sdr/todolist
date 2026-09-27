import express from "express";
import { routeacc } from "./routes/accroute.js";

const server = express();

server.use(express.json());
server.use("/", routeacc);

server.listen(3000, "localhost");
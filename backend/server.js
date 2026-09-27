import express from "express";
import { routeacc } from "./routes/accroute.js";
import { signrouter } from "./routes/signroute.js";
const server = express();

server.use(express.json());
server.use("/", routeacc);
server.use("/",signrouter);
server.listen(3000, "localhost");
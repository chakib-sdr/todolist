import "dotenv/config";
import express from "express";
import { routerprofile , routersignin } from "./route.js";
const server = express();

server.use(express.json());
server.use("/", routerprofile);
server.use("/", routersignin);
server.listen(3000);
import "dotenv/config";
import express from "express";
import { routerprofile } from "./route.js";
const server = express();

server.use(express.json());
server.use("/", routerprofile);

server.listen(3000);
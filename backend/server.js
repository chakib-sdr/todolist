import "dotenv/config";
import express from "express";
import { routerprofile , routersignin , routertoken} from "./route.js";
const server = express();

server.use(express.json());
server.use("/", routerprofile);
server.use("/", routersignin);
server.use("/",routertoken);
server.listen(3000);
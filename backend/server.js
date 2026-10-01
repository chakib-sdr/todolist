import "dotenv/config";
import cors from "cors";
import express from "express";
import { router} from "./route.js";
const server = express();
server.use(cors());
server.use(express.json());
server.use("/", router);
server.listen(3000);
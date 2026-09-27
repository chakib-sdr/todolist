import { Router } from "express";
import { createuser } from "../controllers/createacc.js";

export const routeacc = Router();

routeacc.post("/createaccount", createuser);
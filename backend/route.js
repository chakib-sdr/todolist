import { Router } from "express";
import { validatecreatingprofile , checkuser } from "./middleware.js";
import { createprofile , signin } from "./controller.js";

export const routerprofile = Router();
export const routersignin = Router();

routerprofile.post("/createprofile", validatecreatingprofile , createprofile);

routersignin.post("/login", checkuser , signin);

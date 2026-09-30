import { Router } from "express";
import { validatecreatingprofile , checkuser , verifytoken } from "./middleware.js";
import { createprofile , signin , getprofile } from "./controller.js";

export const routerprofile = Router();
export const routersignin = Router();
export const routertoken = Router();

routerprofile.post("/createprofile", validatecreatingprofile , createprofile);

routersignin.post("/login",checkuser ,signin);
routertoken.get('/profile', verifytoken, getprofile);

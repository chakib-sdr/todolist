import { Router } from "express";
import { validatecreatingprofile } from "./middleware.js";
import { createprofile } from "./controller.js";

export const routerprofile = Router();

routerprofile.post("/createprofile", validatecreatingprofile , createprofile);

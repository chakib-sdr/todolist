import { Router } from "express";
import {check} from "../controllers/signin.js";

export const signrouter = Router();

signrouter.get('/login', check);
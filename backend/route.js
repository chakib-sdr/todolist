import { Router } from "express";
import { validatecreatingprofile , checkuser , verifytoken , verifytask} from "./middleware.js";
import { createprofile , signin , getprofile , createtodo ,removetodo , showtodo } from "./controller.js";

export const router = Router();
router.post("/createprofile", validatecreatingprofile , createprofile);

router.post("/login",checkuser ,signin);
router.get('/profile', verifytoken, getprofile);
router.get("/todo", verifytoken , showtodo)
router.post("/todo",verifytoken, verifytask, createtodo);
router.delete("/todo/:id", verifytoken , removetodo);

import pool from "./db.js";
import bcrypt from "bcrypt";
export const createprofile = async (req,res) => {
   const {name , mdps} = req.body;
   const hash = await bcrypt.hash(mdps, 10);
   await pool.query('INSERT INTO users (name,mdps) VALUES ($1,$2)',[name,hash]);
   return res.status(201).json({
    message : "user created"
   })
}
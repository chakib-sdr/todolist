import pool from "./db.js";
import bcrypt from "bcrypt";
import { JsonWebTokenError } from "jsonwebtoken";
const jwt = JsonWebTokenError();

export const createprofile = async (req,res) => {
   const {name , mdps} = req.body;
   const hash = await bcrypt.hash(mdps, 10);
   await pool.query('INSERT INTO users (name,mdps) VALUES ($1,$2)',[name,hash]);
   return res.status(201).json({
    message : "user created"
   })
}

export const signin = (req,res) => {
      const playload = {
            name : user.name ,
            mdps : user.mdps
        }
        const token = jwt.sign(playload , process.env.SECRET_KEY, '1h');
        return res.status(201).json({
            message : 'token received'
        })
}
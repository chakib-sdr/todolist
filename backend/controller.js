import pool from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
            id : req.user.id,
            name : req.user.name
        }
        const token = jwt.sign(playload , process.env.SECRET_KEY, { expiresIn: "1h" });
        return res.status(201).json({
            message : 'token received' ,token
        })
}

export const getprofile = (req,res) => {
    return res.status(200).json({
        message : "it worked"
    })
}
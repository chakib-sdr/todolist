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
      const payload = {
            id : req.user.id,
            name : req.user.name
        }
        const token = jwt.sign(payload , process.env.SECRET_KEY, { expiresIn: "1h" });
        return res.status(201).json({
            message : 'token received' ,token
        })
}

export const getprofile = (req,res) => {
    return res.status(200).json({
        message : "it worked"
    })
}

export const createtodo = async (req,res) => {
    const {task,date} = req.body;
    await pool.query("INSERT INTO list (task, user_id, date) VALUES($1,$2,$3)",[task,req.user.id,date]);
    return res.status(200).json({
        message : "task created"
    })
}

export const removetodo = async (req,res) => {
    await pool.query("DELETE FROM list WHERE id = $1 AND user_id = $2",[req.params.id,req.user.id]);
    return res.status(200).json({
        message : "task deleted"
    })
}

export const showtodo = async(req,res) => {
    const { rows } = await pool.query("SELECT id, task, date, completed FROM list WHERE user_id = $1",[req.user.id]);
    return res.status(200).json(rows);
}
import pool from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const validatecreatingprofile =  (req,res,next) => {
    const {name , mdps} = req.body ?? {};
    if(typeof(name) !== 'string' || name.length <1){
        return res.status(400).json({
            message : "Enter a name"
        })
    }
    if(typeof(mdps) !== 'string' || mdps.length < 8){
        return res.status(400).json({
            message : "choose a stronger password"
        })
    }
    next()
}

export const checkuser = async (req,res,next) => {
    const {name , mdps} = req.body ?? {}
    if(typeof(name) !== "string" || typeof(mdps) !== "string"){
        return res.status(400).json({
            message : "password and username required"
        })
    }
    const result = await pool.query('SELECT id,name,mdps FROM users WHERE name = $1',[name]);
    const user = result.rows[0];
    if(!user || await bcrypt.compare(mdps,user.mdps) === false){
        return res.status(403).json({
            message : "invalid password or username"
        })
    }
    req.user = {id : user.id , name : user.name}
    next();
}

export const verifytoken = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "token required" });
  }

  try {
    req.user = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    return res.status(401).json({ message: "invalid or expired token" });
  }
};


export const verifytask = async (req,res,next) => {
    const {task,date} = req.body ?? {}
    if(typeof(task) !== "string" || typeof(date) !== "string"){
        return res.status(400).json({
            message : "Enter required information"
        })       
    }
    next()
}
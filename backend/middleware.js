import pool from "./db.js";
import bcrypt from "bcrypt";
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
            message : "invalid password"
        })
    }
    req.user = {id : user.id , name : user.name}
    next();
}
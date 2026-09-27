import { pool } from "../db.js";

export const check = async (req,res) => {
    const {name , mdps} = req.body;
    const result = await pool.query(
    "SELECT * FROM users WHERE name = $1 AND mdps = $2",[name,mdps]);
    if (result.rows.length === 0) {
    return res.json({
        message : "user or password invalid"
    })
}
res.json({
    message : "have access"
})
}
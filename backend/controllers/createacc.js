export const createuser = async (req, res) => {
    const { name, mdps } = req.body;
    if (name === "" || name.length < 5) {
        return res.json({
            message: "name too short"
        });
    }
    if (mdps.length < 8) {
        return res.json({
            message: "choose a long password at least 8 characters"
        });
    }
    await pool.query(
        "INSERT INTO users (name, mdps) VALUES ($1, $2)",
        [name, mdps]
    );
    res.json({
        message: "user created"
    });
};
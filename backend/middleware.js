export const validatecreatingprofile =  (req,res,next) => {
    const {name , mdps} = req.body ?? [];
    if(name.length <1){
        return res.status(400).json({
            message : "Enter a name"
        })
    }
    if(mdps.length < 8){
        return res.status(400).json({
            message : "choose a stronger password"
        })
    }
    next()
}
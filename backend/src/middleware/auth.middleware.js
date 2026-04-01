import jwt from "jsonwebtoken"
const accSecret = process.env.JWT_SECRET_ACCESS

export const authMiddleware = (req, res, next)=>{
    const header = req.headers.authorization

    if(!header){
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const accToken = header.split(" ")[1]

    try{
        const decoded = jwt.verify(accToken, accSecret)
        req.user = decoded
        next()
    }
    catch(err){
        return res.status(401).json({ message: 'Unauthorized' })
    }
}
import { registerService, loginService, refreshService, logoutService } from "../service/auth.service.js";


export const registerController = async(req, res, next)=>{
    const {name, email, password} = req.body

    if(!(name && email &&password)){
        const error = new Error('Email and password are required')
        error.statusCode = 400
        return next(error)
    }

    try{
         const newUser = await registerService(name, email, password)
         return res.status(201).json({message : "user is created", user:newUser})
    }
    catch(err) {
        next(err)
    }
}

export const loginController = async (req,res, next)=>{
    const {email, password} = req.body

    if(!(email && password)){
        const error = new Error('Email and password are required')
        error.statusCode = 400
        return next(error)
    }

    try{
        const user = await loginService(email, password)
        return res.status(200).cookie('refreshToken', user.refToken, {httpOnly:true, secure : true, sameSite:"strict"}).json({token : user.accToken})

    }
    catch(err) {
        next(err)
    }
}

export const refreshController= async (req, res, next)=>{
    const oldRefToken = req.cookies.refreshToken
    if(!oldRefToken){
        const error = new Error('Refresh token not found')
        error.statusCode = 401
        return next(error)
    }

    try{
        const Tokens = await refreshService(oldRefToken)
        return res.status(200).cookie('refreshToken', Tokens.refToken, {httpOnly:true, secure:true, sameSite:"strict"}).json({token:Tokens.accToken})
    }

    catch(err) {
        next(err)
    }

}

export const logoutController = async(req, res, next)=>{
    const oldRefToken = req.cookies.refreshToken
    if(!oldRefToken){
        const error = new Error('Refresh token not found')
        error.statusCode = 401
        return next(error)
    }

    try{
        await logoutService(oldRefToken)
        return res.status(200).clearCookie('refreshToken').json({message:"logout successfully"})
    }
    catch(err) {
        next(err)
    }
}
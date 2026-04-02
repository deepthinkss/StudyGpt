import { getUserByEmail, createUser } from "../repository/user.repository.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { getCache, setCache, deleteCache } from "../utils/cache.js";


const accSecret = process.env.JWT_SECRET_ACCESS
const refSecret = process.env.JWT_SECRET_REFRESH

export async function registerService(name, email, password){
    const userEmail = await getUserByEmail(email)
    if(userEmail){
        throw new Error('user already exist')
    }

    const saltRounds = 10
    const hashedPass = await bcrypt.hash(password, saltRounds)

    const newUser = await createUser(name, email, hashedPass)

    return newUser
}

export async function loginService(email, password){
    const userEmail = await getUserByEmail(email)

    if(!userEmail){
        throw new Error('user does not exist')
    }

    const checkHashedPassword = await bcrypt.compare(password, userEmail.password)

    if(!checkHashedPassword){
        throw new Error('incorrect password')
    }

    const accToken = jwt.sign(
        {
            userId : userEmail.id,
            email : userEmail.email
        },
        accSecret,
        {expiresIn : '1h'}
    )

    const refToken = jwt.sign(
        {
            userId : userEmail.id,
            email : userEmail.email
        },
        refSecret,
        {expiresIn : '7d'}
    )

    const expiresAt = 7 * 24 * 60 * 60
    await setCache(`refresh:${userEmail.id}`, refToken, expiresAt)

    return {accToken, refToken}
}

export async function refreshService(token){
    const decoded = jwt.verify(token, refSecret)
    const userToken = await getCache(`refresh:${decoded.userId}`)
    if(!userToken){
        throw new Error("token not found")
    }
    await deleteCache(`refresh:${decoded.userId}`)

    const accToken = jwt.sign(
        {
            userId : decoded.userId,
        },
        accSecret,
        {expiresIn : '1h'})

    const refToken = jwt.sign(
        {
            userId : decoded.userId,
        },
        refSecret,
        {expiresIn:'7d'})

    const expiresAt = 7 * 24 * 60 * 60

    await setCache(`refresh:${decoded.userId}`, refToken, expiresAt)

    return {accToken, refToken}  
}

export async function logoutService(token) {
    const decoded = jwt.verify(token, refSecret)
    const userToken = await getCache(`refresh:${decoded.userId}`)
    if(!userToken){
        throw new Error("token not found")
    }
    await deleteCache(`refresh:${decoded.userId}`)

    return { message: 'Logged out successfully' }
    
}
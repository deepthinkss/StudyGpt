import { registerController, loginController, refreshController, logoutController } from "../controller/auth.controller.js";
import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRouter = express.Router()

authRouter.post("/register", registerController)
authRouter.post("/login", loginController )
authRouter.post("/refresh",authMiddleware, refreshController)
authRouter.post("/logout",authMiddleware, logoutController)

export default authRouter

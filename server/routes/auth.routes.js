import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import AuthMiddleware from "../middleware/auth.middlware.js";
const AuthRouter = Router();
AuthRouter.post("/create", UserController.signUp);
AuthRouter.get("/fetch", UserController.fetchAllUser);
AuthRouter.get("/fetch", AuthMiddleware, UserController.fetchUser);
AuthRouter.post("/login", UserController.login);
AuthRouter.get("/logout", UserController.logout);
export default AuthRouter;

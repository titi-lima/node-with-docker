import { Router } from "express";
import authController from "../controllers/authController";

const authRouter = Router();

authRouter.post("/", authController.login);
authRouter.patch("/", authController.refresh);
authRouter.delete("/", authController.logout);

export default authRouter;
import { Router } from "express";
import userController from "../controllers/userController";

const userRouter = Router();

userRouter.get("/", userController.readAll);
userRouter.delete("/:id", userController.delete);

export default userRouter;

import { Router } from "express";
import userController from "../controllers/userController";

const userRouter = Router();

userRouter.get("/", userController.readAll);
userRouter.delete("/:id", userController.delete);
userRouter.post("/", userController.create);
userRouter.patch("/:id", userController.update);

export default userRouter;

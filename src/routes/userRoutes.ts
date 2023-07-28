import { Router } from "express";
import userController from "../controllers/userController";
import auth from "../middleware/auth";

const userRouter = Router();

userRouter.get("/", userController.readAll);
userRouter.delete("/:id", [auth], userController.delete);
userRouter.post("/", userController.create);
userRouter.patch("/:id", [auth], userController.update);

export default userRouter;

import { Router } from "express";
import userRouter from "./userRoutes";
import authRouter from "./authRoutes";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/sessions", authRouter);

export default routes;

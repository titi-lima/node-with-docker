import { Router } from "express";
import { UserController } from "../controllers";

const userRouter = Router();

userRouter.route('/').post(UserController.create);

userRouter.route('/').get(UserController.readAll);

userRouter.route('/:user_id').get(UserController.read);

userRouter.route('/email/:email').get(UserController.readByEmail);

userRouter.route('/:user_id').put(UserController.update);

userRouter.route('/:user_id').delete(UserController.delete);

userRouter.route('/:user_id/rooms').get(UserController.listRooms);

export default userRouter;
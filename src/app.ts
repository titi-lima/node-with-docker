import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import errorHandler from "./middleware/errorHandler";

dotenv.config();

const app = express();

app.use(express.json());

app.use(routes);

app.use(errorHandler);

export default app;

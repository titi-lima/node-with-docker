import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "oiiiiiiiiii" });
});

app.post("/", (req, res) => {
  const { name, email } = req.body;
  console.log(req.body);
  res.status(200).json({ message: `Hello ${name}! Your email is ${email}` });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(process.env.PORT);
  console.log("Server started on port 3001");
});

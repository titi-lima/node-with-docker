import express from "express";

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

app.listen(3001, () => {
  console.log("Server started on port 3001");
});

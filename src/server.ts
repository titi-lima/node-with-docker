import "dotenv/config";

import app from "./app";

app.listen(process.env.PORT || 3001, () => {
  console.log(process.env.PORT);
  console.log("Server started on port 3001 🚀");
});

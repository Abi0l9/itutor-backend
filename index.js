const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./controllers/auth");

require("./db");

app.use(express.json());
app.use(cors());

app.get("", (request, response) => response.send("Welcome home"));
app.use("/api/auth", authRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log("app is running on localhost:", PORT);
});

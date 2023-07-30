const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./controllers/auth");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware");

require("./db");

app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.get("", (request, response) => response.send("Welcome home"));
app.use("/api/auth", authRouter);
app.use(middleware.userExtractor);
app.use("/api/users/", usersRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log("app is running on localhost:", PORT);
});
// app.use(middleware.errorHandler);

const express = require("express");
const cors = require("cors");
const app = express();

require("./db");

app.use(express.json());
app.use(cors());

app.get("", (request, response) => response.send("Welcome home"));

const PORT = 4000;
app.listen(PORT, () => {
  console.log("app is running on localhost:", PORT);
});

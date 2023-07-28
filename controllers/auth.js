const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const handlers = require("../utils/handlers");

router.post("/signup", async (request, response) => {
  const body = request.body;
  const reqFields = [
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
    "role",
    "gender",
    "birthday",
    "password",
  ];

  const missingFields = handlers.handleRequiredFields(body, reqFields);
  if (missingFields) {
    return response.status(400).json(missingFields).end();
  }

  const emptyField = handlers.handleEmptyField(body);
  if (emptyField) {
    return response.status(400).json(emptyField);
  }

  const saltRound = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(body.password, saltRound);

  const newUser = new User({ ...body, passwordHash });

  try {
    await newUser.save();
    return response.status(201).json(newUser).end();
  } catch (e) {
    return response.status(400).json({ error: e.message });
  }
});

module.exports = router;

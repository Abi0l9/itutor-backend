const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const handlers = require("../utils/handlers");
const mailer = require("../utils/codeMailer");
const congratsMailer = require("../utils/congratsMailer");
const resendCodeMailer = require("../utils/resendCodeMailer");

const resetCode = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    setTimeout(async () => {
      const code = handlers.generateCode();
      user.verificationCode = code;
      await user.save();
    }, 900000);
  }
};

router
  .post("/signup", async (request, response) => {
    const body = request.body;
    const { password, email, firstName, role } = body;

    const userExists = await User.find({ email });
    if (userExists.length) {
      return response
        .status(400)
        .json({ error: "Email address already in use" });
    }

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
    const passwordHash = await bcrypt.hash(password, saltRound);

    const verificationCode = handlers.generateCode();
    const sendCode = async () => {
      await mailer(firstName, email, verificationCode);
    };

    const newUser = new User({ ...body, passwordHash, verificationCode });

    const payload = { code: verificationCode, email, role, userId: newUser.id };

    try {
      await newUser.save();
      await sendCode();
      await resetCode(email);
      return response.status(201).json(payload).end();
    } catch (e) {
      return response.status(400).json({ error: e.message });
    }
  })

  .post("/verify/:userId", async (request, response) => {
    const body = request.body;
    const userId = request.params.userId;

    const emptyField = handlers.handleEmptyField(body);
    if (emptyField) {
      return response.status(400).json(emptyField);
    }

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({ error: "Invalid user ID" });
    }

    const verificationCode = user.verificationCode;
    if (verificationCode !== body.code) {
      return response
        .status(400)
        .json({ error: "Invalid or expired verification code" });
    }

    let role;

    if (user.role === "STUDENT") {
      role = "student";
    } else if (user.role === "TUTOR") {
      role = "tutor";
    }

    const sendCogratsMsg = async () => {
      await congratsMailer(user.firstName, user.email, role);
    };

    user.isVerified = true;

    try {
      await user.save();
      await sendCogratsMsg();
      return response.status(200).json({ message: "User verified" }).end();
    } catch (e) {
      return response.status(400).json({ error: e.message });
    }
  })

  .post("/resendCode", async (request, response) => {
    const body = request.body;

    const emptyField = handlers.handleEmptyField(body);
    if (emptyField) {
      return response.status(400).json(emptyField);
    }

    const user = await User.findOne({ email: body.email });
    if (!user) {
      return response.status(404).json({ error: "Invalid user ID" });
    }
    const { firstName, email } = user;

    const verificationCode = handlers.generateCode();
    const resendCode = async () => {
      await resendCodeMailer(firstName, email, verificationCode);
    };

    user.verificationCode = verificationCode;
    const payload = {
      code: verificationCode,
      email,
      role: user.role,
      userId: user.id,
    };

    try {
      await user.save();
      await resendCode();
      await resetCode(email);
      return response.status(201).json(payload).end();
    } catch (e) {
      return response.status(400).json({ error: e.message });
    }
  })
  .post("/signin", async (request, response) => {
    const body = request.body;
    const { email, password } = body;
    const reqFields = ["email", "password"];

    const missingFields = handlers.handleRequiredFields(body, reqFields);
    if (missingFields) {
      return response.status(400).json(missingFields).end();
    }

    const emptyField = handlers.handleEmptyField(body);
    if (emptyField) {
      return response.status(400).json(emptyField);
    }

    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).json({ error: "Invalid email or password" });
    }

    const userPassword = user.passwordHash;
    const passwordIsCorrect = await bcrypt.compare(password, userPassword);

    if (!passwordIsCorrect) {
      return response.status(401).json({ error: "Invalid email or password" });
    }

    const payload = {
      id: user.id,
      role: user.role,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      isVerified: user.isVerified,
      phoneNumber: user.phoneNumber,
    };

    // eslint-disable-next-line no-undef
    const token = jwt.sign(payload, process.env.SECRET);

    return response.status(200).json({ token }).end();
  });

module.exports = router;

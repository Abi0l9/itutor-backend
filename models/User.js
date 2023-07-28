const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = mongoose.Schema({
  firstName: String,
  lastName: String,
  profileImage: {
    type: String,
    default: null,
  },
  phoneNumber: String,
  gender: {
    type: String,
    enum: ["male", "female", "others"],
  },
  role: {
    type: String,
    enum: ["STUDENT", "TUTOR", "ADMIN"],
  },
  birthday: String,
  passwordHash: String,
  nationality: String,
  country: String,
  state: String,
  experienceYears: String,
  bio: String,
  tutoringOffers: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: [true, "This is a required field"],
    unique: [true, "Account with this email already exists"],
  },
  education: [
    {
      ref: "Education",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  work: [
    {
      ref: "Work",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  certification: [
    {
      ref: "Certification",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  validID: {
    ref: "ValidID",
    type: mongoose.Schema.Types.ObjectId,
  },
  tutoringSubjects: [
    {
      ref: "Subject",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  bankInfo: {
    ref: "Bank",
    type: mongoose.Schema.Types.ObjectId,
  },
  refreeInfo: {
    ref: "Referee",
    type: mongoose.Schema.Types.ObjectId,
  },
});

schema.plugin(uniqueValidator);

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject.passwordHash;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.model("User", schema);
module.exports = User;

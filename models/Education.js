const mongoose = require("mongoose");

const schema = mongoose.Schema({
  schoolName: String,
  country: String,
  course: String,
  startYear: String,
  endYear: String,
  degree: String,
  grade: String,
  userId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Education = mongoose.model("Education", schema);
module.exports = Education;

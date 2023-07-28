const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  group: {
    enum: ["academics", "test"],
    type: String,
  },
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

const Subject = mongoose.model("Subject", schema);
module.exports = Subject;

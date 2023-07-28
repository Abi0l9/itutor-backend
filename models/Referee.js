const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  address: String,
  relationship: String,
  occupation: String,
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

const Referee = mongoose.model("Referee", schema);
module.exports = Referee;

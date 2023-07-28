const mongoose = require("mongoose");

const schema = mongoose.Schema({
  uploadedId: String,
  skipped: {
    type: Boolean,
    default: false,
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

const ValidID = mongoose.model("ValidID", schema);
module.exports = ValidID;

const mongoose = require("mongoose");

const schema = mongoose.Schema({
  organizationName: String,
  certificateName: String,
  certificate: String,
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

const Certification = mongoose.model("Certification", schema);
module.exports = Certification;

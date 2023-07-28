const mongoose = require("mongoose");

const schema = mongoose.Schema({
  accountName: String,
  accountNumber: String,
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

const Bank = mongoose.model("Bank", schema);
module.exports = Bank;

const mongoose = require("mongoose");

const schema = mongoose.Schema({
  organizationName: String,
  role: String,
  isTeachingRole: Boolean,
  startYear: String,
  endYear: String,
  isWorking: Boolean,
  isDisplay: Boolean,
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

const Work = mongoose.model("Work", schema);
module.exports = Work;

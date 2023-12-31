const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema(
  {
    tname: {
      type: String,
      required: true,
    },
    tdescription: {
      type: String,
      required: true,
    },
    tnumber: {
      type: String,
      required: true,
    },
  },
  { collection: "ViewTours" }
);

module.exports = mongoose.model("Views", UsersSchema);

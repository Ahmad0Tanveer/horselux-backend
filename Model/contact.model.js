const mongoose = require("mongoose");
const addContactSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    contact_type: {
      type: String,
    },
    title: {
      type: String,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    primary_phone: {
      type: String,
    },

    email: {
      type: String,
    },
  }, { strict: false }
);
module.exports = mongoose.model("contacts", addContactSchema);

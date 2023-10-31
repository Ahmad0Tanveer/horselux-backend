const mongoose = require("mongoose");
const newOnwerGroupSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    contactId: { type: mongoose.Schema.Types.ObjectId, ref: "addContact" },
    name: {
      type: String,
    },
    add_group_member: {
      type: Boolean,
    },
    usef_number: {
      type: String,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("owner-groups", newOnwerGroupSchema);

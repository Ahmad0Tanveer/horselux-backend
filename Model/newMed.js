const mongoose = require("mongoose");
const newMedSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    med_name: {
      type: String,
    },

    drug_name: {
      type: String,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("supplements", newMedSchema);

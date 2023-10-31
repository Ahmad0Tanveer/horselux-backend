const mongoose = require("mongoose");
const addNewHorseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    neckName: {
      type: String,
    },
    showName: {
      type: String,
    },
    owner: {
      type: String,
    },
    ownerId: {
      type: String,
    },
    billPayer: {
      type: String,
    },
    billPayerId: {
      type: String
    },

    bread: {
      type: String,
    },
    color: {
      type: String,
    },

    sex: {
      type: String,
    },
    img: {
      type: String,
    },
    microchip: {
      type: String,
    },
    stallNumber: {
      type: String,
    },
    stallNotes: {
      type: String,
    },
    paddockName: {
      type: String,
    },
    paddockLocation: {
      type: String,
    },
    paddockNotes: {
      type: String,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("horses", addNewHorseSchema);

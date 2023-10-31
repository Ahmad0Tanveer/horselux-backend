const mongoose = require('mongoose');

const uploadSchema = mongoose.Schema({
    _id: String,
    name: String,
}, { strict: false });

module.exports = mongoose.model("details", uploadSchema)
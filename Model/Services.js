const mongoose = require('mongoose');

const ServicesSchema = mongoose.Schema({
    _id: String,
    name: String,
}, { strict: false });

module.exports = mongoose.model("services", ServicesSchema)
const mongoose = require('mongoose');

const ownerGroupd = mongoose.Schema({
    _id: String,
    name: String,
}, { strict: false });

module.exports = mongoose.model("ownerGourps", ownerGroupd)
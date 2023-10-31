const express = require('express')
const Services = require('../Model/Services');
const router = express.Router();

router.post('/', function (req, res) {
    const uid = req.body.uId;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const hId = req.body.hId;
    const serviceType = req.body.type;
    const cId = req.body.cId;
    let query = {};
    if (startDate) {
        query.startDate = startDate;
    }
    if (endDate) {
        query.endDate = endDate;
    }
    if (hId) {
        query.hId = hId;
    }
    if (serviceType) {
        query.serviceType = serviceType;
    }
    if (cId) {
        query.cId = cId;
    }
    res.send({
        "message": query
    });
});

module.exports = router;
const express = require('express')
const Services = require('../Model/Services');
const router = express.Router();

router.post('/', function (req, res) {
    const targetDate = req.body.date; // The target date you want to query
    const targetUid = req.body.uid;
    Services.find({
        nextDate: { $gte: new Date(targetDate + 'T00:00:00.000Z') }, // Convert date string to a Date object
        uid: targetUid
    }).then((users) => {
        res.send(users);
    }).catch((err) => {
        res.send({
            "message": err.message
        });
    });
});
router.delete('/:id', function (req, res) {
    let id = req.params.id;
    Services.deleteOne({ _id: id }).then((_) => {
        res.send({
            "message": "Delete Successfully"
        });
    }).catch((err) => {
        res.send({
            "message": err.message
        });
    });
});
module.exports = router;
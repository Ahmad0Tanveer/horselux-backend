const OwnerGroupd = require('../Model/ownergroupd.model');
const express = require('express')
const router = express.Router();
const authJwt = require("../middleware/Auth");

router.post('/', authJwt.verifyToken, function (req, res) {
    const body = req.body;
    body.userId = req.user_id;
    let group = new OwnerGroupd(body);
    group.save().then((resuls) => {
        res.send({
            "results": resuls,
        });
    }).catch((err) => {
        res.send({
            "message": err.message,
        });
    });

});
router.get('/:id', function (req, res) {
    const id = req.params.id;
    console.log(id);
    OwnerGroupd.find({
        "userId": id
    }).then((resuls) => {
        res.send({
            "results": resuls,
        });
    }).catch((err) => {
        res.send({
            "message": "Some thing went wrong",
        });
    });
});
router.put('/:id', function (req, res) {
    let id = req.params.id;
    OwnerGroupd.findByIdAndUpdate(id, req.body).then((_) => {
        res.send({
            "message": "Updated Successfully"
        });
    }).catch((err) => {
        res.send({
            "message": err.message
        });
    });
});
router.delete('/:id', function (req, res) {
    let id = req.params.id;
    OwnerGroupd.deleteOne({ _id: id }).then((_) => {
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
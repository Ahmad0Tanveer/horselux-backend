

const express = require("express");
const router = express.Router();
const newOnwerGroup = require("../Controller/newOnwerGroup");
const authJwt = require("../middleware/Auth");


router.post('/new-Onwer-group', authJwt.verifyToken, newOnwerGroup.newOnwerGroupPost);
router.get('/new-Onwer-group', newOnwerGroup.addContactGet);

module.exports = router;
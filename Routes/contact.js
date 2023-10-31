

const express = require("express");
const router = express.Router();
const contact = require("../Controller/contact");


router.post('/userdata', contact.contactPost);
router.get('/userdata', contact.contactGet);
router.put('/update/:id', contact.updateContact);
router.delete('/update/:id', contact.deleteContact);

module.exports = router;
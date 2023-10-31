

const express = require("express");
const router = express.Router();
const addContact = require("../Controller/contact.controller");
const authJwt = require("../middleware/Auth");


router.post('/add-contact-data', authJwt.verifyToken, addContact.addContactPost);
router.get('/add-contact-data-by-id/:userId', authJwt.verifyToken, addContact.addContactGetByUserId);


router.put('/contact/:id', addContact.updateContact);
router.delete('/add-contact-delete-data/:id', addContact.deleteContact);


module.exports = router; 
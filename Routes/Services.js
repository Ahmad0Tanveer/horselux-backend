

const express = require("express");
const router = express.Router();
const services = require("../Controller/Services");
router.post('/services-get/:id', services.getById);
router.post('/services-name', services.Name);
router.put('/services-name/:id', services.update);
router.delete('/services-byid', services.RemoveById);
module.exports = router;
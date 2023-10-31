const express = require("express");
const router = express.Router();
const addnewhorse = require("../Controller/horse.controller");
const authJwt = require("../middleware/Auth"); // Import the authJwt middleware

router.post('/addnewhorse-data', authJwt.verifyToken, addnewhorse.addNewHorsePost);

router.get('/addnewhorse-data/:id', authJwt.verifyToken, addnewhorse.addNewHorseGetByUserId);
router.get('/addnewhorse-databyid/:id', authJwt.verifyToken, addnewhorse.getHorsesByUserId);
router.put('/addnewhorse-data/:id', authJwt.verifyToken, addnewhorse.updateHorse);
router.delete('/addnewhorse-data/:id', authJwt.verifyToken, addnewhorse.deleteHorse);

module.exports = router;

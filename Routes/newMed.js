

const express =require("express");
const router=express.Router();
const newMed = require("../Controller/newMed");
const authJwt = require("../middleware/Auth");


 router.post('/new-med',authJwt.verifyToken,newMed.newMedPost);
 router.get('/new-med',authJwt.verifyToken,newMed.newMedGet);
router.get('/new-med-id/:id', authJwt.verifyToken, newMed.medGetByUserId);


 module.exports = router;
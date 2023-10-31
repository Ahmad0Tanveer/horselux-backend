

const express =require("express");
const router=express.Router();
const newOnwerGroup = require("../Controller/OwnerPercentage");
const authJwt = require("../middleware/Auth"); // Import the authJwt middleware


 router.post('/ownerpercentage',authJwt.verifyToken,newOnwerGroup.ownerPercenagePost);
 router.get('/ownerpercentage',authJwt.verifyToken,newOnwerGroup.ownerPercentGet);

 module.exports = router;
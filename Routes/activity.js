

const express =require("express");
const router=express.Router();
const activity = require("../Controller/activity");

 router.get('/activity-data',activity.activityGet);
 router.get('/activity',activity.AllTables);

 module.exports = router;
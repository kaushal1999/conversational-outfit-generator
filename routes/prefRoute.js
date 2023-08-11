const express = require("express");
const {prefController} = require("../controllers/prefController");

//router object
const router = express.Router();


router.post("/",prefController)

module.exports=router

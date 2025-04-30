const express = require("express");
const {listUsers } = require("../controller/usercontroller");

const router = express.Router();
router.get("/",listUsers)

module.exports = router;

const express = require("express");
const { createMeeting, listMeetings } = require("../controller/Controller");

const router = express.Router();
router.post("/create", createMeeting);
router.get("/", listMeetings);

module.exports = router;

const axios = require("axios");
const Meeting = require("../models/meeting");
const { format } = require("date-fns");

const ZOHO_API_URL = "https://meeting.zoho.com/api/v2/877717138/sessions.json";
const ZOHO_ACCESS_TOKEN = process.env.ZOHO_ACCESS_TOKEN;

// Create a meeting 
exports.createMeeting = async (req, res) => {
  try {
    const { topic, agenda, presenter, date, duration, timezone, participants } = req.body;

    if (!ZOHO_ACCESS_TOKEN) return res.status(401).json({ error: "Missing Zoho Access Token" });
    if (!topic || !presenter || !date) return res.status(400).json({ error: "Missing required fields" });

    // Convert date to Zoho format: "MMM d, yyyy hh:mm a"
    const formattedDate = format(new Date(date), "MMM d, yyyy hh:mm a");

    //  Check if a meeting already exists at the same time
    const existingMeeting = await Meeting.findOne({ date: formattedDate });
    if (existingMeeting) return res.status(400).json({ error: "A meeting is already scheduled at this time." });

    // Create the meeting in Zoho
    const { data } = await axios.post(
      ZOHO_API_URL,
      { session: { topic, agenda, presenter, startTime: formattedDate, duration, timezone, participants } },
      { headers: { Authorization: `Zoho-oauthtoken ${ZOHO_ACCESS_TOKEN}`, "Content-Type": "application/json" } }
    );

    //  Save meeting in MongoDB
    const meeting = await Meeting.create({
      topic, agenda, presenter, date: formattedDate, duration, timezone,
      meetingId: data.session_id, joinUrl: data.join_url, startUrl: data.start_url
    });

    res.status(201).json(meeting);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: "Failed to create meeting", details: err.response?.data || err.message });
  }
};

// List all meetings
exports.listMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching meetings" });
  }
};




import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  // const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    topic: "",
    agenda: "",
    presenter: "",
    date: "",
    duration: "",
    timezone: "Asia/Kathmandu",
    participants: "",
  });

  useEffect(() => {
    axios.get(`${API_URL}/meetings`)
      .then((res) => setMeetings(res.data))
      .catch(() => alert("Error fetching meetings"));
  }, []);

  // useEffect(() => {
  //   axios.get(`${API_URL}/users`)
  //     .then((res) => setUsers(res.data))
  //     .catch(() => alert("Error fetching users"));
  // }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const createMeeting = async (e) => {
    e.preventDefault();

    // if (users.length === 0) {
    //   return alert("Please select at least one user");
    // }

    try {
      const meetingData = {
        ...form,
        presenter: parseInt(form.presenter, 10),
        duration: parseInt(form.duration, 10),
        participants: form.participants.split(",").map(email => ({ email: email.trim() })),
      };

      const { data } = await axios.post(`${API_URL}/meetings/create`, meetingData);
      setMeetings([...meetings, data]);
      alert("Meeting Created");
    } catch {
      alert("Error creating meeting");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Meetings</h2>
      {meetings.length === 0 ? (
        <p>No meetings available</p>
      ) : (
        <ul>
          {meetings.map(({ _id, topic, date }) => (
            <li key={_id}>
              <strong>{topic}</strong> - {new Date(date).toLocaleString()}
            </li>
          ))}
        </ul>
      )}

      <h3>Create Meeting</h3>
      <form onSubmit={createMeeting} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
       

        {[
          { name: "topic", type: "text" },
          { name: "agenda", type: "text" },
          { name: "presenter", type: "number" },
          { name: "date", type: "datetime-local" },
          { name: "duration", type: "number" },
          { name: "timezone", type: "text" },
          { name: "participants", type: "text", placeholder: "Emails" }
        ].map(({ name, type, placeholder }) => (
          <input key={name} name={name} type={type} placeholder={placeholder || name} onChange={handleChange} required style={{ padding: "8px", border: "1px solid" }} />
        ))}

        <button type="submit" style={{ padding: "8px", background: "blue", color: "white", border: "none" }}>
          Create
        </button>
      </form>
    </div>
  );
};

export default Meetings;

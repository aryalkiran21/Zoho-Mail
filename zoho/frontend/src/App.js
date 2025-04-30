import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Meetings from "./components/meetinglist";
import Users from "./components/userlist";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <nav>
          <Link to="/meetings" style={{ marginRight: "10px" }}>Meetings</Link>
          <Link to="/users">Users</Link>
        </nav>

        <Routes>
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/users" element={<Users />} />
          {/* Redirect to /meetings by default */}
          <Route path="*" element={<Meetings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

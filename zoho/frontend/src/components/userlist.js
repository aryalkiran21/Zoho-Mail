import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const Users = () => {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      setUsers(res.data);
    } catch {
      alert("Error fetching users");
    }
  };
  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>User List</h2>
      {users.length === 0 ? <p>No users available</p> : (
        <ul>
          {users.map(({ _id, name, email }) => (
            <li key={_id}>
              <strong>{name}</strong> - {email}
         
           
            </li>
          ))}
        </ul>
      )}


     
    </div>
  );
};

export default Users;

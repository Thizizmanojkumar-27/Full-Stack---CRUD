import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [userList, setUserList] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Load users from backend
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUserList(data))
      .catch((err) => console.error(err));
  }, []);

  const handleCreate = () => {
    if (!name || !email) return alert("Please enter name and email");

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    })
      .then((res) => res.json())
      .then((newUser) => {
        setUserList([...userList, newUser]);
        setName("");
        setEmail("");
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/users/${id}`, { 
      method: "DELETE" 
    })
      .then(() => {
        setUserList(userList.filter((u) => u.id !== id));
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (id) => {
    const newName = prompt("Enter new name:");
    const newEmail = prompt("Enter new email:");
    if (!newName || !newEmail) return;

    fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, email: newEmail }),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setUserList(
          userList.map((u) => (u.id === id ? updatedUser : u))
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="app">
      <h2>User List</h2>
      <div className="create-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleCreate}>Create</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(u.id)}>
                  Edit
                </button>
                <button className="delete" onClick={() => handleDelete(u.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
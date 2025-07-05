import { useState, useEffect } from "react";
import { supabase } from "./supabase.js";
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("Failed to fetch users:", error.message);
      setMessage("Failed to fetch users: " + error.message);
    } else {
      setUsers(data || []);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      // Update existing user
      const { error } = await supabase
        .from("users")
        .update(formData)
        .eq("id", editId);

      if (error) {
        setMessage("Update failed: " + error.message);
      } else {
        setMessage("User updated successfully!");
        setEditId(null);
      }
    } else {
      // Insert new user
      const { error } = await supabase.from("users").insert([formData]);

      if (error) {
        setMessage("Insert failed: " + error.message);
      } else {
        setMessage("User added successfully!");
      }
    }

    setFormData({ name: "", age: "", phone: "" });
    fetchUsers();
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) {
      setMessage("Delete failed: " + error.message);
    } else {
      setMessage("User deleted successfully!");
      fetchUsers();
    }
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      age: user.age,
      phone: user.phone,
    });
    setEditId(user.id);
  };

  const handleCancel = () => {
    setFormData({ name: "", age: "", phone: "" });
    setEditId(null);
    setMessage("");
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h2>{editId ? "Edit User" : "Add New User"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="age"
              placeholder="Enter Age"
              value={formData.age}
              onChange={handleChange}
              required
              min="1"
              max="150"
            />
          </div>

          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="submit-btn">
              {editId ? "Update User" : "Add User"}
            </button>
            {editId && (
              <button type="button" onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
            )}
          </div>
        </form>

        {message && <p className="message">{message}</p>}
      </div>

      <div className="users-container">
        <h3>User List ({users.length})</h3>
        {users.length === 0 ? (
          <p className="no-users">No users found. Add some users to get started!</p>
        ) : (
          <ul className="users-list">
            {users.map((user) => (
              <li key={user.id} className="user-item">
                <div className="user-info">
                  <h4>{user.name}</h4>
                  <p>Age: {user.age} | Phone: {user.phone}</p>
                </div>
                <div className="user-actions">
                  <button 
                    onClick={() => handleEdit(user)} 
                    className="edit-btn"
                    disabled={editId === user.id}
                  >
                    {editId === user.id ? "Editing..." : "Edit"}
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
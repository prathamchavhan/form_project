import { useState, useEffect } from "react";
import { supabase } from "./for.js";
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
      console.error("failed to fetch users:", error.message);
    } else {
      setUsers(data);
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

  return (
    <div >
     <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={formData.age}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="tel"
          name="phone"
          placeholder="Enter Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        /><br /><br />

        <button type="submit">submit</button>
      </form>

      <p>{message}</p>

      <h3 >User List</h3>
      <ul>
        {users.map((user) => (
          <li  >
            <h4>{user.name}</h4> — Age: {user.age}, Phone: {user.phone}
            <br />
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>
              Delete
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

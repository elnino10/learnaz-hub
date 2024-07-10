import { useEffect, useState } from "react";
// import axios from 'axios'

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get("localhost:5000/api/users");
  //       setUsers(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  useEffect(() => {
    const dummyUsers = [
      { id: 1, name: "John Doe", role: "Admin" },
      { id: 2, name: "Jane Smith", role: "User" },
      { id: 3, name: "Michael Johnson", role: "User" },
      { id: 4, name: "Emily Davis", role: "Admin" },
      { id: 5, name: "David Brown", role: "User" },
    ];
    setUsers(dummyUsers);
  }, []);


  return (
    <div>
      <h1>Manage Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} {user.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;

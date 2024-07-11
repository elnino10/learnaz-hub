import { useEffect, useState } from "react";
// import axios from 'axios'
import { FiSearch } from "react-icons/fi";


const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); //keep track of userbased on role
  const [filter, setFilter] = useState("All"); // keep track of the current filter

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
      { id: 1, name: "John Doe", email: "john@deo.com", role: "Admin" },
      { id: 2, name: "Jane Smith", email: "john@deo.com", role: "User" },
      { id: 3, name: "Chidi", email: "jhon@deo.com", role: "Instructor" },
      { id: 4, name: "Lerato", email: "john@deo.com", role: "Admin" },
      { id: 5, name: "Lamber", email: "john@deo.com", role: "Student" },
    ];
    setUsers(dummyUsers);
    setFilteredUsers(dummyUsers);
  }, []);

  const handleFilterClick = (role) => {
    setFilter(role); // Update the filter state to the selected role

    // If the "All" button is clicked, display all users
    if (role === "All") {
      setFilteredUsers(users); // Set filteredUsers to all users
    } else {
      // Otherwise, filter the users based on the selected role
      setFilteredUsers(users.filter((user) => user.role === role)); // Set filteredUsers to the users with the selected role
    }
  };


  return (
    <div className="m-6">
      <h1 className="m-0 w-[403px] relative text-inherit font-bold text-2xl font-inherit inline-block whitespace-nowrap pb-4 max-w-full">
        Manage Users
      </h1>
      <div className="relative">
        <input
          type="text"
          className="bg-white border border-gray-500 rounded-full px-4 py-2 pl-10 focus:outline-none focus:border-blue-500"
          placeholder="Search User"
        />
        <FiSearch className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>
      <div className="pt-6 pb-6 flex gap-6 flex-wrap">
        <button
          className={`text-center rounded-xl h-8 w-28 ${
            filter === "All" ? "bg-blue-900" : "bg-gray-900"
          } text-white hover:bg-blue-900 flex justify-center`}
          onClick={() => handleFilterClick("All")}
        >
          All
        </button>
        <button
          className={`text-center rounded-xl h-8 w-28 ${
            filter === "Student" ? "bg-blue-900" : "bg-gray-900"
          } text-white hover:bg-blue-900 flex justify-center`}
          onClick={() => handleFilterClick("Student")}
        >
          Students
        </button>
        <button
          className={`text-center rounded-xl h-8 w-28 ${
            filter === "Instructor" ? "bg-blue-900" : "bg-gray-900"
          } text-white hover:bg-blue-900 flex justify-center`}
          onClick={() => handleFilterClick("Instructor")}
        >
          Instructors
        </button>
        <button
          className={`text-center rounded-xl h-8 w-28 ${
            filter === "Admin" ? "bg-blue-900" : "bg-gray-900"
          } text-white hover:bg-blue-900 flex justify-center`}
          onClick={() => handleFilterClick("Admin")}
        >
          Admins
        </button>
      </div>
      <ul>
        {filteredUsers.map((user) => (
          <li
            className="pt-6 block p-4 mb-4 bg-white rounded-lg shadow-md"
            key={user.id}
          >
            <div className="flex flex-wrap gap-6 justify-between w-full items-center">
              <p className="font-semibold mr-4">
                Name: <span className="font-normal">{user.name}</span>
              </p>
              <p className="font-semibold mr-4">
                Email: <span className="font-normal">{user.email}</span>
              </p>
              <p className="font-semibold">
                Role: <span className="font-normal">{user.role}</span>
              </p>
              <div className="text-center text-white w-16 bg-blue-900 rounded-md px-2 py-1">
                <button className="font-semibold">Edit</button>
              </div>
              <div className="text-center text-white w-16 bg-red-600 rounded-md px-2 py-1">
                <button className="font-semibold">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
import Card from "../Card";
import { useState, useEffect } from "react";
import { FaBox, FaCog, FaUsers, FaChartBar } from "react-icons/fa";

const Dashboard = () => {

  const [userCount, setUserCount] = useState(0);

  // Dummy users data
  

   useEffect(() => {
    const dummyUsers = [
      { id: 1, name: "John Doe", role: "Admin" },
      { id: 2, name: "Jane Smith", role: "User" },
      { id: 3, name: "Chidi Mark", role: "User" },
      { id: 4, name: "Lerato", role: "Admin" },
      { id: 5, name: "Lamber", role: "User" },
    ];
     // Set user count based on the length of the dummy users array
     setUserCount(dummyUsers.length);
   }, []);

  return (
    <div className="grow p-8">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card icon={<FaUsers />} title="Users" value={userCount} />
        <Card icon={<FaBox />} title="Courses" value="120" />
        <Card icon={<FaChartBar />} title="Analytic" value="30" />
        <Card icon={<FaCog />} title="Settings" value="11" />
      </div>
    </div>
  );
};

export default Dashboard;

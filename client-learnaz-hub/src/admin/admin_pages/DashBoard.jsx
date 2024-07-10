import Card from "../Card";
import { FaBox, FaCog, FaUsers, FaChartBar } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="grow p-8">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card icon={<FaUsers />} title="Users" value="140" />
        <Card icon={<FaBox />} title="Courses" value="120" />
        <Card icon={<FaChartBar />} title="Analytic" value="30" />
        <Card icon={<FaCog />} title="Settings" value="11" />
      </div>
    </div>
  );
};

export default Dashboard;

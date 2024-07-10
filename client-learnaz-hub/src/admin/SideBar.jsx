import {
  FaTachometerAlt,
  FaUsers,
  FaChartBar,
  FaBox,
  FaCog,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-100 text-gray-900 h-screen px-4 fixed w-16 md:w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold hidden md:block mt-4 text-center italic">
        Learnaz-Hub
      </h1>
      <ul className="flex flex-col mt-5 text-xl">
        <Link to="admin/dashboard"
          className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:bg-blue-600 hover:text-white"
        >
          <FaTachometerAlt />
          <span className="hidden md:inline">Dashboard</span>
        </Link>
        <Link to="admin/manage-users"
          className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:text-white hover:bg-blue-600"
        >
          <FaUsers />
          <span className="hidden md:inline ">Manage Users</span>
        </Link>
        <li
          className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:text-white hover:bg-blue-600"
        >
          <FaBox />
          <span className="hidden md:inline ">Manage Courses</span>
        </li>
        <li
          className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:text-white hover:bg-blue-600"
        >
          <FaChartBar />
          <span className="hidden md:inline ">Analytics</span>
        </li>
        <li
          className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:text-white hover:bg-blue-600"
        >
          <FaCog />
          <span className="hidden md:inline ">Settings</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

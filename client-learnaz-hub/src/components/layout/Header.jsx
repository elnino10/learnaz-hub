import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";

function Header() {
  const [drpdwn, setDrpdwn] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await fetch("your-backend-api-endpoint");
  //       const data = await response.json();
  //       setCourseCategories(data);
  //     } catch (error) {
  //       console.error("Error fetching course categories:", error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  useEffect(() => {
    // Simulate fetching data from the backend
    const fetchCategories = () => {
      const dummyData = [
        "Video Animation",
        "Video Editing",
        "Stop Motion",
        "Photography",
        "Graphics Design",
        "Web Development",
        "HTML",
      ];
      setCourseCategories(dummyData);
    };

    fetchCategories();
  }, []);

  const toggleDrpdwn = () => {
    setDrpdwn(!drpdwn);
  };

  return (
    <>
      <header className="h-20 bg-white p-6 shadow-md top-0 z-20 fixed w-full mb-20">
        <nav className="flex justify-between fixed w-full pr-8">
          {/* Logo */}
          <Link to="/">
            <div className="text-xl font-bold">Learnaz-Hub</div>
          </Link>
          {/* course category */}
          <div>
            <button
              onClick={toggleDrpdwn}
              className="pl-6 text-lg text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              Courses
            </button>
            {drpdwn && (
              <div className="absolute bg-white shadow-md w-80% mt-2">
                <ul>
                  {courseCategories.map((category, index) => (
                    <Link
                      to="/"
                      key={index}
                      className="block text-gray-900 p-2 hover:bg-gray-100"
                    >
                      {category}
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Search Box */}
          <div className="relative w-80%">
            <input
              type="text"
              className="bg-blue-100 border border-gray-300 rounded-full px-4 py-2 pl-10 focus:outline-none focus:border-blue-500"
              placeholder="Search courses"
            />
            <FiSearch className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          {/* Navigation Links */}
          <ul className="flex space-x-4">
            <Link className="text-lg text-gray-600 hover:text-gray-900" to="/home">
              Dashboard
            </Link>
            {/* <li>
              <a href="#" className="text-lg text-gray-600 hover:text-gray-900">
                Learn more
              </a>
            </li> */}
            <li>
              <a href="#" className="text-lg text-gray-600 hover:text-gray-900">
                Become a Creator
              </a>
            </li>
            <Link
              to="/login"
              className={`border p-2 text-lg transition ease-in-out delay-150 bg-gray-800 text-white hover:-translate-y-1 hover:scale-110 duration-300`}
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className={`border p-2 text-lg transition ease-in-out delay-150 bg-gray-800 text-white hover:-translate-y-1 hover:scale-110 duration-300`}
            >
              Sign Up
            </Link>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;

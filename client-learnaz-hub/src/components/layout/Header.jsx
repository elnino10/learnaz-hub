/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

import { MenuOpen } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import { courses } from "../../data/courseData";

function Header(props) {
  const [drpdwn, setDrpdwn] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // fetch data from the backend

        const categories = [];
        courses.map((course) => {
          if (!categories.includes(course.category)) {
            categories.push(course.category);
          }
        });
        setCourseCategories(categories);
      } catch (error) {
        error && console.log("Error fetching course categories: ", error);
      }
    };
    fetchCategories();
  }, []);

  const toggleDrpdwn = (e) => {
    e.stopPropagation();
    setDrpdwn(!drpdwn);
    props.setActivePage((prev) => (prev === "category" ? "" : "category"));
  };

  const handleCategoryClick = () => {
    setDrpdwn(false);
  };

  useEffect(() => {
    const clickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDrpdwn(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    // return () => document.removeEventListener("mousedown", clickOutside);
  }, [dropdownRef]);

  const toggleMenuHandler = (e) => {
    e.stopPropagation();
    props.setMenuVisible(!props.menuVisible);
  };

  // log out handler
  const logOutHandler = () => {
    localStorage.removeItem("token");
    props.setAuthUser(null);
    navigate("/");
  };

  return (
    <>
      <header className="h-20 bg-white shadow-md top-0 z-20 fixed w-full flex justify-between items-center px-10">
        {/* Logo */}
        <div className="flex items-center justify-between">
          <Link to="/" onClick={() => props.setActivePage("home")}>
            <div className="text-xl font-bold">Learnaz-Hub</div>
          </Link>
          {/* course category */}
          <div className="relative ml-20">
            <input
              type="text"
              className="md:w-80 bg-blue-100 border border-gray-300 rounded-full px-4 py-2 pl-10 focus:outline-none focus:border-blue-500"
              placeholder="Search courses"
            />
            <FiSearch className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div className="md:w-[50%]">
          <div onClick={toggleMenuHandler} className="md:hidden text-gray-900">
            {props.menuVisible ? <MenuOpen /> : <MenuIcon />}
          </div>
          {/* <nav> */}
          <nav className={`${!props.menuVisible && "hidden"} md:flex`}>
            <ul
              className="rounded-l-sm text-sm bg-gray-200 px-2 py-3 cursor-pointer absolute
            translate-y-[1.7rem] translate-x-[-5rem] w-36 h-[13rem] flex flex-col
            justify-between items-start md:relative md:px-0 md:py-0 md:translate-x-0
            md:translate-y-0 md:flex-row md:items-center md:bg-inherit
            md:text-base md:w-full md:h-full"
            >
              <li className="text-gray-600 hover:text-gray-900">
                <div className="flex">
                  <div ref={dropdownRef} className="">
                    <div
                      onClick={toggleDrpdwn}
                      className={`${
                        props.activePage === "category" ? "text-gray-900" : ""
                      } text-gray-600 hover:text-gray-900 focus:outline-none`}
                    >
                      Category
                    </div>
                    {drpdwn && (
                      <div className="absolute bg-white shadow-md md:absolute md:w-80% md:mt-6">
                        <ul>
                          {courseCategories.map((category, index) => (
                            <li
                              onClick={handleCategoryClick}
                              key={index}
                              className="block text-gray-900 p-2 hover:bg-gray-100"
                            >
                              <Link to={`/category/${category}`}>
                                {category}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div>
                    {drpdwn ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                  </div>
                </div>
              </li>
              <li
                className="text-gray-900 hover:text-gray-900"
                onClick={() => props.setActivePage("dashboard")}
              >
                <Link
                  to="/home"
                  className={`${
                    props.activePage === "dashboard" ? "text-gray-900" : ""
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li
                className={`${
                  props.activePage === "creator"
                } text-gray-600 hover:text-gray-900`}
                onClick={() => props.setActivePage("creator")}
              >
                {!props.authUser || props.authUser.role !== "instructor" && (
                  <Link to="/course-creator">Become a Creator</Link>
                )}
              </li>
              <li
                className="border rounded-md text-sm p-2 transition
              ease-in-out delay-150 bg-gray-800 text-white hover:-translate-y-1
              hover:scale-110 duration-300"
              >
                {props.authUser ? (
                  <Link to="/" onClick={logOutHandler}>
                    Log out
                  </Link>
                ) : (
                  <Link to="/login">Log in</Link>
                )}
              </li>
              <li className="border rounded-md text-sm p-2 transition ease-in-out delay-150 bg-gray-800 text-white hover:-translate-y-1 hover:scale-110 duration-300">
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;

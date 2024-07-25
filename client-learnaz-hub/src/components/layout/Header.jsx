/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";
import Logo from "../../assets/images/logomain.png";
import { MenuOpen } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import axios from "axios";
// import { icon } from "@fortawesome/fontawesome-svg-core";

function Header(props) {
  const [courses, setCourses] = useState([]);
  const [drpdwn, setDrpdwn] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const [searchedCourses, setSearchedCourses] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiUrl = `${baseUrl}/courses`;

  // Get all courses data from the backend
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await axios.get(apiUrl);
        setCourses(res.data.data);
      } catch (error) {
        error && console.log("Error fetching course categories: ", error);
      }
    };
    fetchCourseData();
  }, []);

  // get categories of courses in database
  useEffect(() => {
    const categories = [];
    courses.forEach((course) => {
      if (!categories.includes(course.category)) {
        categories.push(course.category);
      }
    });
    setCourseCategories(categories);
  }, [courses]);

  useEffect(() => {
    const clickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDrpdwn(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    // return () => document.removeEventListener("mousedown", clickOutside);
  }, [dropdownRef]);

  // search handler
  useEffect(() => {
    const search = courses.filter((course) =>
      course.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchedCourses(search);
  }, [searchValue, courses]);

  const toggleDrpdwn = (e) => {
    e.stopPropagation();
    setDrpdwn(!drpdwn);
    props.setActivePage((prev) => (prev === "category" ? "" : "category"));
  };

  const handleCategoryClick = () => {
    setDrpdwn(false);
    props.setMenuVisible(false);
  };

  const toggleMenuHandler = (e) => {
    e.stopPropagation();
    props.setMenuVisible(!props.menuVisible);
  };

  const logOutHandler = () => {
    localStorage.removeItem("token");
    props.setAuthUser(null);
    props.setUserData({});
    navigate("/");
  };

  return (
    <>
      <header
        className="px-2 py-3 bg-white shadow-md top-0 z-20 fixed w-full h-[8rem]
      flex justify-between items-center sm:px-4 sm:w-[52rem] md:w-full md:h-[5rem]"
      >
        {/* Logo */}
        <Link to="/" onClick={() => props.setActivePage("home")}>
          <img
            src={Logo}
            alt="Learnaz-Hub Logo"
            className="block h-10 ml-2 rounded-full sm:h-8 md:hidden"
          />
          <div className="hidden text-xl font-bold md:block md:">
            LearnazHub
          </div>
        </Link>
        <div className="relative text-lg flex flex-col">
          <input
            type="text"
            className=" bg-blue-100 border border-gray-300 rounded-full pl-10 pr-6 py-2 focus:outline-none focus:border-blue-500 sm:py-2 sm:w-72 md:py-1 md:w-80"
            placeholder="Search courses"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <FiSearch className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
          {searchValue && (
            <div className="absolute text-lg translate-y-12 min-w-[17rem] rounded-b-sm pb-2 px-2 bg-gray-100 max-w-[10rem] shadow-md sm:min-w-[20rem] sm:translate-y-12 md:min-w-[20rem] md:translate-y-10">
              {searchedCourses.map((course, index) => (
                <div
                  onClick={() => {
                    // props.authUser
                    props.auth &&
                    course?.studentsEnrolled?.includes(props.userData._id)
                      ? navigate(`/course/course-content/${course._id}`)
                      : navigate(`/courses/preview/${course._id}`);
                    setSearchValue("");
                  }}
                  key={index}
                  className="border-t-2 min-h-[3rem] py-2 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {course.title}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="md:w-[50%]">
          <div
            onClick={toggleMenuHandler}
            className="md:hidden text-gray-900 mr-3"
          >
            {props.menuVisible ? (
              <MenuOpen sx={{ height: "2.5rem", width: "3rem" }} />
            ) : (
              <MenuIcon sx={{ height: "2.5rem", width: "3rem" }} />
            )}
          </div>
          {/* <nav> */}
          <nav className={`${!props.menuVisible && "hidden"} md:flex`}>
            <ul
              className="absolute rounded-l-sm text-xl bg-gray-200 px-3 py-2
            translate-y-[2.5rem] translate-x-[-10.5rem] w-[15rem] h-auto flex flex-col
            justify-between items-start sm:translate-x-[-10rem] sm:translate-y-[2.5rem]
            md: md: md:translate-x-[-2rem] md:translate-y-[-3rem] md:flex-row md:items-center
            md:justify-between md:bg-inherit md:text-base md:w-[50%] md:h-full"
            >
              <li className="mt-5 text-gray-600 hover:text-gray-900">
                <div className="flex cursor-pointer" onClick={toggleDrpdwn}>
                  <div ref={dropdownRef} className="">
                    <div
                      className={`${
                        props.activePage === "category" ? "text-gray-900" : ""
                      } text-gray-600 hover:text-gray-900 focus:outline-none md:ml-8`}
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
                              className="block capitalize text-gray-900 p-2 hover:bg-gray-100"
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
              {props.authUser && (
                <li
                  className="mt-5 text-gray-600 hover:text-gray-900"
                  onClick={() => {
                    props.setActivePage("dashboard");
                    props.setMenuVisible(false);
                  }}
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
              )}
              {(!props.authUser || props.authUser.role !== "instructor") && (
                <li
                  className={`${
                    props.activePage === "creator"
                  } mt-5 text-gray-600 hover:text-gray-900`}
                  onClick={() => {
                    props.setActivePage("creator");
                    props.setMenuVisible(false);
                  }}
                >
                  <Link to="/course-creator">Become a Creator</Link>
                </li>
              )}
              {props.authUser && props.authUser.role === "instructor" && (
                <li
                  className="mt-5 text-gray-600 hover:text-gray-900"
                  onClick={() => props.setMenuVisible(false)}
                >
                  <Link to="/home/created-courses">Created Courses</Link>
                </li>
              )}

              {props.authUser && (
                <li
                  className="mt-5 text-gray-900 hover:text-gray-900"
                  onClick={() => {
                    props.setActivePage("profile");
                    props.setMenuVisible(false);
                  }}
                >
                  <Link
                    to="/user/profile"
                    className={`${
                      props.activePage === "profile" ? "text-gray-900" : ""
                    } flex items-center md:hidden`}
                  >
                    Profile
                  </Link>
                  <Link
                    to={`/user/profile`}
                    className={`${
                      props.activePage === "profile" ? "text-gray-900" : ""
                    } hidden md:flex`}
                  >
                    <AccountCircleIcon fontSize="large" />
                  </Link>
                </li>
              )}
              <li
                className="mt-5 border rounded-md p-2 transition
              ease-in-out delay-150 bg-gray-800 text-white hover:-translate-y-1
              hover:scale-110 duration-300 md:text-sm"
                onClick={() => props.setMenuVisible(false)}
              >
                {props.authUser ? (
                  <Link to="/" onClick={logOutHandler}>
                    Log out
                  </Link>
                ) : (
                  <Link to="/login">Log in</Link>
                )}
              </li>

              {!props.authUser && (
                <li
                  className="mt-5 mb-2 border rounded-md p-2 transition ease-in-out delay-150
                bg-gray-800 text-white hover:-translate-y-1 hover:scale-110 duration-300
                md:text-sm md:mb-0"
                  onClick={() => props.setMenuVisible(false)}
                >
                  <Link to="/signup">Sign Up</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;

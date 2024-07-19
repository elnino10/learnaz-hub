/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import Logo from "../../assets/images/LH2.png";

import { MenuOpen } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { courses } from "../../data/courseData";
// import { icon } from "@fortawesome/fontawesome-svg-core";

function Header(props) {
  const [drpdwn, setDrpdwn] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  const [searchedCourses, setSearchedCourses] = useState([]);
  const [searchValue, setSearchValue] = useState("");
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
  // search handler
  useEffect(() => {
    const search = courses.filter((course) =>
      course.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchedCourses(search);
  }, [searchValue]);

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
            <img
              src={Logo}
              alt="Learnaz-Hub Logo"
              className="block md:hidden h-16 rounded-full"
            />
            <div className="hidden md:block text-xl font-bold">Learnaz Hub</div>
          </Link>
          {/* course category */}
          <div className="relative ml-20 flex flex-col">
            <input
              type="text"
              className="md:w-80 bg-blue-100 border border-gray-300 rounded-full px-4 py-2 pl-10 focus:outline-none focus:border-blue-500"
              placeholder="Search courses"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <FiSearch className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            {searchValue && (
              <div className="absolute translate-y-12 min-w-[15rem] rounded-b-sm pb-2 px-2 bg-white max-w-[10rem] md:min-w-[20rem]">
                {searchedCourses.map((course, index) => (
                  <div
                    onClick={() => {
                      navigate(`/course/course-content/${course.id}`);
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
                <div className="flex" onClick={toggleDrpdwn}>
                  <div ref={dropdownRef} className="">
                    <div
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
              {props.authUser && (
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
              )}
              {(!props.authUser || props.authUser.role !== "instructor") && (
                <li
                  className={`${
                    props.activePage === "creator"
                  } text-gray-600 hover:text-gray-900`}
                  onClick={() => props.setActivePage("creator")}
                >
                  <Link to="/course-creator">Become a Creator</Link>
                </li>
              )}
              {props.authUser && props.authUser.role === "instructor" && (
                <li>
                  <Link to="/home/created-courses">Created Courses</Link>
                </li>
              )}

              {props.authUser && (
                <li
                  className="text-gray-900 hover:text-gray-900"
                  onClick={() => props.setActivePage("profile")}
                >
                  <Link
                    to="/profile"
                    className={`${
                      props.activePage === "profile" ? "text-gray-900" : ""
                    } flex items-center md:hidden`}
                  >
                    Profile
                  </Link>
                  <Link
                    to={`/profile/`}
                    className={`${
                      props.activePage === "profile" ? "text-gray-900" : ""
                    } hidden md:flex`}
                  >
                    <AccountCircleIcon fontSize="large" />
                  </Link>
                </li>
              )}
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

              {!props.authUser && (
                <li className="border rounded-md text-sm p-2 transition ease-in-out delay-150 bg-gray-800 text-white hover:-translate-y-1 hover:scale-110 duration-300">
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

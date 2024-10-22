/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/loginSlice";
function Navbar(props) {
     const [courses, setCourses] = useState([]);
     const [drpdwn, setDrpdwn] = useState(false);
     const [courseCategories, setCourseCategories] = useState([]);
     const dropdownRef = useRef(null);
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const user = useSelector((state) => state.login.user);
    //  console.log("user:::::", user);

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
     }, [apiUrl, props]);

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
         if (
           dropdownRef.current &&
           !dropdownRef.current.contains(event.target)
         ) {
           setDrpdwn(false);
         }
       };
       document.addEventListener("mousedown", clickOutside);
       return () => document.removeEventListener("mousedown", clickOutside);
     }, [dropdownRef]);

     const toggleDrpdwn = (e) => {
       e.stopPropagation();
       setDrpdwn(!drpdwn);
       props.setActivePage("category");
     };

     const handleCategoryClick = () => {
       setDrpdwn(false);
       props.setMenuVisible(false);
     };

     const logOutHandler = () => {
       dispatch(logout());
       localStorage.removeItem("token");
       navigate("/");
     };
  return (
    <nav className={`${!props.menuVisible && "hidden"} md:flex max-w-7xl`}>
      <ul
        className="absolute rounded-l-sm text-3xl bg-gray-200 px-5 py-3
            translate-y-[3rem] translate-x-[-13rem] w-[18rem] h-auto flex flex-col
            justify-between items-start sm:translate-x-[-14rem] sm:translate-y-[3rem]
            md: md: md:translate-x-[-2rem] md:translate-y-[-3rem] md:flex-row md:items-center
            md:justify-between md:bg-inherit md:text-base md:w-[50%] md:h-full"
      >
        <li className="mt-5 text-gray-600 hover:text-gray-900">
          <div
            className="flex items-center cursor-pointer"
            onClick={toggleDrpdwn}
          >
            <div ref={dropdownRef} className="">
              <div
                className={`${
                  props.activePage === "category"
                    ? "text-gray-900"
                    : "text-gray-600"
                } hover:text-gray-900 focus:outline-none md:ml-8`}
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
                        <Link to={`/category/${category}`}>{category}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div>{drpdwn ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}</div>
          </div>
        </li>
        {user && (
          <li
            className={`${
              props.activePage === "dashboard"
                ? "text-gray-900"
                : "text-gray-600"
            } mt-7  hover:text-gray-900 md:mt-5`}
            onClick={() => {
              props.setActivePage("dashboard");
              props.setMenuVisible(false);
            }}
          >
            <Link to="/home">Dashboard</Link>
          </li>
        )}
        {(!user || user.role !== "instructor") && (
          <li
            className={`${
              props.activePage === "creator" ? "text-gray-900" : "text-gray-600"
            } mt-7 hover:text-gray-900 md:mt-5`}
            onClick={() => {
              props.setActivePage("creator");
              props.setMenuVisible(false);
            }}
          >
            <Link to="/course-creator">Become a Creator</Link>
          </li>
        )}
        {user && user.role === "instructor" && (
          <li
            className={`${
              props.activePage === "created-courses"
                ? "text-gray-900"
                : "text-gray-600"
            } mt-7 hover:text-gray-900 md:mt-5`}
            onClick={() => {
              props.setMenuVisible(false);
              props.setActivePage("created-courses");
            }}
          >
            <Link to="/home/created-courses">Created Courses</Link>
          </li>
        )}

        {user && (
          <li
            className={`${
              props.activePage === "profile" ? "text-gray-900" : "text-gray-600"
            } mt-7 items-center hover:text-gray-900 md:mt-5`}
            onClick={() => {
              props.setActivePage("profile");
              props.setMenuVisible(false);
            }}
          >
            <Link
              to={`/user/profile`}
              className={
                props.activePage === "profile"
                  ? "text-gray-900"
                  : "text-gray-600"
              }
            >
              <span className="md:hidden">Profile</span>
              <span className="hidden md:flex">
                <AccountCircleIcon fontSize="large" />
              </span>
            </Link>
          </li>
        )}
        {user ? (
          <Link
            to="/"
            className="mt-7 border rounded-md p-2 transition
              ease-in-out delay-150 bg-gray-800 text-white hover:-translate-y-1
              hover:scale-110 duration-300 md:mt-5 md:text-sm"
            onClick={logOutHandler}
          >
            Log out
          </Link>
        ) : (
          <Link
            to="/login"
            className="mt-7 border rounded-md p-2 transition
              ease-in-out delay-150 bg-gray-800 text-white hover:-translate-y-1
              hover:scale-110 duration-300 md:mt-5 md:text-sm"
          >
            Log in
          </Link>
        )}
        {!user && (
          <Link
            to="/signup"
            className="mt-7 mb-2 border rounded-md p-2 transition ease-in-out delay-150
                    bg-gray-800 text-white hover:-translate-y-1 hover:scale-110 duration-300
                    md:text-sm md:mt-5 md:mb-0"
            onClick={() => {
              props.setMenuVisible(false);
              props.setActivePage("log");
            }}
          >
            Sign Up
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default Navbar
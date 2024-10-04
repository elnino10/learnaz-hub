/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";
import Logo from "../../assets/images/logomain.png";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpen from "@mui/icons-material/MenuOpen";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import axios from "axios";
import MobileSearch from "../MobileSearch";
import DesktopSearch from "../DesktopSearch";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/loginSlice";
import Sidemenu from "./Sidemenu"; // Import the side menu component
import Navbar from "./Navbar";
function Header(props) {
  const [courses, setCourses] = useState([]);
  const [drpdwn, setDrpdwn] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const [searchedCourses, setSearchedCourses] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // State to control side menu

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  // console.log("user---", user);
  

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

  // Handle clicking outside of the dropdown
  useEffect(() => {
    const clickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDrpdwn(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
  }, [dropdownRef]);

  // Search handler
  useEffect(() => {
    const search = courses.filter((course) =>
      course.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchedCourses(search);
  }, [searchValue, courses]);

  const toggleMenuHandler = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen); // Toggle side menu
  };

  // const logOutHandler = () => {
  //   dispatch(logout());
  //   localStorage.removeItem("token");
  //   navigate("/");
  // };

  const mobileSearchHandler = (e) => {
    e.stopPropagation();
    props.setShowMobileSearch(!props.showMobileSearch);
  };

  return (
    <header className="px-2 py-3 bg-white shadow-md top-0 z-20 fixed w-full h-[8rem] flex justify-between items-center sm:px-4 sm:w-[52rem] md:w-full md:h-[5rem]">
      {/* Logo */}
      <Link to="/" onClick={() => props.setActivePage("home")}>
        <img
          src={Logo}
          alt="Learnaz-Hub Logo"
          className="block h-12 ml-2 rounded-full md:hidden"
        />
        <div className="hidden text-xl font-bold md:block">LearnazHub</div>
      </Link>

      {/* Desktop Search */}
      <DesktopSearch
        auth={props.auth}
        userData={user}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchedCourses={searchedCourses}
      />

      {/* Mobile Search */}
      <div className="absolute flex md:hidden">
        <FiSearch
          className="w-9 h-9 mt-1 text-gray-700 translate-x-[42rem]"
          onClick={mobileSearchHandler}
        />
      </div>
      <MobileSearch
        auth={props.auth}
        userData={user}
        showMobileSearch={props.showMobileSearch}
        setShowMobileSearch={props.setShowMobileSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchedCourses={searchedCourses}
      />

      {/* Menu Icon (visible only on mobile) */}
      <div className="md:w-[50%]">
        <div
          onClick={toggleMenuHandler}
          className="md:hidden text-gray-900 mr-3"
        >
          {menuOpen ? (
            <MenuOpen sx={{ height: "2.5rem", width: "3rem" }} />
          ) : (
            <MenuIcon sx={{ height: "2.5rem", width: "3rem" }} />
          )}
        </div>
          <Navbar/>

        {/* Side Menu */}
        <Sidemenu
          menuOpen={menuOpen}
          user={user}
          toggleMenuHandler={toggleMenuHandler}
        />
      </div>
    </header>
  );
}

export default Header;

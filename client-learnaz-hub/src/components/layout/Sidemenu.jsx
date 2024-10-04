import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/loginSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react/prop-types
function Sidemenu({ menuOpen, toggleMenuHandler, user }) {
  const [courses, setCourses] = useState([]);
  const [drpdwn, setDrpdwn] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiUrl = `${baseUrl}/courses`;

  // const user = useSelector((state) => state.login.user);
  console.log("user----", user);

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
  }, [apiUrl]);

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

  const toggleDrpdwn = (e) => {
    e.stopPropagation();
    setDrpdwn(!drpdwn);
  };

  const handleCategoryClick = () => {
    setDrpdwn(false);
    toggleMenuHandler();
  };

  const logOutHandler = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    toggleMenuHandler();
    navigate("/");
  };

  return (
    <Drawer anchor="left" open={menuOpen} onClose={toggleMenuHandler}>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/" onClick={toggleMenuHandler}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          {/* Category Dropdown */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={toggleDrpdwn}
              aria-expanded={drpdwn}
              aria-controls="category-menu"
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Category" />
              {drpdwn ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </ListItemButton>
          </ListItem>
          {drpdwn && (
            <div
              ref={dropdownRef}
              style={{ marginTop: "20px", marginLeft: "40px" }}
              className="absolute top-0 right-0 w-[200px] bg-white shadow-md z-50"
            >
              <ul>
                {courseCategories.map((category, index) => (
                  <li
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                    className="block capitalize text-gray-900 p-2 hover:bg-gray-100"
                  >
                    <Link
                      to={`/category/${category}`}
                      onClick={toggleMenuHandler}
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {user && (
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/home"
                onClick={toggleMenuHandler}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dasboard" />
              </ListItemButton>
            </ListItem>
          )}
          {(!user || user.role !== "instructor") && (
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/course-creator"
                onClick={toggleMenuHandler}
              >
                <ListItemIcon>
                  <CastForEducationIcon />
                </ListItemIcon>
                <ListItemText primary="Become a Creator" />
              </ListItemButton>
            </ListItem>
          )}
          {user && user.role === "instructor" && (
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/home/created-courses"
                onClick={toggleMenuHandler}
              >
                <ListItemIcon>
                  <LocalLibraryIcon />
                </ListItemIcon>
                <ListItemText primary="Created Courses" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
        <Divider />
        <List>
          {user && (
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/user/profile"
                onClick={toggleMenuHandler}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          )}
          {!user && (
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/signup"
                onClick={toggleMenuHandler}
              >
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </ListItem>
          )}
          {!user ? (
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/login"
                onClick={toggleMenuHandler}
              >
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem disablePadding>
              <ListItemButton onClick={logOutHandler}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidemenu;

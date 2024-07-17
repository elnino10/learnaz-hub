/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import student from "../assets/images/student5ani.gif";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  enrolledCourses,
  // allUsers,
  suggestedCourses,
  createdCourses,
} from "../data/courseData";

import axios from "axios";

const UserDashboard = (props) => {
  const [enrolledCourse, setEnrolledCourse] = useState([]);
  const [suggestedCourse, setSuggestedCourse] = useState([]);
  const [createdCourse, setCreatedCourse] = useState([]);

  const location = useLocation();

  // get user id from login
  const id = location.state.id;

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiUrl = id && `${baseUrl}/users/${id}`;

  // fetch courses user enrolled for from database
  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        // fetch courses from database
        setEnrolledCourse(enrolledCourses);
      } catch (error) {
        console.log("Error fetching courses: ", error);
      }
    };
    fetchAllCourses();
  }, []);

  // fetch suggested courses from database
  useEffect(() => {
    const fetchSuggestedCourses = async () => {
      try {
        // fetch courses from database
        setSuggestedCourse(suggestedCourses);
      } catch (error) {
        console.log("Error fetching courses: ", error);
      }
    };
    fetchSuggestedCourses();
  }, []);

  // fetch user data from database
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // fetch user from database
        const res = await axios.get(apiUrl);
        console.log(res.data);
        const foundUser = res.data.data;
        props.setUserData(foundUser);

        // fetch courses created by user if they are an instructor
        if (foundUser.role === "instructor") {
          setCreatedCourse(createdCourses);
        }
      } catch (error) {
        console.log("Error fetching user: ", error);
      }
    };
    fetchUser();
  }, []);

  const settings = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="m-0 p-0 pt-16 min-h-screen scroll">
      <div
        key={props.userData && props.userData.id}
        className="flex items-center justify-between p-16 pl-4"
      >
        <div className="text-4xl text-gray-700 font-bold pl-12">
          Welcome back, {props.userData && props.userData.firstName}
        </div>
        {props.userData && props.userData.role === "instructor" && (
          <Link
            to="/create-course"
            className="text-blue-950 p-3 rounded-md shadow-md text-lg border hover:shadow-sm hover:text-blue-900"
            aria-label="Create a course"
          >
            Create a Course
          </Link>
        )}
      </div>
      <div className="text-gray-700 bg-gray-100 w-[100%] mx-auto py-5 px-10 flex items-center justify-center flex-col md:flex-row">
        <div>
          <img
            src={student}
            className="h-[20rem] object-cover"
            alt="Animated student studying online"
          />
        </div>
        {props.userData && props.userData.role === "instructor" ? (
          <div className="w-50 my-10 text-center">
            <h2 className="text-4xl font-bold">
              Impact the World Through Teaching
            </h2>
            <p className="text-xl pl-6">
              By becoming an instructor, you have the power to shape the future
              and make a real difference in people&rsquo;s lives.
            </p>
          </div>
        ) : (
          <div className="w-50 my-10 text-center">
            <h2 className="text-4xl font-bold">Learning that Gets You</h2>
            <p className="text-xl">
              Acquire skills for your present and future. Keep Learning.
            </p>
          </div>
        )}
      </div>
      {props.userData && props.userData.role === "instructor" ? (
        createdCourse.length > 0 ? (
          <>
            <div className="flex items-center justify-between px-16 mt-5 mb-3 md:px-32">
              <h3 className="pl-4 text-2xl text-gray-700 font-bold">
                Created Courses
              </h3>
              <div>
                <Link
                  to="/home/created-courses"
                  className="text-blue-950 hover:underline hover:text-blue-900"
                  aria-label="View all created courses"
                >
                  View All Created Courses
                </Link>
              </div>
            </div>
            <div className="md:w-[70%] md:mx-auto">
              <Slider {...settings}>
                {createdCourse.map((course) => (
                  <div key={course.id} className="max-w-48">
                    <div className="flex flex-col bg-gray-100 border h-40 w-100 overflow-hidden">
                      <Link to={`/course/course-content/${course.id}`}>
                        <div>
                          <img
                            src={course.imageurl}
                            alt={course.title}
                            className="object-fill w-full h-20"
                          />
                        </div>
                        <div className="text-sm px-2 pt-3">
                          <h3 className="font-semibold">{course.title}</h3>
                          <p className="text-xs">{course.duration}</p>
                        </div>
                      </Link>
                      
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </>
        ) : (
          <div className="p-6 text-center text-4xl text-gray-500 pt-10 italic">
            You haven&apos;t created any courses yet.
          </div>
        )
      ) : enrolledCourse.length > 0 ? (
        <>
          <div className="flex items-center justify-between px-16 mt-5 mb-3 md:px-32">
            <h3 className="pl-4 text-2xl text-gray-700 font-bold">
              Continue Learning
            </h3>
            <div>
              <Link
                to="/home/my-courses/learning"
                className="text-blue-950 hover:underline hover:text-blue-900"
                aria-label="View all enrolled courses"
              >
                View All Courses
              </Link>
            </div>
          </div>
          <div className="md:w-[70%] md:mx-auto">
            <Slider {...settings}>
              {enrolledCourse.map((course) => (
                <div key={course.id} className="max-w-48">
                  <div className="flex flex-col bg-gray-100 border h-40 w-100 overflow-hidden">
                    <Link to={`/course/course-content/${course.id}`}>
                      <div>
                        <img
                          src={course.imageurl}
                          alt={course.title}
                          className="object-fill w-full h-20"
                        />
                      </div>
                      <div className="text-sm px-2 pt-3">
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-xs">{course.duration}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </>
      ) : (
        <div className="p-6 text-center text-4xl text-gray-500 pt-10 italic">
          You haven&apos;t enrolled in any courses yet. Start your learning
          journey today!
        </div>
      )}
      {props.userData && props.userData.role !== "instructor" && (
        <div className="mt-10 mx-20">
          <div className="border mb-5"></div>
          <div className="mb-3 text-2xl text-gray-700 font-bold">
            <h2>Suggested Courses</h2>
          </div>
          <div className="md:w-[70%] md:mx-auto">
            <Slider {...settings}>
              {suggestedCourse.map((course) => (
                <div key={course.id} className="max-w-52 max-h-52">
                  <div className="flex flex-col bg-white border h-40 w-100 overflow-hidden">
                    <Link to={`/course/course-content/${course.id}`}>
                      <div>
                        <img
                          src={course.imageurl}
                          alt={course.title}
                          className="object-fill w-full h-20"
                        />
                      </div>
                      <div className="text-sm px-2 pt-3">
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-xs">{course.duration}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;

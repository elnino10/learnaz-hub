import { Link } from "react-router-dom";
import student from "../assets/images/student5ani.gif";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { enrolledCourses, allUsers, suggestedCourses } from "../data/courseData";
import { useEffect, useState } from "react";

const UserDashboard = () => {
  const [enrolledCourse, setEnrolledCourse] = useState([]);
  const [users, setUsers] = useState([]);
  const [suggestedCourse, setSuggestedCourse] = useState([]);

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // fetch courses from database
        setUsers(allUsers);
      } catch (error) {
        console.log("Error fetching courses: ", error);
      }
    };
    fetchUser();
  }, []);

  const getInitials = (firstName, lastName) => {
    return `${firstName[0]}${lastName[0]}`;
  };

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
      {users.map((user) => (
        <div key={user.id} className="flex items-center p-16 pl-4">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-900 text-white text-2xl">
              {getInitials(user.firstName, user.lastName)}
            </div>
          )}
          <div className="text-4xl text-gray-700 font-bold pl-12">
            Welcome back, {user.firstName}
          </div>
        </div>
      ))}
      <div className="text-gray-700 bg-gray-100 flex w-full justify-between p-16 pl-4">
        <div className="text center pl-28 pt-20 w-50 text-center">
          <h2 className="text-4xl font-bold">Learning that gets you</h2>
          <p className="mt-2 text-2xl">
            Skills for your present and your future.
            <p>Keep Learning</p>.
          </p>
        </div>
        <div className="mb-8 w-50">
          <img src={student} className="w-full h-64 object-cover" />
        </div>
      </div>
      {enrolledCourse.length > 0 ? (
        <>
          <div className=" pt-10 flex justify-between">
            <div className="pl-4 text-4xl text-gray-700 font-bold ">
              Continue Learning
            </div>
            <div>
              <Link
                to="/home/my-courses/learning"
                className="text-blue-950 pr-4 text-lg hover:underline hover:text-blue-900"
              >
                View All Courses
              </Link>
            </div>
          </div>
          <div className="m-auto">
            <Slider {...settings}>
              {enrolledCourses.map((course) => (
                <div key={course.id} className="p-4">
                  <div className="flex justify-between bg-white p-8 pr-8 border-2 h-40 w-100 overflow-hidden">
                    <div>
                      <img
                        src={course.imageurl}
                        alt="course-img"
                        className="w-32 object-cover mr-2 border-r-2 border-gray-300"
                      />
                    </div>
                    <div className="">
                      <h3 className="text-xl font-semibold">{course.title}</h3>
                      <p className="text-lg">{course.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </>
      ) : (
        <div className="p-6 text-center text-4xl text-gray-500 pt-10 italic">
          You haven&apos;t enrolled in any course yet. Start your learning
          journey today!
        </div>
      )}
      <div className="pt-10">
        <div className="pl-4 text-4xl text-gray-700 font-bold pb-4">
          Suggested Courses
        </div>
        <Slider {...settings}>
          {suggestedCourse.map((course) => (
            <div key={course.id} className="p-4 w-80">
              <div className="flex bg-white p-8 pr-8 border h-40 w-100 overflow-hidden">
                <img src="" alt="" className="w-32" />
                <div className="">
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="text-lg">{course.duration}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default UserDashboard;

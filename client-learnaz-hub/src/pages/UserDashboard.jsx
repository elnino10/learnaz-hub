/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

import student from "../assets/images/student5ani.gif";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { ViewCreatedCourses, ViewEnrolledCourses } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../slices/userSlice";

const UserDashboard = () => {
  const [suggestedCourses, setSuggestedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [createdCourses, setCreatedCourses] = useState([]);

  const courses = [];
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  // const userData = useSelector((state) => state.user.userData);
  // const token = useSelector((state) => state.login.token);

  const { id, role, firstName } = user || {}; // Destructure user info 
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // get user data from database
  useEffect(() => {
    if (id) {
      dispatch(fetchUserData(id));
    }
  }, [id, dispatch]);

  // get all courses as suggested courses from database (for now)
  useEffect(() => {
    const fetchSuggestedCourses = async () => {
      try {
        // fetch courses from database
        const res = await axiosInstance.get("/courses");
        const courses = res.data.data;
        const myCourseSuggestion = [];
        courses.forEach((course) => {
          if (!course.studentsEnrolled?.includes(id)) {
            myCourseSuggestion.push(course);
          }
        });
        setSuggestedCourses(myCourseSuggestion);
      } catch (error) {
        console.log("Error fetching courses: ", error);
      }
    };
    fetchSuggestedCourses();
  }, []);

  // get created courses by instructor
  useEffect(() => {
    const fetchCreatedCourses = async () => {
      try {
        if (role === "instructor") {
          const createdResponse = await axiosInstance.get(
            `/courses/${role}/${id}/created`
          );
          createdResponse && setCreatedCourses(createdResponse.data.data);
        }
      } catch (error) {
        console.log("Error fetching created courses: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCreatedCourses();
  }, [role, id]);

  // get enrolled courses by user (instructor or student)
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const enrolledResponse = await axiosInstance.get(
          `/courses/student/${id}/enrolled`
        );
        enrolledResponse && setEnrolledCourses(enrolledResponse.data.data);
      } catch (error) {
        console.log("Error fetching created courses: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEnrolledCourses();
  }, [role, id]);

  const settings = {
    speed: 500,
    slidesToShow: 4,
    infinite: courses.length >= 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
       <div key={id} className="flex items-center justify-between p-16 pl-4">
         <div className="text-4xl text-gray-700 font-bold pl-12">
           Welcome back, {firstName}
         </div>
         {role === "instructor" && (
           <Link
             to="/create-course"
             state={{ userId: id }}
             className="text-white bg-gray-900 p-3 rounded-md shadow-md text-lg border hover:shadow-sm hover:text-gray-300"
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
         {role === "instructor" ? (
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
             <h2 className="text-4xl font-bold">Unlock Your Potential</h2>
             <p className="text-xl max-w-3xl mx-auto">
               Gain the skills to shape your future and achieve your dreams.
               Embrace the journey of lifelong learning and unlock new
               opportunities every step of the way. Whether {`you're`} starting
               a new career, enhancing your current path, or simply exploring
               your passions, {`we're`} here to support you. Keep pushing
               forward, keep learning, and let your knowledge shine.
             </p>
           </div>
         )}
       </div>
       {isLoading ? (
         <div className="flex justify-center items-center h-64">
           <RotatingLines
             height="80"
             width="80"
             strokeWidth="5"
             animationDuration="0.75"
             strokeColor="#848884"
             ariaLabel="rotating-lines-loading"
             visible={true}
           />
         </div>
       ) : role === "instructor" ? (
         createdCourses.length > 0 ? (
           <ViewCreatedCourses
             createdCourses={createdCourses}
             settings={settings}
           />
         ) : (
           <div className="p-6 text-center text-4xl text-gray-500 pt-10 italic">
             You haven&apos;t created any courses yet.
           </div>
         )
       ) : enrolledCourses.length > 0 ? (
         <ViewEnrolledCourses
           enrolledCourses={enrolledCourses}
           settings={settings}
           id={id}
           userData={user}
         />
       ) : (
         <div className="p-6 text-center text-4xl text-gray-500 pt-10 italic">
           You haven&apos;t enrolled in any courses yet. Start your learning
           journey today!
         </div>
       )}
       {role === "instructor" && enrolledCourses.length > 0 && (
         <ViewEnrolledCourses
           enrolledCourses={enrolledCourses}
           settings={settings}
           id={id}
         />
       )}
       <section className="mt-1 mx-2 lg:mt-0 mx-0">
         <div className="flex items-center justify-between px-16 mt-5 mb-3 md:px-32">
           <div className="mb-3 text-2xl text-gray-700 font-bold">
             <h2>Suggested Courses</h2>
           </div>
         </div>
         <div className="md:w-[95%] md:mx-auto md:p-2">
           <Slider {...settings}>
             {suggestedCourses.map((course) => (
               <div key={course._id} className="p-2">
                 <div className="flex flex-col bg-white w-full">
                   <Link
                     to={
                       !user.coursesEnrolled?.includes(course._id) &&
                       `/courses/preview/${course._id}`
                     }
                   >
                     <Card className="h-full border">
                       <Card.Img
                         variant="top"
                         src={course.thumbnailURL}
                         className="object-fill w-full h-32"
                       />
                       <Card.Body className="text-sm flex-grow m-4">
                         <Card.Text className="font-semibold text-lg truncate text-gray-800">
                           {course.title}
                           <p className="mb-4 text-sm">
                             Created by{" "}
                             <a href="#" className="hover:underline">
                               {course?.author}
                             </a>
                           </p>
                           <div className="">
                             <span className="text-yellow-500 mr-2">★★★★★</span>
                             <a href="#">(25 ratings)</a>
                           </div>
                           <span className="ml-2 text-muted-foreground">
                             {course?.studentsEnrolled?.length || 0}{" "}
                             {course?.studentsEnrolled?.length === 1
                               ? "student"
                               : "students"}
                           </span>
                         </Card.Text>
                       </Card.Body>
                     </Card>
                   </Link>
                 </div>
               </div>
             ))}
           </Slider>
         </div>
       </section>
     </div>
   );
};

export default UserDashboard;

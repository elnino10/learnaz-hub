/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";

function CategoryCourses(props) {
  const [courses, setCourses] = useState([]);
  // const [filteredCourses, setFilteredCourses] = useState([]);
  const { category } = useParams();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiUrl = `${baseUrl}/courses/category/${category}`;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Filter courses based on the selected category
        const res = await axios.get(apiUrl);
        setCourses(res.data.data);

        // const categoryCourses = courses.filter(
        //   (course) => course.category === category
        // );
        // setFilteredCourses(categoryCourses);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };
    fetchCourses();
  }, [apiUrl]);

  return (
    <div className="mt-20">
      <div className="bg-gray-800 text-white flex justify-center items-center h-40">
        <h1 className="font-serif font-bold text-4xl">{category} Courses</h1>
      </div>
      <div className="w-[70%] flex flex-col items-start mx-auto my-5 p-7 border shadow-sm">
        <h3 className="font-bold mb-1.5">{category} related courses</h3>
        <p className="text-sm font-thin">
          Find all the courses related to {category} here
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-5 px-28">
        {courses?.length > 0 ? (
          courses?.map((course, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg bg-gray-200 shadow-md"
            >
              <Link
                to={
                  props.userData.coursesEnrolled.includes(course.id)
                    ? `/course/course-content/${course._id}`
                    : `/courses/preview/${course._id}`
                }
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-700 mb-2 font-serif">
                  Author: {course.author}
                </p>
                <p className="text-gray-700 mb-2 font-serif">
                  Number Enrolled: {course.numberEnrolled}
                </p>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No courses available for this category.
          </p>
        )}
      </div>
    </div>
  );
}

export default CategoryCourses;

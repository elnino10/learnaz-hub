import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { courses } from "../data/courseData";

function CategoryCourses() {
  const { category } = useParams();
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Filter courses based on the selected category
        const categoryCourses = courses.filter(
          (course) => course.category === category
        );
        setFilteredCourses(categoryCourses);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };
    fetchCourses();
  }, [category]);

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
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {course.title}
              </h3>
              <p className="text-gray-700 mb-2">Author: {course.author}</p>
              <p className="text-gray-700 mb-2">
                Number Enrolled: {course.numberEnrolled}
              </p>
              {/* <p className="text-gray-700 font-bold">{course.price}</p> */}
              <div className="flex justify-end w-80%">
                <button className="bg-gray-900 rounded text-white">
                  Enroll
                </button>
              </div>
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

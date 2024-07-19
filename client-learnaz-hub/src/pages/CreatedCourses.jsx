import { useEffect, useState } from "react";
import axios from "axios";

function CreatedCourses() {
  const [myCourses, setMyCourses] = useState([]);

  // Retrieve the instructor ID from local storage
  const instructorId = localStorage.getItem('instructorId');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const api = axios.create({
          baseURL: import.meta.env.VITE_API_BASE_URL,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const res = await api.get(`/courses/instructor/${instructorId}`);
        setMyCourses(res.data.data);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };

    // Fetch courses initially
    if (instructorId) {
      fetchCourses();
    }

    // Set up polling to fetch courses every 30 seconds
    const intervalId = setInterval(() => {
      if (instructorId) {
        fetchCourses();
      }
    }, 30000); // 30 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [instructorId]);

  return (
    <div className="mt-20">
      <div className="bg-gray-800 text-white flex justify-center items-center h-40">
        <h1 className="font-serif font-bold text-4xl">My Created Courses</h1>
      </div>
      <div className="w-[70%] flex flex-col items-start mx-auto my-5 p-7 border shadow-sm">
        <h3 className="font-bold text-gray-900 text-xl mb-1.5">
          𝌩 Motivate yourself each day
        </h3>
        <p className="text-sm text-gray-500 font-bold">
          Every great journey begins with a single step. As an instructor, you
          have the power to inspire and transform lives. Embrace the challenge,
          share your knowledge, and continue to grow both as a teacher and a
          learner. Remember, your passion and dedication can make a significant
          impact on your students&apos; futures.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-5 px-28">
        {myCourses &&
          myCourses.map((course, index) => (
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
              <div className="flex justify-end pt-6">
                <button className="bg-gray-700 text-white px-4 py-1 rounded-lg hover:bg-gray-900">
                  Edit Course
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CreatedCourses;

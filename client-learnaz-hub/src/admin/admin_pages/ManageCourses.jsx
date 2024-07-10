import { useEffect, useState } from "react";
// import axios from "axios"

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const response = await axios.get("localhost:5000/api/courses");
  //       setCourses(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching courses:", error);
  //     }
  //   };

  //   fetchCourses();
  // }, []);

  useEffect(() => {
    const coursesData = [
      {
        category: "Video Animation",
        courses: [
          {
            id: 1,
            title: "Introduction to Video Animation",
            image: "http://example.com/video-animation.jpg",
            author: "John Doe",
            numberEnrolled: 30,
            price: "$50",
          },
          {
            id: 2,
            title: "Advanced Video Animation",
            image: "http://example.com/advanced-video-animation.jpg",
            author: "Jane Doe",
            numberEnrolled: 40,
            price: "$70",
          },
        ],
      },
      {
        category: "Video Editing",
        courses: [
          {
            id: 3,
            title: "Introduction to Video Editing",
            image: "http://example.com/video-editing.jpg",
            author: "Jane Smith",
            numberEnrolled: 25,
            price: "$45",
          },
        ],
      },
      {
        category: "Stop Motion",
        courses: [
          {
            id: 4,
            title: "Introduction to Stop Motion",
            image: "http://example.com/stop-motion.jpg",
            author: "Alice Brown",
            numberEnrolled: 20,
            price: "$55",
          },
        ],
      },
      {
        category: "Photography",
        courses: [
          {
            id: 5,
            title: "Introduction to Photography",
            image: "http://example.com/photography.jpg",
            author: "John Doe",
            numberEnrolled: 30,
            price: "$50",
          },
        ],
      },
    ];

    setCourses(coursesData);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Manage Courses</h1>
      {courses.map((categoryData) => (
        <div key={categoryData.category} className="mb-6">
          <h2 className="text-xl mb-2">{categoryData.category}</h2>
          <ul className="grid grid-cols-2 gap-4">
            {categoryData.courses.map((course) => (
              <li key={course.id} className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-700">Price: {course.price}</p>
                <p className="text-gray-700">
                  Enrolled: {course.numberEnrolled}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ManageCourses;
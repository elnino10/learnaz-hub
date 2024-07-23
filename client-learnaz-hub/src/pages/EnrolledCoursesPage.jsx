/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function EnrolledCoursesPage(props) {
  return (
    <div className="mt-20">
      <div className="bg-gray-800 text-white flex justify-center items-center h-40">
        <h1 className="font-serif font-bold text-4xl">My learning</h1>
      </div>
      <div className="w-[70%] flex flex-col items-start mx-auto my-5 p-7 border shadow-sm">
        <h3 className="font-bold text-gray-900 text-xl mb-1.55">
          𝌩 Motivate yourself each day
        </h3>
        <p className="text-sm text-gray-500 font-bold">
          Embark on your learning journey with enthusiasm and curiosity. Every
          course you take is a step towards a brighter future, equipped with the
          skills and knowledge to achieve your dreams. Stay committed, embrace
          the challenges, and remember that the effort you invest today will
          shape the success you experience tomorrow. Keep learning and growing!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-5 px-28">
        {props.userData?.coursesEnrolled ? (
          props.userData?.coursesEnrolled?.map((course, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <Link to={`/course/course-content/${course._id}`}>
                <img
                  src={course.thumbnailURL}
                  alt={course.title}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-700 mb-2">Author: {course.author}</p>
                <p className="text-gray-700 mb-2">
                  Students Enrolled: {course.studentsEnrolled?.length}
                </p>
                <p className="text-gray-700 font-bold">
                  {course.price === 0 ? "Free course" : `$${course.price}`}
                </p>
              </Link>
            </div>
          ))
        ) : (
          <h1 className="text-2xl font-bold text-center">
            You have not enrolled in any course yet
          </h1>
        )}
      </div>
    </div>
  );
}

export default EnrolledCoursesPage;

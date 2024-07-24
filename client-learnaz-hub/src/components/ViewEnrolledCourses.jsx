import { Link } from "react-router-dom";
import Slider from "react-slick";

/* eslint-disable react/prop-types */
function ViewEnrolledCourses(props) {

    const { enrolledCourses, settings, id, } = props;

  return (
    <>
      <div className="flex items-center justify-between px-16 mt-5 mb-3 md:px-32">
        <div className="mb-3 text-2xl text-gray-700 font-bold">
          <h2>Enrolled Courses</h2>
        </div>
        <div>
          <Link
            to="/home/my-courses/learning"
            className="text-blue-950 hover:underline hover:text-blue-900"
            aria-label="View all enrolled courses"
          >
            View All Enrolled Courses
          </Link>
        </div>
      </div>
      <div className="md:w-[70%] md:mx-auto">
        <Slider {...settings}>
          {enrolledCourses.map((course) => (
            <div key={course._id} className="max-w-52 max-h-52">
              <div className="flex flex-col bg-white border h-40 w-100 overflow-hidden">
                <Link
                  to={
                    props.userData?.coursesEnrolled?.map((course) =>
                      course.studentsEnrolled.includes(id)
                    )
                      ? `/course/course-content/${course._id}`
                      : `/courses/preview/${course._id}`
                  }
                >
                  <div>
                    <img
                      src={course.thumbnailURL}
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
  );
}

export default ViewEnrolledCourses
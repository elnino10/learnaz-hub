import { Link } from "react-router-dom";
import Slider from "react-slick";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
function ViewEnrolledCourses(props) {
  const userData = useSelector((state) => state.user.userData);
 console.log(userData)
  const { settings } = props;

  return (
    <>
      <section className="mt-1 mx-2 lg:mt-0 mx-0">
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
        <div className="md:w-[95%] md:mx-auto md:p-2">
          <Slider {...settings}>
            {userData?.coursesEnrolled.map((course) => (
              <div key={course._id} className="p-2">
                <div className="flex flex-col bg-white w-full">
                  <Link
                    to={
                      course.studentsEnrolled.includes(userData._id)
                        ? `/course/course-content/${course._id}`
                        : `/courses/preview/${course._id}`
                    }
                  >
                    <Card className="h-full">
                      <Card.Img
                        variant="top"
                        src={course.thumbnailURL}
                        className="object-fill w-full h-32"
                      />
                      <Card.Body className="text-sm mt-3 mb-3 flex-grow">
                        <Card.Text className="font-semibold text-lg truncate text-gray-800">
                          {course.title}

                          {course.duration}
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
    </>
  );
}

export default ViewEnrolledCourses
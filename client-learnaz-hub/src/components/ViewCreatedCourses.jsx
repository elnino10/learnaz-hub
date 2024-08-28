/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Slider from "react-slick";

function ViewCreatedCourses(props) {
  const { createdCourses, settings } = props;

  return (
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
      <div className="md:w-[95%] md:mx-auto md:p-2">
        <Slider {...settings}>
          {createdCourses?.map((course) => (
            <div key={course._id} className="p-2">
              <div className="flex flex-col bg-white w-full">
                <Link
                  to={
                    `/course/course-content/${course._id}`
                    // userData?.coursesCreated?.map((course) =>
                    //   course.studentsEnrolled.includes(id)
                    // )
                    //   ? `/course/course-content/${course._id}`
                    //   : `/courses/preview/${course._id}`
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
    </>
  );
}

export default ViewCreatedCourses;

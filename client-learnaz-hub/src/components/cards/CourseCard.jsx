/* eslint-disable react/prop-types */
function CourseCard(props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {props.courses &&
        props.courses
          // eslint-disable-next-line react/prop-types
          .filter((course) => course.category === props.selectedCategory)
          .map((course, index) => (
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
              <p className="text-gray-700 font-bold">{course.price}</p>
            </div>
          ))}
    </div>
  );
}

export default CourseCard;

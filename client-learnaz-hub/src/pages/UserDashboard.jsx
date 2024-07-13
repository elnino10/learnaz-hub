import { Link } from "react-router-dom";
import student from "../assets/student5ani.gif";
import image from "../assets/teacher.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const users = [
  {
    id: 1,
    firstName: "Amara",
    lastName: "Okeke",
    email: "hey.mail.com",
    role: "user",
    imageUrl: image,
  },
];

const enrolledCourses = [
  {
    id: 1,
    title: "Introduction to Python Programming",
    videoUrl: "https://www.youtube.com/watch?v=NQP89ish9t8&t=1870s",
    duration: "2 hours",
  },
  {
    id: 1,
    title: "Introduction to Python Programming",
    videoUrl: "https://www.youtube.com/watch?v=NQP89ish9t8&t=1870s",
    duration: "2 hours",
  },
  {
    id: 1,
    title: "Introduction to Python Programming",
    videoUrl: "https://www.youtube.com/watch?v=NQP89ish9t8&t=1870s",
    duration: "2 hours",
  },
  {
    id: 1,
    title: "Introduction to Python Programming",
    videoUrl: "https://www.youtube.com/watch?v=NQP89ish9t8&t=1870s",
    duration: "2 hours",
  },
  {
    id: 1,
    title: "Introduction to Python Programming",
    videoUrl: "https://www.youtube.com/watch?v=NQP89ish9t8&t=1870s",
    duration: "2 hours",
  },
];

const suggestedCourses = [
  {
    id: 3,
    title: "Introduction to React",
    videoUrl: "https://www.youtube.com/watch?v=NQP89ish9t8&t=1870s",
    duration: "2.5 hours",
  },
  {
    id: 4,
    title: "CSS for Beginners",
    videoUrl: "https://www.youtube.com/watch?v=NQP89ish9t8&t=1870s",
    duration: "1.5 hours",
  },
  {
    id: 4,
    title: "CSS for Beginners",
    videoUrl: "https://www.youtube.com/watch?v=NQP89ish9t8&t=1870s",
    duration: "1.5 hours",
  },
]


function UserDashboard() {
  // const [users, setUsers] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get("localhost/users");
  //       setUsers(response.data);
  //
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  const getInitials = (firstName, lastName) => {
    return `${firstName[0]}${lastName[0]}`;
  };

  return (
    <div className="m-0 p-0 pt-16 min-h-screen scroll">
      {users.map((user) => (
        <div key={user.id} className="flex items-center p-16 pl-4">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-900 text-white text-2xl">
              {getInitials(user.firstName, user.lastName)}
            </div>
          )}
          <div className="text-4xl text-gray-700 font-bold pl-12">
            Welcome back, {user.firstName}
          </div>
        </div>
      ))}
      <div className="text-gray-700 bg-gray-100 flex w-full justify-between p-16 pl-4">
        <div className="text center pl-28 pt-20 w-50 text-center">
          <h2 className="text-4xl font-bold">Learning that gets you</h2>
          <p className="mt-2 text-2xl text-lg">
            Skills for your present and your future.
            <p>Keep Learning</p>.
          </p>
        </div>
        <div className="mb-8 w-50">
          <img src={student} className="w-full h-64 object-cover rounded-md" />
        </div>
      </div>
      {enrolledCourses.length > 0 && (
        <>
          <div className="pt-10 flex justify-between">
            <div className="text-4xl text-gray-700 font-bold ">
              Continue Learning
            </div>
            <div>
              <Link
                to="/user-courses"
                className="text-blue-950 pr-4 text-lg hover:underline hover:text-blue-900"
              >
                View All Courses
              </Link>
            </div>
          </div>
          <div className="pt-10">
            <Carousel
              showArrows={true}
              showThumbs={false}
              infiniteLoop={true}
              autoPlay={false}
              emulateTouch={true}
              centerMode={true}
              centerSlidePercentage={25}
            >
              {enrolledCourses.map((course) => (
                <div key={course.id} className="p-4">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">{course.title}</h3>
                    <p className="text-lg">{course.duration}</p>
                    <a
                      href={course.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Watch Now
                    </a>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </>
      )}
      {enrolledCourses.length === 0 && (
        <div className="text-center text-xl text-gray-500 pt-10">
          No courses enrolled.
        </div>
      )}
      <div className="pt-10">
        <div className="text-4xl text-gray-700 font-bold pb-4">
          Suggested Courses
        </div>
        <Carousel
          showArrows={true}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={false}
          emulateTouch={true}
          centerMode={true}
          centerSlidePercentage={25}
        >
          {suggestedCourses.map((course) => (
            <div key={course.id} className="p-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">{course.title}</h3>
                <p className="text-lg">{course.duration}</p>
                <a
                  href={course.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Watch Now
                </a>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default UserDashboard;

/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Student from "../assets/images/student.png";
import Learn from "../assets/images/studentStu.png";
import Teacher from "../assets/images/teacher2.png";
import { CourseCard } from "../components";
import ReviewCard from "../components/cards/ReviewCard";
import axios from "axios";

function LandingPage(props) {
  const [allCourses, setAllCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiUrl = `${baseUrl}/courses`;

  // fetch all courses from database
  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await axios.get(apiUrl);
        setAllCourses(res.data.data);
      } catch (error) {
        console.log("Error fetching courses: ", error);
      }
    };
    fetchAllCourses();
  }, [apiUrl]);

  // create an array of all the categories in dataset
  useEffect(() => {
    let courseCategories = [];
    setSelectedCategory(allCourses[0]?.category);
    setActiveCategory(allCourses[0]?.category);
    allCourses &&
      allCourses.forEach((course) => {
        if (!courseCategories.includes(course.category)) {
          courseCategories.push(course.category);
        }
      });
    setCategories(courseCategories);
  }, [allCourses]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // capitalize the first letter of a string
  function capitalizeFirstLetter(string) {
    if (!string) return ""; // Handle empty or null string
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      {/* Main Content */}
      <main className="pt-2">
        {/* Text Content */}
        <section className="relative w-full bg-gray-50 pt-24 pb-32 px-2 sm:px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col  items-center justify-between gap-8 lg:flex-row">
              <div className="hidden md:block lg:w-1/2 relative">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-gray-800 rounded-full z-0" />
                <div className="absolute -bottom-10 -right-4 w-24 h-24 bg-gray-800 rounded-full z-0" />
                <div className=" relative z-10 bg-gray-800 rounded-full overflow-hidden w-[80vw] h-[80vw] max-w-[500px] max-h-[500px]">
                  <img
                    src={Student}
                    alt="Student giving thumbs up"
                    width={500}
                    height={500}
                    className="object-cover"
                  />
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border-2 border-orange-300 rounded-full z-20" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] border-2 border-orange-300 rounded-full z-20" />
              </div>

              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h1 className="text-4xl sm:text-4xl font-bold text-gray-800 mb-4 md:text-5xl lg:text-7xl">
                  Master New Skills Anytime, Anywhere
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-6">
                  Join thousands of learners around the world in advancing your
                  career and personal growth. Our diverse range of courses
                  offers something for everyone.
                </p>
                {!props.authUser && (
                  <Link
                    to="/signup"
                    className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                    aria-label="Sign up for free"
                  >
                    Get Started for Free
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
        {/* Courses Section */}
        <section className="px-2 w-full py-8 bg-white">
          <div>
            <h2 className="pb-4 text-2xl md:text-3xl text-gray-900 font-bold">
              Explore Our Wide Range of Courses
            </h2>
            <p className="pt-4 text-xl md:text-2xl text-gray-900">
              Gain new skills and knowledge in as little as six months. Choose
              from over 100 courses taught by industry experts.
            </p>
            <div className="text-gray-700 py-8 text-lg md:text-xl flex flex-wrap gap-4 pt-6">
              {categories.map((category, index) => (
                <div key={index} className="text-2xl font-serif">
                  <button
                    onClick={() => {
                      handleCategoryClick(category);
                      setActiveCategory(category);
                    }}
                    className={`${
                      activeCategory === category && "underline"
                    } hover:underline hover:text-gray-900`}
                    aria-label={`Select ${category} category`}
                  >
                    {capitalizeFirstLetter(category)}
                  </button>
                </div>
              ))}
            </div>

            {selectedCategory && (
              <div className="pt-6">
                <h3 className="text-2xl md:text-3xl text-gray-900 font-bold mb-4">
                  {capitalizeFirstLetter(selectedCategory)} Courses
                </h3>
                <CourseCard
                  selectedCategory={selectedCategory}
                  courses={allCourses}
                />
              </div>
            )}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="w-full py-12">
          <h2 className="text-gray-900 text-2xl px-10 mb-5 md:text-3xl font-bold">
            Hear From Our Learners
          </h2>
          <ReviewCard />
        </section>

        <section className="pt-12 px-4 sm:px-6 lg:px-8">
          <div className="container flex flex-col md:flex-row lg:flex-row items-center">
            <img
              src={Teacher}
              alt="Woman teaching online"
              className="w-full md:w-1/2 md:mr-12"
            />
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-600 md:mt-0">
                {!props.authUser ||
                (props.authUser && props.authUser.role !== "instructor")
                  ? "Become a Course Creator"
                  : "Create Your Course"}
              </h2>
              <p className="text-xl md:text-xl text-gray-700 mb-8 lg:text-2xl">
                Share your expertise with learners from around the world. Join
                our community of skilled instructors today.
              </p>
              {!props.authUser ||
              (props.authUser && props.authUser.role !== "instructor") ? (
                <Link
                  to="/instructor-signup"
                  className="bg-gray-900 hover:bg-gray-800 hover:text-gray-300 text-white font-bold py-2 px-4 rounded"
                  aria-label="Become a course creator"
                >
                  Join Now
                </Link>
              ) : (
                <Link
                  to="/create-course"
                  className="bg-gray-900 hover:bg-gray-800 hover:text-gray-300 text-white font-bold py-2 px-4 rounded"
                  aria-label="Become a course creator"
                >
                  Start Creating
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default LandingPage;

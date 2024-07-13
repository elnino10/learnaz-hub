// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import Learn from "../assets/images/study.png";
import Teacher from "../assets/images/teacher.png";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

// data for courses
import { courses, reviews } from "../data/courseData";
import { CourseCard } from "../components";

function LandingPage() {
  const [allCourses, setAllCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  // fetch all courses from database
  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        // fetch courses from database
        setAllCourses(courses);
      } catch (error) {
        console.log("Error fetching courses: ", error);
      }
    };
    fetchAllCourses();
  }, []);

  // create an array of all the categories in dataset
  useEffect(() => {
    let courseCategories = [];
    setSelectedCategory(courses[0].category);
    setActiveCategory(courses[0].category);
    courses &&
      courses.map((course) => {
        if (!courseCategories.includes(course.category)) {
          courseCategories.push(course.category);
        }
      });
    setCategories(courseCategories);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="m-0 p-0 min-h-screen scroll">
      {/* Main Content */}
      <main className="w-full">
        {/* Text Content */}
        <section className="pt-32 w-full flex">
          {/* <div className="pt-10 flex w-full items-center"> */}
          <img src={Learn} className="w-1/2 p-4 mr-12" alt="Learning Online" />
          <div className="w-1/2">
            <h1 className="text-4xl font-bold text-gray-600 mb-4 mt-20">
              One Skill At time
            </h1>
            <p className="text-2xl text-gray-700 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Link
              to="/signup"
              className="bg-gray-900 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
            >
              Join for Free
            </Link>
          </div>
          {/* </div> */}
        </section>
        {/* Courses Section */}
        <section className="p-8 w-full bg-white">
          <p className="pb-4 text-4xl text-gray-900 font-bold">
            A Broad Range of Courses You Can Take
          </p>
          <p className="text-2xl text-gray-900">
            Learn a new skill in as little as 6 months. Select from over 100
            different courses, taught by industry experts.
          </p>
          <div className="text-gray-700 text-xl flex flex-wrap gap-4 pt-6 ">
            {categories.map((category, index) => (
              <div key={index}>
                <button
                  onClick={() => {
                    handleCategoryClick(category);
                    setActiveCategory(category);
                  }}
                  className={`${
                    activeCategory === category && "underline"
                  } hover:underline hover:text-gray-900`}
                >
                  {category}
                </button>
              </div>
            ))}
          </div>

          {selectedCategory && (
            <div className="pt-6">
              <h2 className="text-3xl text-gray-900 font-bold mb-4">
                {selectedCategory} Courses
              </h2>
              <CourseCard
                selectedCategory={selectedCategory}
                courses={allCourses}
              />
            </div>
          )}
        </section>
        {/* review */}
        <section className="p-8 w-full bg-white">
          <p className="mb-6 text-gray-900 text-4xl font-bold">
            What Our Learners are saying
          </p>
          <div className="max-w-4xl mx-auto border">
            <Carousel
              className="p-6 m-6"
              showThumbs={false}
              infiniteLoop
              useKeyboardArrows
              autoPlay
              showStatus={false}
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} size="2x" />
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faChevronRight} size="2x" />
                  </button>
                )
              }
            >
              {reviews.map((review, index) => (
                <div key={index} className="p-4">
                  <blockquote className="text-xl italic text-gray-700">
                    {review.review}
                  </blockquote>
                  <p className="mt-4 text-lg font-bold text-gray-900">
                    - {review.username}
                  </p>
                </div>
              ))}
            </Carousel>
          </div>
        </section>
        <section className="flex justify-center items-center p-8 w-full">
          <div className="container flex flex-col md:flex-row items-center">
            <img
              src={Teacher}
              alt="A woman"
              className="w-1/2 mr-0 mb-8 md:mb-0 md:mr-12"
            />
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-600 mb-4 mt-12 md:mt-0">
                Become A Course Creator
              </h1>
              <p className="text-2xl text-gray-700 mb-6">
                Course creators from around the world can share their expertise.
              </p>
              <Link
                to="/signp"
                className="bg-gray-900 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
              >
                Start Creating
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;

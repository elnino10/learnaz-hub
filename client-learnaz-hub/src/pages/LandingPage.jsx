import { useState, useEffect } from "react";
import Learn from "../assets/images/study.png";
import Teacher from "../assets/images/teacher2.png";
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
        <section className="pt-32 text-gray-700 bg-gray-100 w-[100%] mx-auto py-5 px-10 flex items-center justify-between flex-col md:flex-row">
          <img
            src={Learn}
            className="w-full md:w-1/2 p-4 mb-8 md:mb-0 md:mr-12"
            alt="Person learning online"
          />
          <div className="w-full md:w-1/2 text-center md:text-left ">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4 mt-20 md:mt-0">
              Master New Skills Anytime, Anywhere
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-6">
              Join thousands of learners around the world in advancing your
              career and personal growth. Our diverse range of courses offers
              something for everyone.
            </p>
            <Link
              to="/signup"
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
              aria-label="Sign up for free"
            >
              Get Started for Free
            </Link>
          </div>
        </section>
        {/* Courses Section */}
        <section className="p-8 w-full bg-white">
          <h2 className="pb-4 text-3xl md:text-4xl text-gray-900 font-bold">
            Explore Our Wide Range of Courses
          </h2>
          <p className="text-xl md:text-2xl text-gray-900">
            Gain new skills and knowledge in as little as six months. Choose
            from over 100 courses taught by industry experts.
          </p>
          <div className="text-gray-700 text-lg md:text-xl flex flex-wrap gap-4 pt-6">
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
                  aria-label={`Select ${category} category`}
                >
                  {category}
                </button>
              </div>
            ))}
          </div>

          {selectedCategory && (
            <div className="pt-6">
              <h3 className="text-2xl md:text-3xl text-gray-900 font-bold mb-4">
                {selectedCategory} Courses
              </h3>
                <CourseCard
                  selectedCategory={selectedCategory}
                  courses={allCourses}
                />
            </div>
          )}
        </section>
        {/* Reviews Section */}
        <section className="p-8 w-full bg-white">
          <h2 className="mb-6 text-gray-900 text-3xl md:text-4xl font-bold">
            Hear From Our Learners
          </h2>
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
                    aria-label="Previous review"
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
                    aria-label="Next review"
                  >
                    <FontAwesomeIcon icon={faChevronRight} size="2x" />
                  </button>
                )
              }
            >
              {reviews.map((review, index) => (
                <div key={index} className="p-4">
                  <blockquote className="text-lg md:text-xl italic text-gray-700">
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
              alt="Woman teaching online"
              className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-12"
            />
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4 mt-12 md:mt-0">
                Become a Course Creator
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 mb-6">
                Share your expertise with learners from around the world. Join
                our community of skilled instructors today.
              </p>
              <Link
                to="/course-creator"
                className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                aria-label="Become a course creator"
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
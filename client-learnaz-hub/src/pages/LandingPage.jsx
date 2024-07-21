/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Learn from "../assets/images/study.png";
import Teacher from "../assets/images/teacher2.png";
import { CourseCard } from "../components";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

// data for courses
import { reviews } from "../data/courseData";
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
  }, []);

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
          <div className="w-full pb-5 md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4 md:mt-0">
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
          <h2 className="pb-4 text-2xl md:text-3xl text-gray-900 font-bold">
            Explore Our Wide Range of Courses
          </h2>
          <p className="text-xl md:text-2xl text-gray-900">
            Gain new skills and knowledge in as little as six months. Choose
            from over 100 courses taught by industry experts.
          </p>
          <div className="text-gray-700 text-lg md:text-xl flex flex-wrap gap-4 pt-6">
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
        </section>
        {/* Reviews Section */}
        <section className="w-full bg-white">
          <h2 className="text-gray-900 text-2xl px-10 mb-5 md:text-3xl font-bold">
            Hear From Our Learners
          </h2>
          <div className="max-w-xl mx-auto border rounded-md shadow-md">
            <Carousel
              className="m-6"
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
                <div key={index} className="px-4">
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
        <section className="flex justify-center items-center w-full">
          <div className="container flex flex-col md:flex-row items-center">
            <img
              src={Teacher}
              alt="Woman teaching online"
              className="w-full md:w-1/2 md:mb-0 md:mr-12"
            />
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-600 md:mt-0">
                {!props.authUser ||
                (props.authUser && props.authUser.role !== "instructor")
                  ? "Become a Course Creator"
                  : "Create Your Course"}
              </h2>
              <p className="text-lg md:text-lg text-gray-700 mb-8">
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
    </div>
  );
}

export default LandingPage;

// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import Learn from "../assets/study.png";
import Teacher from "../assets/teacher.png";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
const courses = {
  "Video Animation": [
    {
      title: "Introduction to Video Animation",
      image: "http://example.com/video-animation.jpg",
      author: "John Doe",
      numberEnrolled: 30,
      price: "$50",
    },
    {
      title: "Introduction to Video Animation",
      image: "http://example.com/video-animation.jpg",
      author: "John Doe",
      numberEnrolled: 30,
      price: "$50",
    },
  ],
  "Video Editing": [
    {
      title: "Introduction to Video Editing",
      image: "http://example.com/video-editing.jpg",
      author: "Jane Smith",
      numberEnrolled: 25,
      price: "$45",
    },
  ],
  "Stop Motion": [
    {
      title: "Introduction to Stop Motion",
      image: "http://example.com/stop-motion.jpg",
      author: "Alice Brown",
      numberEnrolled: 20,
      price: "$55",
    },
  ],
  Photography: [
    {
      title: "Introduction to Photography",
      image: "http://example.com/photography.jpg",
      author: "John Doe",
      numberEnrolled: 30,
      price: "$50",
    },
  ],
};

const reviews = [
  {
    username: "Jane Doe",
    review: "Learnerz Hub shaped my career greatly",
  },
  {
    username: "John Smith",
    review: "Fantastic platform with excellent courses",
  },
  {
    username: "Alice Johnson",
    review: "I learned so much in such a short time!",
  },
];

function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState("Video Animation");

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
          <div className="text-gray-700 text-xl flex flex-wrap gap-4 pt-6">
            {Object.keys(courses).map((category) => (
              <div key={category}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className="hover:underline"
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses[selectedCategory].map((course, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover mb-4"
                    />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Author: {course.author}
                    </p>
                    <p className="text-gray-700 mb-2">
                      Number Enrolled: {course.numberEnrolled}
                    </p>
                    <p className="text-gray-700 font-bold">{course.price}</p>
                  </div>
                ))}
              </div>
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

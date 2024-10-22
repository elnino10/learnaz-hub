import { useEffect, useState } from "react";
import { reviews } from "../../data/courseData";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
function ReviewCard() {
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const previousReview = () => {
    setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentReview((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };
  return (
    <div>
      <div className="max-w-3xl mx-4  text-center m-2 lg:mx-auto ">
        <ul>
          {reviews.map((item, idx) =>
            currentReview === idx ? (
              <li key={idx}>
                <figure className="relative pt-16 bg-white shadow-lg  duration-300 rounded-lg p-8 min-h-[300px] h-auto">
                  {/* Star Rating */}
                  <button
                    onClick={previousReview}
                    role="button"
                    aria-label="Previous Testimonial"
                    className="hidden -ml-6 mt-2 absolute top-1/2 w-16 h-16 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-900 md:block lg:block"
                  >
                    <ChevronLeftIcon className=" hover:text-white" />
                  </button>
                  <div className="mb-4">
                    {[...Array(5)].map((_, starIdx) => (
                      <svg
                        key={starIdx}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-6 h-6 ${
                          starIdx < item.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        } fill-current inline`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2l2.5 6.5H18l-5 3.5 2 7-5-4-5 4 2-7-5-3.5h5.5L10 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>

                  <blockquote>
                    <p className="font-roboto text-lg text-black">
                      “{item.review}“
                    </p>
                  </blockquote>

                  {/* User Info */}
                  <div className="mt-6">
                    <div className="mt-3">
                      <span className="block text-black font-semibold">
                        {item.username}
                      </span>
                    </div>
                  </div>

                  {/* Dots for navigation */}
                  <div className="mt-6">
                    <ul className="flex gap-x-3 justify-center">
                      {reviews.map((_, btnIdx) => (
                        <li key={btnIdx}>
                          <button
                            className={`w-2.5 h-2.5 rounded-full duration-150 ring-offset-2 ring-indigo-600 focus:ring ${
                              currentReview === btnIdx
                                ? "bg-gray-900"
                                : "bg-gray-300"
                            }`}
                            onClick={() => setCurrentReview(btnIdx)}
                          ></button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={nextReview}
                    role="button"
                    aria-label="Next Testimonial"
                    className="hidden -mr-6 mt-2 absolute top-1/2 w-16 h-16 right-0 transform -translate-y-1/2  bg-white rounded-full p-2 shadow-lg hover:bg-gray-900 md:block lg:block"
                  >
                    <ChevronRightIcon className="hover:text-white" />
                  </button>
                </figure>
              </li>
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
}

export default ReviewCard;

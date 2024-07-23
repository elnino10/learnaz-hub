/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlayCircle } from "@fortawesome/free-solid-svg-icons";

import ReactPlayer from "react-player";

// Shared Tailwind CSS classes
const buttonClasses = "px-2 py-1 rounded";
const mutedButtonClasses = "bg-muted text-muted-foreground " + buttonClasses;
const cardClasses =
  "bg-card text-card-foreground p-2 rounded-lg cursor-pointer";

const CourseContentPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [course, setCourse] = useState(null);
  const [lessonUrl, setLessonUrl] = useState("");

  const videoRef = useRef();
  const { courseId } = useParams();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // fetch course data from database
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axiosInstance.get(`/courses/${courseId}`);
        const courseData = response.data.data;
        setCourse(courseData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourse();
  }, []);

  // set first lesson as the default first lesson
  useEffect(() => {
    if (course?.lessons?.length > 0) {
      setLessonUrl(course.lessons[0].contentUrl);
      
    }
  }, [course?.lessons]);

  const handleLessonClick = async (url) => {
    if (lessonUrl === url) {
      setIsPlaying(!isPlaying);
    } else {
      setLessonUrl(url);
      setIsPlaying(true);
    }
  };

  // console.log(videoRef.current.props);

  return (
    <div className="min-h-screen pt-24 bg-background text-foreground">
      <div className="w-[52rem] text-lg flex items-center justify-between p-4 border-b border-border md:w-full">
        <div className="flex items-center space-x-2">
          <img
            src="https://placehold.co/24x24?text=LU"
            alt="logo"
            className="h-6 w-6"
          />
          <span className="font-semibold">
            {course ? course.title : "Loading..."}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg">
            Your progress
          </button>
          <button className={mutedButtonClasses}>•••</button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          {/* {currentLesson && ( */}
          <div className="relative">
            {/* <video ref={videoRef} width="850" height="500">
              <source src={lessonUrl} />
            </video> */}
            <ReactPlayer
              ref={videoRef}
              url={lessonUrl}
              playing={isPlaying}
              controls
              heigth="500px"
              width="850px"
              light={true}
              onClick={() => setIsPlaying(!isPlaying)}
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="text-black text-4xl">▶</button>
              </div>
            )}
          </div>
          {/* )} */}
          <div className="flex items-center justify-between mt-2"></div>
          <div className="pt-6 flex items-center justify-between w-[50rem] px-16 space-x-4 mt-4 border-b border-border">
            <button className="text-primary-foreground">Overview</button>
            <button className="text-muted-foreground hover:underline hover:text-blue-900">
              Q&A
            </button>
            <button className="text-muted-foreground hover:underline hover:text-blue-900">
              Notes
            </button>
            <button className="text-muted-foreground hover:underline hover:text-blue-900">
              Reviews
            </button>
            <button className="text-muted-foreground hover:underline hover:text-blue-900">
              Learning tools
            </button>
          </div>
          <div className="flex w-[50rem] ml-5 items-center">
            <p className="mt-4 text-xl thin">{course?.description}</p>
          </div>
        </div>
        <aside className="md:w-1/3 p-5 border-t md:border-t-0 md:border-l border">
          <h2 className="text-lg font-semibold mb-4">Course content</h2>
          <ul className="space-y-2">
            {course?.lessons?.map((lesson) => (
              <li key={lesson._id} className={cardClasses}>
                <button
                  className="flex items-center justify-between w-full"
                  onClick={handleLessonClick.bind(this, lesson.contentUrl)}
                >
                  <div className="flex items-center">
                    {isPlaying && lesson.contentUrl === lessonUrl ? (
                      <FontAwesomeIcon
                        icon={faPause}
                        className="text-muted-foreground mr-[1rem]"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faPlayCircle}
                        className="text-muted-foreground mr-2"
                      />
                    )}
                    <div className="ml-2 underline hover:text-blue-500 text-xl md:text-sm">
                      {lesson.title}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default CourseContentPage;

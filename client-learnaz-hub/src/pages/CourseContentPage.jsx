/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

// Shared Tailwind CSS classes
const buttonClasses = "px-2 py-1 rounded";
const mutedButtonClasses = "bg-muted text-muted-foreground " + buttonClasses;
const cardClasses = "bg-card text-card-foreground p-2 rounded-lg";

const CourseContentPage = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  
  const videoRef = useRef(null);
  const { courseId } = useParams();

  // get this course content from database
  // display it's list of lessons

  console.log("courseId from useParams:", courseId);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    // fetch course data from database
    const fetchCourse = async () => {
      if (!courseId) {
        console.error("No courseId found");
        return;
      }
      try {
        const response = await axiosInstance.get(`/courses/${courseId}`);
        const courseData = response.data.data;
        setCourse(courseData);
        // set the first lesson as the current lesson to start with
        if (courseData.lessons && courseData.lessons.length > 0) {
          setCurrentLesson(courseData.lessons[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // const lessonSelectHandler = (url) => {
  //   videoRef.current.src = url;
  //   videoRef.current.play();
  //   setIsPlaying(true);
  // };

  console.log(
    props.userData?.coursesEnrolled?.map((course) => course.thumbnailURL)
  );

  const handleLessonClick = (lesson) => {
    setCurrentLesson(lesson);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen pt-24 bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b border-border">
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
          <button className={mutedButtonClasses}>...</button>
        </div>
      </header>
      <main className="flex flex-col md:flex-row">
        <div className="flex-1 p-4">

          {currentLesson && (
            <div
              className="relative bg-black aspect-w-16 aspect-h-9"
              onClick={handlePlayPause}
            >
              <video
                ref={videoRef}
                className="inset-0 w-full h-full object-cover"
                height={200}
                // controls
                loop
                poster={currentLesson.thumbnailURL}
              >
                <source src={currentLesson.contentUrl} type="video/mp4" />
                Sorry, your browser doesn&apos;t support HTML5 video
              </video>
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    className="text-black text-4xl"
                    onClick={handlePlayPause}
                  >
                    ▶
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="flex items-center justify-between mt-2"></div>
          <div className="pt-6 flex space-x-4 mt-4 border-b border-border">
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
          {currentLesson && <p className="mt-4 text-xl thin">{course.description}</p>}
        </div>
        <aside className="md:w-1/3 p-4 border-t md:border-t-0 md:border-l border-border">
          <h2 className="text-lg font-semibold mb-4">Course content</h2>
          <ul className="space-y-2">
            {course?.lessons?.map((lesson) => (
              <li key={lesson._id} className={cardClasses}>
                <button
                  className="flex items-center justify-between w-full"
                  onClick={() => handleLessonClick(lesson)}
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faPlayCircle}
                      className="text-muted-foreground mr-2"
                    />
                    <a href={lesson.contentUrl} className="ml-2 underline hover:text-blue-500 text-xl md:text-sm">
                      {lesson.title}
                    </a>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  );
};

export default CourseContentPage;

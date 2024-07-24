/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

import axios from "axios";

const TEXT_MUTED_FOREGROUND = "text-muted-foreground";
const TEXT_PRIMARY = "text-primary";

function CoursePreviewPage(props) {
  const [course, setCourse] = useState({});
  const { courseId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiUrl = `${baseUrl}/courses/${courseId}`;

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    // fetch course data from database
    const fetchCourse = async () => {
      try {
        const response = await axios.get(apiUrl);
        setCourse(response.data.data);
      } catch (error) {
        console.error(error);
      } finally { 
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, []);

  // enroll student to a course
  const enrollmentHandler = async () => {
    const enrollmentData = {
      courseId: courseId,
      studentId: props.userData?._id,
    };
    try {
      const res = await axiosInstance.post(
        `/courses/enroll/${courseId}`,
        enrollmentData
      );
      if (!props.userData?._id) {
        alert("Please login to enroll in a course");
      }

      if (res.data.status === "success") {
        alert("Enrolled for course successfully!");
        navigate(`/course/course-content/${courseId}`);
      }
    } catch (error) {
      alert("Error enrolling in course");
    }
  };

  return (
    <>
      <div className="w-[52rem] mt-16 min-h-screen relative max-w-7xl mx-auto bg-background text-foreground sm:mt-20 md:w-full md:mt-[6rem]">
        {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <RotatingLines
            height="80"
            width="80"
            strokeWidth="5"
            animationDuration="0.75"
            strokeColor="#848884"
            ariaLabel="rotating-lines-loading"
            visible={true}
          />
        </div>
      ) : (
        <>
        <div className="relative flex flex-col px-4 items-center justify-between sm:items-start bg-gray-800 text-white md:flex-row lg:items-center">
          <div className="flex flex-col items-start w-[80%] pt-7 sm:px-3 sm:w-[62%] lg:w-2/3">
            <h1 className="text-3xl font-bold mb-2">{course?.title}</h1>
            <p className={`${TEXT_MUTED_FOREGROUND} mb-4 px-5`}>
              {course?.summary}
            </p>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 mr-2">★★★★★</span>
              <a href="#" className={TEXT_PRIMARY + " hover:underline"}>
                (25 ratings)
              </a>
              <span className="ml-2 text-muted-foreground">
                {course?.studentsEnrolled?.length || 0}{" "}
                {course?.studentsEnrolled?.length === 1
                  ? "student"
                  : "students"}
              </span>
            </div>
            <p className={`${TEXT_MUTED_FOREGROUND} mb-4`}>
              Created by{" "}
              <a href="#" className={TEXT_PRIMARY + " hover:underline"}>
                {course?.author}
              </a>
            </p>
            <div className="flex items-center text-muted-foreground mb-4">
              <span>
                Last updated{" "}
                {course?.updatedAt
                  ? new Date(course.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : new Date(course.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
              </span>
              <span className="mx-2">•</span>
              <span>English</span>
            </div>
          </div>
          <div className="w-[25rem] bg-white text-gray-800 pt-3 px-3 rounded-md shadow-lg mt-8 sm:w-[20rem] sm:absolute sm:translate-x-[30rem] sm:translate-y-[1rem] md:w-[25rem] md:ml-[48rem] md:translate-x-16 md:translate-y-[-1rem] lg:w-1/3 lg:mt-0">
            <img
              src={course?.thumbnailURL}
              alt="Course preview image"
              className="w-full h-64 rounded mb-4"
            />
            <button
              onClick={enrollmentHandler}
              className="bg-gray-800 text-white font-bold border border-primary text-primary w-full py-2 rounded hover:bg-primary/10"
            >
              Enroll
            </button>
            <p className={`${TEXT_MUTED_FOREGROUND} text-center mt-4`}></p>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg mt-8 sm:py-2 sm:px-10">
          <h2 className="text-2xl font-bold mb-4">Course Description</h2>
          <p>{course?.description}</p>

          <div className="mt-8 ml-4">
            <h2 className="text-2xl font-bold mb-4">{`What you'll learn`}</h2>
            {course?.lessons?.map((lesson) => (
              <div key={lesson._id}>
                <li>{lesson.title}</li>
              </div>
            ))}
          </div>
          <div className="mt-8 ml-4">
            <h2 className="text-2xl font-bold mb-4">Requirements Students</h2>
            <li>
              {`Don't`} Need Prior Coding Skills to Enroll in This Course.
              Anyone Can Take This Course.
            </li>
            <li>Students Require a Computer or Laptop to Write Code.</li>
          </div>
        </div>
        </>
      )}
      </div>
    </>
  );
}

export default CoursePreviewPage;

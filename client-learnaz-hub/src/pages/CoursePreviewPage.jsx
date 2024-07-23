/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

const TEXT_MUTED_FOREGROUND = "text-muted-foreground";
const TEXT_PRIMARY = "text-primary";

function CoursePreviewPage(props) {
  const [course, setCourse] = useState({});
  const { courseId } = useParams();

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
      }
    };
    fetchCourse();
  }, []);

  // enroll student to a course
  const enrollmentHandler = async () => {
    const enrollmentData = {
      courseId: courseId,
      studentId: props.userData._id,
    };
    try {
      const res = await axiosInstance.post(
        `/courses/enroll/${courseId}`,
        enrollmentData
      );
      if (!props.authData) {
        throw new Error("Please login to enroll in a course");
      }

      if (res.data.status === "success")
        alert("Enrolled for course successfully!");
      navigate(`/course/course-content/${courseId}`);
    } catch (error) {
      console.log(error);
      alert(error.message || "Error enrolling in course");
      // alert("Error enrolling in course: sign in to enroll");
    }
  };

  return (
    <>
      <div className="min-h-screen relative max-w-7xl mx-auto bg-background text-foreground mt-20">
        <div className="relative flex flex-col px-4 justify-between items-start bg-gray-800 text-white md:flex-row lg:items-center">
          <div className="pt-7 md:w-[70%] lg:w-2/3">
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
          <div className="absolute bg-white text-gray-800 p-4 rounded-md shadow-lg mt-8 lg:w-1/3 lg:mt-0 lg:ml-8">
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

        <div className="bg-card p-4 rounded-lg mt-8">
          <h2 className="text-2xl font-bold mb-4">Course Description</h2>
          {course?.description}
        </div>
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
            {`Don't`} Need Prior Coding Skills to Enroll in This Course. Anyone
            Can Take This Course.
          </li>
          <li>Students Require a Computer or Laptop to Write Code.</li>
        </div>
      </div>
    </>
  );
}

export default CoursePreviewPage;

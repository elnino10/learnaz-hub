import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { courses } from "../data/courseData";

const TEXT_MUTED_FOREGROUND = "text-muted-foreground";
const TEXT_PRIMARY = "text-primary";

function CoursePreviewPage() {
  const [course, setCourse] = useState({});
  const { courseId } = useParams();

  useEffect(() => {
    // fetch course data from database

    setCourse(courses.find((course) => course.id == courseId));
  }, [courseId]);

  return (
    <>
      <div className="relative max-w-7xl mx-auto bg-background text-foreground mt-20">
        <div className="flex flex-col px-4 h-[25rem] lg:flex-row justify-between items-start bg-gray-800 text-white lg:items-center">
          <div className="pt-7 lg:w-2/3">
            <h1 className="text-3xl font-bold mb-2">
              {course && course.title}
            </h1>
            <p className={`${TEXT_MUTED_FOREGROUND} mb-4 px-5`}>
              {course && course.description}
            </p>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 mr-2">★★★★★</span>
              <a href="#" className={TEXT_PRIMARY + " hover:underline"}>
                (25 ratings)
              </a>
              <span className="ml-2 text-muted-foreground">
                {course && course.numberEnrolled} students
              </span>
            </div>
            <p className={`${TEXT_MUTED_FOREGROUND} mb-4`}>
              Created by{" "}
              <a href="#" className={TEXT_PRIMARY + " hover:underline"}>
                {course && course.author}
              </a>
            </p>
            <div className="flex items-center text-muted-foreground mb-4">
              <span>
                Last updated{" "}
                {course && course.updatedAt
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
          <div className="absolute bg-white text-gray-800 mt-20 md:ml-[50rem] lg:w-1/3 bg-card p-4 rounded-md shadow-lg">
            <img
              src={course && course.image}
              alt="Course preview image"
              className="w-full h-64 rounded mb-4"
            />
            <button className="bg-gray-800 text-white font-bold border border-primary text-primary w-full py-2 rounded hover:bg-primary/10">
              Enroll
            </button>
            <p className={`${TEXT_MUTED_FOREGROUND} text-center mt-4`}></p>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg shadow-lg mt-8">
          <h2 className="text-2xl font-bold mb-4">Course Description</h2>
          {course && course.description}
        </div>
      </div>
    </>
  );
}

export default CoursePreviewPage;

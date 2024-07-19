import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const primaryButtonClass =
  "bg-primary mt-12 text-primary-foreground py-2 px-4 rounded-lg bg-gray-700 text-white hover:bg-gray-900 transition-colors";

const AddLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonUrl, setLessonUrl] = useState("");
  const [lessonNumber, setLessonNumber] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const { course } = location.state; // Retrieve the course data passed from CreateCourse

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiUrl = `${baseUrl}/lessons/${course._id}/lesson`;

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    // course && console.log(course);
  }, [course]);

  // Function to add a new lesson
  const addLessonHandler = async () => {
    const newLesson = {
      title: lessonTitle,
      contentUrl: lessonUrl,
      courseId: course._id,
      lessonNumber: lessonNumber || lessons.length,
    };
    try {
      const res = await api.post(apiUrl, newLesson);
      const lessonData = res.data.data;
      console.log(lessonData);
      // Update the lessons state with the new lesson
      setLessons([...lessons, newLesson]);
      setLessonTitle("");
      setLessonUrl("");
      setLessonNumber(lessonNumber + 1);
    } catch (error) {
      console.error("Error adding lesson:", error);
    }
  };

  const submitAllLessons = () => {
    // Show success message
    alert("Course created successfully!");

    // Navigate back to the dashboard
    navigate("/home/created-courses");
  };

  return (
    <div className="mt-20 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md w-full p-6 rounded-lg border-2">
        <h2 className="text-2xl text-gray-800 mb-4">
          Add Lessons to <i className="font-bold">{course.title}</i>
        </h2>
        <form className="flex flex-col space-y-4">
          <label htmlFor="lessonTitle" className="text-2xl">
            Lesson Title
          </label>
          <input
            type="text"
            id="lessonTitle"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
            placeholder="Enter the lesson title"
            className="input-field"
            required
          />
          <label htmlFor="lessonUrl" className="text-2xl">
            Lesson URL
          </label>
          <input
            type="url"
            id="lessonUrl"
            value={lessonUrl}
            onChange={(e) => setLessonUrl(e.target.value)}
            placeholder="Enter the lesson URL"
            className="input-field"
            required
          />
          <label htmlFor="lessonUrl" className="text-2xl">
            Lesson Number
          </label>
          <input
            type="number"
            id="lessonNumber"
            value={+lessonNumber}
            onChange={(e) => setLessonNumber(e.target.value)}
            placeholder="Enter the lesson number"
            className="input-field"
            required
          />
          <button
            type="button"
            onClick={addLessonHandler}
            className={primaryButtonClass}
          >
            Add Lesson
          </button>
        </form>
        <div className="mt-4">
          <h3 className="text-xl font-bold">Lessons</h3>
          <ul className="border">
            {lessons.map((lesson, index) => (
              <li
                key={index}
                className={`${!(lessons.length - 1) && "border-b-2"}`}
              >
                <div className="border p-2">
                  <h4 className="font-bold">{lesson.title}</h4>
                  <p>{lesson.contentUrl}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={submitAllLessons}
          className={primaryButtonClass}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default AddLessons;

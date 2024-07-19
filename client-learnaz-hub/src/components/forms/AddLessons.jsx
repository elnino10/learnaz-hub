import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const primaryButtonClass =
  "bg-primary mt-12 text-primary-foreground py-2 px-4 rounded-lg bg-gray-700 text-white hover:bg-gray-900 transition-colors";

const AddLessons = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonUrl, setLessonUrl] = useState("");

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiUrl = `${baseUrl}/lessons/`;
  const token = localStorage.getItem('token');
  const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

  const { course, courseId } = location.state;
  console.log(location.state); // Add this line
  console.log("Course ID:", courseId);
  const handleAddLesson = async () => {
    const newLesson = {
      title: lessonTitle,
      contentUrl: lessonUrl,
      courseId: courseId,
    };
    console.log(newLesson);
    try {
      const res = await api.post(apiUrl, newLesson);
      console.log(res.data);
      // Update the lessons state with the new lesson
      setLessons([...lessons, newLesson]);
      setLessonTitle("");
      setLessonUrl("");
    } catch (error) {
      console.error("Error adding lesson:", error);
    }
  };

  // Log the lessons state whenever it changes
  useEffect(() => {
    console.log("Lessons: ", lessons);
  }, [lessons]);

  const handleSubmit = () => {
    // Simulate submission of all lessons
    console.log("Course:", course);
    console.log("All Lessons:", lessons);

    // Show success message
    alert("Course created successfully!");

    // Navigate back to the dashboard
    navigate("/home");
  };

  return (
    <div className="mt-20 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md w-full p-6 rounded-lg border-2">
        <h2 className="text-2xl text-gray-800 font-bold mb-4">
          Add Lessons to {course.title}
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
          <button
            type="button"
            onClick={handleAddLesson}
            className={primaryButtonClass}
          >
            Add Lesson
          </button>
        </form>
        <div className="mt-4">
          <h3 className="text-xl font-bold">Lessons</h3>
          <ul>
            {lessons.map((lesson, index) => (
              <li key={index} className="mt-2">
                <div className="border p-2">
                  <h4 className="font-bold">{lesson.title}</h4>
                  <p>{lesson.url}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className={primaryButtonClass}
        >
          Submit All Lessons
        </button>
      </div>
    </div>
  );
};

export default AddLessons;

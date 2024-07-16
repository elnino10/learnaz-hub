import { useNavigate } from "react-router-dom";
import { useState } from "react";

const inputFieldClass = "input-field";
const primaryButtonClass =
  "bg-primary mt-12 text-primary-foreground py-2 px-4 rounded-lg bg-gray-700 text-white hover:bg-gray-900 transition-colors";
 
const CreateCourse = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("programming");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCourse = {
      title,
      summary,
      description,
      category,
    };
    console.log("Course Created: ", newCourse);
    // Navigate to the lesson creation page with the new course data
    navigate("/add-lessons", { state: { course: newCourse } });
  };
  return (
    <div className="mt-20 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md w-full p-6 rounded-lg border-2">
        <h2 className="text-2xl text-gray-800 font-bold mb-4">
          Create a New Course
        </h2>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="title" className="text-2xl">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the course title"
            className={inputFieldClass}
            required
          />
          <label htmlFor="summary" className="text-2xl">
            Summary
          </label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Enter a brief summary of the course"
            className={inputFieldClass}
            rows="3"
            required
          ></textarea>
          <label htmlFor="description" className="text-2xl">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the course description"
            className={inputFieldClass}
            rows="5"
            required
          ></textarea>
          <label htmlFor="category" className="text-2xl">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputFieldClass}
          >
            <option value="programming">Programming</option>
            <option value="design">Design</option>
            <option value="business">Business</option>
            <option value="marketing">Marketing</option>
          </select>
          <button type="submit" className={primaryButtonClass}>
            Create Lessons
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreateCourse;

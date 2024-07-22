import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const inputFieldClass =
  "input-field border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary";
const primaryButtonClass =
  "bg-primary mt-12 text-primary-foreground py-2 px-4 rounded-lg bg-gray-700 text-white hover:bg-gray-900 transition-colors";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("programming");
  const navigate = useNavigate();
  const location = useLocation();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const endPoint = "/courses/create-course";
  const token = localStorage.getItem("token");

  // create a header with the token
  const api = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let courseData = {};

    // Default thumbnail URL if imageUrl is empty
    const defaultImageUrl = "http://learnazHub.com/default-thumbnail.jpg";
    const userId = location.state?.userId;
    const newCourse = {
      title,
      summary,
      description,
      thumbnailURL: imageUrl || defaultImageUrl, // Use defaultImageUrl if imageUrl is empty
      price,
      category,
      instructorId: userId,
    };

    try {
      const res = await api.post(endPoint, newCourse);
      courseData = res.data.data;
    } catch (error) {
      console.error(error);
    }

    navigate("/add-lessons", { state: { course: courseData } });
  };

  return (
    <div className="mt-28 min-h-screen flex flex-col items-center justify-center">
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
            className={`${inputFieldClass} h-24`} // Adjust height as needed
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
            className={`${inputFieldClass} h-32`} // Adjust height as needed
            required
          ></textarea>
          <label htmlFor="imageUrl" className="text-2xl">
            Thumbnail URL
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter course thumbnail URL"
            className={inputFieldClass}
            required
          />
          <label htmlFor="price" className="text-2xl">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Enter course price"
            className={inputFieldClass}
            required
          />
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
            <option value="artificial-intelligence">Artificial Intelligence</option>
          </select>
          <button type="submit" className={primaryButtonClass}>
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;

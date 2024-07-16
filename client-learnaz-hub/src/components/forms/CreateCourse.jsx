const inputFieldClass = "input-field";
const primaryButtonClass =
  "bg-primary mt-12 text-primary-foreground py-2 px-4 rounded-lg hover:bg-gray-900 hover:text-white transition-colors";

const CreateCourse = () => {
  return (
    <div className="bg-background text-primary-foreground mt-20 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md w-full p-6 bg-card rounded-lg border-2">
        <h2 className="text-2xl font-bold mb-4">Create a New Course</h2>
        <form className="flex flex-col space-y-4">
          <label htmlFor="title" className="text-2xl">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter the course title"
            className={inputFieldClass}
            required
          />
          <label htmlFor="summary" className="text-2xl">
            Summary
          </label>
          <textarea
            id="summary"
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
            placeholder="Enter the course description"
            className={inputFieldClass}
            rows="5"
            required
          ></textarea>
          <label htmlFor="category" className="text-sm">
            Category
          </label>
          <select id="category" className={inputFieldClass}>
            <option value="programming">Programming</option>
            <option value="design">Design</option>
            <option value="business">Business</option>
            <option value="marketing">Marketing</option>
          </select>
        </form>
        <button className={primaryButtonClass}>Create Lessons</button>
      </div>
    </div>
  );
};

export default CreateCourse;

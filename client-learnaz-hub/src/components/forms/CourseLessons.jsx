const INPUT_CLASS =
  "w-full px-3 py-2 placeholder-input bg-input text-primary-foreground rounded-lg focus:outline-none focus:ring focus:ring-primary";
const BUTTON_CLASS =
  "bg-primary text-primary-foreground hover:bg-primary/80 mt-4 px-4 py-2 rounded-lg";

const LessonForm = () => {
  return (
    <div className="bg-background text-primary-foreground min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md w-full p-6 bg-card shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Create a New Lesson</h2>
        <label
          htmlFor="lesson-title"
          className="block text-sm font-medium text-primary-foreground mb-2"
        >
          Lesson Title
        </label>
        <input
          type="text"
          id="lesson-title"
          name="lesson-title"
          placeholder="Enter the lesson title"
          className={INPUT_CLASS}
        />
        <label
          htmlFor="lesson-url"
          className="block text-sm font-medium text-primary-foreground mt-4 mb-2"
        >
          Lesson URLs
        </label>
        <input
          type="text"
          id="lesson-url"
          name="lesson-url"
          placeholder="Enter the lesson URL"
          className={INPUT_CLASS + " mt-2"}
        />
        <input
          type="text"
          id="lesson-url"
          name="lesson-url"
          placeholder="Enter another lesson URL"
          className={INPUT_CLASS + " mt-2"}
        />
        <input
          type="text"
          id="lesson-url"
          name="lesson-url"
          placeholder="Enter one more lesson URL"
          className={INPUT_CLASS + " mt-2"}
        />
        <button className={BUTTON_CLASS}>Add Lesson</button>
      </div>
    </div>
  );
};

export default LessonForm;

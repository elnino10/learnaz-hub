const TEXT_MUTED_FOREGROUND = "text-muted-foreground";
const TEXT_PRIMARY = "text-primary";
const BG_SECONDARY = "bg-secondary";

function CoursePreviewPage() {
  return (
    <div className="bg-background text-foreground mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col px-4 lg:flex-row justify-between items-start bg-gray-800 text-white lg:items-center">
          <div className="lg:w-2/3">
            <h1 className="text-3xl font-bold mb-2">
              The Complete JavaScript Course 2024: From Zero to Expert!
            </h1>
            <p className={`${TEXT_MUTED_FOREGROUND} mb-4 px-5`}>
              The modern JavaScript course for everyone! Master JavaScript with
              projects, challenges and theory. Many courses in one!
            </p>
            <div className="flex items-center mb-4">
              <span
                className={`${BG_SECONDARY} ${TEXT_MUTED_FOREGROUND} px-2 py-1 rounded mr-2`}
              >
                Bestseller
              </span>
              <span className="text-yellow-500 mr-2">★★★★★</span>
              <a href="#" className={TEXT_PRIMARY + " hover:underline"}>
                (209,465 ratings)
              </a>
              <span className="ml-2 text-muted-foreground">
                924,486 students
              </span>
            </div>
            <p className={`${TEXT_MUTED_FOREGROUND} mb-4`}>
              Created by{" "}
              <a href="#" className={TEXT_PRIMARY + " hover:underline"}>
                Jonas Schmedtmann
              </a>
            </p>
            <div className="flex items-center text-muted-foreground mb-4">
              <span>Last updated 01/2024</span>
              <span className="mx-2">•</span>
              <span>English</span>
              <span className="mx-2">•</span>
              <span>
                English, Arabic [Auto],{" "}
                <a href="#" className={TEXT_PRIMARY + " hover:underline"}>
                  14 more
                </a>
              </span>
            </div>
          </div>
          <div className="bg-white text-gray-800 mt-20 lg:w-1/3 bg-card p-4 rounded-lg shadow-lg">
            <img
              src="https://placehold.co/300x200"
              alt="Course preview image"
              className="w-full rounded mb-4"
            />
            <button className="bg-gray-800 text-white font-bold border border-primary text-primary w-full py-2 rounded hover:bg-primary/10">
              Enroll
            </button>
            <p className={`${TEXT_MUTED_FOREGROUND} text-center mt-4`}></p>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg shadow-lg mt-8">
          <h2 className="text-2xl font-bold mb-4">Course Description</h2>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat
          doloribus aliquid quas accusamus rerum quae, ab id eius iure
          recusandae numquam consequatur fuga omnis veniam eos illo excepturi
          minus ipsum?
        </div>
      </div>
    </div>
  );
}

export default CoursePreviewPage;

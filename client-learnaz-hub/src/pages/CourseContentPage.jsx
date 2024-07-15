import { useRef, useState } from "react";

// export default CourseContentPage

// Shared Tailwind CSS classes
const buttonClasses = "px-2 py-1 rounded";
const mutedButtonClasses = "bg-muted text-muted-foreground " + buttonClasses;
const cardClasses = "bg-card text-card-foreground p-2 rounded-lg";

const CourseContentPage = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen pt-24 bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <img
            src="https://placehold.co/24x24?text=LU"
            alt="logo"
            className="h-6 w-6"
          />
          <span className="font-semibold">
            TailwindCSS from A to Z: Master TailwindCSS Quickly
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg">
            Your progress
          </button>
          <button className={mutedButtonClasses}>...</button>
        </div>
      </header>
      <main className="flex">
        <div className="flex-1 p-4">
          <div
            className="relative bg-black aspect-w-16 aspect-h-9"
            onClick={handlePlayPause}
          >
            <video
              ref={videoRef}
              className="inset-0 w-full h-full object-cover"
              height={200}
              // controls
              loop
              poster="https://intranet-projects-files.s3.amazonaws.com/webstack/thumbnail.jpg"
            >
              <source
                src="https://intranet-projects-files.s3.amazonaws.com/webstack/BigBuckBunny.mp4"
                type="video/mp4"
              />
              Sorry, your browser doesn&apos;t support HTML5 video
            </video>
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="text-black text-4xl"
                  onClick={handlePlayPause}
                >
                  ▶
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2">
            {/* <div className="flex items-center space-x-2">
              <button className={mutedButtonClasses}>1x</button>
              <span className="text-muted-foreground">0:00 / 0:00</span>
            </div> */}
            {/* <div className="flex items-center space-x-2">
              <button className={mutedButtonClasses}>⚙</button>
              <button className={mutedButtonClasses}>🔄</button>
              <button className={mutedButtonClasses}>⛶</button>
            </div> */}
          </div>
          <div className="pt=6  flex space-x-4 mt-4 border-b border-border">
            <button className="text-primary-foreground">Overview</button>
            <button className="text-muted-foreground">Q&A</button>
            <button className="text-muted-foreground">Notes</button>
            <button className="text-muted-foreground">Reviews</button>
            <button className="text-muted-foreground">Learning tools</button>
          </div>
          <p className="mt-4">
            Get started with Tailwind, a utility-first CSS framework, and master
            its directives, modules, and code reusability.
          </p>
        </div>
        <aside className="hidden md:block w-1/3 p-4 border-l border-border">
          <h2 className="text-lg font-semibold mb-4">Course content</h2>
          <ul className="space-y-2">
            <li className={cardClasses}>
              <button className="flex items-center justify-between w-full">
                <span>1. Introduction to TailwindCSS</span>
                <span className="text-muted-foreground">3min</span>
              </button>
            </li>
            <li className={cardClasses}>
              <button className="flex items-center justify-between w-full">
                <span>2. Overview of TailwindCSS</span>
                <span className="text-muted-foreground">4min</span>
              </button>
            </li>
            <li className={cardClasses}>
              <button className="flex items-center justify-between w-full">
                <span>Section 2: Installation of TailwindCSS</span>
                <span className="text-muted-foreground">6min</span>
              </button>
            </li>
            <li className={cardClasses}>
              <button className="flex items-center justify-between w-full">
                <span>Section 3: Typography</span>
                <span className="text-muted-foreground">24min</span>
              </button>
            </li>
            <li className={cardClasses}>
              <button className="flex items-center justify-between w-full">
                <span>Section 4: Border in TailwindCSS</span>
                <span className="text-muted-foreground">10min</span>
              </button>
            </li>
            <li className={cardClasses}>
              <button className="flex items-center justify-between w-full">
                <span>Section 5: Layout</span>
                <span className="text-muted-foreground">15min</span>
              </button>
            </li>
            <li className={cardClasses}>
              <button className="flex items-center justify-between w-full">
                <span>Section 6: Project</span>
                <span className="text-muted-foreground">20min</span>
              </button>
            </li>
          </ul>
        </aside>
      </main>
    </div>
  );
};

export default CourseContentPage;

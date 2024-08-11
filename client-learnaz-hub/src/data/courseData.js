import image from "../assets/images/teacher.png";
// import Tailwind from "../assets/thumbnail/tailwind.png";
import photo from "../assets/thumbnail/photo.jpg";
import Webdev from "../assets/thumbnail/webdev.png";
import Design from "../assets/thumbnail/design.png";
import Stop from "../assets/thumbnail/stop.png";
import Edit from "../assets/thumbnail/editing.png";

export const courses = [
  {
    id: 1,
    videoUrl:
      "https://intranet-projects-files.s3.amazonaws.com/webstack/BigBuckBunny.mp4",
    title: "Introduction to Video Animation",
    image: Edit,
    author: "John Doe",
    numberEnrolled: 30,
    price: "$50",
    category: "Video Animation",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat doloribus aliquid quas accusamus rerum quae, ab id eius iure recusandae numquam consequatur fuga omnis veniam eos illo excepturi minus ipsum",
    lessons: [
      {
        title: "Lesson 1",
        duration: "1 hour",
        videoUrl: "https://www.youtube.com/watch?v=lH3ZkwbVp5E",
      },
      {
        title: "Lesson 2",
        duration: "1 hour",
        videoUrl: "https://www.youtube.com/watch?v=iZMqQLWRQEU",
      },
    ],
    updatedAt: "",
    createdAt: "2024-03-10T12:34:56Z",
  },
  {
    id: 2,
    videoUrl: "http://example.com/video-animation.mp4",
    title: "Introduction to Video Animation",
    image: Edit,
    author: "John Doe",
    numberEnrolled: 30,
    price: "$50",
    category: "Video Animation",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat doloribus aliquid quas accusamus rerum quae, ab id eius iure recusandae numquam consequatur fuga omnis veniam eos illo excepturi minus ipsum",
    lessons: [
      {
        title: "Lesson 1",
        duration: "1 hour",
        videoUrl: "https://www.youtube.com/watch?v=lH3ZkwbVp5E",
      },
    ],
    updatedAt: "2023-12-25T00:00:00Z",
  },
  {
    id: 3,
    videoUrl: "http://example.com/video-editing.mp4",
    title: "Introduction to Video Editing",
    image: Edit,
    author: "Jane Smith",
    numberEnrolled: 25,
    price: "$45",
    category: "Video Editing",
    updatedAt: "2022-01-01T09:30:00Z",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat doloribus aliquid quas accusamus rerum quae, ab id eius iure recusandae numquam consequatur fuga omnis veniam eos illo excepturi minus ipsum",
  },
  {
    id: 4,
    videoUrl: "http://example.com/stop-motion.mp4",
    title: "Introduction to Stop Motion",
    image: Stop,
    author: "Alice Brown",
    numberEnrolled: 20,
    price: "$55",
    category: "Stop Motion",
    updatedAt: "2024-03-15T16:45:30Z",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat doloribus aliquid quas accusamus rerum quae, ab id eius iure recusandae numquam consequatur fuga omnis veniam eos illo excepturi minus ipsum",
  },
  {
    id: 5,
    videoUrl: "http://example.com/photography.mp4",
    title: "Introduction to Photography",
    image: photo,
    author: "John Doe",
    numberEnrolled: 30,
    price: "$50",
    category: "Photography",
    updatedAt: "2023-08-10T14:20:00Z",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat doloribus aliquid quas accusamus rerum quae, ab id eius iure recusandae numquam consequatur fuga omnis veniam eos illo excepturi minus ipsum",
  },
  {
    id: 6,
    videoUrl: "http://example.com/web-development.mp4",
    title: "Introduction to Web Development",
    image: Webdev,
    author: "Emily White",
    numberEnrolled: 40,
    price: "$60",
    category: "Web Development",
    updatedAt: "2023-12-25T00:00:00Z",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat doloribus aliquid quas accusamus rerum quae, ab id eius iure recusandae numquam consequatur fuga omnis veniam eos illo excepturi minus ipsum",
  },
  {
    id: 7,
    videoUrl: "http://example.com/graphic-design.mp4",
    title: "Graphic Design Basics",
    image: Design,
    author: "Michael Green",
    numberEnrolled: 35,
    price: "$55",
    category: "Graphic Design",
    updatedAt: "2024-07-18T12:34:56Z",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat doloribus aliquid quas accusamus rerum quae, ab id eius iure recusandae numquam consequatur fuga omnis veniam eos illo excepturi minus ipsum",
  },
  {
    id: 8,
    videoUrl: "http://example.com/web-development.mp4",
    title: "Tailwind CSS Mastry",
    // image: Tailwind,
    author: "Emily White",
    numberEnrolled: 40,
    price: "$60",
    category: "Web Development",
    updatedAt: "2024-07-18T12:34:56Z",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat doloribus aliquid quas accusamus rerum quae, ab id eius iure recusandae numquam consequatur fuga omnis veniam eos illo excepturi minus ipsum",
  },
];

// course review data
export const reviews = [
  {
    username: "Jane Doe",
    review: "Learnerz Hub shaped my career greatly",
  },
  {
    username: "John Smith",
    review: "Fantastic platform with excellent courses",
  },
  {
    username: "Alice Johnson",
    review: "I learned so much in such a short time!",
  },
  {
    username: "Michael Brown",
    review: "Great content and very well structured.",
  },
  {
    username: "Emily Davis",
    review: "The instructors are very knowledgeable.",
  },
];

export const enrolledCourses = [
  {
    _id: 1,
    title: "Introduction to Python Programming",
    imageurl: image,
    duration: "2 hours",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    imageurl: image,
    duration: "3 hours",
  },
  {
    id: 6,
    title: "CSS for Beginners",
    imageurl: image,
    duration: "3 hours",
  },
  {
    id: 3,
    title: "Computer Science",
    imageurl: image,
    duration: "3 hours",
  },
  {
    id: 4,
    title: "Data Science Basics",
    imageurl: image,
    duration: "4 hours",
  },
];

export const allUsers = [
  {
    id: 1,
    firstName: "Amara",
    lastName: "Okeke",
    email: "hey.mail.com",
    role: "instructor",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Jack",
    email: "john@mail.com",
    role: "instructor",
  },
  {
    id: 3,
    firstName: "Luke",
    lastName: "Donald",
    email: "mail.com",
    role: "student",
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Davis",
    email: "emily@mail.com",
    role: "student",
  },
  {
    id: 5,
    firstName: "Michael",
    lastName: "Brown",
    email: "michael@mail.com",
    role: "instructor",
  },
];

export const createdCourses = [
  {
    id: 1,
    title: "Introduction to Python Programming",
    imageurl: image,
    duration: "2 hours",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    imageurl: image,
    duration: "3 hours",
  },
  {
    id: 3,
    title: "CSS for Beginners",
    imageurl: image,
    duration: "3 hours",
  },
  {
    id: 4,
    title: "Computer Science",
    imageurl: image,
    duration: "3 hours",
  },
  {
    id: 5,
    title: "Introduction to Data Science",
    imageurl: image,
    duration: "4 hours",
  },
];

export const suggestedCourses = [
  {
    id: 3,
    title: "Introduction to React",
    imageurl: image,
    duration: "2.5 hours",
  },
  {
    id: 4,
    title: "CSS for Beginners",
    imageurl: image,
    duration: "1.5 hours",
  },
  {
    id: 5,
    title: "Node.js Fundamentals",
    imageurl: image,
    duration: "3 hours",
  },
  {
    id: 6,
    title: "Basics of Machine Learning",
    imageurl: image,
    duration: "2 hours",
  },
];

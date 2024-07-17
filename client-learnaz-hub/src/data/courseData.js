import image from "../assets/images/teacher.png";

export const courses = [
  {
    id: 1,
    title: "Introduction to Video Animation",
    image: "http://example.com/video-animation.jpg",
    author: "John Doe",
    numberEnrolled: 30,
    price: "$50",
    category: "Video Animation",
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
  },
  {
    id: 2,
    title: "Introduction to Video Animation",
    image: "http://example.com/video-animation.jpg",
    author: "John Doe",
    numberEnrolled: 30,
    price: "$50",
    category: "Video Animation",
    lessons: [
      {
        title: "Lesson 1",
        duration: "1 hour",
        videoUrl: "https://www.youtube.com/watch?v=lH3ZkwbVp5E",
      },
    ],
  },
  {
    id: 3,
    title: "Introduction to Video Editing",
    image: "http://example.com/video-editing.jpg",
    author: "Jane Smith",
    numberEnrolled: 25,
    price: "$45",
    category: "Video Editing",
  },
  {
    id: 4,
    title: "Introduction to Stop Motion",
    image: "http://example.com/stop-motion.jpg",
    author: "Alice Brown",
    numberEnrolled: 20,
    price: "$55",
    category: "Stop Motion",
  },
  {
    id: 5,
    title: "Introduction to Photography",
    image: "http://example.com/photography.jpg",
    author: "John Doe",
    numberEnrolled: 30,
    price: "$50",
    category: "Photography",
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
    title: "css for beginners",
    imageurl: image,
    duration: "3 hours",
  },
  {
    id: 3,
    title: "Computer Science",
    imageurl: image,
    duration: "3 hours",
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
    title: "css for beginners",
    imageurl: image,
    duration: "3 hours",
    
  },
  {
    id: 4,
    title: "Computer Science",
    imageurl: image,
    duration: "3 hours",
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
];

import Card from "../Card";
import { useState, useEffect } from "react";
import { FaBox, FaCog, FaUsers, FaChartBar } from "react-icons/fa";

const Dashboard = () => {

  const [userCount, setUserCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);

  // Dummy users data
  

   useEffect(() => {
    const dummyUsers = [
      { id: 1, name: "John Doe", role: "Admin" },
      { id: 2, name: "Jane Smith", role: "User" },
      { id: 3, name: "Chidi Mark", role: "User" },
      { id: 4, name: "Lerato", role: "Admin" },
      { id: 5, name: "Lamber", role: "User" },
    ];
     // Set user count based on the length of the dummy users array
     setUserCount(dummyUsers.length);
   }, []);

   useEffect(() => {
     const coursesData = [
       {
         category: "Video Animation",
         courses: [
           {
             id: 1,
             title: "Introduction to Video Animation",
             image: "http://example.com/video-animation.jpg",
             author: "John Doe",
             numberEnrolled: 30,
             price: "$50",
           },
           {
             id: 2,
             title: "Advanced Video Animation",
             image: "http://example.com/advanced-video-animation.jpg",
             author: "Jane Doe",
             numberEnrolled: 40,
             price: "$70",
           },
         ],
       },
       {
         category: "Video Editing",
         courses: [
           {
             id: 3,
             title: "Introduction to Video Editing",
             image: "http://example.com/video-editing.jpg",
             author: "Jane Smith",
             numberEnrolled: 25,
             price: "$45",
           },
         ],
       },
       {
         category: "Stop Motion",
         courses: [
           {
             id: 4,
             title: "Introduction to Stop Motion",
             image: "http://example.com/stop-motion.jpg",
             author: "Alice Brown",
             numberEnrolled: 20,
             price: "$55",
           },
         ],
       },
       {
         category: "Photography",
         courses: [
           {
             id: 5,
             title: "Introduction to Photography",
             image: "http://example.com/photography.jpg",
             author: "John Doe",
             numberEnrolled: 30,
             price: "$50",
           },
         ],
       },
     ];

      let totalCourses = 0;
      coursesData.forEach((category) => {
        // eslint-disable-next-line no-unused-vars
        category.courses.forEach((courses) => {
          totalCourses++;
        });
      });
      setCoursesCount(totalCourses);

     setCoursesCount(totalCourses);
   }, []);


  return (
    <div className="grow p-8">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card icon={<FaUsers />} title="Users" value={userCount} />
        <Card icon={<FaBox />} title="Courses" value={coursesCount} />
        <Card icon={<FaChartBar />} title="Analytic" value="30" />
        <Card icon={<FaCog />} title="Settings" value="11" />
      </div>
    </div>
  );
};

export default Dashboard;

/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import {
  Sidebar,
  Navbar,
  Dashboard,
  ManageUsers,
  ManageCourses,
} from "./admin";
import {
  CourseContentPage,
  EnrolledCoursesPage,
  LandingPage,
  UserDashboard,
  CategoryCourse,
  CreatedCourses,
  CourseCreator,
  CoursePreviewPage,
  ProfileEdit,
} from "./pages";
import {
  Footer,
  ForgotPassword,
  Header,
  LoginForm,
  PasswordRecoveryForm,
  SignupForm,
  CreateCourse,
  AddLessons,
  SignupInstructor,
} from "./components";

const App = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [showImageMenu, setShowImageMenu] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const [activePage, setActivePage] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [userData, setUserData] = useState({});

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const clickAwayHandler = () => {
    setMenuVisible(false);
    setShowImageMenu(false);
  };

  return (
    <div onClick={clickAwayHandler}>
      <Routes>
        {/* Admin Route */}
        <Route path="/admin/*" element={<AdminLayout />} />
        {/* Main routes */}
        <Route
          path="/*"
          element={
            <MainLayout
              setActivePage={setActivePage}
              activePage={activePage}
              showImageMenu={showImageMenu}
              setShowImageMenu={setShowImageMenu}
              menuVisible={menuVisible}
              setMenuVisible={setMenuVisible}
              authUser={authUser}
              setAuthUser={setAuthUser}
              setUserData={setUserData}
              userData={userData}
              editClicked={editClicked}
              setEditClicked={setEditClicked}
            />
          }
        />
      </Routes>
    </div>
  );
};

// admin page layout
const AdminLayout = () => (
  <div className="flex h-screen bg-gray-100">
    <Sidebar />
    <div className="grow ml-16 md:ml-64 h-full lg:h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <Navbar />
      <Routes>
        <Route path="admin/dashboard" element={<Dashboard />} />
        <Route path="admin/manage-users" element={<ManageUsers />} />
        <Route path="admin/manage-courses" element={<ManageCourses />} />
      </Routes>
    </div>
  </div>
);

// users page layout
const MainLayout = (props) => (
  <>
    <Header
      setMenuVisible={props.setMenuVisible}
      menuVisible={props.menuVisible}
      showImageMenu={props.showImageMenu}
      setShowImageMenu={props.setShowImageMenu}
      activePage={props.activePage}
      setActivePage={props.setActivePage}
      setAuthUser={props.setAuthUser}
      authUser={props.authUser}
    />
    <Routes>
      <Route path="/" element={<LandingPage authUser={props.authUser} />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/instructor-signup" element={<SignupInstructor />} />
      <Route
        path="/login"
        element={<LoginForm setAuthUser={props.setAuthUser} />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/password-recovery/:resetToken"
        element={<PasswordRecoveryForm />}
      />
      <Route
        path="/home/my-courses/learning"
        element={<EnrolledCoursesPage userData={props.userData} />}
      />
      <Route
        path="/home"
        element={
          <UserDashboard
            authUser={props.authUser}
            userData={props.userData}
            setUserData={props.setUserData}
          />
        }
      />
      <Route
        path="/user/profile/"
        element={
          <ProfileEdit
            userData={props.userData}
            editClicked={props.editClicked}
            setEditClicked={props.setEditClicked}
          />
        }
      />
      {/* <Route path="/course/:courseTitle" element={<CourseContentPage />} /> */}
      <Route
        path="/course-creator"
        element={<CourseCreator authUser={props.authUser} />}
      />
      <Route
        path="/course/course-content/:courseId"
        element={<CourseContentPage userData={props.userData} />}
      />
      <Route
        path="/category/:category"
        element={
          <CategoryCourse
            userData={props.userData}
            setUserData={props.setUserData}
          />
        }
      />

      {/* based on the instructor id course is created */}
      <Route path="/create-course" element={<CreateCourse />} />
      <Route
        path="/home/created-courses"
        element={<CreatedCourses userData={props.userData} />}
      />
      <Route path="/add-lessons" element={<AddLessons />} />
      <Route
        path="/courses/preview/:courseId"
        element={<CoursePreviewPage userData={props.userData} authData={props.authData} />}
      />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
    <Footer />
  </>
);

export default App;

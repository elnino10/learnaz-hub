import { Route, Routes } from "react-router-dom";
import {
  Sidebar,
  Navbar,
  Dashboard,
  ManageUsers,
  ManageCourses,
} from "./admin";
import { LandingPage, UserDashboard } from "./pages";
import {
  Footer,
  ForgotPassword,
  Header,
  LoginForm,
  PasswordRecoveryForm,
  SignupForm,
} from "./components";

const App = () => {
  return (
    <Routes>
      {/* Admin Route */}
      <Route path="/admin/*" element={<AdminLayout />} />
      {/* Main routes */}
      <Route path="/*" element={<MainLayout />} />
    </Routes>
  );
};

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

const MainLayout = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/password-recovery" element={<PasswordRecoveryForm />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
    <Footer />
  </>
);

export default App;

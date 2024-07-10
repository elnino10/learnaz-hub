import { Route, Routes } from "react-router-dom";
import { Sidebar, Navbar, Dashboard } from "./admin";
import { LandingPage } from "./pages";
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
    <div
      className="grow ml-16 md:ml-64 h-full lg:h-screen bg-gray-100 text-gray-900
      dark:bg-gray-900 dark:text-white"
    >
      <Navbar />
      <div>
        <Dashboard />
      </div>
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
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
    <Footer />
  </>
);

export default App;

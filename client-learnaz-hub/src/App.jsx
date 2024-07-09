import { Route, Routes } from "react-router-dom";

import { LandingPage } from "./Pages";
import {
  Footer,
  Header,
  LoginForm,
  PasswordRecoveryForm,
  SignupForm,
} from "./components";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/password-recovery" element={<PasswordRecoveryForm />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Exams from "./pages/Exams";
import ExamQuestions from "./pages/ExamQuestions";
import Profile from "./pages/Profile";
import Discussions from "./pages/Discussions";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/exam-questions" element={<ExamQuestions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
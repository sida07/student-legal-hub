import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Exams from "./pages/Exams";
import ExamQuestions from "./pages/ExamQuestions";
import Profile from "./pages/Profile";
import Discussions from "./pages/Discussions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/exam-questions" element={<ExamQuestions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/discussions" element={<Discussions />} />
      </Routes>
    </Router>
  );
}

export default App;
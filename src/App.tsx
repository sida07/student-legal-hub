import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Exams from "./pages/Exams";
import ExamQuestions from "./pages/ExamQuestions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/exam-questions" element={<ExamQuestions />} />
      </Routes>
    </Router>
  );
}

export default App;
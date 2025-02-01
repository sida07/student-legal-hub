import { Exam, ExamStats, Question } from "./types";

export const mapDatabaseQuestionToQuestion = (dbQuestion: any): Question => ({
  id: dbQuestion.id,
  text: dbQuestion.text,
  options: dbQuestion.options as string[],
  correctAnswer: dbQuestion.correct_answer,
  explanation: dbQuestion.explanation || "",
  created_at: dbQuestion.created_at,
  updated_at: dbQuestion.updated_at,
  exam_id: dbQuestion.exam_id,
});

export const mapDatabaseExamToExam = (dbExam: any): Exam => ({
  id: dbExam.id,
  title: dbExam.title,
  type: dbExam.type,
  year: dbExam.year,
  subject: dbExam.subject,
  attempts: 0, // We'll need to fetch this separately if needed
  status: dbExam.status,
  questions: [],
  created_at: dbExam.created_at,
  updated_at: dbExam.updated_at,
  created_by: dbExam.created_by,
});

export const calculateExamStats = (exam: Exam): ExamStats => {
  return {
    totalQuestions: exam.questions.length,
    averageAttempts: "0", // This would need real data
    successRate: "0%", // This would need real data
    averageTime: "0 min", // This would need real data
  };
};
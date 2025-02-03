import { Exam, Question } from "./types";

export const mapDatabaseQuestionToQuestion = (dbQuestion: any): Question => ({
  id: dbQuestion.id,
  text: dbQuestion.text,
  options: dbQuestion.options as string[],
  correctAnswer: dbQuestion.correct_answer,
  explanation: dbQuestion.explanation || "",
});

export const mapDatabaseExamToExam = (dbExam: any): Exam => ({
  id: dbExam.id,
  title: dbExam.title,
  type: dbExam.type,
  year: dbExam.year,
  subject: dbExam.subject,
  attempts: 0,
  status: dbExam.status,
  questions: [],
  created_at: dbExam.created_at,
  updated_at: dbExam.updated_at,
  created_by: dbExam.created_by,
});
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  created_at?: string;
  updated_at?: string;
  exam_id?: number;
}

export interface Exam {
  id: number;
  title: string;
  type: "historical" | "subject";
  year?: string;
  subject?: string;
  attempts: number;
  status: string;
  questions: Question[];
  created_at?: string;
  updated_at?: string;
  created_by?: string;
}

export interface ExamStats {
  totalQuestions: number;
  averageAttempts: string;
  successRate: string;
  averageTime: string;
}
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
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
}
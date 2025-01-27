import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import ExamForm from "./ExamForm";
import QuestionForm from "./QuestionForm";
import QuestionCard from "./QuestionCard";
import { Exam, Question } from "./types";

const years = Array.from({ length: 25 }, (_, i) => ({
  year: (2024 - i).toString(),
  count: 50,
}));

const AdminExams = () => {
  const [exams, setExams] = useState<Exam[]>([
    {
      id: 1,
      title: "اختبار القانون المدني 2024",
      type: "subject",
      subject: "القانون المدني",
      attempts: 156,
      status: "نشط",
      questions: [
        {
          id: 1,
          text: "سؤال تجريبي 1",
          options: ["خيار 1", "خيار 2", "خيار 3"],
          correctAnswer: 0,
          explanation: "شرح الإجابة الصحيحة"
        }
      ],
    },
    {
      id: 2,
      title: "اختبار سنة 2023",
      type: "historical",
      year: "2023",
      attempts: 89,
      status: "نشط",
      questions: [
        {
          id: 1,
          text: "سؤال من سنة 2023",
          options: ["خيار 1", "خيار 2", "خيار 3"],
          correctAnswer: 1,
          explanation: "شرح الإجابة الصحيحة"
        }
      ],
    }
  ]);

  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const { toast } = useToast();

  const handleAddExam = (data: any) => {
    const maxQuestions = data.type === "historical" ? 50 : 100;
    const newExam: Exam = {
      id: exams.length + 1,
      title: data.title,
      type: data.type,
      ...(data.type === "historical" ? { year: data.year } : { subject: data.subject }),
      attempts: 0,
      status: "نشط",
      questions: [],
    };
    setExams([...exams, newExam]);
    toast({
      title: "تم إضافة الاختبار بنجاح",
      description: `يمكنك إضافة حتى ${maxQuestions} سؤال لهذا الاختبار`,
    });
  };

  const handleAddQuestion = (data: any) => {
    if (!selectedExam) return;

    const maxQuestions = selectedExam.type === "historical" ? 50 : 100;
    if (selectedExam.questions.length >= maxQuestions && !editingQuestion) {
      toast({
        title: "لا يمكن إضافة المزيد من الأسئلة",
        description: `الحد الأقصى هو ${maxQuestions} سؤال`,
        variant: "destructive",
      });
      return;
    }

    const questionData = {
      text: data.questionText,
      options: data.options,
      correctAnswer: parseInt(data.correctAnswer) - 1,
      explanation: data.explanation,
    };

    let updatedQuestions;
    if (editingQuestion) {
      updatedQuestions = selectedExam.questions.map(q => 
        q.id === editingQuestion.id ? { ...questionData, id: q.id } : q
      );
      toast({
        title: "تم تحديث السؤال بنجاح",
      });
    } else {
      const newQuestion = {
        ...questionData,
        id: selectedExam.questions.length + 1,
      };
      updatedQuestions = [...selectedExam.questions, newQuestion];
      toast({
        title: "تم إضافة السؤال بنجاح",
      });
    }

    const updatedExam = {
      ...selectedExam,
      questions: updatedQuestions,
    };

    setExams(exams.map(exam => 
      exam.id === selectedExam.id ? updatedExam : exam
    ));

    setSelectedExam(updatedExam);
    setIsAddingQuestion(false);
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (questionId: number) => {
    if (!selectedExam) return;

    const updatedQuestions = selectedExam.questions.filter(q => q.id !== questionId);
    const updatedExam = {
      ...selectedExam,
      questions: updatedQuestions,
    };

    setExams(exams.map(exam => 
      exam.id === selectedExam.id ? updatedExam : exam
    ));
    setSelectedExam(updatedExam);
    toast({
      title: "تم حذف السؤال بنجاح",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>إدارة الاختبارات</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              إضافة اختبار جديد
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة اختبار جديد</DialogTitle>
            </DialogHeader>
            <ExamForm onSubmit={handleAddExam} years={years} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>عنوان الاختبار</TableHead>
              <TableHead>نوع الاختبار</TableHead>
              <TableHead>عدد المحاولات</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>{exam.title}</TableCell>
                <TableCell>{exam.type === "historical" ? "اختبار سنوات سابقة" : "اختبار مادة"}</TableCell>
                <TableCell>{exam.attempts}</TableCell>
                <TableCell>{exam.status}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedExam(exam)}
                      >
                        إدارة الأسئلة
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>إدارة أسئلة {exam.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Button
                          onClick={() => {
                            setIsAddingQuestion(true);
                            setEditingQuestion(null);
                          }}
                          className="flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          إضافة سؤال جديد
                        </Button>

                        {isAddingQuestion && (
                          <QuestionForm
                            onSubmit={handleAddQuestion}
                            onCancel={() => {
                              setIsAddingQuestion(false);
                              setEditingQuestion(null);
                            }}
                            initialData={editingQuestion}
                            isEditing={!!editingQuestion}
                          />
                        )}

                        <div className="space-y-4">
                          {selectedExam?.questions.map((question, index) => (
                            <QuestionCard
                              key={question.id}
                              question={question}
                              index={index}
                              onEdit={(q) => {
                                setEditingQuestion(q);
                                setIsAddingQuestion(true);
                              }}
                              onDelete={handleDeleteQuestion}
                            />
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminExams;
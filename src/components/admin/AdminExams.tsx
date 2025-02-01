import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Copy, ChartBar } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";
import { mapDatabaseExamToExam, mapDatabaseQuestionToQuestion, calculateExamStats } from "./utils";

const years = Array.from({ length: 25 }, (_, i) => ({
  year: (2024 - i).toString(),
  count: 50,
}));

const AdminExams = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [showStats, setShowStats] = useState(false);
  const { toast } = useToast();

  const handleAddExam = async (data: any) => {
    try {
      const { data: examData, error } = await supabase
        .from('exams')
        .insert([{
          title: data.title,
          type: data.type,
          ...(data.type === "historical" ? { year: data.year } : { subject: data.subject }),
          status: 'active'
        }])
        .select()
        .single();

      if (error) throw error;

      const newExam = mapDatabaseExamToExam(examData);
      setExams([...exams, newExam]);
      
      toast({
        title: "تم إضافة الاختبار بنجاح",
      });
    } catch (error) {
      console.error("Error adding exam:", error);
      toast({
        title: "حدث خطأ أثناء إضافة الاختبار",
        variant: "destructive",
      });
    }
  };

  const handleEditExam = async (data: any) => {
    if (!editingExam) return;

    try {
      const { error } = await supabase
        .from('exams')
        .update({
          title: data.title,
          type: data.type,
          ...(data.type === "historical" ? { year: data.year } : { subject: data.subject }),
        })
        .eq('id', editingExam.id);

      if (error) throw error;

      const updatedExams = exams.map(exam => 
        exam.id === editingExam.id 
          ? { ...exam, ...data }
          : exam
      );

      setExams(updatedExams);
      setEditingExam(null);
      
      toast({
        title: "تم تحديث الاختبار بنجاح",
      });
    } catch (error) {
      console.error("Error updating exam:", error);
      toast({
        title: "حدث خطأ أثناء تحديث الاختبار",
        variant: "destructive",
      });
    }
  };

  const handleCopyExam = async (exam: Exam) => {
    try {
      const { data: newExam, error } = await supabase
        .from('exams')
        .insert([{
          title: `نسخة من ${exam.title}`,
          type: exam.type,
          year: exam.year,
          subject: exam.subject,
          status: 'active'
        }])
        .select()
        .single();

      if (error) throw error;

      const mappedExam = mapDatabaseExamToExam(newExam);
      setExams([...exams, mappedExam]);
      
      toast({
        title: "تم نسخ الاختبار بنجاح",
      });
    } catch (error) {
      console.error("Error copying exam:", error);
      toast({
        title: "حدث خطأ أثناء نسخ الاختبار",
        variant: "destructive",
      });
    }
  };

  const handleAddQuestion = async (data: any) => {
    if (!selectedExam) return;

    try {
      const questionData = {
        exam_id: selectedExam.id,
        text: data.questionText,
        options: data.options,
        correct_answer: parseInt(data.correctAnswer) - 1,
        explanation: data.explanation,
      };

      if (editingQuestion) {
        const { error } = await supabase
          .from('questions')
          .update(questionData)
          .eq('id', editingQuestion.id);

        if (error) throw error;

        toast({
          title: "تم تحديث السؤال بنجاح",
        });
      } else {
        const { data: newQuestion, error } = await supabase
          .from('questions')
          .insert([questionData])
          .select()
          .single();

        if (error) throw error;

        const mappedQuestion = mapDatabaseQuestionToQuestion(newQuestion);
        const updatedExam = {
          ...selectedExam,
          questions: [...selectedExam.questions, mappedQuestion],
        };

        setSelectedExam(updatedExam);
        setExams(exams.map(exam => 
          exam.id === selectedExam.id ? updatedExam : exam
        ));

        toast({
          title: "تم إضافة السؤال بنجاح",
        });
      }

      setIsAddingQuestion(false);
      setEditingQuestion(null);
    } catch (error) {
      console.error("Error managing question:", error);
      toast({
        title: "حدث خطأ أثناء إدارة السؤال",
        variant: "destructive",
      });
    }
  };

  const handleDeleteQuestion = async (questionId: number) => {
    if (!selectedExam) return;

    try {
      const { error } = await supabase
        .from('questions')
        .delete()
        .eq('id', questionId);

      if (error) throw error;

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
    } catch (error) {
      console.error("Error deleting question:", error);
      toast({
        title: "حدث خطأ أثناء حذف السؤال",
        variant: "destructive",
      });
    }
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
                  <div className="flex gap-2">
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
                          <div className="flex gap-2">
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
                            <Button
                              variant="outline"
                              onClick={() => setShowStats(true)}
                              className="flex items-center gap-2"
                            >
                              <ChartBar className="h-4 w-4" />
                              إحصائيات الاختبار
                            </Button>
                          </div>

                          {showStats && (
                            <Card>
                              <CardHeader>
                                <CardTitle>إحصائيات الاختبار</CardTitle>
                              </CardHeader>
                              <CardContent>
                                {(() => {
                                  const stats = calculateExamStats(exam);
                                  return (
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-sm text-muted-foreground">عدد الأسئلة</p>
                                        <p className="text-2xl font-bold">{stats.totalQuestions}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">متوسط المحاولات</p>
                                        <p className="text-2xl font-bold">{stats.averageAttempts}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">نسبة النجاح</p>
                                        <p className="text-2xl font-bold">{stats.successRate}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">متوسط وقت الإجابة</p>
                                        <p className="text-2xl font-bold">{stats.averageTime}</p>
                                      </div>
                                    </div>
                                  );
                                })()}
                              </CardContent>
                            </Card>
                          )}

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

                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCopyExam(exam)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingExam(exam)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>تعديل الاختبار</DialogTitle>
                        </DialogHeader>
                        <ExamForm 
                          onSubmit={handleEditExam} 
                          years={years}
                          initialData={editingExam}
                          isEditing={true}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
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
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { mapDatabaseExamToExam, mapDatabaseQuestionToQuestion } from "./utils";
import ExamTable from "./ExamTable";
import ExamDialog from "./ExamDialog";
import ExamManagement from "./ExamManagement";
import ExamForm from "./ExamForm";
import { useExams } from "@/hooks/use-exams";
import { Exam, Question } from "./types";
import { Calendar, BookOpen, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const years = Array.from({ length: 25 }, (_, i) => ({
  year: (2024 - i).toString(),
  count: 50,
}));

const AdminExams = () => {
  const { exams, setExams, loading } = useExams();
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [session, setSession] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate('/auth');
        return;
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleEditExam = async (data: any) => {
    if (!editingExam || !session) return;

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
    if (!session) {
      toast({
        title: "يجب تسجيل الدخول أولاً",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: newExam, error } = await supabase
        .from('exams')
        .insert([{
          title: `نسخة من ${exam.title}`,
          type: exam.type,
          year: exam.year,
          subject: exam.subject,
          status: 'active',
          created_by: session.user.id
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

  if (!session) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const historicalExams = exams.filter(exam => exam.type === "historical");
  const subjectExams = exams.filter(exam => exam.type === "subject");

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold">إدارة الاختبارات</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            قم بإدارة الاختبارات وأسئلتها من هنا
          </p>
        </div>
        <ExamManagement 
          onExamAdded={(exam) => setExams([...exams, exam])}
          years={years}
          userId={session.user.id}
        />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <CardTitle>الاختبارات السابقة</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{historicalExams.length}</div>
              <p className="text-sm text-muted-foreground">
                اختبار من السنوات السابقة
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <CardTitle>اختبارات المواد</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subjectExams.length}</div>
              <p className="text-sm text-muted-foreground">
                اختبار حسب المواد
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="historical" className="space-y-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="historical" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              الاختبارات السابقة
            </TabsTrigger>
            <TabsTrigger value="subject" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              اختبارات المواد
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="historical" className="animate-fade-in">
            <ExamTable 
              exams={historicalExams}
              onCopy={handleCopyExam}
              onEdit={(exam) => setEditingExam(exam)}
              onSelect={(exam) => setSelectedExam(exam)}
            />
          </TabsContent>
          
          <TabsContent value="subject" className="animate-fade-in">
            <ExamTable 
              exams={subjectExams}
              onCopy={handleCopyExam}
              onEdit={(exam) => setEditingExam(exam)}
              onSelect={(exam) => setSelectedExam(exam)}
            />
          </TabsContent>
        </Tabs>

        {selectedExam && (
          <ExamDialog
            exam={selectedExam}
            isAddingQuestion={isAddingQuestion}
            editingQuestion={editingQuestion}
            showStats={showStats}
            onAddQuestion={() => {
              setIsAddingQuestion(true);
              setEditingQuestion(null);
            }}
            onShowStats={() => setShowStats(true)}
            onQuestionSubmit={handleAddQuestion}
            onQuestionCancel={() => {
              setIsAddingQuestion(false);
              setEditingQuestion(null);
            }}
            onQuestionEdit={(q) => {
              setEditingQuestion(q);
              setIsAddingQuestion(true);
            }}
            onQuestionDelete={handleDeleteQuestion}
          />
        )}

        {editingExam && (
          <Dialog open={!!editingExam} onOpenChange={() => setEditingExam(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>تعديل الاختبار</DialogTitle>
                <DialogDescription>
                  قم بتعديل معلومات الاختبار من هنا
                </DialogDescription>
              </DialogHeader>
              <ExamForm 
                onSubmit={handleEditExam}
                years={years}
                initialData={editingExam}
                isEditing={true}
              />
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminExams;

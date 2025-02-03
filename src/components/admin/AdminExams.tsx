import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { mapDatabaseExamToExam } from "./utils";
import ExamTable from "./ExamTable";
import ExamDialog from "./ExamDialog";
import ExamManagement from "./ExamManagement";
import { useExams } from "@/hooks/use-exams";
import { Exam, Question } from "./types";

const years = Array.from({ length: 25 }, (_, i) => ({
  year: (2024 - i).toString(),
  count: 50,
}));

const AdminExams = () => {
  const { exams, setExams } = useExams();
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [showStats, setShowStats] = useState(false);
  const { toast } = useToast();

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

  const historicalExams = exams.filter(exam => exam.type === "historical");
  const subjectExams = exams.filter(exam => exam.type === "subject");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>إدارة الاختبارات</CardTitle>
        <ExamManagement 
          onExamAdded={(exam) => setExams([...exams, exam])}
          years={years}
        />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="historical" className="space-y-4">
          <TabsList>
            <TabsTrigger value="historical">الاختبارات السابقة</TabsTrigger>
            <TabsTrigger value="subject">اختبارات المواد</TabsTrigger>
          </TabsList>
          
          <TabsContent value="historical">
            <ExamTable 
              exams={historicalExams}
              onCopy={handleCopyExam}
              onEdit={(exam) => setEditingExam(exam)}
              onSelect={(exam) => setSelectedExam(exam)}
            />
          </TabsContent>
          
          <TabsContent value="subject">
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
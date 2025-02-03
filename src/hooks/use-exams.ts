import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Exam } from "@/components/admin/types";
import { mapDatabaseExamToExam } from "@/components/admin/utils";

export const useExams = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const { toast } = useToast();

  const fetchExams = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "يجب تسجيل الدخول أولاً",
          variant: "destructive",
        });
        return;
      }

      const { data: examsData, error } = await supabase
        .from('exams')
        .select(`
          *,
          questions (*)
        `);

      if (error) throw error;

      const mappedExams = examsData.map(exam => ({
        ...mapDatabaseExamToExam(exam),
        questions: exam.questions ? exam.questions.map(mapDatabaseQuestionToQuestion) : []
      }));

      setExams(mappedExams);
    } catch (error) {
      console.error("Error fetching exams:", error);
      toast({
        title: "حدث خطأ أثناء جلب الاختبارات",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return { exams, setExams, fetchExams };
};
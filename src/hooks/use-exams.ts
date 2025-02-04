import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Exam } from "@/components/admin/types";
import { mapDatabaseExamToExam, mapDatabaseQuestionToQuestion } from "@/components/admin/utils";

export const useExams = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchExams = async () => {
    try {
      console.log("Fetching exams...");
      const { data: examsData, error } = await supabase
        .from('exams')
        .select(`
          *,
          questions (*)
        `);

      if (error) {
        console.error("Error fetching exams:", error);
        throw error;
      }

      console.log("Received exams data:", examsData);

      const mappedExams: Exam[] = examsData.map(exam => ({
        ...mapDatabaseExamToExam(exam),
        questions: exam.questions ? exam.questions.map(mapDatabaseQuestionToQuestion) : []
      }));

      console.log("Mapped exams:", mappedExams);
      setExams(mappedExams);
      setLoading(false);
    } catch (error) {
      console.error("Error in fetchExams:", error);
      toast({
        title: "حدث خطأ أثناء جلب الاختبارات",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  // Subscribe to realtime changes
  useEffect(() => {
    const channel = supabase
      .channel('exams_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'exams'
        },
        (payload) => {
          console.log('Realtime update received:', payload);
          fetchExams(); // Refresh the exams list when changes occur
        }
      )
      .subscribe();

    // Initial fetch
    fetchExams();

    // Cleanup subscription
    return () => {
      channel.unsubscribe();
    };
  }, []);

  return { exams, setExams, loading, fetchExams };
};
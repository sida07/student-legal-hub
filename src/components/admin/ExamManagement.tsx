import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ExamForm from "./ExamForm";
import { Exam } from "./types";
import { mapDatabaseExamToExam } from "./utils";

interface ExamManagementProps {
  onExamAdded: (exam: Exam) => void;
  years: { year: string; count: number }[];
}

const ExamManagement = ({ onExamAdded, years }: ExamManagementProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleAddExam = async (data: any) => {
    console.log("Handling exam addition with data:", data);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "يجب تسجيل الدخول أولاً",
          variant: "destructive",
        });
        return;
      }

      const examData = {
        title: data.title,
        type: data.type,
        ...(data.type === "historical" ? { year: data.year } : { subject: data.subject }),
        status: 'active',
        created_by: session.user.id
      };

      console.log("Inserting exam data:", examData);

      const { data: newExam, error } = await supabase
        .from('exams')
        .insert([examData])
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Received exam data from Supabase:", newExam);

      const mappedExam = mapDatabaseExamToExam(newExam);
      onExamAdded(mappedExam);
      setOpen(false);
      
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
  );
};

export default ExamManagement;
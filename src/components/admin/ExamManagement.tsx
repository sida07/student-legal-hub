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
  userId: string;
}

const ExamManagement = ({ onExamAdded, years, userId }: ExamManagementProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleAddExam = async (data: any) => {
    try {
      const examData = {
        title: data.title,
        type: data.type,
        ...(data.type === "historical" ? { year: data.year } : { subject: data.subject }),
        status: 'active',
        created_by: userId
      };

      const { data: newExam, error } = await supabase
        .from('exams')
        .insert([examData])
        .select()
        .single();

      if (error) throw error;

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
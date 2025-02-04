import { Button } from "@/components/ui/button";
import { Plus, ChartBar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import QuestionForm from "./QuestionForm";
import QuestionCard from "./QuestionCard";
import ExamStatsDisplay from "./ExamStats";
import { Exam, Question } from "./types";
import { useState } from "react";

interface ExamDialogProps {
  exam: Exam;
  isAddingQuestion: boolean;
  editingQuestion: Question | null;
  showStats: boolean;
  onAddQuestion: () => void;
  onShowStats: () => void;
  onQuestionSubmit: (data: any) => void;
  onQuestionCancel: () => void;
  onQuestionEdit: (question: Question) => void;
  onQuestionDelete: (questionId: number) => void;
}

const ExamDialog = ({
  exam,
  isAddingQuestion,
  editingQuestion,
  showStats,
  onAddQuestion,
  onShowStats,
  onQuestionSubmit,
  onQuestionCancel,
  onQuestionEdit,
  onQuestionDelete,
}: ExamDialogProps) => {
  const [questionToDelete, setQuestionToDelete] = useState<number | null>(null);

  const handleDeleteConfirm = () => {
    if (questionToDelete) {
      onQuestionDelete(questionToDelete);
      setQuestionToDelete(null);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            إدارة الأسئلة
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>إدارة أسئلة {exam.title}</DialogTitle>
            <DialogDescription>
              يمكنك إضافة وتعديل وحذف الأسئلة من هنا
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                onClick={onAddQuestion}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                إضافة سؤال جديد
              </Button>
              <Button
                variant="outline"
                onClick={onShowStats}
                className="flex items-center gap-2"
              >
                <ChartBar className="h-4 w-4" />
                إحصائيات الاختبار
              </Button>
            </div>

            {showStats && <ExamStatsDisplay exam={exam} />}

            {isAddingQuestion && (
              <QuestionForm
                onSubmit={onQuestionSubmit}
                onCancel={onQuestionCancel}
                initialData={editingQuestion}
                isEditing={!!editingQuestion}
              />
            )}

            <div className="space-y-4">
              {exam.questions.map((question, index) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  index={index}
                  onEdit={onQuestionEdit}
                  onDelete={() => setQuestionToDelete(question.id)}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!questionToDelete} onOpenChange={() => setQuestionToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد من حذف هذا السؤال؟</AlertDialogTitle>
            <AlertDialogDescription>
              لا يمكن التراجع عن هذا الإجراء بعد تنفيذه.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              تأكيد الحذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ExamDialog;
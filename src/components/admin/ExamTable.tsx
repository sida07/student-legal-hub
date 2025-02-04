import { Button } from "@/components/ui/button";
import { Copy, Edit, FileText, Calendar, BookOpen, Users, ChartBar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Exam } from "./types";
import { cn } from "@/lib/utils";

interface ExamTableProps {
  exams: Exam[];
  onCopy: (exam: Exam) => void;
  onEdit: (exam: Exam) => void;
  onSelect: (exam: Exam) => void;
}

const ExamTable = ({ exams, onCopy, onEdit, onSelect }: ExamTableProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {exams.map((exam) => (
        <Card 
          key={exam.id}
          className={cn(
            "group hover:shadow-lg transition-all duration-300 border-2",
            exam.status === 'active' ? 'border-green-200' : 'border-yellow-200'
          )}
        >
          <CardHeader className="space-y-1">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                {exam.type === "historical" ? (
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                )}
                <Badge 
                  variant={exam.status === 'active' ? "default" : "secondary"}
                  className="ml-2"
                >
                  {exam.status === 'active' ? 'نشط' : 'غير نشط'}
                </Badge>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onCopy(exam)}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onEdit(exam)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardTitle className="text-xl font-bold">{exam.title}</CardTitle>
            <CardDescription>
              {exam.type === "historical" ? `سنة ${exam.year}` : exam.subject}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {exam.questions.length} سؤال
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {exam.attempts || 0} محاولة
                  </span>
                </div>
              </div>
              <Button 
                className="w-full group-hover:bg-primary/90 transition-colors"
                onClick={() => onSelect(exam)}
              >
                <ChartBar className="mr-2 h-4 w-4" />
                إدارة الأسئلة
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExamTable;
import { Button } from "@/components/ui/button";
import { Copy, Edit } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Exam } from "./types";
import ExamDialog from "./ExamDialog";

interface ExamTableProps {
  exams: Exam[];
  onCopy: (exam: Exam) => void;
  onEdit: (exam: Exam) => void;
  onSelect: (exam: Exam) => void;
}

const ExamTable = ({ exams, onCopy, onEdit, onSelect }: ExamTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>عنوان الاختبار</TableHead>
          <TableHead>{exams[0]?.type === "historical" ? "السنة" : "المادة"}</TableHead>
          <TableHead>عدد الأسئلة</TableHead>
          <TableHead>الحالة</TableHead>
          <TableHead>الإجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exams.map((exam) => (
          <TableRow key={exam.id}>
            <TableCell>{exam.title}</TableCell>
            <TableCell>{exam.type === "historical" ? exam.year : exam.subject}</TableCell>
            <TableCell>{exam.questions.length}</TableCell>
            <TableCell>{exam.status}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onSelect(exam)}
                >
                  إدارة الأسئلة
                </Button>

                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onCopy(exam)}
                >
                  <Copy className="h-4 w-4" />
                </Button>

                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEdit(exam)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExamTable;
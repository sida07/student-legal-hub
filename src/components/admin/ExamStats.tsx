import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Exam, ExamStats } from "./types";
import { calculateExamStats } from "./utils";

interface ExamStatsProps {
  exam: Exam;
}

const ExamStatsDisplay = ({ exam }: ExamStatsProps) => {
  const stats = calculateExamStats(exam);

  return (
    <Card>
      <CardHeader>
        <CardTitle>إحصائيات الاختبار</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default ExamStatsDisplay;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminExams = () => {
  const exams = [
    {
      id: 1,
      title: "اختبار القانون المدني",
      course: "مقدمة في القانون المدني",
      attempts: 156,
      status: "نشط",
    },
    {
      id: 2,
      title: "اختبار القانون التجاري",
      course: "القانون التجاري",
      attempts: 89,
      status: "نشط",
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>إدارة الاختبارات</CardTitle>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          إضافة اختبار جديد
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>عنوان الاختبار</TableHead>
              <TableHead>الدورة</TableHead>
              <TableHead>عدد المحاولات</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>{exam.title}</TableCell>
                <TableCell>{exam.course}</TableCell>
                <TableCell>{exam.attempts}</TableCell>
                <TableCell>{exam.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    تعديل
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminExams;
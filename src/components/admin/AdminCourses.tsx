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

const AdminCourses = () => {
  const courses = [
    {
      id: 1,
      title: "مقدمة في القانون المدني",
      instructor: "د. أحمد محمد",
      students: 45,
      status: "نشط",
    },
    {
      id: 2,
      title: "القانون التجاري",
      instructor: "د. سارة أحمد",
      students: 32,
      status: "نشط",
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>إدارة الدورات</CardTitle>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          إضافة دورة جديدة
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>عنوان الدورة</TableHead>
              <TableHead>المدرس</TableHead>
              <TableHead>عدد الطلاب</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>{course.students}</TableCell>
                <TableCell>{course.status}</TableCell>
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

export default AdminCourses;
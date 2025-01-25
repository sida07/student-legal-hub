import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDiscussions = () => {
  const discussions = [
    {
      id: 1,
      title: "سؤال حول القانون المدني",
      author: "أحمد محمد",
      replies: 5,
      status: "مفتوح",
    },
    {
      id: 2,
      title: "استفسار عن القانون التجاري",
      author: "سارة أحمد",
      replies: 3,
      status: "مغلق",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة المناقشات</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>العنوان</TableHead>
              <TableHead>الكاتب</TableHead>
              <TableHead>الردود</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {discussions.map((discussion) => (
              <TableRow key={discussion.id}>
                <TableCell>{discussion.title}</TableCell>
                <TableCell>{discussion.author}</TableCell>
                <TableCell>{discussion.replies}</TableCell>
                <TableCell>{discussion.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    عرض
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

export default AdminDiscussions;
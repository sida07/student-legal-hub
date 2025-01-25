import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

// Generate years from 2000 to 2024
const years = Array.from({ length: 25 }, (_, i) => ({
  year: (2024 - i).toString(),
  count: 50, // كل اختبار يحتوي على 50 سؤال
}));

const subjectExams = [
  {
    title: "القانون المدني",
    description: "اختبار شامل في القانون المدني",
    count: 100, // كل اختبار يحتوي على 100 سؤال
    icon: BookOpen,
  },
  {
    title: "القانون الجزائي",
    description: "اختبار شامل في القانون الجزائي",
    count: 100, // كل اختبار يحتوي على 100 سؤال
    icon: FileText,
  },
];

const Exams = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">بنك الاختبارات القانونية</h1>

        <Tabs defaultValue="historical" className="space-y-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="historical">الاختبارات السابقة</TabsTrigger>
            <TabsTrigger value="subjects">اختبارات المواد</TabsTrigger>
          </TabsList>

          <TabsContent value="historical">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {years.map((exam) => (
                <Card key={exam.year} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      اختبارات سنة {exam.year}
                    </CardTitle>
                    <CardDescription>
                      يحتوي على {exam.count} سؤال
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" asChild>
                      <Link to={`/exam-questions?year=${exam.year}`}>
                        بدء الاختبار
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="subjects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subjectExams.map((subject) => (
                <Card key={subject.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <subject.icon className="w-5 h-5" />
                      {subject.title}
                    </CardTitle>
                    <CardDescription>
                      {subject.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 text-sm text-muted-foreground">
                      يحتوي على {subject.count} سؤال
                    </div>
                    <Button className="w-full" asChild>
                      <Link to={`/exam-questions?subject=${encodeURIComponent(subject.title)}`}>
                        بدء الاختبار
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Exams;
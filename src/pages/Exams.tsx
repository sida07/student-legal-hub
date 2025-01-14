import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar } from "lucide-react";

const historicalExams = [
  { year: "2024", count: 5 },
  { year: "2023", count: 8 },
  { year: "2022", count: 10 },
  { year: "2021", count: 7 },
  { year: "2020", count: 6 },
];

const subjectExams = [
  {
    title: "القانون المدني",
    description: "اختبارات في القانون المدني والأحوال الشخصية",
    count: 15,
  },
  {
    title: "القانون الجزائي",
    description: "اختبارات في القانون الجنائي والإجراءات الجزائية",
    count: 12,
  },
  {
    title: "القانون التجاري",
    description: "اختبارات في القانون التجاري والشركات",
    count: 8,
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
            <TabsTrigger value="historical">الخبرات السابقة</TabsTrigger>
            <TabsTrigger value="subjects">حسب المواد</TabsTrigger>
          </TabsList>

          <TabsContent value="historical">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {historicalExams.map((exam) => (
                <Card key={exam.year} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 ml-2" />
                      اختبارات سنة {exam.year}
                    </CardTitle>
                    <CardDescription>
                      {exam.count} اختبارات متوفرة
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">
                      عرض الاختبارات
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="subjects">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjectExams.map((subject) => (
                <Card key={subject.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 ml-2" />
                      {subject.title}
                    </CardTitle>
                    <CardDescription>
                      {subject.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 text-sm text-muted-foreground">
                      {subject.count} اختبارات متوفرة
                    </div>
                    <Button className="w-full">
                      عرض الاختبارات
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
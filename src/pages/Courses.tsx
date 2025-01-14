import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Users, Award } from "lucide-react";

const courses = [
  {
    title: "مقدمة في القانون",
    description: "تعلم أساسيات النظم والمبادئ القانونية",
    students: 234,
    level: "مبتدئ",
    duration: "8 أسابيع",
  },
  {
    title: "القانون الدستوري",
    description: "دراسة المبادئ الأساسية للقانون الدستوري",
    students: 189,
    level: "متوسط",
    duration: "12 أسبوع",
  },
  {
    title: "القانون الجنائي",
    description: "استكشاف العدالة الجنائية والإجراءات القانونية",
    students: 156,
    level: "متقدم",
    duration: "10 أسابيع",
  },
  {
    title: "القانون المدني",
    description: "فهم الحقوق والمسؤوليات المدنية",
    students: 145,
    level: "متوسط",
    duration: "10 أسابيع",
  },
  {
    title: "القانون الدولي",
    description: "دراسة الأطر والمؤسسات القانونية العالمية",
    students: 178,
    level: "متقدم",
    duration: "14 أسبوع",
  },
  {
    title: "الكتابة القانونية",
    description: "إتقان فن التوثيق القانوني",
    students: 210,
    level: "مبتدئ",
    duration: "6 أسابيع",
  },
];

const Courses = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">الدورات المتاحة</h1>
          <div className="relative w-full md:w-64">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="ابحث عن الدورات..."
              className="pr-9"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 ml-1" />
                      {course.students} طالب
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 ml-1" />
                      {course.level}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 ml-1" />
                    المدة: {course.duration}
                  </div>
                </div>
                <Button className="w-full">
                  سجل الآن
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
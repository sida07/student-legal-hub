import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Award } from "lucide-react";

const featuredCourses = [
  {
    title: "مقدمة في القانون",
    description: "تعلم أساسيات النظم والمبادئ القانونية",
    students: 234,
    level: "مبتدئ",
  },
  {
    title: "القانون الدستوري",
    description: "دراسة المبادئ الأساسية للقانون الدستوري",
    students: 189,
    level: "متوسط",
  },
  {
    title: "القانون الجنائي",
    description: "استكشاف العدالة الجنائية والإجراءات القانونية",
    students: 156,
    level: "متقدم",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              مرحباً بك في بوابة طلاب القانون
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl sm:mt-5 sm:max-w-xl">
              بوابتك نحو التميز في التعليم القانوني
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Button size="lg" className="w-full sm:w-auto">
                ابدأ الآن
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
        <h2 className="text-3xl font-bold text-center mb-8">الدورات المميزة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <Card key={course.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 ml-2" />
                    {course.students} طالب
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 ml-2" />
                    {course.level}
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <BookOpen className="w-4 h-4 ml-2" />
                  عرض الدورة
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-secondary/10 py-12" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">لماذا تختارنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">محتوى متميز</h3>
                <p className="text-muted-foreground">
                  تعلم من نخبة المحامين والأكاديميين
                </p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">مجتمع متفاعل</h3>
                <p className="text-muted-foreground">
                  تواصل مع زملائك من طلاب القانون والمهنيين
                </p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">شهادات معتمدة</h3>
                <p className="text-muted-foreground">
                  احصل على شهادات معتمدة عند إكمال الدورات
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
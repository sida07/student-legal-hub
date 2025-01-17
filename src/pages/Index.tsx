import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Award, ArrowRight } from "lucide-react";

const featuredCourses = [
  {
    title: "مقدمة في القانون",
    description: "تعلم أساسيات النظم والمبادئ القانونية",
    students: 234,
    level: "مبتدئ",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&auto=format&fit=crop"
  },
  {
    title: "القانون الدستوري",
    description: "دراسة المبادئ الأساسية للقانون الدستوري",
    students: 189,
    level: "متوسط",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop"
  },
  {
    title: "القانون الجنائي",
    description: "استكشاف العدالة الجنائية والإجراءات القانونية",
    students: 156,
    level: "متقدم",
    image: "https://images.unsplash.com/photo-1453945619913-79ec89a82c51?w=800&auto=format&fit=crop"
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section with Background Image */}
      <div 
        className="relative bg-primary text-primary-foreground py-24" 
        style={{
          backgroundImage: 'linear-gradient(rgba(26, 54, 93, 0.9), rgba(26, 54, 93, 0.9)), url(https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        dir="rtl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl mb-6 animate-fade-in">
              مرحباً بك في بوابة طلاب القانون
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl sm:mt-5 sm:max-w-xl animate-fade-in opacity-90">
              بوابتك نحو التميز في التعليم القانوني
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" className="animate-fade-in hover:scale-105 transition-transform">
                ابدأ الآن
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 animate-fade-in hover:scale-105 transition-transform">
                تعرف علينا
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Courses with Modern Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" dir="rtl">
        <h2 className="text-3xl font-bold text-center mb-12">الدورات المميزة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course, index) => (
            <Card 
              key={course.title} 
              className="hover:shadow-lg transition-all duration-300 group overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <CardTitle className="text-white">{course.title}</CardTitle>
                </div>
              </div>
              <CardHeader>
                <CardDescription className="text-lg">{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 ml-2" />
                    {course.students} طالب
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 ml-2" />
                    {course.level}
                  </div>
                </div>
                <Button className="w-full hover:scale-105 transition-transform">
                  <BookOpen className="w-4 h-4 ml-2" />
                  عرض الدورة
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section with Modern Design */}
      <div className="bg-gradient-to-b from-secondary/10 to-background py-16" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-12">لماذا تختارنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">محتوى متميز</h3>
                <p className="text-muted-foreground">
                  تعلم من نخبة المحامين والأكاديميين المتخصصين في مجال القانون
                </p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">مجتمع متفاعل</h3>
                <p className="text-muted-foreground">
                  تواصل مع زملائك من طلاب القانون وشارك في النقاشات القانونية
                </p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">شهادات معتمدة</h3>
                <p className="text-muted-foreground">
                  احصل على شهادات معتمدة تعزز مسيرتك المهنية في مجال القانون
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
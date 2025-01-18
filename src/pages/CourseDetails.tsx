import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, Award, FileText, Video, MessageSquare, Download } from "lucide-react";

// Mock data - in a real app, this would come from an API
const courseDetails = {
  title: "مقدمة في القانون",
  description: "تعلم أساسيات النظم والمبادئ القانونية",
  instructor: "د. أحمد محمد",
  students: 234,
  level: "مبتدئ",
  duration: "8 أسابيع",
  progress: 35,
  sections: [
    {
      title: "مقدمة في علم القانون",
      lessons: [
        { title: "تعريف القانون", duration: "15 دقيقة", type: "video", completed: true },
        { title: "مصادر القانون", duration: "20 دقيقة", type: "video", completed: true },
        { title: "فروع القانون", duration: "25 دقيقة", type: "video", completed: false },
      ]
    },
    {
      title: "النظام القانوني",
      lessons: [
        { title: "القاعدة القانونية", duration: "30 دقيقة", type: "video", completed: false },
        { title: "الحق القانوني", duration: "20 دقيقة", type: "video", completed: false },
      ]
    }
  ],
  materials: [
    { title: "ملخص المحاضرة الأولى", type: "pdf" },
    { title: "تمارين عملية", type: "doc" },
    { title: "مراجع إضافية", type: "pdf" },
  ]
};

const CourseDetails = () => {
  const { courseId } = useParams();
  console.log("Viewing course with ID:", courseId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10" dir="rtl">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{courseDetails.title}</CardTitle>
                    <CardDescription className="mt-2">{courseDetails.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm text-muted-foreground">
                      {courseDetails.students} طالب
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span className="text-sm text-muted-foreground">
                      {courseDetails.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm text-muted-foreground">
                      {courseDetails.duration}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>تقدم الدورة</span>
                    <span>{courseDetails.progress}%</span>
                  </div>
                  <Progress value={courseDetails.progress} />
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="content" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="content">المحتوى</TabsTrigger>
                <TabsTrigger value="materials">المواد التعليمية</TabsTrigger>
                <TabsTrigger value="discussions">النقاشات</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-4">
                {courseDetails.sections.map((section, sectionIndex) => (
                  <Card key={sectionIndex}>
                    <CardHeader>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className={`flex items-center justify-between p-3 rounded-lg border ${
                              lesson.completed ? 'bg-secondary/50' : 'bg-background'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Video className="w-4 h-4" />
                              <span>{lesson.title}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-muted-foreground">
                                {lesson.duration}
                              </span>
                              <Button variant={lesson.completed ? "secondary" : "default"}>
                                {lesson.completed ? 'تم المشاهدة' : 'شاهد الآن'}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="materials" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {courseDetails.materials.map((material, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border bg-background"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4" />
                            <span>{material.title}</span>
                          </div>
                          <Button>
                            <Download className="w-4 h-4 ml-2" />
                            تحميل
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discussions" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">منتدى النقاش</h3>
                      <p className="text-muted-foreground mb-4">شارك في النقاشات مع زملائك والمدرب</p>
                      <Button>
                        بدء نقاش جديد
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>المدرب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-secondary mx-auto mb-4"></div>
                  <h3 className="font-medium">{courseDetails.instructor}</h3>
                  <p className="text-sm text-muted-foreground mt-1">أستاذ القانون المدني</p>
                  <Button className="w-full mt-4">تواصل مع المدرب</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الشهادة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Award className="w-12 h-12 mx-auto text-primary mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    أكمل جميع متطلبات الدورة للحصول على الشهادة
                  </p>
                  <Button variant="outline" className="w-full">
                    عرض متطلبات الشهادة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
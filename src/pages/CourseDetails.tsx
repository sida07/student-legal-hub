import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, Award, Clock, Video, CheckCircle2 } from "lucide-react";

const CourseDetails = () => {
  const { courseId } = useParams();
  console.log("Course ID:", courseId);

  // Mock data - in a real app, this would be fetched based on courseId
  const courseProgress = {
    completed: 2,
    total: 10,
    percentage: 20,
    currentLesson: "القاعدة القانونية",
    nextLesson: "الحق القانوني",
    lastAccessed: "2024-02-20",
  };

  const lessons = [
    { id: 1, title: "مقدمة في القانون", duration: "15 دقيقة", completed: true },
    { id: 2, title: "القاعدة القانونية", duration: "20 دقيقة", completed: false },
    { id: 3, title: "الحق القانوني", duration: "25 دقيقة", completed: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10" dir="rtl">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{decodeURIComponent(courseId || "")}</CardTitle>
                <CardDescription>متابعة تقدمك في الدورة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>تقدم الدورة</span>
                      <span>{courseProgress.percentage}%</span>
                    </div>
                    <Progress value={courseProgress.percentage} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">الدرس الحالي</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4" />
                          <span>{courseProgress.currentLesson}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">الدرس القادم</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4" />
                          <span>{courseProgress.nextLesson}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>محتوى الدورة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        lesson.completed ? 'bg-secondary/50' : 'bg-background'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {lesson.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        ) : (
                          <Video className="w-5 h-5" />
                        )}
                        <span>{lesson.title}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {lesson.duration}
                        </span>
                        <Button variant={lesson.completed ? "secondary" : "default"}>
                          {lesson.completed ? 'مراجعة' : 'ابدأ الدرس'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>آخر نشاط</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      آخر دخول: {new Date(courseProgress.lastAccessed).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm">
                      {courseProgress.completed} من {courseProgress.total} دروس مكتملة
                    </span>
                  </div>
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
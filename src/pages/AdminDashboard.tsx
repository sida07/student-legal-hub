import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  BookOpen, 
  FileQuestion, 
  MessageSquare, 
  LayoutDashboard,
  Settings
} from "lucide-react";
import AdminCourses from "@/components/admin/AdminCourses";
import AdminExams from "@/components/admin/AdminExams";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminDiscussions from "@/components/admin/AdminDiscussions";
import AdminSettings from "@/components/admin/AdminSettings";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // إحصائيات عامة للوحة التحكم
  const stats = [
    {
      title: "إجمالي المستخدمين",
      value: "1,234",
      icon: Users,
    },
    {
      title: "الدورات النشطة",
      value: "45",
      icon: BookOpen,
    },
    {
      title: "الاختبارات",
      value: "89",
      icon: FileQuestion,
    },
    {
      title: "المناقشات",
      value: "156",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">لوحة التحكم</h1>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              الدورات
            </TabsTrigger>
            <TabsTrigger value="exams" className="flex items-center gap-2">
              <FileQuestion className="h-4 w-4" />
              الاختبارات
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              المستخدمين
            </TabsTrigger>
            <TabsTrigger value="discussions" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              المناقشات
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              الإعدادات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>نظرة عامة على النظام</CardTitle>
              </CardHeader>
              <CardContent>
                <p>مرحباً بك في لوحة التحكم. اختر أحد الأقسام للبدء في إدارة المحتوى.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses">
            <AdminCourses />
          </TabsContent>

          <TabsContent value="exams">
            <AdminExams />
          </TabsContent>

          <TabsContent value="users">
            <AdminUsers />
          </TabsContent>

          <TabsContent value="discussions">
            <AdminDiscussions />
          </TabsContent>

          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
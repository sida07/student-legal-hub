import { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";

interface DashboardStats {
  totalUsers: number;
  totalExams: number;
  totalDiscussions: number;
  totalComments: number;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalExams: 0,
    totalDiscussions: 0,
    totalComments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch total users
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch total exams
      const { count: examsCount } = await supabase
        .from('exams')
        .select('*', { count: 'exact', head: true });

      // Fetch total discussions
      const { count: discussionsCount } = await supabase
        .from('discussions')
        .select('*', { count: 'exact', head: true });

      // Fetch total comments
      const { count: commentsCount } = await supabase
        .from('discussion_comments')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalUsers: usersCount || 0,
        totalExams: examsCount || 0,
        totalDiscussions: discussionsCount || 0,
        totalComments: commentsCount || 0
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: "إجمالي المستخدمين",
      value: stats.totalUsers.toString(),
      icon: Users,
    },
    {
      title: "الاختبارات",
      value: stats.totalExams.toString(),
      icon: FileQuestion,
    },
    {
      title: "المناقشات",
      value: stats.totalDiscussions.toString(),
      icon: MessageSquare,
    },
    {
      title: "التعليقات",
      value: stats.totalComments.toString(),
      icon: BookOpen,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">جاري تحميل البيانات...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">لوحة التحكم</h1>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat) => (
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
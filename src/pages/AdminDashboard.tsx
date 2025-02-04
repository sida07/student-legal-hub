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
  Settings,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import AdminCourses from "@/components/admin/AdminCourses";
import AdminExams from "@/components/admin/AdminExams";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminDiscussions from "@/components/admin/AdminDiscussions";
import AdminSettings from "@/components/admin/AdminSettings";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const { count: examsCount } = await supabase
        .from('exams')
        .select('*', { count: 'exact', head: true });

      const { count: discussionsCount } = await supabase
        .from('discussions')
        .select('*', { count: 'exact', head: true });

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
      toast({
        title: "خطأ في جلب الإحصائيات",
        description: "حدث خطأ أثناء جلب إحصائيات لوحة التحكم",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: "إجمالي المستخدمين",
      value: stats.totalUsers.toString(),
      icon: Users,
      trend: "+12% من الشهر الماضي",
      trendUp: true,
    },
    {
      title: "الاختبارات",
      value: stats.totalExams.toString(),
      icon: FileQuestion,
      trend: "+5% من الشهر الماضي",
      trendUp: true,
    },
    {
      title: "المناقشات",
      value: stats.totalDiscussions.toString(),
      icon: MessageSquare,
      trend: "+8% من الشهر الماضي",
      trendUp: true,
    },
    {
      title: "التعليقات",
      value: stats.totalComments.toString(),
      icon: BookOpen,
      trend: "-3% من الشهر الماضي",
      trendUp: false,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`flex items-center text-sm mt-1 ${
                  stat.trendUp ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trendUp ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <AlertCircle className="h-4 w-4 mr-1" />
                  )}
                  {stat.trend}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs 
          defaultValue="overview" 
          className="space-y-6" 
          value={activeTab} 
          onValueChange={setActiveTab}
        >
          <TabsList className="bg-card">
            <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <LayoutDashboard className="h-4 w-4" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BookOpen className="h-4 w-4" />
              الدورات
            </TabsTrigger>
            <TabsTrigger value="exams" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileQuestion className="h-4 w-4" />
              الاختبارات
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="h-4 w-4" />
              المستخدمين
            </TabsTrigger>
            <TabsTrigger value="discussions" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MessageSquare className="h-4 w-4" />
              المناقشات
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Settings className="h-4 w-4" />
              الإعدادات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>نظرة عامة على النظام</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">مرحباً بك في لوحة التحكم. اختر أحد الأقسام للبدء في إدارة المحتوى.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">آخر النشاطات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          تم إضافة اختبار جديد
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          تسجيل مستخدم جديد
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                          تم إضافة مناقشة جديدة
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">الإحصائيات السريعة</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex justify-between text-sm">
                          <span>معدل إكمال الاختبارات</span>
                          <span className="font-medium">75%</span>
                        </li>
                        <li className="flex justify-between text-sm">
                          <span>متوسط الدرجات</span>
                          <span className="font-medium">82%</span>
                        </li>
                        <li className="flex justify-between text-sm">
                          <span>المستخدمين النشطين</span>
                          <span className="font-medium">45</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
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
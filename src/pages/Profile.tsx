import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, Camera, Mail, Settings, User } from "lucide-react";

const Profile = () => {
  const [imageUrl, setImageUrl] = useState<string>("/placeholder.svg");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      console.log("Profile image updated:", url);
    }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navigation />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={imageUrl} />
                <AvatarFallback>
                  <User className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
              <label 
                htmlFor="profile-image" 
                className="absolute bottom-0 right-0 p-1 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90"
              >
                <Camera className="w-4 h-4" />
              </label>
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">أحمد محمد</h1>
              <p className="text-muted-foreground">طالب قانون - السنة الثالثة</p>
            </div>
          </div>

          {/* Settings Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                إعدادات الحساب
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input id="name" defaultValue="أحمد محمد" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" type="email" defaultValue="ahmed@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input id="phone" type="tel" defaultValue="+966 50 123 4567" />
              </div>
            </CardContent>
          </Card>

          {/* Subscription Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                الاشتراك الحالي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">الباقة المتقدمة</h3>
                <p className="text-muted-foreground mb-4">صالح حتى: 31 ديسمبر 2024</p>
                <Button variant="secondary">تجديد الاشتراك</Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                إعدادات الإشعارات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notification-email">البريد الإلكتروني للإشعارات</Label>
                <Input 
                  id="notification-email" 
                  type="email" 
                  defaultValue="ahmed@example.com" 
                  placeholder="أدخل بريدك الإلكتروني لتلقي الإشعارات"
                />
              </div>
              <Button>حفظ التغييرات</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
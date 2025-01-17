import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, Camera, Mail, Settings, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const [imageUrl, setImageUrl] = useState<string>("/placeholder.svg");
  const [formData, setFormData] = useState({
    name: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "+966 50 123 4567",
    notificationEmail: "ahmed@example.com"
  });
  const { toast } = useToast();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      console.log("Profile image updated:", url);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    console.log(`Field ${id} updated:`, value);
  };

  const handleSaveChanges = () => {
    // Here you would typically make an API call to save the changes
    console.log("Saving profile changes:", formData);
    
    toast({
      title: "تم حفظ التغييرات",
      description: "تم تحديث معلومات الملف الشخصي بنجاح",
    });
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
              <h1 className="text-2xl font-bold">{formData.name}</h1>
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
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <Button onClick={handleSaveChanges}>حفظ التغييرات</Button>
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
                <Label htmlFor="notificationEmail">البريد الإلكتروني للإشعارات</Label>
                <Input 
                  id="notificationEmail" 
                  type="email" 
                  value={formData.notificationEmail}
                  onChange={handleInputChange}
                  placeholder="أدخل بريدك الإلكتروني لتلقي الإشعارات"
                />
              </div>
              <Button onClick={handleSaveChanges}>حفظ التغييرات</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
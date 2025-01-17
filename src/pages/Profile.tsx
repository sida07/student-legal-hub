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
    console.log("Saving profile changes:", formData);
    
    toast({
      title: "تم حفظ التغييرات",
      description: "تم تحديث معلومات الملف الشخصي بنجاح",
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]" dir="rtl">
      <Navigation />
      
      <div className="max-w-4xl mx-auto p-6">
        {/* Hero Section with Background Image */}
        <div className="relative mb-8 rounded-lg overflow-hidden h-48 bg-gradient-to-r from-primary to-secondary">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="relative -mt-20 mb-8 px-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={imageUrl} />
                  <AvatarFallback>
                    <User className="w-16 h-16" />
                  </AvatarFallback>
                </Avatar>
                <label 
                  htmlFor="profile-image" 
                  className="absolute bottom-2 right-2 p-2 bg-white text-primary rounded-full cursor-pointer hover:bg-gray-50 shadow-md transition-colors"
                >
                  <Camera className="w-5 h-5" />
                </label>
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <div className="mt-4 text-center">
                <h1 className="text-2xl font-bold text-gray-900">{formData.name}</h1>
                <p className="text-gray-600">طالب قانون - السنة الثالثة</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Settings Section */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings className="w-5 h-5 text-primary" />
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
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-white"
                  />
                </div>
                <Button 
                  onClick={handleSaveChanges}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  حفظ التغييرات
                </Button>
              </CardContent>
            </Card>

            {/* Subscription Section */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bell className="w-5 h-5 text-primary" />
                  الاشتراك الحالي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-lg border border-gray-100">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">الباقة المتقدمة</h3>
                  <p className="text-gray-600 mb-4">صالح حتى: 31 ديسمبر 2024</p>
                  <Button variant="outline" className="w-full">تجديد الاشتراك</Button>
                </div>
              </CardContent>
            </Card>

            {/* Notifications Section */}
            <Card className="shadow-sm md:col-span-2">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mail className="w-5 h-5 text-primary" />
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
                    className="bg-white"
                    placeholder="أدخل بريدك الإلكتروني لتلقي الإشعارات"
                  />
                </div>
                <Button 
                  onClick={handleSaveChanges}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  حفظ التغييرات
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
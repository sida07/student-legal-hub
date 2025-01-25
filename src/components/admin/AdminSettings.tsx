import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>إعدادات النظام</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="siteName">اسم الموقع</Label>
          <Input id="siteName" defaultValue="بوابة القانون" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="siteDescription">وصف الموقع</Label>
          <Input id="siteDescription" defaultValue="منصة تعليمية متخصصة في القانون" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="adminEmail">البريد الإلكتروني للمشرف</Label>
          <Input id="adminEmail" type="email" defaultValue="admin@example.com" />
        </div>
        
        <Button className="w-full">حفظ الإعدادات</Button>
      </CardContent>
    </Card>
  );
};

export default AdminSettings;
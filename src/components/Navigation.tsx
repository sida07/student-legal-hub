import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, BookOpen, User, Home, FileQuestion, MessageSquare, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "تم تسجيل الخروج بنجاح",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "خطأ في تسجيل الخروج",
        description: error.message,
      });
    }
  };

  const menuItems = [
    { name: "الرئيسية", path: "/", icon: Home },
    { name: "الدورات", path: "/courses", icon: BookOpen },
    { name: "الاختبارات", path: "/exams", icon: FileQuestion },
    { name: "النقاشات", path: "/discussions", icon: MessageSquare },
    { name: "الملف الشخصي", path: "/profile", icon: User, requiresAuth: true },
  ];

  return (
    <nav className="bg-primary text-primary-foreground" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-xl font-bold">بوابة القانون</h1>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems
                .filter(item => !item.requiresAuth || user)
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground/10"
                    >
                      <Icon className="w-4 h-4 ml-2" />
                      {item.name}
                    </Link>
                  );
              })}
              {user ? (
                <Button 
                  variant="secondary" 
                  className="mr-4"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 ml-2" />
                  تسجيل الخروج
                </Button>
              ) : (
                <Button 
                  variant="secondary" 
                  className="mr-4"
                  onClick={() => navigate("/auth")}
                >
                  تسجيل الدخول
                </Button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-primary-foreground/10"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems
              .filter(item => !item.requiresAuth || user)
              .map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-4 h-4 ml-2" />
                    {item.name}
                  </Link>
                );
            })}
            {user ? (
              <Button 
                variant="secondary" 
                className="w-full mt-4"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 ml-2" />
                تسجيل الخروج
              </Button>
            ) : (
              <Button 
                variant="secondary" 
                className="w-full mt-4"
                onClick={() => {
                  navigate("/auth");
                  setIsOpen(false);
                }}
              >
                تسجيل الدخول
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
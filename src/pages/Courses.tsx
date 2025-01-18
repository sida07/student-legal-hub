import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Users, Award, Star, Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const courses = [
  {
    title: "مقدمة في القانون",
    description: "تعلم أساسيات النظم والمبادئ القانونية",
    students: 234,
    level: "مبتدئ",
    duration: "8 أسابيع",
    rating: 4.5,
    isFavorite: false,
  },
  {
    title: "القانون الدستوري",
    description: "دراسة المبادئ الأساسية للقانون الدستوري",
    students: 189,
    level: "متوسط",
    duration: "12 أسبوع",
    rating: 4.8,
    isFavorite: false,
  },
  {
    title: "القانون الجنائي",
    description: "استكشاف العدالة الجنائية والإجراءات القانونية",
    students: 156,
    level: "متقدم",
    duration: "10 أسابيع",
    rating: 4.2,
    isFavorite: false,
  },
  {
    title: "القانون المدني",
    description: "فهم الحقوق والمسؤوليات المدنية",
    students: 145,
    level: "متوسط",
    duration: "10 أسابيع",
    rating: 4.6,
    isFavorite: false,
  },
  {
    title: "القانون الدولي",
    description: "دراسة الأطر والمؤسسات القانونية العالمية",
    students: 178,
    level: "متقدم",
    duration: "14 أسبوع",
    rating: 4.7,
    isFavorite: false,
  },
  {
    title: "الكتابة القانونية",
    description: "إتقان فن التوثيق القانوني",
    students: 210,
    level: "مبتدئ",
    duration: "6 أسابيع",
    rating: 4.4,
    isFavorite: false,
  },
];

const Courses = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [localCourses, setLocalCourses] = useState(courses);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterCourses(query, selectedLevel);
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
    filterCourses(searchQuery, level);
  };

  const filterCourses = (query: string, level: string) => {
    let filtered = [...courses];
    
    if (query) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (level && level !== 'all') {
      filtered = filtered.filter(course => course.level === level);
    }
    
    setLocalCourses(filtered);
  };

  const toggleFavorite = (index: number) => {
    const updatedCourses = [...localCourses];
    updatedCourses[index] = {
      ...updatedCourses[index],
      isFavorite: !updatedCourses[index].isFavorite,
    };
    setLocalCourses(updatedCourses);
  };

  const handleShare = (course: typeof courses[0]) => {
    console.log("Sharing course:", course.title);
  };

  const handleViewCourse = (course: typeof courses[0]) => {
    console.log("Navigating to course:", course.title);
    navigate(`/courses/${encodeURIComponent(course.title)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10" dir="rtl">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">الدورات المتاحة</h1>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="ابحث عن الدورات..."
                className="pr-9"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            
            <Select value={selectedLevel} onValueChange={handleLevelChange}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="المستوى" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المستويات</SelectItem>
                <SelectItem value="مبتدئ">مبتدئ</SelectItem>
                <SelectItem value="متوسط">متوسط</SelectItem>
                <SelectItem value="متقدم">متقدم</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localCourses.map((course, index) => (
            <Card key={course.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{course.title}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(index)}
                      className={course.isFavorite ? "text-red-500" : ""}
                    >
                      <Heart className="w-5 h-5" fill={course.isFavorite ? "currentColor" : "none"} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleShare(course)}
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students} طالب
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {course.level}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-sm text-muted-foreground">
                        المدة: {course.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4"
                            fill={i < Math.floor(course.rating) ? "currentColor" : "none"}
                            color={i < Math.floor(course.rating) ? "#fbbf24" : "#e5e7eb"}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {course.rating}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => handleViewCourse(course)}
                  >
                    عرض الدورة
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

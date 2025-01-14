import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Users, Award } from "lucide-react";

const courses = [
  {
    title: "Introduction to Law",
    description: "Learn the fundamentals of legal systems and principles",
    students: 234,
    level: "Beginner",
    duration: "8 weeks",
  },
  {
    title: "Constitutional Law",
    description: "Study the core principles of constitutional law",
    students: 189,
    level: "Intermediate",
    duration: "12 weeks",
  },
  {
    title: "Criminal Law",
    description: "Explore criminal justice and legal procedures",
    students: 156,
    level: "Advanced",
    duration: "10 weeks",
  },
  {
    title: "Civil Law",
    description: "Understanding civil rights and responsibilities",
    students: 145,
    level: "Intermediate",
    duration: "10 weeks",
  },
  {
    title: "International Law",
    description: "Study global legal frameworks and institutions",
    students: 178,
    level: "Advanced",
    duration: "14 weeks",
  },
  {
    title: "Legal Writing",
    description: "Master the art of legal documentation",
    students: 210,
    level: "Beginner",
    duration: "6 weeks",
  },
];

const Courses = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Available Courses</h1>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search courses..."
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students} students
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      {course.level}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    Duration: {course.duration}
                  </div>
                </div>
                <Button className="w-full">
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
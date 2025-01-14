import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Award } from "lucide-react";

const featuredCourses = [
  {
    title: "Introduction to Law",
    description: "Learn the fundamentals of legal systems and principles",
    students: 234,
    level: "Beginner",
  },
  {
    title: "Constitutional Law",
    description: "Study the core principles of constitutional law",
    students: 189,
    level: "Intermediate",
  },
  {
    title: "Criminal Law",
    description: "Explore criminal justice and legal procedures",
    students: 156,
    level: "Advanced",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              Welcome to Student Law Portal
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl sm:mt-5 sm:max-w-xl">
              Your gateway to legal education excellence
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <Card key={course.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {course.students} students
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    {course.level}
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Course
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-secondary/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Content</h3>
                <p className="text-muted-foreground">
                  Learn from top legal professionals and academics
                </p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  Connect with fellow law students and professionals
                </p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Certification</h3>
                <p className="text-muted-foreground">
                  Earn recognized certificates upon completion
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
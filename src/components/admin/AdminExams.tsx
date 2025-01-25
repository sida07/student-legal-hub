import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Exam {
  id: number;
  title: string;
  course: string;
  attempts: number;
  status: string;
  questions: Question[];
}

const AdminExams = () => {
  const [exams, setExams] = useState<Exam[]>([
    {
      id: 1,
      title: "اختبار القانون المدني",
      course: "مقدمة في القانون المدني",
      attempts: 156,
      status: "نشط",
      questions: [],
    },
  ]);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      title: "",
      course: "",
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "1",
      explanation: "",
    },
  });

  const handleAddExam = (data: any) => {
    const newExam: Exam = {
      id: exams.length + 1,
      title: data.title,
      course: data.course,
      attempts: 0,
      status: "نشط",
      questions: [],
    };
    setExams([...exams, newExam]);
    toast({
      title: "تم إضافة الاختبار بنجاح",
    });
  };

  const handleAddQuestion = (data: any) => {
    if (!selectedExam) return;

    const newQuestion: Question = {
      id: selectedExam.questions.length + 1,
      text: data.questionText,
      options: data.options,
      correctAnswer: parseInt(data.correctAnswer) - 1, // تحويل من 1-4 إلى 0-3
      explanation: data.explanation,
    };

    const updatedExam = {
      ...selectedExam,
      questions: [...selectedExam.questions, newQuestion],
    };

    setExams(exams.map(exam => 
      exam.id === selectedExam.id ? updatedExam : exam
    ));

    setSelectedExam(updatedExam);
    form.reset({
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "1",
      explanation: "",
    });
    setIsAddingQuestion(false);
    toast({
      title: "تم إضافة السؤال بنجاح",
    });
  };

  const handleDeleteQuestion = (questionId: number) => {
    if (!selectedExam) return;

    const updatedQuestions = selectedExam.questions.filter(q => q.id !== questionId);
    const updatedExam = {
      ...selectedExam,
      questions: updatedQuestions,
    };

    setExams(exams.map(exam => 
      exam.id === selectedExam.id ? updatedExam : exam
    ));
    setSelectedExam(updatedExam);
    toast({
      title: "تم حذف السؤال بنجاح",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>إدارة الاختبارات</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              إضافة اختبار جديد
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة اختبار جديد</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddExam)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>عنوان الاختبار</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الدورة</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">إضافة</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>عنوان الاختبار</TableHead>
              <TableHead>الدورة</TableHead>
              <TableHead>عدد المحاولات</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>{exam.title}</TableCell>
                <TableCell>{exam.course}</TableCell>
                <TableCell>{exam.attempts}</TableCell>
                <TableCell>{exam.status}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedExam(exam)}
                      >
                        إدارة الأسئلة
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>إدارة أسئلة {exam.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Button
                          onClick={() => setIsAddingQuestion(true)}
                          className="flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          إضافة سؤال جديد
                        </Button>

                        {isAddingQuestion && (
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleAddQuestion)} className="space-y-4">
                              <FormField
                                control={form.control}
                                name="questionText"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>نص السؤال</FormLabel>
                                    <FormControl>
                                      <Textarea {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              {[0, 1, 2, 3].map((index) => (
                                <FormField
                                  key={index}
                                  control={form.control}
                                  name={`options.${index}`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>الخيار {index + 1}</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              ))}
                              <FormField
                                control={form.control}
                                name="correctAnswer"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>رقم الإجابة الصحيحة (1-4)</FormLabel>
                                    <FormControl>
                                      <Input 
                                        type="number" 
                                        min="1" 
                                        max="4" 
                                        {...field}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="explanation"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>تعليل الإجابة الصحيحة</FormLabel>
                                    <FormControl>
                                      <Textarea {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <div className="flex gap-2">
                                <Button type="submit">حفظ السؤال</Button>
                                <Button 
                                  type="button" 
                                  variant="outline"
                                  onClick={() => {
                                    setIsAddingQuestion(false);
                                    form.reset({
                                      questionText: "",
                                      options: ["", "", "", ""],
                                      correctAnswer: "1",
                                      explanation: "",
                                    });
                                  }}
                                >
                                  إلغاء
                                </Button>
                              </div>
                            </form>
                          </Form>
                        )}

                        <div className="space-y-4">
                          {selectedExam?.questions.map((question, index) => (
                            <Card key={question.id}>
                              <CardHeader className="flex flex-row items-start justify-between">
                                <div>
                                  <CardTitle className="text-lg">
                                    السؤال {index + 1}
                                  </CardTitle>
                                  <p className="mt-2">{question.text}</p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteQuestion(question.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2">
                                  {question.options.map((option, optionIndex) => (
                                    <div
                                      key={optionIndex}
                                      className={`p-2 rounded ${
                                        optionIndex === question.correctAnswer
                                          ? "bg-green-100 dark:bg-green-900"
                                          : "bg-gray-50 dark:bg-gray-800"
                                      }`}
                                    >
                                      {option}
                                    </div>
                                  ))}
                                  <div className="mt-4">
                                    <Label>تعليل الإجابة الصحيحة:</Label>
                                    <p className="mt-1 text-muted-foreground">
                                      {question.explanation}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminExams;

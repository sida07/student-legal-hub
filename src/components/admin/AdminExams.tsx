import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, X, Save } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  type: "historical" | "subject";
  year?: string;
  subject?: string;
  attempts: number;
  status: string;
  questions: Question[];
}

const years = Array.from({ length: 25 }, (_, i) => ({
  year: (2024 - i).toString(),
  count: 50,
}));

const AdminExams = () => {
  const [exams, setExams] = useState<Exam[]>([
    {
      id: 1,
      title: "اختبار القانون المدني 2024",
      type: "subject",
      subject: "القانون المدني",
      attempts: 156,
      status: "نشط",
      questions: [],
    },
  ]);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      title: "",
      type: "historical",
      year: "",
      subject: "",
      questionText: "",
      options: ["", "", ""],
      correctAnswer: "1",
      explanation: "",
    },
  });

  const handleAddExam = (data: any) => {
    const maxQuestions = data.type === "historical" ? 50 : 100;
    const newExam: Exam = {
      id: exams.length + 1,
      title: data.title,
      type: data.type,
      ...(data.type === "historical" ? { year: data.year } : { subject: data.subject }),
      attempts: 0,
      status: "نشط",
      questions: [],
    };
    setExams([...exams, newExam]);
    toast({
      title: "تم إضافة الاختبار بنجاح",
      description: `يمكنك إضافة حتى ${maxQuestions} سؤال لهذا الاختبار`,
    });
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    form.reset({
      questionText: question.text,
      options: question.options,
      correctAnswer: (question.correctAnswer + 1).toString(),
      explanation: question.explanation,
    });
    setIsAddingQuestion(true);
  };

  const handleAddQuestion = (data: any) => {
    if (!selectedExam) return;

    const maxQuestions = selectedExam.type === "historical" ? 50 : 100;
    if (selectedExam.questions.length >= maxQuestions && !editingQuestion) {
      toast({
        title: "لا يمكن إضافة المزيد من الأسئلة",
        description: `الحد الأقصى هو ${maxQuestions} سؤال`,
        variant: "destructive",
      });
      return;
    }

    const questionData = {
      text: data.questionText,
      options: data.options,
      correctAnswer: parseInt(data.correctAnswer) - 1,
      explanation: data.explanation,
    };

    let updatedQuestions;
    if (editingQuestion) {
      updatedQuestions = selectedExam.questions.map(q => 
        q.id === editingQuestion.id ? { ...questionData, id: q.id } : q
      );
      toast({
        title: "تم تحديث السؤال بنجاح",
      });
    } else {
      const newQuestion = {
        ...questionData,
        id: selectedExam.questions.length + 1,
      };
      updatedQuestions = [...selectedExam.questions, newQuestion];
      toast({
        title: "تم إضافة السؤال بنجاح",
      });
    }

    const updatedExam = {
      ...selectedExam,
      questions: updatedQuestions,
    };

    setExams(exams.map(exam => 
      exam.id === selectedExam.id ? updatedExam : exam
    ));

    setSelectedExam(updatedExam);
    form.reset({
      questionText: "",
      options: ["", "", ""],
      correctAnswer: "1",
      explanation: "",
    });
    setIsAddingQuestion(false);
    setEditingQuestion(null);
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

  const cancelEdit = () => {
    setIsAddingQuestion(false);
    setEditingQuestion(null);
    form.reset({
      questionText: "",
      options: ["", "", ""],
      correctAnswer: "1",
      explanation: "",
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
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نوع الاختبار</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر نوع الاختبار" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="historical">اختبار سنوات سابقة</SelectItem>
                          <SelectItem value="subject">اختبار مادة</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                {form.watch("type") === "historical" ? (
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>السنة</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر السنة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {years.map(y => (
                              <SelectItem key={y.year} value={y.year}>
                                {y.year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المادة</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر المادة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="القانون المدني">القانون المدني</SelectItem>
                            <SelectItem value="القانون الجزائي">القانون الجزائي</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                )}
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
              <TableHead>نوع الاختبار</TableHead>
              <TableHead>عدد المحاولات</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>{exam.title}</TableCell>
                <TableCell>{exam.type === "historical" ? "اختبار سنوات سابقة" : "اختبار مادة"}</TableCell>
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
                          onClick={() => {
                            setIsAddingQuestion(true);
                            setEditingQuestion(null);
                          }}
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
                              {[0, 1, 2].map((index) => (
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
                                    <FormLabel>رقم الإجابة الصحيحة (1-3)</FormLabel>
                                    <FormControl>
                                      <Input 
                                        type="number" 
                                        min="1" 
                                        max="3" 
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
                                <Button type="submit">
                                  {editingQuestion ? "حفظ التعديلات" : "حفظ السؤال"}
                                </Button>
                                <Button 
                                  type="button" 
                                  variant="outline"
                                  onClick={cancelEdit}
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
                                <div className="flex gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEditQuestion(question)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
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
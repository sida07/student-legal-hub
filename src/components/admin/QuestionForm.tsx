import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Question } from "./types";

interface QuestionFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: Question | null;
  isEditing?: boolean;
}

const formSchema = z.object({
  questionText: z.string().min(10, "نص السؤال يجب أن يكون 10 أحرف على الأقل"),
  options: z.array(z.string().min(1, "الخيار مطلوب")).min(3, "يجب إضافة 3 خيارات على الأقل"),
  correctAnswer: z.string().regex(/^[1-3]$/, "الرجاء اختيار رقم من 1 إلى 3"),
  explanation: z.string().min(10, "التعليل يجب أن يكون 10 أحرف على الأقل"),
});

const QuestionForm = ({ onSubmit, onCancel, initialData, isEditing }: QuestionFormProps) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionText: initialData?.text || "",
      options: initialData?.options || ["", "", ""],
      correctAnswer: initialData ? (initialData.correctAnswer + 1).toString() : "1",
      explanation: initialData?.explanation || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="questionText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نص السؤال</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
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
                <FormMessage />
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
                <Input type="number" min="1" max="3" {...field} />
              </FormControl>
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit">
            {isEditing ? "حفظ التعديلات" : "إضافة السؤال"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            إلغاء
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
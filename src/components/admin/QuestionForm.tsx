import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Question } from "./types";

interface QuestionFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: Question;
  isEditing?: boolean;
}

const QuestionForm = ({ onSubmit, onCancel, initialData, isEditing }: QuestionFormProps) => {
  const form = useForm({
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
            {isEditing ? "حفظ التعديلات" : "حفظ السؤال"}
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={onCancel}
          >
            إلغاء
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
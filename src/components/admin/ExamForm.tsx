import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Exam } from "./types";

interface ExamFormProps {
  onSubmit: (data: any) => void;
  years: { year: string; count: number }[];
  initialData?: Exam | null;
  isEditing?: boolean;
}

const ExamForm = ({ onSubmit, years, initialData, isEditing }: ExamFormProps) => {
  const form = useForm({
    defaultValues: {
      title: initialData?.title || "",
      type: initialData?.type || "historical",
      year: initialData?.year || "",
      subject: initialData?.subject || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <Button type="submit">
          {isEditing ? "حفظ التعديلات" : "إضافة"}
        </Button>
      </form>
    </Form>
  );
};

export default ExamForm;
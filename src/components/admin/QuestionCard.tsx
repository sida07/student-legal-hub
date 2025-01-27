import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Edit, X } from "lucide-react";
import { Question } from "./types";

interface QuestionCardProps {
  question: Question;
  index: number;
  onEdit: (question: Question) => void;
  onDelete: (id: number) => void;
}

const QuestionCard = ({ question, index, onEdit, onDelete }: QuestionCardProps) => {
  return (
    <Card>
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
            onClick={() => onEdit(question)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(question.id)}
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
  );
};

export default QuestionCard;
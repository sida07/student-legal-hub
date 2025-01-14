import { useState } from "react";
import Navigation from "@/components/Navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    text: "ما هو المبدأ الأساسي في القانون المدني؟",
    options: ["العقد شريعة المتعاقدين", "حرية التعاقد", "مبدأ حسن النية"],
    correctAnswer: 0
  },
  {
    id: 2,
    text: "متى يعتبر العقد باطلاً؟",
    options: ["عند تخلف ركن من أركانه", "عند الإخلال بتنفيذه", "عند تأخر تنفيذه"],
    correctAnswer: 0
  },
  {
    id: 3,
    text: "ما هو الحد الأدنى لسن الرشد في القانون المدني؟",
    options: ["18 سنة", "21 سنة", "16 سنة"],
    correctAnswer: 0
  },
  {
    id: 4,
    text: "ما هو مفهوم المسؤولية المدنية؟",
    options: ["الالتزام بتعويض الأضرار", "الالتزام بتنفيذ العقود", "الالتزام بالوفاء بالديون"],
    correctAnswer: 0
  },
  {
    id: 5,
    text: "ما هي أنواع العقود؟",
    options: ["عقود ملزمة وعقود غير ملزمة", "عقود شفوية وعقود مكتوبة", "عقود تجارية وعقود مدنية"],
    correctAnswer: 1
  },
  {
    id: 6,
    text: "ما هو مفهوم الملكية؟",
    options: ["الحق في التصرف في الشيء", "الحق في الانتفاع بالشيء", "الحق في حيازة الشيء"],
    correctAnswer: 0
  },
  {
    id: 7,
    text: "ما هو مفهوم الوكالة؟",
    options: ["تفويض شخص للقيام بعمل معين", "عقد بين طرفين", "حق في التصرف في المال"],
    correctAnswer: 0
  },
  {
    id: 8,
    text: "ما هي شروط صحة العقد؟",
    options: ["التراضي، الأهلية، المحل، السبب", "التراضي، الشكل، السبب", "الأهلية، الشكل، المحل"],
    correctAnswer: 0
  },
  {
    id: 9,
    text: "ما هو مفهوم الالتزام؟",
    options: ["الواجب القانوني", "الحق الشخصي", "الحق العيني"],
    correctAnswer: 0
  },
  {
    id: 10,
    text: "ما هي أنواع المسؤولية؟",
    options: ["مسؤولية مدنية ومسؤولية جنائية", "مسؤولية عقدية ومسؤولية تقصيرية", "مسؤولية شخصية ومسؤولية موضوعية"],
    correctAnswer: 1
  },
  {
    id: 11,
    text: "ما هو مفهوم التعويض؟",
    options: ["إعادة الحالة إلى ما كانت عليه", "دفع مبلغ مالي", "تقديم اعتذار"],
    correctAnswer: 0
  },
  {
    id: 12,
    text: "ما هو مفهوم الحيازة؟",
    options: ["التمتع بالشيء", "الحق في التصرف", "الحق في الانتفاع"],
    correctAnswer: 0
  },
  {
    id: 13,
    text: "ما هي أنواع الحيازة؟",
    options: ["حيازة قانونية وحيازة فعلية", "حيازة مؤقتة وحيازة دائمة", "حيازة مشروعة وحيازة غير مشروعة"],
    correctAnswer: 0
  },
  {
    id: 14,
    text: "ما هو مفهوم الإيجار؟",
    options: ["عقد يلتزم بموجبه المؤجر بتسليم العين", "عقد يلتزم بموجبه المستأجر بدفع الأجرة", "عقد يلتزم بموجبه الطرفان بتبادل المنافع"],
    correctAnswer: 0
  },
  {
    id: 15,
    text: "ما هي شروط صحة الإيجار؟",
    options: ["التراضي، الأهلية، المحل، السبب", "التراضي، الشكل، السبب", "الأهلية، الشكل، المحل"],
    correctAnswer: 0
  },
  {
    id: 16,
    text: "ما هو مفهوم البيع؟",
    options: ["عقد يلتزم بموجبه البائع بنقل الملكية", "عقد يلتزم بموجبه المشتري بدفع الثمن", "عقد يلتزم بموجبه الطرفان بتبادل المنافع"],
    correctAnswer: 0
  },
  {
    id: 17,
    text: "ما هي أنواع البيع؟",
    options: ["بيع عادي وبيع بالتقسيط", "بيع نقدي وبيع آجل", "بيع حقيقي وبيع صوري"],
    correctAnswer: 1
  },
  {
    id: 18,
    text: "ما هو مفهوم الشفعة؟",
    options: ["حق الشريك في شراء نصيب شريكه", "حق المشتري في استرداد الثمن", "حق البائع في استرداد المبيع"],
    correctAnswer: 0
  },
  {
    id: 19,
    text: "ما هي شروط الشفعة؟",
    options: ["وجود شريك، وجود بيع، وجود ثمن", "وجود شريك، وجود عقد، وجود ملكية", "وجود شريك، وجود حيازة، وجود ثمن"],
    correctAnswer: 0
  },
  {
    id: 20,
    text: "ما هو مفهوم الرهن؟",
    options: ["تأمين دين بعين معينة", "عقد يلتزم بموجبه المدين بدفع الدين", "عقد يلتزم بموجبه الدائن باسترداد الدين"],
    correctAnswer: 0
  },
  {
    id: 21,
    text: "ما هي أنواع الرهن؟",
    options: ["رهن حيازي ورهن تأميني", "رهن رسمي ورهن عادي", "رهن قانوني ورهن اختياري"],
    correctAnswer: 0
  },
  {
    id: 22,
    text: "ما هو مفهوم الكفالة؟",
    options: ["التزام شخص بدفع دين شخص آخر", "التزام شخص بتقديم خدمة لشخص آخر", "التزام شخص بتعويض شخص آخر"],
    correctAnswer: 0
  },
  {
    id: 23,
    text: "ما هي أنواع الكفالة؟",
    options: ["كفالة شخصية وكفالة عينية", "كفالة قانونية وكفالة اختيارية", "كفالة عادية وكفالة مشروطة"],
    correctAnswer: 0
  },
  {
    id: 24,
    text: "ما هو مفهوم الوصية؟",
    options: ["تصرف قانوني ينفذ بعد وفاة الموصي", "تصرف قانوني ينفذ أثناء حياة الموصي", "تصرف قانوني ينفذ بعد وفاة الموصي"],
    correctAnswer: 0
  },
  {
    id: 25,
    text: "ما هي شروط صحة الوصية؟",
    options: ["التراضي، الأهلية، المحل، السبب", "التراضي، الشكل، السبب", "الأهلية، الشكل، المحل"],
    correctAnswer: 0
  },
  {
    id: 26,
    text: "ما هو مفهوم الإرث؟",
    options: ["نقل الملكية بعد وفاة المورث", "نقل الملكية أثناء حياة المورث", "نقل الملكية بموجب عقد"],
    correctAnswer: 0
  },
  {
    id: 27,
    text: "ما هي أنواع الإرث؟",
    options: ["إرث قانوني وإرث وصية", "إرث عادي وإرث خاص", "إرث مشترك وإرث فردي"],
    correctAnswer: 0
  },
  {
    id: 28,
    text: "ما هو مفهوم الحضانة؟",
    options: ["حق الوالدين في رعاية الأطفال", "حق الأطفال في العيش مع الوالدين", "حق الوالدين في اتخاذ القرارات"],
    correctAnswer: 0
  },
  {
    id: 29,
    text: "ما هي أنواع الحضانة؟",
    options: ["حضانة شرعية وحضانة قانونية", "حضانة مؤقتة وحضانة دائمة", "حضانة مشتركة وحضانة فردية"],
    correctAnswer: 0
  },
  {
    id: 30,
    text: "ما هو مفهوم الطلاق؟",
    options: ["إنهاء العلاقة الزوجية", "تغيير الحالة الاجتماعية", "تغيير الحقوق والواجبات"],
    correctAnswer: 0
  },
  {
    id: 31,
    text: "ما هي أنواع الطلاق؟",
    options: ["طلاق بائن وطلاق رجعي", "طلاق عادي وطلاق خاص", "طلاق مشروط وطلاق غير مشروط"],
    correctAnswer: 0
  },
  {
    id: 32,
    text: "ما هو مفهوم النفقة؟",
    options: ["الالتزام بتوفير الاحتياجات الأساسية", "الالتزام بدفع المبالغ المالية", "الالتزام بتقديم الخدمات"],
    correctAnswer: 0
  },
  {
    id: 33,
    text: "ما هي أنواع النفقة؟",
    options: ["نفقة الزوجة ونفقة الأولاد", "نفقة الوالدين ونفقة الأجداد", "نفقة الأصدقاء ونفقة الأقارب"],
    correctAnswer: 0
  },
  {
    id: 34,
    text: "ما هو مفهوم الحجز؟",
    options: ["تأمين الدين عن طريق حجز الأموال", "تأمين الدين عن طريق حجز الممتلكات", "تأمين الدين عن طريق حجز العقارات"],
    correctAnswer: 0
  },
  {
    id: 35,
    text: "ما هي أنواع الحجز؟",
    options: ["حجز تحفظي وحجز تنفيذي", "حجز قانوني وحجز اختياري", "حجز عادي وحجز خاص"],
    correctAnswer: 0
  },
  {
    id: 36,
    text: "ما هو مفهوم الدعوى؟",
    options: ["الطلب المقدم إلى المحكمة", "الطلب المقدم إلى الجهة الإدارية", "الطلب المقدم إلى الشرطة"],
    correctAnswer: 0
  },
  {
    id: 37,
    text: "ما هي أنواع الدعوى؟",
    options: ["دعوى مدنية ودعوى جنائية", "دعوى إدارية ودعوى تجارية", "دعوى شخصية ودعوى موضوعية"],
    correctAnswer: 0
  },
  {
    id: 38,
    text: "ما هو مفهوم الحكم؟",
    options: ["القرار الصادر عن المحكمة", "القرار الصادر عن الجهة الإدارية", "القرار الصادر عن الشرطة"],
    correctAnswer: 0
  },
  {
    id: 39,
    text: "ما هي أنواع الحكم؟",
    options: ["حكم نهائي وحكم مؤقت", "حكم عادي وحكم خاص", "حكم مشروط وحكم غير مشروط"],
    correctAnswer: 0
  },
  {
    id: 40,
    text: "ما هو مفهوم الاستئناف؟",
    options: ["الطعن في الحكم الصادر", "الطعن في القرار الإداري", "الطعن في القرار الشرطي"],
    correctAnswer: 0
  },
  {
    id: 41,
    text: "ما هي أنواع الاستئناف؟",
    options: ["استئناف عادي واستئناف خاص", "استئناف قانوني واستئناف إداري", "استئناف تجاري واستئناف مدني"],
    correctAnswer: 0
  },
  {
    id: 42,
    text: "ما هو مفهوم النقض؟",
    options: ["الطعن في الحكم الصادر من محكمة الاستئناف", "الطعن في القرار الإداري", "الطعن في القرار الشرطي"],
    correctAnswer: 0
  },
  {
    id: 43,
    text: "ما هي أنواع النقض؟",
    options: ["نقض عادي ونقض خاص", "نقض قانوني ونقض إداري", "نقض تجاري ونقض مدني"],
    correctAnswer: 0
  },
  {
    id: 44,
    text: "ما هو مفهوم التنفيذ؟",
    options: ["تنفيذ الحكم الصادر", "تنفيذ القرار الإداري", "تنفيذ القرار الشرطي"],
    correctAnswer: 0
  },
  {
    id: 45,
    text: "ما هي أنواع التنفيذ؟",
    options: ["تنفيذ عادي وتنفيذ خاص", "تنفيذ قانوني وتنفيذ إداري", "تنفيذ تجاري وتنفيذ مدني"],
    correctAnswer: 0
  },
  {
    id: 46,
    text: "ما هو مفهوم التعسف في استعمال الحق؟",
    options: ["استعمال الحق بطريقة غير مشروعة", "استعمال الحق بطريقة مشروعة", "استعمال الحق بطريقة غير عادلة"],
    correctAnswer: 0
  },
  {
    id: 47,
    text: "ما هي أنواع التعسف في استعمال الحق؟",
    options: ["تعسف قانوني وتعسف إداري", "تعسف عادي وتعسف خاص", "تعسف تجاري وتعسف مدني"],
    correctAnswer: 0
  },
  {
    id: 48,
    text: "ما هو مفهوم الحماية القانونية؟",
    options: ["حماية الحقوق من الاعتداء", "حماية الحقوق من الإهمال", "حماية الحقوق من التعدي"],
    correctAnswer: 0
  },
  {
    id: 49,
    text: "ما هي أنواع الحماية القانونية؟",
    options: ["حماية قانونية وحماية إدارية", "حماية عادية وحماية خاصة", "حماية تجارية وحماية مدنية"],
    correctAnswer: 0
  },
  {
    id: 50,
    text: "ما هو مفهوم العدالة؟",
    options: ["تحقيق المساواة بين الأفراد", "تحقيق المساواة بين الحقوق", "تحقيق المساواة بين الواجبات"],
    correctAnswer: 0
  }
];

const ExamQuestions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      answer: ""
    }
  });

  const onSubmit = (data: { answer: string }) => {
    const isCorrect = parseInt(data.answer) === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      form.reset();
    } else {
      setShowResults(true);
      toast({
        title: "تم إنهاء الاختبار",
        description: `نتيجتك: ${score} من ${questions.length}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {!showResults ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">اختبار القانون</h1>
              <span className="text-muted-foreground">
                السؤال {currentQuestion + 1} من {questions.length}
              </span>
            </div>

            <div className="p-6 border rounded-lg shadow-sm">
              <h2 className="text-xl mb-4">{questions[currentQuestion].text}</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="answer"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3"
                          >
                            {questions[currentQuestion].options.map((option, index) => (
                              <div key={index} className="flex items-center space-x-2 space-x-reverse">
                                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                                <FormLabel htmlFor={`option-${index}`} className="font-normal">
                                  {option}
                                </FormLabel>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    {currentQuestion === questions.length - 1 ? "إنهاء الاختبار" : "السؤال التالي"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">نتيجة الاختبار</h2>
            <p className="text-xl">
              لقد حصلت على {score} من أصل {questions.length} نقطة
            </p>
            <Button 
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setShowResults(false);
                form.reset();
              }}
            >
              إعادة الاختبار
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamQuestions;

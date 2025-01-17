import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Comment {
  id: number;
  author: string;
  authorAvatar: string;
  content: string;
  likes: number;
  timestamp: string;
}

interface Discussion {
  id: number;
  author: string;
  authorAvatar: string;
  title: string;
  content: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
}

const Discussions = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: 1,
      author: "أحمد محمد",
      authorAvatar: "/placeholder.svg",
      title: "سؤال حول القانون التجاري",
      content: "ما هي الشروط الأساسية لتأسيس شركة ذات مسؤولية محدودة؟",
      likes: 5,
      comments: [
        {
          id: 1,
          author: "سارة أحمد",
          authorAvatar: "/placeholder.svg",
          content: "من أهم الشروط وجود شريكين على الأقل، ورأس مال لا يقل عن الحد الأدنى المحدد قانونياً.",
          likes: 3,
          timestamp: "منذ ساعتين",
        }
      ],
      timestamp: "منذ 3 ساعات",
    }
  ]);
  const [newDiscussion, setNewDiscussion] = useState({ title: "", content: "" });
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({});
  const { toast } = useToast();

  const handleAddDiscussion = () => {
    if (!newDiscussion.title || !newDiscussion.content) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const discussion: Discussion = {
      id: discussions.length + 1,
      author: "أحمد محمد",
      authorAvatar: "/placeholder.svg",
      title: newDiscussion.title,
      content: newDiscussion.content,
      likes: 0,
      comments: [],
      timestamp: "الآن",
    };

    setDiscussions([discussion, ...discussions]);
    setNewDiscussion({ title: "", content: "" });
    toast({
      title: "تم إضافة النقاش",
      description: "تمت إضافة نقاشك بنجاح",
    });
  };

  const handleAddComment = (discussionId: number) => {
    const comment = newComments[discussionId];
    if (!comment) return;

    setDiscussions(discussions.map(discussion => {
      if (discussion.id === discussionId) {
        return {
          ...discussion,
          comments: [
            ...discussion.comments,
            {
              id: discussion.comments.length + 1,
              author: "أحمد محمد",
              authorAvatar: "/placeholder.svg",
              content: comment,
              likes: 0,
              timestamp: "الآن",
            }
          ]
        };
      }
      return discussion;
    }));

    setNewComments({ ...newComments, [discussionId]: "" });
    toast({
      title: "تم إضافة التعليق",
      description: "تم إضافة تعليقك بنجاح",
    });
  };

  const handleLike = (discussionId: number) => {
    setDiscussions(discussions.map(discussion => {
      if (discussion.id === discussionId) {
        return { ...discussion, likes: discussion.likes + 1 };
      }
      return discussion;
    }));
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>إضافة نقاش جديد</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="عنوان النقاش"
              value={newDiscussion.title}
              onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
            />
            <Textarea
              placeholder="محتوى النقاش"
              value={newDiscussion.content}
              onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
            />
            <Button onClick={handleAddDiscussion}>نشر النقاش</Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {discussions.map((discussion) => (
            <Card key={discussion.id}>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <Avatar className="w-10 h-10">
                    <img src={discussion.authorAvatar} alt={discussion.author} />
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{discussion.author}</h3>
                      <span className="text-sm text-muted-foreground">{discussion.timestamp}</span>
                    </div>
                    <h4 className="font-medium mt-1">{discussion.title}</h4>
                    <p className="mt-2">{discussion.content}</p>
                    <div className="flex items-center mt-4 space-x-4 space-x-reverse">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(discussion.id)}
                      >
                        <ThumbsUp className="w-4 h-4 ml-2" />
                        {discussion.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="w-4 h-4 ml-2" />
                        {discussion.comments.length}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mr-14 space-y-4">
                  {discussion.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-4 space-x-reverse">
                      <Avatar className="w-8 h-8">
                        <img src={comment.authorAvatar} alt={comment.author} />
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{comment.author}</h4>
                          <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="mt-1">{comment.content}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2"
                          onClick={() => handleLike(comment.id)}
                        >
                          <ThumbsUp className="w-4 h-4 ml-2" />
                          {comment.likes}
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Input
                      placeholder="أضف تعليقاً..."
                      value={newComments[discussion.id] || ""}
                      onChange={(e) => setNewComments({
                        ...newComments,
                        [discussion.id]: e.target.value
                      })}
                    />
                    <Button
                      size="icon"
                      onClick={() => handleAddComment(discussion.id)}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Discussions;
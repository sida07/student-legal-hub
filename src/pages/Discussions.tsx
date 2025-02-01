import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Comment {
  id: number;
  author: {
    full_name: string;
  };
  content: string;
  likes: number;
  created_at: string;
}

interface Discussion {
  id: number;
  author: {
    full_name: string;
  };
  title: string;
  content: string;
  likes: number;
  comments: Comment[];
  created_at: string;
}

const Discussions = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newDiscussion, setNewDiscussion] = useState({ title: "", content: "" });
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      const { data: discussionsData, error: discussionsError } = await supabase
        .from("discussions")
        .select(`
          id,
          title,
          content,
          likes,
          created_at,
          author:profiles(full_name)
        `)
        .order('created_at', { ascending: false });

      if (discussionsError) throw discussionsError;

      const discussionsWithComments = await Promise.all(
        (discussionsData || []).map(async (discussion) => {
          const { data: comments, error: commentsError } = await supabase
            .from("discussion_comments")
            .select(`
              id,
              content,
              likes,
              created_at,
              author:profiles(full_name)
            `)
            .eq('discussion_id', discussion.id)
            .order('created_at', { ascending: true });

          if (commentsError) throw commentsError;

          return {
            ...discussion,
            comments: comments || []
          };
        })
      );

      setDiscussions(discussionsWithComments);
      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching discussions:', error);
      toast({
        variant: "destructive",
        title: "خطأ في جلب النقاشات",
        description: error.message
      });
      setLoading(false);
    }
  };

  const handleAddDiscussion = async () => {
    if (!newDiscussion.title || !newDiscussion.content) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { error: insertError } = await supabase
        .from("discussions")
        .insert({
          title: newDiscussion.title,
          content: newDiscussion.content,
          author_id: userData.user.id
        });

      if (insertError) throw insertError;

      setNewDiscussion({ title: "", content: "" });
      await fetchDiscussions();
      
      toast({
        title: "تم إضافة النقاش",
        description: "تمت إضافة نقاشك بنجاح",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "خطأ في إضافة النقاش",
        description: error.message
      });
    }
  };

  const handleAddComment = async (discussionId: number) => {
    const comment = newComments[discussionId];
    if (!comment) return;

    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { error: insertError } = await supabase
        .from("discussion_comments")
        .insert({
          discussion_id: discussionId,
          content: comment,
          author_id: userData.user.id
        });

      if (insertError) throw insertError;

      setNewComments({ ...newComments, [discussionId]: "" });
      await fetchDiscussions();
      
      toast({
        title: "تم إضافة التعليق",
        description: "تم إضافة تعليقك بنجاح",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "خطأ في إضافة التعليق",
        description: error.message
      });
    }
  };

  const handleLike = async (discussionId: number) => {
    try {
      const { error } = await supabase
        .from("discussions")
        .update({ likes: discussions.find(d => d.id === discussionId)?.likes! + 1 })
        .eq('id', discussionId);

      if (error) throw error;
      await fetchDiscussions();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "خطأ في تسجيل الإعجاب",
        description: error.message
      });
    }
  };

  const handleCommentLike = async (commentId: number) => {
    try {
      const { error } = await supabase
        .from("discussion_comments")
        .update({ 
          likes: discussions
            .flatMap(d => d.comments)
            .find(c => c.id === commentId)?.likes! + 1 
        })
        .eq('id', commentId);

      if (error) throw error;
      await fetchDiscussions();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "خطأ في تسجيل الإعجاب",
        description: error.message
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">جاري التحميل...</div>
        </main>
      </div>
    );
  }

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
                  <Avatar className="w-10 h-10" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{discussion.author?.full_name || "مستخدم"}</h3>
                      <span className="text-sm text-muted-foreground">
                        {new Date(discussion.created_at).toLocaleDateString('ar-SA')}
                      </span>
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
                      <Avatar className="w-8 h-8" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{comment.author?.full_name || "مستخدم"}</h4>
                          <span className="text-sm text-muted-foreground">
                            {new Date(comment.created_at).toLocaleDateString('ar-SA')}
                          </span>
                        </div>
                        <p className="mt-1">{comment.content}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2"
                          onClick={() => handleCommentLike(comment.id)}
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
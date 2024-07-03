interface UserProfile {
    user_id: string;
    username: string;
    avatar_url: string;
}
  
interface Reply {
    reply_id: string;
    user_id: string;
    content: string;
    upvotes: number;
    downvotes: number;
    user_profile: UserProfile;
    date: string;
}
  
export interface CommentInterface {
    comment_id: string;
    user_id: string;
    content: string;
    upvotes: number;
    replies: Reply[];
    user_profile: UserProfile;
    date: string;
  }
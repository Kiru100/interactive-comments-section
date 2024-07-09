interface UserProfile {
    user_id: string;
    username: string;
    avatar_url: string;
}
  
interface Reply {
    id: string;
    content: string;
    upvotes: string[];
    downvotes: string[];
    user_profile: UserProfile;
    date: string;
}
  
export interface CommentInterface {
    id: string;
    content: string;
    upvotes?: string[];
    downvotes?: string[];
    replies?: Reply[];
    user_profile: UserProfile;
    date: string;
}
import { comments } from "@/assets/JSON/comments_dummy_data";
import { CommentInterface } from "@/constants/interfaces";
import { create } from "zustand";
import userStore, { CurrentUser } from "./user";

interface CommentsStore {
    comments: CommentInterface[];
    addComment:  (content: string, current_user: CurrentUser) => void;
    upComment: (commentId: string, userId: string) => void;
}

const commentStore = create<CommentsStore>((set) => ({
    comments: comments,
    addComment: (content: string, current_user: CurrentUser)=>
        set((store)=> ({ comments: [...store.comments, {
                "comment_id": new Date().toString(),
                "content": content,
                "upvotes": [],
                "downvotes": [],
                "date": new Date().toISOString(),
                "user_profile": current_user,
                "replies": []
            }] 
        })),
        upComment: (commentId: string, userId: string) =>
            set((store) => ({
              comments: store.comments.map((comment) => {
                if (comment.comment_id === commentId) {
                  const isUpvoted = comment.upvotes?.includes(userId);
                  const isDownvoted = comment.downvotes?.includes(userId);
        
                  if (!isUpvoted) {
                    // Add user to upvotes
                    comment.upvotes?.push(userId);
        
                    // Remove user from downvotes if exists
                    if (isDownvoted) {
                      comment.downvotes = comment.downvotes?.filter((id) => id !== userId);
                    }
                  } else {
                    // User is already upvoted, remove upvote
                    comment.upvotes = comment.upvotes?.filter((id) => id !== userId);
                  }
                }
                return comment;
              }),
            })),
    
}));

export default commentStore;

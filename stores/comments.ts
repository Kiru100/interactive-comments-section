import { comments } from "@/assets/JSON/comments_dummy_data";
import { CommentInterface } from "@/constants/interfaces";
import { create } from "zustand";
import userStore, { CurrentUser } from "./user";

interface CommentsStore {
    comments: CommentInterface[];
    addComment:  (content: string, current_user: CurrentUser) => void;
    upComment: (comment_id: string, user_id: string) => void;
    downComment: (comment_id: string, user_id: string)  => void;
    deleteComment: (comment_id: string) => void
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
    deleteComment: (comment_id: string) =>
        set((store)=>({
            comments: [...store.comments.filter((comment_data) => comment_data.comment_id !==comment_id )]
        })),
    upComment: (comment_id: string, user_id: string) =>
        set((store) => ({
            comments: store.comments.map((comment) => {
                if (comment.comment_id === comment_id) {
                    const isUpvoted = comment.upvotes?.includes(user_id);
                    const isDownvoted = comment.downvotes?.includes(user_id);
        
                    if (!isUpvoted) {
                        /* Add user to upvotes. */
                        comment.upvotes?.push(user_id);
            
                        /* Remove user from downvotes if exists. */
                        if (isDownvoted) {
                            comment.downvotes = comment.downvotes?.filter((id) => id !== user_id);
                        } 

                    } else {
                        /* User is already upvoted, remove upvote. */
                        comment.upvotes = comment.upvotes?.filter((id) => id !== user_id);
                    }
                }
                return comment;
            }),
        })),
        downComment: (comment_id: string, user_id: string) =>
            set((store) => ({
                comments: store.comments.map((comment) => {
                    if (comment.comment_id === comment_id) {
                        const isUpvoted = comment.upvotes?.includes(user_id);
                        const isDownvoted = comment.downvotes?.includes(user_id);
            
                        if (!isDownvoted) {
                            /* Add user to downvotes. */
                            comment.downvotes?.push(user_id);

                            /* Remove user from upvotes if exists. */
                            if (isUpvoted) {
                                comment.upvotes = comment.upvotes?.filter((id) => id !== user_id);
                            } 
                        } else {
                            /* User is already downvotes, remove downvotes. */
                            comment.downvotes = comment.downvotes?.filter((id) => id !== user_id);
                        }
                    }
                    return comment;
                }),
            })),
}));

export default commentStore;

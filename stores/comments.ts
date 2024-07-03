import { comments } from "@/assets/JSON/comments_dummy_data";
import { CommentInterface } from "@/constants/interfaces";
import { create } from "zustand";
import userStore, { CurrentUser } from "./user";

interface CommentsStore {
    comments: CommentInterface[];
    addComment:  (content: string, current_user: CurrentUser) => void;
}

const commentStore = create<CommentsStore>((set) => ({
    comments: comments,
    addComment: (content: string, current_user: CurrentUser)=>
        set((store)=> ({ comments: [...store.comments, {
                "comment_id": new Date().toString(),
                "content": content,
                "upvotes": 0,
                "date": new Date().toISOString(),
                "user_profile": current_user,
                "replies": []
            }] 
        }))
    
}));

export default commentStore;

import { comments } from "@/assets/JSON/comments_dummy_data";
import { CommentInterface } from "@/constants/interfaces";
import { create } from "zustand";
import userStore, { CurrentUser } from "./user";

interface CommentsStore {
    comments: CommentInterface[];
    addComment:  (content: string, current_user: CurrentUser) => void;
    upComment: (comment_id: string, user_id: string) => void;
    downComment: (comment_id: string, user_id: string)  => void;
    deleteComment: (comment_id: string) => void;
    updateComment: (comment_id: string, new_comment: string) => void;

    addReply: (comment_id: string, new_reply: string, current_user: CurrentUser) => void;
    upReply: (comment_id: string, reply_id: string, user_id: string) => void;
    downReply: (comment_id: string, reply_id: string, user_id: string) => void;
    updateReply: (comment_id: string, reply_id: string, new_comment: string)  => void;
    deleteReply: (comment_id: string, reply_id: string) => void;
}

const commentStore = create<CommentsStore>((set) => ({
    comments: comments,
    addComment: (content: string, current_user: CurrentUser)=>
        set((store)=> ({ comments: [...store.comments, {
                "id": new Date().toString(),
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
            comments: [...store.comments.filter((comment_data) => comment_data.id !==comment_id )]
        })),
    upComment: (comment_id: string, user_id: string) =>
        set((store) => ({
            comments: store.comments.map((comment) => {
                if (comment.id === comment_id) {
                    const is_upvoted = comment.upvotes?.includes(user_id);
                    const is_downvoted = comment.downvotes?.includes(user_id);
        
                    if (!is_upvoted) {
                        /* Add user to upvotes. */
                        comment.upvotes?.push(user_id);
            
                        /* Remove user from downvotes if exists. */
                        if (is_downvoted) {
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
                if (comment.id === comment_id) {
                    const is_upvoted = comment.upvotes?.includes(user_id);
                    const is_downvoted = comment.downvotes?.includes(user_id);
        
                    if (!is_downvoted) {
                        /* Add user to downvotes. */
                        comment.downvotes?.push(user_id);

                        /* Remove user from upvotes if exists. */
                        if (is_upvoted) {
                            comment.upvotes = comment.upvotes?.filter((id) => id !== user_id);
                        } 
                    } 
                    else {
                        /* User is already downvotes, remove downvotes. */
                        comment.downvotes = comment.downvotes?.filter((id) => id !== user_id);
                    }
                }
                return comment;
            }),
        })),
    updateComment: (comment_id: string, new_comment: string) =>
        set((store)=> ({
            comments: store.comments.map((comment) => {
                if (comment.id === comment_id) {
                    comment.content = new_comment;
                }

                return comment;
            }),
        })),
    addReply: (comment_id: string, new_reply: string,  current_user: CurrentUser) =>
        set((store) => ({
            comments: store.comments.map((comment) => {
                if (comment.id === comment_id) {
                    if(new_reply?.length){
                        const new_reply_to_push = {
                            "id": new Date().toString(),
                            "content": new_reply,
                            "upvotes": [],
                            "downvotes": [],
                            "date": new Date().toISOString(),
                            "user_profile": current_user,
                        }
                        comment.replies?.push(new_reply_to_push);
                    }                   
                }             
                return comment;
            }),
        })),
    upReply: (comment_id: string, reply_id: string, user_id: string)=>
        set((state) => ({
            comments: state.comments.map((comment) => {
                if (comment.id === comment_id) {
                    return {
                        ...comment,
                        replies: comment.replies?.map((reply) => {
                            if (reply.id === reply_id) {             
                                const is_upvoted = reply.upvotes?.includes(user_id);
                                const is_downvoted = reply.downvotes?.includes(user_id);
                                
                                return {
                                    ...reply,
                                    upvotes: is_upvoted ? reply.upvotes?.filter((id) => id !== user_id) : [...reply.upvotes, user_id],
                                    downvotes: is_downvoted ? reply.downvotes?.filter((id) => id !== user_id) : [...reply.downvotes]
                                };                        
                            }
                            return reply;
                        }),
                    };
                }
                return comment;
            }),
        })),
    downReply: (comment_id: string, reply_id: string, user_id: string) =>
        set((state)=>({
            comments: state.comments.map((comment) => {
                if (comment.id === comment_id) {
                    return {
                        ...comment,
                        replies: comment.replies?.map((reply) => {
                            if (reply.id === reply_id) {       
                                const is_upvoted = reply.upvotes?.includes(user_id);
                                const is_downvoted = reply.downvotes?.includes(user_id);
                                
                                return {
                                    ...reply,
                                    upvotes: is_upvoted ? reply.upvotes?.filter((id) => id !== user_id) : [...reply.upvotes],
                                    downvotes: is_downvoted ? reply.downvotes?.filter((id) => id !== user_id) : [...reply.downvotes, user_id]
                                };                        
                            }
                            return reply;
                        }),
                    };
                }
                return comment;
            }),
        })),

    updateReply: (comment_id: string, reply_id: string, new_comment: string) =>
        set((state)=>({
            comments: state.comments.map((comment) => {
                if (comment.id === comment_id) {
                    return {
                        ...comment,
                        replies: comment.replies?.map((reply) => {
                            if (reply.id === reply_id) {       
                                return {
                                    ...reply,
                                    content: new_comment
                                };                        
                            }
                            return reply;
                        }),
                    };
                }
                return comment;
            }),
        })),
    deleteReply: (comment_id: string, reply_id: string) => 
        set((state)=>({
            comments: state.comments.map((comment) => {
                if (comment.id === comment_id) {
                    return {
                        ...comment,
                        replies: [...comments.filter((reply) => reply.id !== reply_id)],
                    };
                }
                return comment;
            }),
        }))
}));

export default commentStore;

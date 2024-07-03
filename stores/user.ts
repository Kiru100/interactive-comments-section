import { create } from "zustand";

interface User {
    current_user: CurrentUser
}

export interface CurrentUser{
    user_id: string,
    username: string,
    avatar_url: string
}

const userStore = create<User>((set) => ({
    current_user: {
        user_id: "user5",
        username: "john_doe",
        avatar_url: "https://i.pravatar.cc/150?img=3"
    }
}));


export default userStore;

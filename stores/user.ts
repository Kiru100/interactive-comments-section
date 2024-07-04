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
        user_id: "user9",
        username: "george_harris",
        avatar_url: "https://i.pravatar.cc/150?img=7"
    }
}));


export default userStore;

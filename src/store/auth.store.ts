import { create } from "zustand";
import type { User } from "@/types";

type State = {
  user: User | null;
  isAuthenticated: boolean;
};

type Action = {
  setUser: (user: User) => void;
  logout: () => void;
};

const savedUser = localStorage.getItem("user");

export const useAuth = create<State & Action>((set) => ({
  user: savedUser ? JSON.parse(savedUser) : null,

  isAuthenticated: !!savedUser,

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));

    set({
      user,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));

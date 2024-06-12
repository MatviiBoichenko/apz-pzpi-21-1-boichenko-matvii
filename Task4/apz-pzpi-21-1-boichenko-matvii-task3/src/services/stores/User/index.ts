import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { OpenAPI } from "@api/client";
import { User } from "@stores/User/types.ts";

interface UserState {
  isSignedIn: boolean;
  language: string;
  token: string | null;
  refresh_token?: string | null;
  cart: number;
  user?: User
}

type Actions = {
  setLanguage: (language: string) => void;
  onSignOut: () => void;
  authorize: (token: string, refresh_token?: string) => void;
  addToCart: (qty: number) => void;
  changeCart: (qty: number) => void;
  clearCart: () => void;
  setUser: (user: User) => void;
};

const initialState: UserState = {
  isSignedIn: false,
  language: 'en',
  token: null,
  refresh_token: null,
  cart: 0,
};

// User store for global state management by Zustand
export const useUserStore = create(
  persist(
    immer<UserState & Actions>((set) => ({
      ...initialState,
      setLanguage: (language) =>
        set((state) => {
          state.language = language;
        }),
      onSignOut: () => {
        console.log('onSignOut')
        OpenAPI.TOKEN = undefined;
        set((state) => {
          state.token = null;
          state.refresh_token = null;
          state.isSignedIn = false;
          state.user = undefined;
        });
      },
      authorize: (token, refresh_token) => {
        OpenAPI.TOKEN = token;
        set((state) => {
          state.token = token;
          state.refresh_token = refresh_token;
          state.isSignedIn = true;
        });
      },
      addToCart: (qty) =>
        set((state) => {
          state.cart += qty;
        }),
      changeCart: (qty) =>
        set((state) => {
          state.cart = qty;
        }),
      clearCart: () =>
        set((state) => {
          state.cart = 0;
        }),
      setUser: (user) => set((state) => {
        state.user = user;
      }),
    })),
    {name: 'user'},
  ),
);

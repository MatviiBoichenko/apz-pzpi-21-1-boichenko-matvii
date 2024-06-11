import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface UserState {
  isSignedIn: boolean;
  language: string;
  token: string | null;
  refresh_token: string | null;
  cart: number;
  isLoginModalOpen: boolean;
}

type Actions = {
  setLanguage: (language: string) => void;
  onSignOut: () => void;
  authorize: (token: string, refresh_token: string) => void;
  addToCart: (qty: number) => void;
  changeCart: (qty: number) => void;
  clearCart: () => void;
  handleChangeLoginModal: (isOpen: boolean) => void;
};

const initialState: UserState = {
  isSignedIn: false,
  language: 'en',
  token: null,
  refresh_token: null,
  cart: 0,
  isLoginModalOpen: false,
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
      onSignOut: () =>
        set((state) => {
          state.token = null;
          state.refresh_token = null;
          state.isSignedIn = false;
        }),
      authorize: (token, refresh_token) =>
        set((state) => {
          state.token = token;
          state.refresh_token = refresh_token;
          state.isSignedIn = true;
        }),
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
      handleChangeLoginModal: (isOpen) =>
        set((state) => {
          state.isLoginModalOpen = isOpen;
        }),
    })),
    { name: 'user' },
  ),
);

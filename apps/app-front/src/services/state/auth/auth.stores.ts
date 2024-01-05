import { IFrontBot, IFrontBroadcaster } from '@alfred/models';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const AUTH_STORAGE_KEY = 'auth';

interface IAuthStore {
  bot: IFrontBot | null;
  broadcaster: IFrontBroadcaster | null;
  setBot: (bot: IFrontBot) => void;
  setBroadcaster: (broadcaster: IFrontBroadcaster) => void;
  setAuth: (data: {
    broadcaster: IFrontBroadcaster;
    bot: IFrontBot | null;
  }) => void;
  reset: () => void;
}

export const useAuthStore = create<IAuthStore>()(
  devtools((set) => ({
    bot: null,
    broadcaster: null,
    setBot: (bot) => set({ bot }),
    setBroadcaster: (broadcaster) => set({ broadcaster }),
    setAuth: (data) => set((state) => ({ ...state, ...data })),
    reset: () => set({ bot: null, broadcaster: null })
  }))
);

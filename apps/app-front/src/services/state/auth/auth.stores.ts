import { IFrontBot, IFrontBroadcaster } from '@alfred/models';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const AUTH_STORAGE_KEY = 'auth';

interface IAuthStore {
  bot: IFrontBot | null;
  broadcaster: IFrontBroadcaster | null;
  setBot: (bot: IFrontBot) => void;
  setBroadcaster: (broadcaster: IFrontBroadcaster) => void;
  setAuth: (data: { bot?: IFrontBot; broadcaster?: IFrontBroadcaster }) => void;
}

export const useAuth = create<IAuthStore>()(
  persist(
    (set) => ({
      bot: null,
      broadcaster: null,
      setBot: (bot) => set({ bot }),
      setBroadcaster: (broadcaster) => set({ broadcaster }),
      setAuth: (data) => set((state) => ({ ...state, ...data }))
    }),
    { name: AUTH_STORAGE_KEY }
  )
);

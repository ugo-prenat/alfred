import { IBot, IBroadcaster } from '@alfred/models';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const AUTH_STORAGE_KEY = 'auth';

interface IAuthStore {
  bot: IBot | null;
  accessToken: string;
  refreshToken: string;
  broadcaster: IBroadcaster | null;
  setBot: (bot: IBot) => void;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setBroadcaster: (broadcaster: IBroadcaster) => void;
  setAuth: (data: {
    bot?: IBot;
    accessToken?: string;
    refreshToken?: string;
    broadcaster?: IBroadcaster;
  }) => void;
}

export const useAuth = create<IAuthStore>()(
  persist(
    (set) => ({
      bot: null,
      accessToken: '',
      refreshToken: '',
      broadcaster: null,
      setBot: (bot) => set({ bot }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      setBroadcaster: (broadcaster) => set({ broadcaster }),

      setAuth: (data) => set((state) => ({ ...state, ...data }))
    }),
    { name: AUTH_STORAGE_KEY }
  )
);

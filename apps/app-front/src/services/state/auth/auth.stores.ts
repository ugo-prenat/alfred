import { IFrontBot, IFrontBroadcaster } from '@alfred/models';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const AUTH_STORAGE_KEY = 'auth';

interface IAuthStore {
  bot: IFrontBot | null;
  accessToken: string;
  refreshToken: string;
  broadcaster: IFrontBroadcaster | null;
  setBot: (bot: IFrontBot) => void;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setBroadcaster: (broadcaster: IFrontBroadcaster) => void;
  setAuth: (data: {
    bot?: IFrontBot;
    accessToken?: string;
    refreshToken?: string;
    broadcaster?: IFrontBroadcaster;
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

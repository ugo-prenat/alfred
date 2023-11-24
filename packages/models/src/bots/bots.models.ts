export type BotStatus = 'pending' | 'active' | 'inactive';

export interface IBot {
  id: string;
  status: BotStatus;
}

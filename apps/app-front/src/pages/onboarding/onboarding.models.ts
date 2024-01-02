import { IFrontBot, IFrontBroadcaster } from '@alfred/models';

export interface ILoginBroadcasterResponse {
  bot: IFrontBot | null;
  broadcaster: IFrontBroadcaster;
  accessToken: string;
  refreshToken: string;
}

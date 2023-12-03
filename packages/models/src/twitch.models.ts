import { TWITCH_EVENTSUB_MESSAGE_TYPES } from '@stats-station/constants';

export interface ITwitchUser {
  id: string;
  type: string;
  login: string;
  email: string;
  created_at: string;
  description: string;
  display_name: string;
  broadcaster_type: string;
  profile_image_url: string;
  offline_image_url: string;
}
export interface IGetTwitchUsersResponse {
  data: ITwitchUser[];
}

export interface ITwitchEventSubSubscription {
  id: string;
  status: string;
  type: string;
  version: string;
  created_at: string;
  cost: number;
  condition: {
    broadcaster_user_id?: string;
    user_id?: string;
  };
  transport: {
    method: 'webhook'; // websocket also available -> 'webhook'|'websocket'
    callback: string;
    secret: string;
    // session_id: string; -> only for websocket
    // connected_at: string; -> only for websocket
    // disconnected_at: string; -> only for websocket
  };
}

export interface ITwitchEventSubSubscriptionCreation {
  type: string;
  version: string;
  condition: {
    broadcaster_user_id?: string;
    user_id?: string;
  };
  transport: {
    method: 'webhook';
    callback: string;
    secret: string;
  };
}

export interface IGetTwitchEventSubSubscriptionResponse {
  data: ITwitchEventSubSubscription[];
  total: number;
  total_cost: number;
  max_total_cost: number;
  pagination: { cursor: string };
}

export type TwitchEventsubMessageType =
  (typeof TWITCH_EVENTSUB_MESSAGE_TYPES)[number];

export interface ITwitchEventsubChallenge {
  subscription: ITwitchEventSubSubscription;
  challenge: string;
}

export interface ITwitchEventsubNotification<T> {
  subscription: ITwitchEventSubSubscription;
  event: T;
}

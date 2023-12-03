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

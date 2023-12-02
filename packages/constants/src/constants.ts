// URLS
export const APP_FRONT_URL = 'https://app.stats-station.com';
export const APP_FRONT_DEV_URL = 'http://localhost:5173';

// TWITCH
export const AFFILIATE_TWITCH_BROADCASTER = 'affiliate';
export const PARTNER_TWITCH_BROADCASTER = 'partner';
export const NORMAL_TWITCH_BROADCASTER = 'normal';

export const TWITCH_BROADCASTER_TYPES = [
  AFFILIATE_TWITCH_BROADCASTER,
  PARTNER_TWITCH_BROADCASTER,
  NORMAL_TWITCH_BROADCASTER
] as const;

// ROLES
export const MEMBER_ROLE = 'member';
export const MODERATOR_ROLE = 'moderator';
export const ADMIN_ROLE = 'admin';
export const OWNER_ROLE = 'owner';

export const ROLES = [
  MEMBER_ROLE,
  MODERATOR_ROLE,
  ADMIN_ROLE,
  OWNER_ROLE
] as const;

export const ROLES_CONF = {
  [MEMBER_ROLE]: { level: 0, role: MEMBER_ROLE },
  [MODERATOR_ROLE]: { level: 1, role: MODERATOR_ROLE },
  [ADMIN_ROLE]: { level: 2, role: ADMIN_ROLE },
  [OWNER_ROLE]: { level: 3, role: OWNER_ROLE }
};

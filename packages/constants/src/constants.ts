// TWITCH
export const AFFILIATE_TWITCH_BROADCASTER = 'affiliate';
export const PARTNER_TWITCH_BROADCASTER = 'partner';
export const NORMAL_TWITCH_BROADCASTER = 'normal';

export const TWITCH_BROADCASTER_TYPES = [
  AFFILIATE_TWITCH_BROADCASTER,
  PARTNER_TWITCH_BROADCASTER,
  NORMAL_TWITCH_BROADCASTER
] as const;

export const TWITCH_EVENTSUB_MESSAGE_TYPE_WEBHOOK_CALLBACK_VERIFICATION =
  'webhook_callback_verification';
export const TWITCH_EVENTSUB_MESSAGE_TYPE_NOTIFICATION = 'notification';
export const TWITCH_EVENTSUB_MESSAGE_TYPE_REVOCATION = 'revocation';

export const TWITCH_EVENTSUB_MESSAGE_TYPES = [
  TWITCH_EVENTSUB_MESSAGE_TYPE_WEBHOOK_CALLBACK_VERIFICATION,
  TWITCH_EVENTSUB_MESSAGE_TYPE_NOTIFICATION,
  TWITCH_EVENTSUB_MESSAGE_TYPE_REVOCATION
] as const;

export const TWITCH_EVENTSUB_HEADER_MESSAGE_ID = 'Twitch-Eventsub-Message-Id';
export const TWITCH_EVENTSUB_HEADER_MESSAGE_TYPE =
  'Twitch-Eventsub-Message-Type';
export const TWITCH_EVENTSUB_HEADER_MESSAGE_RETRY =
  'Twitch-Eventsub-Message-Retry';
export const TWITCH_EVENTSUB_HEADER_MESSAGE_TIMESTAMP =
  'Twitch-Eventsub-Message-Timestamp';
export const TWITCH_EVENTSUB_HEADER_MESSAGE_SIGNATURE =
  'Twitch-Eventsub-Message-Signature';
export const TWITCH_EVENTSUB_HEADER_SUBSCRIPTION_TYPE =
  'Twitch-Eventsub-Subscription-Type';
export const TWITCH_EVENTSUB_HEADER_SUBSCRIPTION_VERSION =
  'Twitch-Eventsub-Subscription-Version';
export const TWITCH_HMAC_PREFIX = 'sha256=';

export const TWITCH_EVENTSUB_WEBHOOK_CALLBACK_VERIFICATION_MESSAGE_TYPE =
  'webhook_callback_verification';
export const TWITCH_EVENTSUB_NOTIFICATION_MESSAGE_TYPE = 'notification';
export const TWITCH_EVENTSUB_REVOCATION_MESSAGE_TYPE = 'revocation';

export const TWITCH_ACCESS_TOKEN_SCOPES = [
  'user:read:email',
  'channel:read:subscriptions'
];

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

export const ROLE_LEVELS = {
  [MEMBER_ROLE]: 0,
  [MODERATOR_ROLE]: 1,
  [ADMIN_ROLE]: 2,
  [OWNER_ROLE]: 3
};

export const ROLES_CONF = {
  [MEMBER_ROLE]: { level: 0, role: MEMBER_ROLE },
  [MODERATOR_ROLE]: { level: 1, role: MODERATOR_ROLE },
  [ADMIN_ROLE]: { level: 2, role: ADMIN_ROLE },
  [OWNER_ROLE]: { level: 3, role: OWNER_ROLE }
};

// JWT
export const JWT_ALGORITHM = 'HS256';
export const JWT_EXPIRATION_TIME = 60 * 60; // 1 hour
export const JWT_REFRESH_EXPIRATION_TIME = 60 * 60 * 24 * 30 * 12; // 1 year
export const JWT_TOKEN_EXPIRED_ERROR = 'JwtTokenExpired';

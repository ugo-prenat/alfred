// APPS
export const APP_FRONT = 'app-front';
export const APP_BACK = 'app-back';
export const HUB = 'hub';
export const SCHEDULER = 'scheduler';

export const APPS = [APP_FRONT, APP_BACK, HUB, SCHEDULER] as const;

// URLS
export const APP_FRONT_PROD_URL = 'https://app.alfred.com';
export const APP_FRONT_DEV_URL = 'http://localhost:5173';

export const APP_BACK_PROD_URL = 'https://api.alfred.com';
export const APP_BACK_DEV_URL = 'http://localhost:3000';

export const HUB_PROD_URL = 'https://hub.alfred.com';
export const HUB_DEV_URL = 'http://localhost:3001';

export const SCHEDULER_PROD_URL = 'https://scheduler.alfred.com';
export const SCHEDULER_DEV_URL = 'http://localhost:3002';

type IUrlsConf = {
  [key in (typeof APPS)[number]]: {
    development: string;
    production: string;
  };
};

export const URLS_CONF: IUrlsConf = {
  'app-front': {
    development: APP_FRONT_DEV_URL,
    production: APP_FRONT_PROD_URL
  },
  'app-back': {
    development: APP_BACK_DEV_URL,
    production: APP_BACK_PROD_URL
  },
  hub: {
    development: HUB_DEV_URL,
    production: HUB_PROD_URL
  },
  scheduler: {
    development: SCHEDULER_DEV_URL,
    production: SCHEDULER_PROD_URL
  }
};

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

export const TWITCH_WEBHOOK_CALLBACK_URL = HUB_PROD_URL + '/twitch/eventsub';

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

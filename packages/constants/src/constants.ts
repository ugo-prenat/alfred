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
export const JWT_EXPIRATION_TIME = 60 * 60 * 24; // 1 day
export const JWT_REFRESH_EXPIRATION_TIME = 60 * 60 * 24 * 30; // 30 days
export const JWT_TOKEN_EXPIRED_ERROR = 'JwtTokenExpired';

// FEATURES
export const STREAMUP_FEATURE = 'stream-up';
export const STREAMDOWN_FEATURE = 'stream-down';
export const SUBSCRIBERS_GOAL_END_FEATURE = 'subscribers-goal-end';
export const FOLLOWERS_GOAL_END_FEATURE = 'followers-goal-end';
export const WEEKLY_MOST_POPULAR_CLIP_FEATURE = 'weekly-most-popular-clip';
export const MONTHLY_RECAP_FEATURE = 'monthly-recap';

export const FEATURES_NAMES = [
  STREAMUP_FEATURE,
  STREAMDOWN_FEATURE,
  SUBSCRIBERS_GOAL_END_FEATURE,
  FOLLOWERS_GOAL_END_FEATURE,
  WEEKLY_MOST_POPULAR_CLIP_FEATURE,
  MONTHLY_RECAP_FEATURE
] as const;

type FeatureType = (typeof FEATURES_TYPES)[number];
type FeatureName = (typeof FEATURES_NAMES)[number];
type FeatureStatus = (typeof FEATURES_STATUS)[number];
type FeatureAvailability = 'active' | 'inactive' | 'coming-soon';

interface IFeatureConf {
  type: FeatureType;
  name: FeatureName;
  availability: FeatureAvailability;
  defaultStatus: FeatureStatus;
}

export const FEATURES_CONF: IFeatureConf[] = [
  {
    type: 'eventSub',
    name: STREAMUP_FEATURE,
    availability: 'active',
    defaultStatus: 'enabled'
  },
  {
    type: 'eventSub',
    name: STREAMDOWN_FEATURE,
    availability: 'active',
    defaultStatus: 'disabled'
  },
  {
    type: 'eventSub',
    name: SUBSCRIBERS_GOAL_END_FEATURE,
    availability: 'coming-soon',
    defaultStatus: 'unavailable'
  },
  {
    type: 'eventSub',
    name: FOLLOWERS_GOAL_END_FEATURE,
    availability: 'coming-soon',
    defaultStatus: 'unavailable'
  },
  {
    type: 'recurring',
    name: WEEKLY_MOST_POPULAR_CLIP_FEATURE,
    availability: 'active',
    defaultStatus: 'enabled'
  },
  {
    type: 'recurring',
    name: MONTHLY_RECAP_FEATURE,
    availability: 'active',
    defaultStatus: 'enabled'
  }
];

export const RECURRING_FEATURE_TYPE = 'recurring';
export const EVENTSUB_FEATURE_TYPE = 'eventSub';
export const MANUAL_FEATURE_TYPE = 'manual';

export const FEATURES_TYPES = [
  RECURRING_FEATURE_TYPE,
  EVENTSUB_FEATURE_TYPE,
  MANUAL_FEATURE_TYPE
] as const;

export const ENABLED_FEATURE_STATUS = 'enabled';
export const DISABLED_FEATURE_STATUS = 'disabled';
export const UNAVAILABLE_FEATURE_STATUS = 'unavailable';

export const FEATURES_STATUS = [
  ENABLED_FEATURE_STATUS,
  DISABLED_FEATURE_STATUS,
  UNAVAILABLE_FEATURE_STATUS
] as const;

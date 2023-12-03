import { createMiddleware } from 'hono/factory';
import {
  TWITCH_EVENTSUB_WEBHOOK_CALLBACK_VERIFICATION_MESSAGE_TYPE,
  TWITCH_EVENTSUB_NOTIFICATION_MESSAGE_TYPE,
  TWITCH_EVENTSUB_REVOCATION_MESSAGE_TYPE,
  TWITCH_EVENTSUB_HEADER_MESSAGE_TYPE
} from '@stats-station/constants';
import { verifySignature } from './twitch.utils';

const TWITCH_MESSAGE_TYPE = TWITCH_EVENTSUB_HEADER_MESSAGE_TYPE.toLowerCase();
const WEBHOOK_CALLBACK_VERIFICATION =
  TWITCH_EVENTSUB_WEBHOOK_CALLBACK_VERIFICATION_MESSAGE_TYPE;
const NOTIFICATION = TWITCH_EVENTSUB_NOTIFICATION_MESSAGE_TYPE;
const REVOCATION = TWITCH_EVENTSUB_REVOCATION_MESSAGE_TYPE;

export const twitchWebhookAuth = createMiddleware(async (c, next) => {
  const messageType = c.req.raw.headers.get(TWITCH_MESSAGE_TYPE);
  const body = await c.req.json();

  switch (messageType) {
    case WEBHOOK_CALLBACK_VERIFICATION:
      return c.text(body.challenge, 200);
    case NOTIFICATION:
      return await verifySignature(c, next);
    case REVOCATION:
      return c.json({ message: 'revocation' }, 200);
    default:
      return c.json({ error: `Invalid message type '${messageType}'` }, 400);
  }
});

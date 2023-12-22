import { createMiddleware } from 'hono/factory';
import {
  TWITCH_EVENTSUB_WEBHOOK_CALLBACK_VERIFICATION_MESSAGE_TYPE,
  TWITCH_EVENTSUB_NOTIFICATION_MESSAGE_TYPE,
  TWITCH_EVENTSUB_REVOCATION_MESSAGE_TYPE,
  TWITCH_EVENTSUB_HEADER_MESSAGE_TYPE,
  TWITCH_EVENTSUB_HEADER_SUBSCRIPTION_TYPE
} from '@alfred/constants';
import { verifySignature } from './twitch.utils';
import { Context } from 'hono';
import {
  handleChannelSubscribe,
  handleStreamOffline,
  handleStreamOnline
} from './twitch.eventsub';

const TWITCH_MESSAGE_TYPE = TWITCH_EVENTSUB_HEADER_MESSAGE_TYPE.toLowerCase();
const TWITCH_SUBSCRIPTION_TYPE =
  TWITCH_EVENTSUB_HEADER_SUBSCRIPTION_TYPE.toLowerCase();
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

export const handleTwitchWebhook = async (c: Context) => {
  const { headers } = c.req.raw;
  const subscriptionType = headers.get(TWITCH_SUBSCRIPTION_TYPE);

  switch (subscriptionType) {
    case 'channel.subscribe':
      return handleChannelSubscribe(c);
    case 'stream.online':
      return handleStreamOnline(c);
    case 'stream.offline':
      return handleStreamOffline(c);

    case undefined:
      return c.json({ message: 'no subscription type given' }, 400);
    default:
      return c.json(
        { message: `subscription type '${subscriptionType}' not supported` },
        400
      );
  }
};

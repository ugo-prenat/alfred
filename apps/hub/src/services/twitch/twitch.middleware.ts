import { createMiddleware } from 'hono/factory';
import {
  TWITCH_EVENTSUB_HEADER_MESSAGE_ID,
  TWITCH_EVENTSUB_HEADER_MESSAGE_TIMESTAMP,
  TWITCH_EVENTSUB_HEADER_MESSAGE_SIGNATURE,
  TWITCH_EVENTSUB_HEADER_MESSAGE_TYPE,
  TWITCH_HMAC_PREFIX
} from '@stats-station/constants';
import crypto from 'crypto';

const TWITCH_MESSAGE_ID = TWITCH_EVENTSUB_HEADER_MESSAGE_ID.toLowerCase();
const TWITCH_MESSAGE_TIMESTAMP =
  TWITCH_EVENTSUB_HEADER_MESSAGE_TIMESTAMP.toLowerCase();
const TWITCH_MESSAGE_SIGNATURE =
  TWITCH_EVENTSUB_HEADER_MESSAGE_SIGNATURE.toLowerCase();

export const twitchWebhookAuth = createMiddleware(async (c, next) => {
  const { headers, body } = c.req.raw;

  const hmac = getHmac(headers, body);
  const isValidSignature = verifyMessage(
    hmac,
    headers.get(TWITCH_MESSAGE_SIGNATURE)
  );

  if (!isValidSignature) return c.json({ error: 'Invalid signature' }, 403);
  await next();
});

const getHmac = (headers: Headers, body: ReadableStream<Uint8Array> | null) => {
  const webhookSecret = process.env.TWITCH_WEBHOOK_SECRET;
  const message = getHmacMessage(headers, body);

  return crypto
    .createHmac('sha256', webhookSecret)
    .update(message)
    .digest('hex');
};

const getHmacMessage = (
  headers: Headers,
  body: ReadableStream<Uint8Array> | null
) => {
  const messageId = headers.get(TWITCH_MESSAGE_ID);
  const timestamp = headers.get(TWITCH_MESSAGE_TIMESTAMP);

  if (!messageId || !timestamp || !body)
    throw new Error('Missing required headers from Twitch');

  return messageId + timestamp + body;
};

const verifyMessage = (hmac: string, verifySignature: string | null) => {
  if (!verifySignature)
    throw new Error('Missing required signature header from Twitch');

  return crypto.timingSafeEqual(
    Buffer.from(TWITCH_HMAC_PREFIX + hmac),
    Buffer.from(verifySignature)
  );
};

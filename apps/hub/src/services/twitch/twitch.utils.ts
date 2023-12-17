import { Context, Next } from 'hono';
import crypto from 'crypto';
import {
  TWITCH_EVENTSUB_HEADER_MESSAGE_ID,
  TWITCH_EVENTSUB_HEADER_MESSAGE_SIGNATURE,
  TWITCH_EVENTSUB_HEADER_MESSAGE_TIMESTAMP,
  TWITCH_HMAC_PREFIX
} from '@stats-station/constants';
import {
  ITwitchClip,
  ITwitchEventSubSubscriptionCreation,
  ITwitchFetcherParams,
  ITwitchStream
} from '@stats-station/models';
import { getClips, getStream } from './twitch.api';
import { logError, logger } from '@stats-station/utils';

export const makeTwitchFetcherParams = (
  twitchAccessToken: string
): ITwitchFetcherParams => ({
  twitchAccessToken,
  twitchClientId: process.env.TWITCH_CLIENT_ID
});

const TWITCH_MESSAGE_ID = TWITCH_EVENTSUB_HEADER_MESSAGE_ID.toLowerCase();
const TWITCH_MESSAGE_TIMESTAMP =
  TWITCH_EVENTSUB_HEADER_MESSAGE_TIMESTAMP.toLowerCase();
const TWITCH_MESSAGE_SIGNATURE =
  TWITCH_EVENTSUB_HEADER_MESSAGE_SIGNATURE.toLowerCase();

export const verifySignature = async (c: Context, next: Next) => {
  const { headers } = c.req.raw;
  const body = await c.req.json();

  const hmac = getHmac(headers, JSON.stringify(body));

  const isValidSignature = verifyMessage(
    hmac,
    headers.get(TWITCH_MESSAGE_SIGNATURE)
  );

  if (!isValidSignature) {
    logger.error('invalid signature from Twitch');
    return c.json({ error: 'Invalid signature' }, 403);
  }
  await next();
};

const getHmac = (headers: Headers, body: string) => {
  const webhookSecret = process.env.TWITCH_WEBHOOK_SECRET;
  const message = getHmacMessage(headers, body);

  return (
    TWITCH_HMAC_PREFIX +
    crypto.createHmac('sha256', webhookSecret).update(message).digest('hex')
  );
};

const getHmacMessage = (headers: Headers, body: string) => {
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
    Buffer.from(hmac),
    Buffer.from(verifySignature)
  );
};

export const makeEventSubRequestBody = (
  props: Omit<ITwitchEventSubSubscriptionCreation, 'transport'>
): ITwitchEventSubSubscriptionCreation => ({
  ...props,
  transport: {
    method: 'webhook',
    callback: `${process.env.TWITCH_WEBHOOK_CALLBACK_URL}/twitch/eventsub`,
    secret: process.env.TWITCH_WEBHOOK_SECRET
  }
});

export const handleGetLastStream = (
  broadcasterId: string
): Promise<ITwitchStream | null> =>
  getStream({ broadcasterId, type: 'live' })
    .then((res) => res.data[0])
    .catch((err) => {
      logError(err);
      return null;
    });

export const handleGetMostViewedStreamClip = async (
  broadcasterId: string
): Promise<ITwitchClip | null> => {
  const maybeStream: ITwitchStream | null =
    await handleGetLastStream(broadcasterId);

  if (!maybeStream) return null;

  const { started_at: startedAt } = maybeStream;
  const endedAt = new Date().toISOString();

  return getClips({ broadcasterId, startedAt, endedAt })
    .then((res) => res.data[0])
    .catch((err) => {
      logError(err);
      return null;
    });
};

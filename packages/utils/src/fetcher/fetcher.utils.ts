import { ITwitterRequestOptions } from '@stats-station/models';
import { TwitterSignatureOAuthOptions } from '@stats-station/models';
import { ITwitterExtendedOAuthOptions } from '@stats-station/models';
import { HTTPMethod, ITwitterOAuthOptions } from '@stats-station/models';
import crypto from 'crypto';

type JsonObject = { [key: string]: unknown };

const PAYLOAD_HIDDEN_PATHS = ['transport.secret', 'client_id'];

export const getPayload = (init?: RequestInit) => ({
  ...(init?.body &&
    init.body && { payload: makePayload(JSON.parse(init.body.toString())) })
});

const makePayload = (obj: JsonObject): JsonObject => {
  const hidePaths = PAYLOAD_HIDDEN_PATHS;
  return hideValues(obj, hidePaths);
};

const hideValues = (obj: JsonObject, pathsToHide: string[]): JsonObject => {
  const hideRecursive = (
    currentObj: JsonObject,
    currentPath: string[]
  ): JsonObject =>
    Object.fromEntries(
      Object.entries(currentObj).map(([key, value]) => [
        key,
        pathsToHide.includes([...currentPath, key].join('.'))
          ? '***'
          : typeof value === 'object' && value !== null
          ? hideRecursive(value as JsonObject, [...currentPath, key])
          : value
      ])
    );

  return hideRecursive(obj, []);
};

const randomString = (length: number): string => {
  if (length <= 0) return '';
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .substring(0, length);
};

const percentEncode = (str: string): string =>
  encodeURIComponent(str)
    .replace(/[!'()]/g, escape)
    .replace(/\*/g, '%2A');

const parameterString = (
  signatureOptions: TwitterSignatureOAuthOptions,
  queryParams?: Record<string, string | number | boolean>,
  bodyParams?: Record<string, string | number | boolean>
): string => {
  const params = {
    ...queryParams,
    ...bodyParams,
    oauth_consumer_key: signatureOptions.api_key,
    oauth_nonce: signatureOptions.oauth_nonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: signatureOptions.oauth_timestamp,
    oauth_token: signatureOptions.access_token,
    oauth_version: '1.0'
  };
  return Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${percentEncode(String(value))}`)
    .join('&');
};

const signatureBaseString = ({
  method,
  url,
  params,
  data,
  oAuthOptions
}: ITwitterRequestOptions & {
  oAuthOptions: TwitterSignatureOAuthOptions;
}): string => {
  const paramString = parameterString(oAuthOptions, params, data);
  return `${method.toUpperCase()}&${percentEncode(url)}&${percentEncode(
    paramString
  )}`;
};

const signature = (
  options: ITwitterRequestOptions & {
    oAuthOptions: ITwitterOAuthOptions & ITwitterExtendedOAuthOptions;
  }
): string => {
  const baseString = signatureBaseString(options);
  const consumerSecret = percentEncode(options.oAuthOptions.api_secret_key);
  const tokenSecret = percentEncode(options.oAuthOptions.access_token_secret);
  const signingKey = `${consumerSecret}&${tokenSecret}`;
  const outputString = crypto
    .createHmac('sha1', signingKey)
    .update(baseString)
    .digest('base64');
  return outputString;
};

export const makeTwitterOAuth1a = (
  requestOptions: { method: HTTPMethod; url: string },
  oAuthOptions: ITwitterOAuthOptions
): string => {
  const oAuthParams = {
    oauth_consumer_key: oAuthOptions.api_key,
    oauth_nonce: randomString(32),
    oauth_signature: '',
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.round(Date.now() / 1000),
    oauth_token: oAuthOptions.access_token,
    oauth_version: '1.0'
  };

  oAuthParams.oauth_signature = signature({
    ...requestOptions,
    oAuthOptions: { ...oAuthOptions, ...oAuthParams }
  });

  return `OAuth ${Object.entries(oAuthParams)
    .map(
      ([key, value]) =>
        `${percentEncode(key)}="${percentEncode(String(value))}"`
    )
    .join(', ')}`;
};

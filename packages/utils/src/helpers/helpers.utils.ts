export const isEmpty = (
  value: string | number | boolean | Record<string, unknown> | unknown[]
) =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && value.trim().length === 0) ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === 'object' && Object.keys(value).length === 0);

export const isNotEmpty = (
  value: string | number | boolean | Record<string, unknown> | unknown[]
) => !isEmpty(value);

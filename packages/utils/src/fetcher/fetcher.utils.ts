type JsonObject = { [key: string]: unknown };

const PAYLOAD_HIDDEN_PATHS = ['transport.secret'];

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

export const getPayload = (init?: RequestInit) => ({
  ...(init?.body && init.body && { payload: JSON.parse(init.body.toString()) })
});

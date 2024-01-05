type TokenStorageKey = 'accessToken' | 'refreshToken';

const setToken = (stoarageKey: TokenStorageKey) => (token: string) =>
  localStorage.setItem(stoarageKey, token);

const getToken = (stoarageKey: TokenStorageKey) =>
  localStorage.getItem(stoarageKey);

const removeToken = (stoarageKey: TokenStorageKey) =>
  localStorage.removeItem(stoarageKey);

export const useTokens = () => ({
  accessToken: getToken('accessToken'),
  refreshToken: getToken('refreshToken'),
  setAccessToken: setToken('accessToken'),
  setRefreshToken: setToken('refreshToken')
});

export const getAccessToken = () => getToken('accessToken');
export const getRefreshToken = () => getToken('refreshToken');

export const removeTokens = () => {
  removeToken('accessToken');
  removeToken('refreshToken');
};

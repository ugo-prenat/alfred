import { useEffect } from 'react';

const App = () => {
  const twitchToken = document.location.hash.split('&')[0].split('=')[1];

  const handleClick = () => {
    const twitchClientId = import.meta.env.VITE_TWITCH_CLIENT_ID;
    const redirectUri = 'http://localhost:5173';
    const scopes = [
      'user:read:email',
      'channel:read:goals',
      'channel:read:polls',
      'user:read:subscriptions',
      'channel:read:predictions'
    ].join('+');

    const twitchAuthUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${twitchClientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scopes}`;
    window.location.href = twitchAuthUrl;
  };

  useEffect(() => {}, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <button onClick={handleClick}>Twitch auth</button>
      {twitchToken && <p>{twitchToken}</p>}
    </div>
  );
};

export default App;

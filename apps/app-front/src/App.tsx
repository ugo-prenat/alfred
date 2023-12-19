import { ITwitchBroadcaster } from '@stats-station/models';
import { useEffect, useState } from 'react';

const App = () => {
  const twitchToken = document.location.hash.split('&')[0].split('=')[1];
  const [broadcaster, setBroadcaster] = useState<ITwitchBroadcaster>();

  const handleClick = () => {
    const twitchClientId = import.meta.env.VITE_TWITCH_CLIENT_ID;
    const redirectUri = 'http://localhost:5173';
    const scopes = [
      'user:read:email',
      'channel:read:subscriptions'
      // 'channel:read:polls',
      // 'user:read:subscriptions',
      // 'channel:read:predictions'
    ].join('+');

    const twitchAuthUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${twitchClientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scopes}`;
    window.location.href = twitchAuthUrl;
  };

  useEffect(() => {
    if (twitchToken) {
      fetch(`http://localhost:3000/twitch/broadcaster?token=${twitchToken}`)
        .then((res) => res.json())
        .then((data: ITwitchBroadcaster) => setBroadcaster(data));
    }
  }, []);

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
      {broadcaster ? <p>{broadcaster.display_name}</p> : <p>no broadcaster</p>}
    </div>
  );
};

export default App;

import { ITwitchBroadcaster } from '@stats-station/models';
import { useState } from 'react';

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

  const handleCreate = () => {
    if (twitchToken)
      fetch('http://localhost:3000/broadcasters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ twitchToken })
      })
        .then((res) => res.json())
        .then((data: ITwitchBroadcaster) => setBroadcaster(data));
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <button onClick={handleClick}>Twitch auth</button>
      <button onClick={handleCreate} disabled={!twitchToken}>
        Create streamer and bot
      </button>
      {broadcaster ? (
        <p>{broadcaster.display_name} logged</p>
      ) : (
        <p>no broadcaster</p>
      )}
    </div>
  );
};

export default App;

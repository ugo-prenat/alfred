import { useState } from 'react';

const App = () => {
  const twitchToken = document.location.hash.split('&')[0].split('=')[1];
  const [data, setData] = useState<{ broadcaster: string; bot: string }>();

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
        .then((data: any) =>
          setData({ broadcaster: data.broadcaster.name, bot: data.bot.name })
        );
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
      <button onClick={handleCreate} disabled={!twitchToken || !!data}>
        Create streamer and bot
      </button>
      {data ? (
        <p>
          broadcaster: {data.broadcaster}
          <br />
          bot: {data.bot}
        </p>
      ) : (
        <p>not logged in</p>
      )}
    </div>
  );
};

export default App;

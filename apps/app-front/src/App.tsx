import { APP_FRONT_URL } from 'constants';
import { IBot } from 'models';

const App = () => {
  const bot: IBot = {
    id: '1',
    status: 'pending'
  };
  console.log({ bot });

  return (
    <>
      <p>app-front</p>
      <p>url: {APP_FRONT_URL}</p>
    </>
  );
};

export default App;

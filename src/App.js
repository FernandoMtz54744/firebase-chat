import './App.css';
import Channel from './components/Channel';
import { useUser } from './context/user';

function App() {
  const {user, login} = useUser();

  return (
    <div>
      {user?<Channel />:<button onClick={login  }>Login with Google</button>}
    </div>

  );
}

export default App;

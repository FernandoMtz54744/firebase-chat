import './App.css';
import Channel from './components/Channel';
import { useUser } from './context/user';

function App() {
  const {user, login} = useUser();

  return (
    <div>
      {user?<Channel />:<div className="login"><h1>Para usar el chat inicia sesión</h1>
                        <button onClick={ login } className="button">Login with Google</button></div>}
    </div>

  );
}

export default App;

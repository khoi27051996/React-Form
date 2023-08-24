import logo from './logo.svg';
import './App.css';
import { useRouters } from './router/routers';

function App() {
  return (
    <div>
        {useRouters()}
    </div>
  );
}

export default App;

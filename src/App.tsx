import './index.css';
import Todo from './components/Todo';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Todo />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;

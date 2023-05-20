import './index.css';
import Todo from './components/Todo';
import { useEffect } from 'react';
import { useCookies } from "react-cookie";
import { Toaster } from 'react-hot-toast';

function App() {
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    setCookie("user", { id: 1});
    console.log(cookies);
  }, []);

  return (
    <div className="App">
      <Todo />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default App;

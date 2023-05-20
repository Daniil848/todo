import './index.css';
import Todo from './components/Todo';
import { useEffect } from 'react';
import { useCookies } from "react-cookie";
import { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [cookies, setCookie] = useCookies<string>(["user"]);

  useEffect(() => {
    if (cookies === undefined) {
      const maxAge = new Date('Fri, 31 Dec 2124 23:59:59 GMT');
      setCookie("user", { id: uuidv4()}, { expires: maxAge });
    }
    console.log(cookies.user.id);
  }, []);

  return (
    <div className="App">
      <Todo userID={cookies.user.id}/>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default App;

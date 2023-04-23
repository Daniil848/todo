import { useState } from "react";

interface task {
  id : number,
  text : string,
  completed : boolean,
}

const Todo = () => {
  const [tasks, setTasks] = useState<Array<task>>([]);
  const [text, setText] = useState<string>("");

  const task : task = {
    id : tasks.length + 1,
    text : text,
    completed : false,
  }

  const addTask = () => {
    if (text === "") {
      return;
    }
    setTasks((t) => [...t, task]);
    setText("");
    
    console.log(task); 
  };
  console.log(tasks);
  return (
    <div>
      <div>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        ></input>
        <button onClick={() => addTask()}>OK</button>
      </div>
      {tasks.map((el, index) => {
        return (
          <div className="tasks" key={index}>
            <p>{el.text}</p>
          </div>
        )
      })}
    </div>
  );
};

export default Todo;
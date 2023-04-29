import { useState, FC } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import Tasks from "./Tasks";
import { addTask } from "../app/todoSlice";

const Todo: FC = () => {  
  const tasks = useAppSelector(state => state.tasks.tasks);
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>('');
  
  const addTodo = () => {
    dispatch(addTask(text));
    setText('');
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
        <button onClick={addTodo}>OK</button>
      </div>
      {tasks.map((el, index) => {
        return (
          <Tasks id={el.id} text={el.text} comlete={el.complete} key={index}></Tasks>
        )
      })}
    </div>
  );
};

export default Todo;
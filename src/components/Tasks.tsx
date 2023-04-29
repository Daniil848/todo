import { FC } from "react";
import { useAppDispatch } from "../app/hooks";
import { delteTask, toggleComplete } from "../app/todoSlice";

interface ITasksProps {
  id : string,
  text : string,
  comlete : boolean,
}

const Tasks: FC<ITasksProps> = (props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="tasks">
      <p>{props.text}</p>
      <input type="checkbox" onChange={() => dispatch(toggleComplete(props.id))}></input>
      <button onClick={() => dispatch(delteTask(props.id))}></button>
    </div>
  )
};

export default Tasks;
import { useState, FC } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addTask } from "../app/todoSlice";
import Tasks from "./Tasks";
import { Button, Input } from "@mui/joy";
import Box from "@mui/joy/Box/Box";

const Todo: FC = () => {  
  const tasks = useAppSelector(state => state.tasks.tasks);
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>('');
  
  const addTodo = () => {
    if (text === "") return;
    dispatch(addTask(text));
    setText('');
  };
  const styles = {
    box : {
      display : 'flex',
      gap : 1,
      height : '45px',
      width : 1,
      my : '10px', 
    },
    input : {
      flexGrow : 1,
    },
    button : {

    }
  }
  console.log(tasks);
  
  return (
    <div className='todo'>
      <Box sx={styles.box}>
        <Input
          type="text"
          sx={styles.input}
          color="success"
          value={text}
          onChange={e => setText(e.target.value)}
        ></Input>
        <Button
          onClick={addTodo}
          sx={styles.button}
          color="success"
        >OK</Button>
      </Box>
      {tasks.map((el, index) => {
        return (
          <Tasks id={el.id} text={el.text} comlete={el.complete} key={index}></Tasks>
        )
      })}
    </div>
  );
};

export default Todo;
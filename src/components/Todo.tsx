import { useState, useEffect, FC } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { fetchTasks, addTask } from "../app/todoSlice";
import Tasks from "./Tasks";
import { Button, Input } from "@mui/joy";
import Box from "@mui/joy/Box/Box";

interface IProps {
  userID : string,
}

const Todo: FC<IProps> = (props) => {  
  const tasks = useAppSelector(state => state.tasks.tasks);
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>('');

  useEffect(() => {

    dispatch(fetchTasks()); 
  }, [dispatch]); 

  const HandleAddTask = () => {
    if (text === "") return;
    dispatch(addTask({
      id : 0,
      text : text,
      complete: false,
      userID : props.userID,
    }));
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
      '--Input-focusedHighlight' : 'none',
    },
    button : {
    }
  };
  
  return (
    <div className='todo'>
      <Box sx={styles.box}>
        <Input
          type="text"
          variant="soft"
          color="neutral"
          sx={styles.input}
          value={text}
          onChange={e => setText(e.target.value)}
        ></Input>
        <Button
          color="neutral"
          onClick={HandleAddTask}
        >OK</Button>
      </Box>
      {tasks.filter(el => el.userID === props.userID).reverse().map((el, index) => {
        return (
          <Tasks userID={props.userID} id={el.id} text={el.text} complete={el.complete} key={index}></Tasks>
        )
      })}
    </div>
  );
};

export default Todo;
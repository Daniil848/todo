import { FC } from "react";
import { useAppDispatch } from "../app/hooks";
import { delteTask, toggleComplete } from "../app/todoSlice";
import { Button, Checkbox, Box, Typography } from "@mui/joy";


interface ITasksProps {
  id : string,
  text : string,
  comlete : boolean,
}

const styles = {
  box : {
    display : 'flex',
    alignItems : 'center',
    height : '45px',
    width : 1,
    my : '10px',
    padding : '10px',
    boxSizing : 'border-box',
    background : '#52BE80',
    border : 2,
    borderColor: '#1a7d36',
    borderRadius : '10px',
  },
  button : {
    width : '35px',
    height : '30px',
    boxSizing : 'border-box'
  },
  typography : {
    color : 'white',
    fonttWeight : '500',
    flexGrow : 1,
  }
}



const Tasks: FC<ITasksProps> = (props) => {
  const dispatch = useAppDispatch();

  return (
    <Box sx={styles.box}>
      <Checkbox
        color="success"
        onChange={() => dispatch(toggleComplete(props.id))}
      ></Checkbox>
      <Typography 
        sx={styles.typography}
      >{props.text}</Typography>
      <Button
        color="success"
        sx={styles.button}
        onClick={() => dispatch(delteTask(props.id))}
      ></Button>
    </Box>
  )
};

export default Tasks;
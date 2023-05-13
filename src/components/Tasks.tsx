import { FC } from "react";
import { useAppDispatch } from "../app/hooks";
import { deleteTask, toggleComplete } from "../app/todoSlice";
import { Chip, Checkbox, Box, Typography } from "@mui/joy";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';


interface ITasksProps {
  id : number,
  text : string,
  complete : boolean,
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
    background : '#ebebef',
    borderRadius : '10px',
  },
  chip : {
    width : '40px',
    paddingTop: '3px',
    "--Chip-paddingInline" : "0px",
  },
  typography : {
    flexGrow : 1,
  }
}



const Tasks: FC<ITasksProps> = (props) => {
  const dispatch = useAppDispatch();

  return (
    <Box sx={styles.box}>
      <Checkbox
        variant="solid"
        color="neutral"
        checked={props.complete}
        onChange={() => dispatch(toggleComplete({
          id : props.id,
          text : props.text,
          complete : props.complete,
        }))}
      ></Checkbox>
      <Typography 
        sx={styles.typography}
      >{props.text}</Typography>
      <Chip
        variant="solid"
        color="neutral"
        sx={styles.chip}
        onClick={() => dispatch(deleteTask(props.id))}
      ><DeleteTwoToneIcon></DeleteTwoToneIcon></Chip>
    </Box>
  )
};

export default Tasks;
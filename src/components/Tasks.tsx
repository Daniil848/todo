import { useState, FC } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteTask, toggleComplete, editTask, editClick } from "../app/todoSlice";
import { Chip, Checkbox, Box, Typography } from "@mui/joy";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneOutlineTwoToneIcon from '@mui/icons-material/DoneOutlineTwoTone';

interface ITasksProps {
  id : number,
  text : string,
  complete : boolean,
}

const Tasks: FC<ITasksProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.tasks);
  const [editValue, setEditValue] = useState<string>('');

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
      mx : '5px',
    },
  };

  const isEdit = state.editTask === props.id;

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

      {}

      {isEdit ? 
        <input
          type="text"
          defaultValue={props.text}
          onChange={e => setEditValue(e.target.value)}
          className="edit-input"
        ></input>
      : 
        <Typography 
          sx={styles.typography}
        >{props.text}</Typography>
      }

      {isEdit ? 
        <Chip
          variant="plain"
          color="neutral"
          sx={styles.chip}
          onClick={() => dispatch(editTask({
            id : props.id,
            text : editValue || props.text,
            complete : props.complete,
          }))}
        ><DoneOutlineTwoToneIcon/></Chip>
      :
        <Chip
          variant="plain"
          color="neutral"
          sx={styles.chip}
          onClick={() => dispatch(editClick({id: props.id}))}
        ><EditTwoToneIcon/></Chip>
      }

      <Chip
        variant="plain"
        color="neutral"
        sx={styles.chip}
        onClick={() => dispatch(deleteTask(props.id))}
      ><DeleteTwoToneIcon></DeleteTwoToneIcon></Chip>
    </Box>
  )
};

export default Tasks;
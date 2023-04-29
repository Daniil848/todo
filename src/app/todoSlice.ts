import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ITask {
  id : string;
  text : string;
  complete : boolean;
}

export interface IState {
  tasks : ITask[];
}

const initialState: IState = {
  tasks : [],
}
console.log(initialState);


export const todoSlice = createSlice({
  name : "todo",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      console.log(state);
      console.log(action);
      
      state.tasks.push({
        id : new Date().toISOString(),
        text: action.payload,
        complete : false,
      });
    },
    delteTask : (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const completeTask = state.tasks.find(task => task.id === action.payload);
      if (completeTask) {
        completeTask.complete = !completeTask.complete;
      }
    },
  }
});

export const {addTask, delteTask, toggleComplete} = todoSlice.actions;

export default todoSlice.reducer;
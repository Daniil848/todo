import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface TodoState {
  tasks : Array<TaskInterface>;
}

const initialState: TodoState = {
  tasks : [],
}

interface TaskInterface {
  id : number | null;
  text : string;
  complete : boolean;
}

export const todoSlice = createSlice({
  name : "todo",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskInterface>) => {
      state.tasks.push({
        id : 1,
        text: action.payload.text,
        complete : false,
      })
    },
  }
});

export const {addTask} = todoSlice.actions;

export default todoSlice.reducer;
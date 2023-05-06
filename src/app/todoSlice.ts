import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';

interface ITask {
  id : number;
  text : string;
  complete : boolean;
}

export interface IState {
  tasks : ITask[];
  loading : boolean,
  error : null | string,
}

const initialState: IState = {
  tasks : [],
  loading : false,
  error : null,
}

export const fetchTasks = createAsyncThunk<ITask[], undefined, { rejectValue: { message: string }}>(
  'todo/fetchTasks',
  async () => {
    const response = await fetch('http://localhost:3001/todo');
    return response.json();
  }
);

export const addTask = createAsyncThunk<ITask, string, { rejectValue: { message: string }}>(
  'todo/addTask',
  async (text) => {
    const data = {
      id : 0,
      text: text,
      complete : false,
    }

    const response = await fetch('http://localhost:3001/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      toast.success('Task added!');
    } else if (!response.ok) {
      toast.error('Server error!');
    }

    return response.json();
  }
);

export const deleteTask = createAsyncThunk<number, number, { rejectValue: { message: string }}>(
  'todo/deleteTask',
  async (id) => {
    const response = await fetch(`http://localhost:3001/todo/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      toast.success('Task deleted!');
    } else if (!response.ok) {
      toast.error('Server error!');
    }

    return id;
  }
);

export const toggleComplete = createAsyncThunk<ITask, ITask, { rejectValue: { message: string }}>(
  'todo/toggleComplete',
  async ({id, text, complete}) => { 
    const response = await fetch(`http://localhost:3001/todo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        complete: !complete,
      })
    });

    if (response.ok) {
      toast.success('Task completed!');
    } else if (!response.ok) {
      toast.error('Server error!');
    }

    return response.json();
  }
);

export const todoSlice = createSlice({
  name : "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    })
    .addCase(fetchTasks.rejected, (state) => {})
    .addCase(addTask.pending, (state) => {
      state.error = null;
    })
    .addCase(addTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    })
    .addCase(addTask.rejected, (state) => {})
    .addCase(deleteTask.pending, (state) => {
      state.error = null;
    })
    .addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    })
    .addCase(deleteTask.rejected, (state) => {})
    .addCase(toggleComplete.pending, (state) => {
      state.error = null;
    })
    .addCase(toggleComplete.fulfilled, (state, action) => {
      const completeTask = state.tasks.find(task => task.id === action.payload.id);
      if (completeTask) {
        completeTask.complete = !completeTask.complete;
      }
    })
    .addCase(toggleComplete.rejected, (state) => {})
  }
});

export default todoSlice.reducer;
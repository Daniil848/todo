import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    tasks : todoReducer,
    counter : counterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

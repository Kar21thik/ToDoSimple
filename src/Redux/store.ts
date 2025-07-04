import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';

// 
export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; //defines the rootState which represents the type of the entire state managed by the store.
export type AppDispatch = typeof store.dispatch; //defines the type of the dispatch function which is used to dispatch actions to the store.
export {};

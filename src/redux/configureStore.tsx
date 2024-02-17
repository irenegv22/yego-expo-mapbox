import {configureStore} from '@reduxjs/toolkit';
import vehiclesReducer from './reducers/vehicles';

const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

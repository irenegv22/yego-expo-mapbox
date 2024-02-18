import {configureStore} from '@reduxjs/toolkit';
import vehiclesReducer from './reducers/vehicles';
import userLocationReducer from './reducers/userLocation';

const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
    userLocation: userLocationReducer,
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

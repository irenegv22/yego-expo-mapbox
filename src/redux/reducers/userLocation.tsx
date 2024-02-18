import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserLocationState {
  latitude: number;
  longitude: number;
}

const initialState: UserLocationState = {
  latitude: 0,
  longitude: 0,
};

const userLocationSlice = createSlice({
  name: 'userLocation',
  initialState,
  reducers: {
    setUserLocation(state, action: PayloadAction<{latitude: number; longitude: number}>) {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const {setUserLocation} = userLocationSlice.actions;
export default userLocationSlice.reducer;
